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
        // Adiciona 10% de taxa sobre o preço real
        const priceWithFee = currentCrypto.price * 1.10;
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
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('pix.p2p@nextrustx.org');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWhatsAppMessage = () => {
    const amount = parseFloat(brlAmount) || 0;
    const crypto = parseFloat(cryptoAmount) || 0;
    return `Pagamento realizado de ${formatPrice(amount)} e montante de ${crypto.toFixed(8)} ${selectedCrypto} a ser transferido para "${walletAddress}"`;
  };

  const generateTelegramMessage = () => {
    return generateWhatsAppMessage();
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const openTelegram = () => {
    const message = encodeURIComponent(generateTelegramMessage());
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
                  disabled={!brlAmount || !walletAddress || parseFloat(brlAmount) < 50}
                  className="btn-neon bg-neon-green text-black hover:bg-green-400 w-full font-semibold"
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
                        Pagamento Pendente
                      </Badge>
                    </div>

                    <div className="glass border-white/10 rounded-lg p-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-gray-400">Chave PIX</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Input
                              value="pix.p2p@nextrustx.org"
                              readOnly
                              className="glass border-white/10 text-white flex-1"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={copyToClipboard}
                              className="btn-neon border-neon-cyan text-neon-cyan"
                            >
                              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-400">Nome</Label>
                          <div className="text-white">NexTrustX Serviços Digitais</div>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-400">CPF/CNPJ</Label>
                          <div className="text-white">59.326.683/0001-14</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-white">Status da Transação</h3>
                      <div className="space-y-2">
                        {transactionStatuses.map((status) => (
                          <div
                            key={status.status}
                            className={`flex items-center space-x-3 p-3 rounded-lg glass border-white/10 ${
                              currentStatus?.status === status.status ? 'border-neon-green' : ''
                            }`}
                          >
                            <div className={status.color}>
                              {status.icon}
                            </div>
                            <div>
                              <div className="text-white font-medium">{status.message}</div>
                              <div className="text-sm text-gray-400">
                                {currentStatus?.status === status.status ? 'Em andamento' : 'Aguardando'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-yellow-500 font-medium">Importante</div>
                          <div className="text-sm text-gray-300 mb-3">
                            Após o pagamento, envie o comprovante para nosso WhatsApp ou Telegram para acelerar o processo.
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                              onClick={openWhatsApp}
                              className="btn-neon bg-green-500 text-white hover:bg-green-600 flex-1"
                              size="sm"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              WhatsApp
                            </Button>
                            <Button
                              onClick={openTelegram}
                              className="btn-neon bg-blue-500 text-white hover:bg-blue-600 flex-1"
                              size="sm"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Telegram
                            </Button>
                          </div>
                        </div>
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