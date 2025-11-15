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
  Send,
  Wallet,
  RefreshCw,
  MessageCircle
} from 'lucide-react';
import { fetchCryptoPrices, formatPrice, CryptoPrice } from '@/lib/crypto';

interface TransactionStatus {
  status: 'waiting' | 'received' | 'paid';
  message: string;
  icon: React.ReactNode;
  color: string;
}

export default function VenderPage() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [brlAmount, setBrlAmount] = useState('');
  const [pixAddress, setPixAddress] = useState('');
  const [usdtNetwork, setUsdtNetwork] = useState<'TRC20' | 'ERC20'>('TRC20');
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');
  const [copied, setCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
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
      message: 'Aguardando cripto',
      icon: <Clock className="h-6 w-6" />,
      color: 'text-yellow-500'
    },
    {
      status: 'received',
      message: 'Cripto recebida',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-neon-green'
    },
    {
      status: 'paid',
      message: 'PIX enviado',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-neon-cyan'
    }
  ];

  const currentCrypto = cryptoPrices.find(c => c.symbol === selectedCrypto);
  const currentStatus = transactionStatuses.find(s => s.status === 
    (transactionStatus === 'idle' ? 'waiting' : transactionStatus === 'pending' ? 'received' : 'paid'));

  // Generate wallet address based on selected crypto
  useEffect(() => {
    const addresses = {
      BTC: '3KHcFHk9vCyhyMqSV1p3qaNDzRar87rbTP',
      ETH: '0x743cbc89b69e2338b820672908585335118ae0ca',
      USDT: usdtNetwork === 'TRC20' ? 'TELfDE15DfT1dsfVUtQbC3aXLVtKmyKFq1' : '0x759180520dcf92abaffc7669490adb7dec2d5fd5'
    };
    setWalletAddress(addresses[selectedCrypto as keyof typeof addresses] || '');
  }, [selectedCrypto, usdtNetwork]);

  useEffect(() => {
    if (cryptoAmount && currentCrypto) {
      const amount = parseFloat(cryptoAmount);
      if (!isNaN(amount)) {
        // Subtrai 17.5% de taxa sobre o preço real
        const priceWithFee = currentCrypto.price * 0.825;
        const brlAmount = amount * priceWithFee;
        setBrlAmount(brlAmount.toFixed(2));
      }
    } else {
      setBrlAmount('');
    }
  }, [cryptoAmount, currentCrypto]);

  const handleSell = () => {
    if (cryptoAmount && currentCrypto) {
      setTransactionStatus('pending');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWhatsAppMessage = () => {
    const crypto = parseFloat(cryptoAmount) || 0;
    const brl = parseFloat(brlAmount) || 0;
    return `Venda de ${crypto.toFixed(8)} ${selectedCrypto} e montante de ${formatPrice(brl)} a ser recebido na PIX "${pixAddress}"`;
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
          {/* Sell Form */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>Vender Cripto</span>
                {currentCrypto?.icon}
              </CardTitle>
              <p className="text-gray-400">
                Envie suas criptomoedas e receba via PIX em minutos
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

              {selectedCrypto === 'USDT' && (
                <div className="space-y-2">
                  <Label>Rede USDT</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant={usdtNetwork === 'TRC20' ? 'default' : 'outline'}
                      onClick={() => setUsdtNetwork('TRC20')}
                      className={`flex-1 ${usdtNetwork === 'TRC20' ? 'btn-green-enhanced' : 'glass border-white/10 text-white'}`}
                    >
                      TRC20 (Tron)
                    </Button>
                    <Button
                      variant={usdtNetwork === 'ERC20' ? 'default' : 'outline'}
                      onClick={() => setUsdtNetwork('ERC20')}
                      className={`flex-1 ${usdtNetwork === 'ERC20' ? 'btn-cyan-enhanced' : 'glass border-white/10 text-white'}`}
                    >
                      ERC20 (Ethereum)
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    {usdtNetwork === 'TRC20' 
                      ? 'Taxas mais baixas e confirmações mais rápidas na rede Tron' 
                      : 'Compatível com carteiras Ethereum, mas com taxas mais altas'}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="crypto">Quantidade de {selectedCrypto}</Label>
                <Input
                  id="crypto"
                  type="number"
                  step="0.00000001"
                  placeholder="0,00000000"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                  className="glass border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Você receberá</Label>
                <div className="glass border-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(parseFloat(brlAmount) || 0)}
                  </div>
                  <div className="text-sm text-gray-400">
                    1 {selectedCrypto} = {formatPrice(currentCrypto?.price || 0)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pix">Seu Endereço PIX</Label>
                <Input
                  id="pix"
                  type="text"
                  placeholder="Chave PIX (CPF, email, telefone ou aleatória)"
                  value={pixAddress}
                  onChange={(e) => setPixAddress(e.target.value)}
                  className="glass border-white/10 text-white"
                  required
                />
                <p className="text-xs text-gray-400">
                  Insira a chave PIX onde deseja receber o dinheiro
                </p>
              </div>

              {transactionStatus === 'idle' && (
                <Button 
                  onClick={handleSell}
                  disabled={!cryptoAmount || !pixAddress || parseFloat(cryptoAmount) <= 0}
                  className="btn-cyan-enhanced w-full font-semibold"
                >
                  Vender Agora
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Wallet Instructions */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                <Wallet className="h-5 w-5" />
                <span>Envie sua Cripto</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {transactionStatus === 'idle' ? (
                <div className="text-center text-gray-400">
                  <Send className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Insira a quantidade e clique em "Vender Agora" para ver as instruções de envio</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {cryptoAmount} {selectedCrypto}
                      </div>
                      <div className="text-lg text-neon-green mb-2">
                        {formatPrice(parseFloat(brlAmount) || 0)}
                      </div>
                      <Badge variant="outline" className="text-neon-cyan border-neon-cyan">
                        Aguardando Envio
                      </Badge>
                    </div>

                    <div className="glass border-white/10 rounded-lg p-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-gray-400">Endereço da Carteira</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Input
                              value={walletAddress}
                              readOnly
                              className="glass border-white/10 text-white flex-1 font-mono text-xs"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={copyToClipboard}
                              className="btn-green-enhanced"
                            >
                              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-400">Rede</Label>
                          <div className="text-white">
                            {selectedCrypto === 'BTC' ? 'Bitcoin (BTC)' : 
                             selectedCrypto === 'ETH' ? 'Ethereum (ETH) - ERC20' : 
                             selectedCrypto === 'USDT' ? `Tron (${usdtNetwork}) - USDT` : 
                             'Tron (TRC20) - USDT'}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-400">Mínimo Confirmado</Label>
                          <div className="text-white">
                            {selectedCrypto === 'BTC' ? '2 confirmações' : 
                             selectedCrypto === 'ETH' ? '12 confirmações' : 
                             selectedCrypto === 'USDT' && usdtNetwork === 'TRC20' ? '1 confirmação' :
                             selectedCrypto === 'USDT' && usdtNetwork === 'ERC20' ? '30 confirmações' :
                             '1 confirmação'}
                          </div>
                        </div>

                        {selectedCrypto === 'USDT' && (
                          <div>
                            <Label className="text-sm text-gray-400">Importante</Label>
                            <div className="text-yellow-500 text-sm">
                              Envie apenas USDT na rede {usdtNetwork}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-white">Status da Transação</h3>
                      <div className="space-y-2">
                        {transactionStatuses.map((status) => (
                          <div
                            key={status.status}
                            className={`flex items-center space-x-3 p-3 rounded-lg glass border-white/10 ${
                              currentStatus?.status === status.status ? 'border-neon-cyan' : ''
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

                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <RefreshCw className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="text-blue-500 font-medium">Importante</div>
                          <div className="text-sm text-gray-300 mb-3">
                            Após o envio da criptomoeda, notifique nosso WhatsApp ou Telegram para acelerar o processo.
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

                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <div className="text-yellow-500 font-medium">Atenção</div>
                          <div className="text-sm text-gray-300">
                            Envie apenas {selectedCrypto} para o endereço acima. Outras redes ou moedas serão perdidas permanentemente.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/20 border border-gray-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-400 font-medium">Tempo Estimado</div>
                          <div className="text-sm text-gray-300">
                            O PIX será enviado assim que a transação for confirmada na blockchain. Tempo médio: 5-30 minutos.
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