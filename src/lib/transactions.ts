export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  crypto: string;
  amount: number;
  brlAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  txHash?: string;
  walletAddress?: string;
  pixKey?: string;
}

export class TransactionManager {
  private transactions: Map<string, Transaction> = new Map();

  createTransaction(
    type: 'buy' | 'sell',
    crypto: string,
    amount: number,
    brlAmount: number,
    walletAddress?: string,
    pixKey?: string
  ): Transaction {
    const transaction: Transaction = {
      id: this.generateId(),
      type,
      crypto,
      amount,
      brlAmount,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      walletAddress,
      pixKey
    };

    this.transactions.set(transaction.id, transaction);
    this.saveToLocalStorage();
    
    return transaction;
  }

  updateTransactionStatus(id: string, status: Transaction['status'], txHash?: string): Transaction | null {
    const transaction = this.transactions.get(id);
    if (!transaction) return null;

    transaction.status = status;
    transaction.updatedAt = new Date();
    if (txHash) {
      transaction.txHash = txHash;
    }

    this.transactions.set(id, transaction);
    this.saveToLocalStorage();
    
    return transaction;
  }

  getTransaction(id: string): Transaction | null {
    return this.transactions.get(id) || null;
  }

  getAllTransactions(): Transaction[] {
    return Array.from(this.transactions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  getTransactionsByType(type: 'buy' | 'sell'): Transaction[] {
    return this.getAllTransactions().filter(t => t.type === type);
  }

  getTransactionsByStatus(status: Transaction['status']): Transaction[] {
    return this.getAllTransactions().filter(t => t.status === status);
  }

  private generateId(): string {
    return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const data = Array.from(this.transactions.values());
      localStorage.setItem('nextrustx_transactions', JSON.stringify(data));
    }
  }

  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('nextrustx_transactions');
      if (data) {
        try {
          const transactions = JSON.parse(data);
          this.transactions.clear();
          
          transactions.forEach((tx: any) => {
            this.transactions.set(tx.id, {
              ...tx,
              createdAt: new Date(tx.createdAt),
              updatedAt: new Date(tx.updatedAt)
            });
          });
        } catch (error) {
          console.error('Error loading transactions from localStorage:', error);
        }
      }
    }
  }

  clearTransactions(): void {
    this.transactions.clear();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nextrustx_transactions');
    }
  }
}

export const transactionManager = new TransactionManager();

// Initialize transaction manager on client side
if (typeof window !== 'undefined') {
  transactionManager.loadFromLocalStorage();
}