'use client';

import { Transaction } from '@/lib/transactions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Send, 
  Download,
  Copy,
  ExternalLink
} from 'lucide-react';
import { formatPrice } from '@/lib/crypto';

interface TransactionStatusProps {
  transaction: Transaction;
  showDetails?: boolean;
}

export function TransactionStatus({ transaction, showDetails = false }: TransactionStatusProps) {
  const getStatusInfo = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5" />,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          label: 'Pendente'
        };
      case 'confirmed':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'text-neon-green',
          bgColor: 'bg-neon-green/10',
          borderColor: 'border-neon-green/30',
          label: 'Confirmado'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'text-neon-cyan',
          bgColor: 'bg-neon-cyan/10',
          borderColor: 'border-neon-cyan/30',
          label: 'Completo'
        };
      case 'failed':
        return {
          icon: <XCircle className="h-5 w-5" />,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          label: 'Falhou'
        };
      default:
        return {
          icon: <Clock className="h-5 w-5" />,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          label: 'Desconhecido'
        };
    }
  };

  const statusInfo = getStatusInfo(transaction.status);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <Card className={`glass border-white/10 ${statusInfo.borderColor}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={statusInfo.color}>
              {statusInfo.icon}
            </div>
            <div>
              <div className="text-white font-medium">
                {transaction.type === 'buy' ? 'Compra' : 'Venda'} de {transaction.crypto}
              </div>
              <div className="text-sm text-gray-400">
                {formatDateTime(transaction.createdAt)}
              </div>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${statusInfo.bgColor} ${statusInfo.color} border-current`}
          >
            {statusInfo.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Valor:</span>
            <span className="text-white">
              {transaction.amount} {transaction.crypto}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">BRL:</span>
            <span className="text-white">
              {formatPrice(transaction.brlAmount)}
            </span>
          </div>

          {showDetails && (
            <>
              {transaction.walletAddress && (
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">Endereço:</div>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-black/30 px-2 py-1 rounded flex-1">
                      {transaction.walletAddress}
                    </code>
                    <button
                      onClick={() => copyToClipboard(transaction.walletAddress!)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {transaction.pixKey && (
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">Chave PIX:</div>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-black/30 px-2 py-1 rounded flex-1">
                      {transaction.pixKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(transaction.pixKey!)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {transaction.txHash && (
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">Hash da Transação:</div>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-black/30 px-2 py-1 rounded flex-1">
                      {transaction.txHash}
                    </code>
                    <button
                      onClick={() => copyToClipboard(transaction.txHash!)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <a
                      href={`https://bscscan.com/tx/${transaction.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex justify-between text-xs text-gray-400">
            <span>ID: {transaction.id}</span>
            <span>Atualizado: {formatDateTime(transaction.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
  showDetails?: boolean;
}

export function TransactionList({ 
  transactions, 
  title = "Transações Recentes", 
  showDetails = false 
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card className="glass border-white/10">
        <CardContent className="p-6 text-center">
          <div className="text-gray-400">
            Nenhuma transação encontrada
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <TransactionStatus
            key={transaction.id}
            transaction={transaction}
            showDetails={showDetails}
          />
        ))}
      </div>
    </div>
  );
}