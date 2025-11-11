'use client';

import { useState, useEffect } from 'react';
import { Transaction, transactionManager } from '@/lib/transactions';
import { TransactionList } from './TransactionStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, History, Download, Upload } from 'lucide-react';

export function TransactionTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshTransactions = () => {
    setLoading(true);
    const allTransactions = transactionManager.getAllTransactions();
    setTransactions(allTransactions);
    setLoading(false);
  };

  useEffect(() => {
    refreshTransactions();
    
    // Listen for storage changes to update transactions
    const handleStorageChange = () => {
      refreshTransactions();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for transaction updates
    window.addEventListener('transactionUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('transactionUpdate', handleStorageChange);
    };
  }, []);

  const buyTransactions = transactions.filter(t => t.type === 'buy');
  const sellTransactions = transactions.filter(t => t.type === 'sell');

  return (
    <Card className="glass-strong border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Acompanhamento de Transações</span>
          </CardTitle>
          <button
            onClick={refreshTransactions}
            disabled={loading}
            className="p-2 rounded-lg glass border-white/10 hover:border-white/20 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="glass border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
              Todas ({transactions.length})
            </TabsTrigger>
            <TabsTrigger value="buy" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
              Compras ({buyTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
              Vendas ({sellTransactions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <TransactionList 
              transactions={transactions.slice(0, 10)} 
              showDetails={true}
            />
          </TabsContent>
          
          <TabsContent value="buy" className="mt-6">
            <TransactionList 
              transactions={buyTransactions.slice(0, 10)} 
              title="Compras Recentes"
              showDetails={true}
            />
          </TabsContent>
          
          <TabsContent value="sell" className="mt-6">
            <TransactionList 
              transactions={sellTransactions.slice(0, 10)} 
              title="Vendas Recentes"
              showDetails={true}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Hook for transaction management
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const refreshTransactions = () => {
    const allTransactions = transactionManager.getAllTransactions();
    setTransactions(allTransactions);
  };

  const createTransaction = (
    type: 'buy' | 'sell',
    crypto: string,
    amount: number,
    brlAmount: number,
    walletAddress?: string,
    pixKey?: string
  ) => {
    const transaction = transactionManager.createTransaction(
      type, crypto, amount, brlAmount, walletAddress, pixKey
    );
    
    // Dispatch custom event to update UI
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('transactionUpdate'));
    }
    
    return transaction;
  };

  const updateTransactionStatus = (id: string, status: Transaction['status'], txHash?: string) => {
    const transaction = transactionManager.updateTransactionStatus(id, status, txHash);
    
    // Dispatch custom event to update UI
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('transactionUpdate'));
    }
    
    return transaction;
  };

  useEffect(() => {
    refreshTransactions();
    
    const handleStorageChange = () => {
      refreshTransactions();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('transactionUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('transactionUpdate', handleStorageChange);
    };
  }, []);

  return {
    transactions,
    refreshTransactions,
    createTransaction,
    updateTransactionStatus,
    buyTransactions: transactions.filter(t => t.type === 'buy'),
    sellTransactions: transactions.filter(t => t.type === 'sell'),
    pendingTransactions: transactions.filter(t => t.status === 'pending'),
    completedTransactions: transactions.filter(t => t.status === 'completed')
  };
}