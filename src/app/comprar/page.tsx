'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bitcoin, 
  CircleDollarSign, 
  DollarSign, 
  Copy, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowLeft,
  QrCode,
  Smartphone,
  MessageCircle,
  Send
} from 'lucide-react';
import { fetchCryptoPrices, formatPrice, CryptoPrice } from '@/lib/crypto';

interface TransactionStatus {
  status: 'waiting' | 'paid' | 'sent';
  message: string;
  icon: React.ReactNode;
  color: string;
}

export default function ComprarPage() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [brlAmount, setBrlAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');
  const [copied, setCopied] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchCryptoPrices();
        setCryptoPrices(data);
      } catch (error) {
        console.error('Error loading prices:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, []);

  const cryptoIcons = {
    BTC: <Bitcoin className="h-6 w-6 text-orange-500" />,
    ETH: <CircleDollarSign className="h-6 w-6 text-blue-500" />,
    USDT: <DollarSign className="h-6 w-6 text-green-500" />
  };

  const transactionStatuses: TransactionStatus[] = [
    {
      status: 'waiting',
      message: 'Aguardando pagamento',
      icon: <Clock className="h-6 w-6" />,
      color: 'text-yellow-500'
    },
    {
      status: 'paid',
      message: 'Pagamento recebido',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-neon-green'
    },
    {
      status: 'sent',
      message: 'Cripto enviada',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-neon-cyan'
    }
  ];

  const currentCrypto = cryptoPrices.find(c => c.symbol === selectedCrypto);
  const currentStatus = transactionStatuses.find(s => s.status === 
    (transactionStatus === 'idle' ? 'waiting' : transactionStatus === 'pending' ? 'paid' : 'sent'));

  useEffect(() => {
    if (brlAmount && currentCrypto) {
      const amount = parseFloat(brlAmount);
      if (!isNaN(amount)) {
        // Adiciona 17.5% de taxa sobre o preço real
        const priceWithFee = currentCrypto.price * 1.175;
        const cryptoAmount = amount / priceWithFee;
        setCryptoAmount(cryptoAmount.toFixed(8));
      }
    } else {
      setCryptoAmount('');
    }
  }, [brlAmount, currentCrypto]);

  const handleBuy = () => {
    if (brlAmount && currentCrypto) {
      setTransactionStatus('pending');
      // Redirecionar para página de pagamento externa
      const paymentUrl = `https://pix.nextrustx.com.br/pagar?projeto=NexTrustX&valor=${brlAmount}`;
      window.open(paymentUrl, '_blank');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('pix.p2p@nextrustx.org');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentCompleted = () => {
    setPaymentCompleted(true);
    setTransactionStatus('confirmed');
  };

  const generateDetailedMessage = () => {
    const amount = parseFloat(brlAmount) || 0;
    const crypto = parseFloat(cryptoAmount) || 0;
    const timestamp = new Date().toLocaleString('pt-BR');
    
    return `*COMPROVANTE DE PAGAMENTO - NexTrustX*%0A%0A` +
           `📅 *Data/Hora:* ${timestamp}%0A` +
           `💰 *Valor Pago:* R$ ${amount.toFixed(2)}%0A` +
           `₿ *Crypto a Receber:* ${crypto.toFixed(8)} ${selectedCrypto}%0A` +
           `💳 *Método:* PIX via link de pagamento%0A` +
           `📍 *Carteira Destino:* ${walletAddress}%0A` +
           `📊 *Cotação Utilizada:* ${formatPrice(currentCrypto?.price || 0)}%0A%0A` +
           `🔔 *Status:* Pagamento realizado, aguardando liberação das criptomoedas.%0A%0A` +
           `Por favor, confirmar o processamento e enviar as criptomoedas para o endereço informado.%0A%0A` +
           `*ID da Transação:* ${Date.now()}`;
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(generateDetailedMessage());
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const openTelegram = () => {
    const message = encodeURIComponent(generateDetailedMessage());
    window.open(`https://t.me/NexTrustX?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-green mx-auto mb-4"></div>
          <p className="text-white">Carregando cotações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buy Form */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>Comprar Cripto</span>
                {currentCrypto?.icon}
              </CardTitle>
              <p className="text-gray-400">
                Pague via PIX e receba suas criptomoedas em minutos
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="crypto">Criptomoeda</Label>
                <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                  <SelectTrigger className="glass border-white/10">
                    <SelectValue placeholder="Selecione a criptomoeda" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoPrices.map((crypto) => (
                      <SelectItem key={crypto.symbol} value={crypto.symbol}>
                        <div className="flex items-center space-x-2">
                          {cryptoIcons[crypto.symbol as keyof typeof cryptoIcons]}
                          <span>{crypto.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brl">Valor em BRL</Label>
                <Input
                  id="brl"
                  type="number"
                  placeholder="0,00"
                  value={brlAmount}
                  onChange={(e) => setBrlAmount(e.target.value)}
                  className="glass border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Você receberá</Label>
                <div className="glass border-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">
                    {cryptoAmount} {selectedCrypto}
                  </div>
                  <div className="text-sm text-gray-400">
                    1 {selectedCrypto} = {formatPrice(currentCrypto?.price || 0)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet">Sua Carteira de Recebimento</Label>
                <Input
                  id="wallet"
                  type="text"
                  placeholder="Endereço da sua carteira crypto"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="glass border-white/10 text-white"
                  required
                />
                <p className="text-xs text-gray-400">
                  Insira o endereço da carteira onde deseja receber as criptomoedas
                </p>
              </div>

              {transactionStatus === 'idle' && (
                <Button 
                  onClick={handleBuy}
                  disabled={!brlAmount || !walletAddress || parseFloat(brlAmount) < 10}
                  className="btn-green-enhanced w-full font-semibold"
                  size="lg"
                >
                  Comprar Agora
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Pagamento via PIX</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {transactionStatus === 'idle' ? (
                <div className="text-center text-gray-400">
                  <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Insira o valor e clique em "Comprar Agora" para ver as instruções de pagamento</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {formatPrice(parseFloat(brlAmount) || 0)}
                      </div>
                      <Badge variant="outline" className="text-neon-green border-neon-green">
                        {paymentCompleted ? 'Pagamento Concluído' : 'Pagamento Pendente'}
                      </Badge>
                    </div>

                    {!paymentCompleted ? (
                      <div className="space-y-4">
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-blue-500 font-medium mb-2">Instruções de Pagamento</div>
                              <div className="text-sm text-gray-300 mb-3">
                                Uma nova aba foi aberta com a página de pagamento PIX. 
                                Complete o pagamento nessa página e depois clique no botão abaixo.
                              </div>
                              <Button
                                onClick={() => {
                                  const paymentUrl = `https://pix.nextrustx.com.br/pagar?projeto=NexTrustX&valor=${brlAmount}`;
                                  window.open(paymentUrl, '_blank');
                                }}
                                className="btn-cyan-enhanced w-full font-semibold"
                                size="sm"
                              >
                                <QrCode className="h-4 w-4 mr-2" />
                                    Abrir Página de Pagamento Novamente
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-green-500 font-medium mb-2">Já realizou o pagamento?</div>
                              <div className="text-sm text-gray-300 mb-3">
                                Clique no botão abaixo para confirmar o pagamento e enviar o comprovante.
                              </div>
                              <Button
                                onClick={handlePaymentCompleted}
                                className="btn-green-enhanced w-full font-semibold"
                                size="sm"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Confirmar Pagamento Realizado
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-green-500 font-medium mb-2">Pagamento Confirmado!</div>
                              <div className="text-sm text-gray-300 mb-3">
                                Ótimo! Seu pagamento foi registrado. Envie as informações detalhadas 
                                para nosso WhatsApp ou Telegram para acelerar o processamento.
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <Button
                                  onClick={openWhatsApp}
                                  className="btn-green-enhanced font-semibold"
                                  size="sm"
                                >
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  WhatsApp
                                </Button>
                                <Button
                                  onClick={openTelegram}
                                  className="btn-cyan-enhanced font-semibold"
                                  size="sm"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Telegram
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="glass border-white/10 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-3">Resumo da Operação</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Valor Pago:</span>
                              <span className="text-white font-medium">{formatPrice(parseFloat(brlAmount) || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Crypto a Receber:</span>
                              <span className="text-white font-medium">{cryptoAmount} {selectedCrypto}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Carteira Destino:</span>
                              <span className="text-white font-medium text-xs truncate ml-2">{walletAddress}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Cotação:</span>
                              <span className="text-white font-medium">{formatPrice(currentCrypto?.price || 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <h3 className="font-semibold text-white">Status da Transação</h3>
                      <div className="space-y-2">
                        {transactionStatuses.map((status) => (
                          <div
                            key={status.status}
                            className={`flex items-center space-x-3 p-3 rounded-lg glass border-white/10 ${
                              (paymentCompleted ? 'sent' : 'waiting') === status.status ? 'border-neon-green' : ''
                            }`}
                          >
                            <div className={status.color}>
                              {status.icon}
                            </div>
                            <div>
                              <div className="text-white font-medium">{status.message}</div>
                              <div className="text-sm text-gray-400">
                                {(paymentCompleted ? 'sent' : 'waiting') === status.status ? 'Em andamento' : 'Aguardando'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}