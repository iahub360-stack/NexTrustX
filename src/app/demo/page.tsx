'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageCircle, Bot, CheckCircle, AlertCircle } from 'lucide-react';

export default function DemoPage() {
  const [testResults, setTestResults] = useState<{[key: string]: 'success' | 'error' | 'pending'}>({});

  const testAPIConnection = async () => {
    setTestResults(prev => ({...prev, api: 'pending'}));
    
    try {
      const response = await fetch('https://api.nextrustx.org/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'test message',
          user_id: 'demo_user'
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setTestResults(prev => ({...prev, api: 'success'}));
      } else {
        setTestResults(prev => ({...prev, api: 'error'}));
      }
    } catch (error) {
      console.error('API Test Error:', error);
      setTestResults(prev => ({...prev, api: 'error'}));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-neon-green" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-500 animate-pulse" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Conectado';
      case 'error':
        return 'Erro';
      default:
        return 'Testando...';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-neon-green border-neon-green">
            Demonstração do Chat
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Assistente Virtual 
            <span className="block text-neon-green">Nex</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Teste a integração do nosso chatbot com a API da NexTrustX
          </p>
        </div>

        {/* API Status Card */}
        <Card className="glass-strong border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
              <Bot className="h-6 w-6 text-neon-green" />
              <span>Status da API</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Conexão API</span>
                  {getStatusIcon(testResults.api || 'pending')}
                </div>
                <p className="text-sm text-gray-400">
                  {getStatusText(testResults.api || 'pending')}
                </p>
              </div>
              
              <div className="glass border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Endpoint</span>
                  <CheckCircle className="h-5 w-5 text-neon-green" />
                </div>
                <p className="text-sm text-gray-400">
                  api.nextrustx.org/chat
                </p>
              </div>
              
              <div className="glass border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Método</span>
                  <CheckCircle className="h-5 w-5 text-neon-green" />
                </div>
                <p className="text-sm text-gray-400">
                  POST
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={testAPIConnection}
                className="btn-neon bg-neon-green text-black hover:bg-green-400"
              >
                Testar Conexão API
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="glass-strong border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-neon-cyan" />
              <span>Funcionalidades do Chat</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Interface</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Balão de chat flutuante</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Minimizar/Maximizar</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Design glassmorphism</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Animações suaves</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Funcionalidades</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Respostas rápidas sugeridas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Indicador de digitação</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Timestamp nas mensagens</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Tratamento de erros</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card className="glass-strong border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Como Testar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-300 space-y-3">
              <p>
                1. Clique no botão verde flutuante no canto inferior direito para abrir o chat
              </p>
              <p>
                2. Quando o chat abrir, você verá 3 botões de sugestão:
              </p>
              <div className="glass border-white/10 rounded-lg p-4 space-y-2">
                <div className="text-neon-green">• "Quero Comprar BTC com PIX"</div>
                <div className="text-neon-cyan">• "Quero Vender BTC e receber por PIX"</div>
                <div className="text-primary">• "Quanto recebo por 500 USDT Trc20 em BRL"</div>
              </div>
              <p>
                3. Clique em qualquer um dos botões ou digite sua própria mensagem
              </p>
              <p>
                4. Observe o indicador "Nex está a escrever..." enquanto espera a resposta
              </p>
              <p>
                5. A resposta da API aparecerá na janela de chat
              </p>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <div className="text-yellow-500 font-medium">Importante</div>
                  <div className="text-sm text-gray-300">
                    Certifique-se de que a API em https://api.nextrustx.org/chat está online e configurada com CORS para aceitar requisições deste domínio.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}