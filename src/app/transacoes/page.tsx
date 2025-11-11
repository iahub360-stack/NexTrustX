'use client';

import Link from 'next/link';
import { TransactionTracker } from '@/components/transaction/TransactionTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Shield, Zap } from 'lucide-react';

export default function TransacoesPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Acompanhamento de 
            <span className="block text-neon-green">Transações</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitore todas as suas operações de compra e venda de criptomoedas em tempo real.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass border-white/10">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-neon-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Transações Totais</h3>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400 mt-2">Todas as operações</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/10">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-neon-cyan mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Taxa de Sucesso</h3>
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-sm text-gray-400 mt-2">Operações concluídas</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/10">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Tempo Médio</h3>
              <p className="text-3xl font-bold text-white">&lt;5min</p>
              <p className="text-sm text-gray-400 mt-2">Duração das operações</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Tracker */}
        <TransactionTracker />

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                Como Funciona?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
                  <div>
                    <div className="text-white font-medium">Registro Automático</div>
                    <div className="text-sm text-gray-400">
                      Todas as transações são registradas automaticamente no seu navegador
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2"></div>
                  <div>
                    <div className="text-white font-medium">Atualização em Tempo Real</div>
                    <div className="text-sm text-gray-400">
                      O status das transações é atualizado automaticamente
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <div className="text-white font-medium">Histórico Completo</div>
                    <div className="text-sm text-gray-400">
                      Acesse o histórico completo de todas as suas operações
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                Status das Transações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 glass border-white/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">Pendente</div>
                      <div className="text-xs text-gray-400">Aguardando confirmação</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 glass border-white/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-neon-green rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">Confirmado</div>
                      <div className="text-xs text-gray-400">Pagamento verificado</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 glass border-white/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-neon-cyan rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">Completo</div>
                      <div className="text-xs text-gray-400">Transação finalizada</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}