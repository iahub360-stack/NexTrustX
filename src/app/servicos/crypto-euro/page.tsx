'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Shield, 
  Star, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  Send,
  Euro,
  Bitcoin,
  CircleDollarSign,
  DollarSign,
  Banknote,
  Clock,
  Users
} from 'lucide-react';

const cryptoPairs = [
  {
    pair: 'BTC/EUR',
    icon: <Bitcoin className="h-8 w-8 text-orange-500" />,
    buyPrice: '42,500',
    sellPrice: '41,800',
    change24h: '+2.3%',
    volume: '€125.3M',
    features: ['Liquidez alta', 'Taxa 0.5%', 'Transferência SEPA', 'Seguro garantido']
  },
  {
    pair: 'ETH/EUR',
    icon: <CircleDollarSign className="h-8 w-8 text-blue-500" />,
    buyPrice: '2,850',
    sellPrice: '2,820',
    change24h: '+1.8%',
    volume: '€89.7M',
    features: ['Taxa 0.5%', 'Transferência SEPA', 'Smart contracts', 'DeFi integrado']
  },
  {
    pair: 'USDT/EUR',
    icon: <DollarSign className="h-8 w-8 text-green-500" />,
    buyPrice: '0.95',
    sellPrice: '0.94',
    change24h: '+0.1%',
    volume: '€234.1M',
    features: ['Taxa 0.2%', 'Stablecoin', 'Transferência instantânea', 'Reservas 100%']
  }
];

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

const companyInfo = {
  name: 'Auto Lux Europe SAS',
  address: '60 rue François 1er, 75008 Paris, France',
  iban: 'FR76 1732 8844 0074 0639 8960 966',
  registration: 'RCS Paris 814 465 273',
  description: 'Empresa europeia registrada com compliance total para operações de criptomoedas.'
};

export default function CryptoEuroPage() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC/EUR');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [language, setLanguage] = useState('pt');

  const currentCrypto = cryptoPairs.find(c => c.pair === selectedCrypto);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse em operar Crypto/EUR na NexTrustX.\n\nOperação: ${tradeType === 'buy' ? 'Compra' : 'Venda'}\nPar: ${selectedCrypto}\nValor: ${amount || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse em operar Crypto/EUR na NexTrustX.\n\nOperação: ${tradeType === 'buy' ? 'Compra' : 'Venda'}\nPar: ${selectedCrypto}\nValor: ${amount || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://t.me/NexTrustX?text=${message}`, '_blank');
  };

  const calculateAmount = () => {
    if (!amount || !currentCrypto) return '';
    const cryptoAmount = parseFloat(amount);
    if (isNaN(cryptoAmount)) return '';
    
    const price = tradeType === 'buy' ? 
      parseFloat(currentCrypto.buyPrice.replace(',', '')) : 
      parseFloat(currentCrypto.sellPrice.replace(',', ''));
    
    return (cryptoAmount * price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'EUR'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4 text-neon-cyan border-neon-cyan">
              🇪🇺 Mercado Europeu
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Compra e Venda Crypto em Euro
              <span className="block text-neon-cyan">Taxas Competitivas • Liquidez Imediata</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Negocie criptomoedas com EUR através da nossa empresa europeia. 
              Transferências SEPA, compliance regulatório e suporte 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/servicos">
                <Button variant="outline" className="btn-neon border-white text-white hover:bg-white hover:text-black">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Ver Todos Serviços
                </Button>
              </Link>
              <Button onClick={handleWhatsApp} className="btn-neon bg-blue-500 text-white hover:bg-blue-600">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trading Interface */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            {cryptoPairs.map((crypto, index) => (
              <motion.div
                key={crypto.pair}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                onClick={() => setSelectedCrypto(crypto.pair)}
                className="cursor-pointer"
              >
                <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                  selectedCrypto === crypto.pair ? 'border-neon-cyan' : 'hover:border-white/30'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-3">
                      {crypto.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-2">
                      {crypto.pair}
                    </CardTitle>
                    <div className="text-2xl font-bold text-neon-green mb-1">
                      €{crypto.buyPrice}
                    </div>
                    <div className={`flex items-center justify-center space-x-1 text-sm ${
                      crypto.change24h.startsWith('+') ? 'text-neon-green' : 'text-red-500'
                    }`}>
                      {crypto.change24h.startsWith('+') ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>{crypto.change24h}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Volume: {crypto.volume}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {crypto.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <Star className="h-3 w-3 text-neon-cyan flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Trading Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-strong rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Simular Operação
            </h3>

            <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as 'buy' | 'sell')} className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy" className="btn-neon bg-neon-green text-black hover:bg-green-400">
                  Comprar Crypto
                </TabsTrigger>
                <TabsTrigger value="sell" className="btn-neon border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black">
                  Vender Crypto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Quantidade em EUR
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="1000"
                      className="w-full px-4 py-3 glass border-white/10 rounded-lg text-white bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Você recebe
                    </label>
                    <div className="px-4 py-3 glass border-white/10 rounded-lg text-neon-green font-bold text-xl">
                      {amount ? `${(parseFloat(amount) / parseFloat(currentCrypto?.buyPrice.replace(',', '') || 1)).toFixed(6)} ${selectedCrypto?.split('/')[0]}` : '-'}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sell" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Quantidade em {selectedCrypto?.split('/')[0]}
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.5"
                      className="w-full px-4 py-3 glass border-white/10 rounded-lg text-white bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Você recebe
                    </label>
                    <div className="px-4 py-3 glass border-white/10 rounded-lg text-neon-cyan font-bold text-xl">
                      {calculateAmount()}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-400 mb-4">
                Taxa de operação: {tradeType === 'buy' ? '0.5%' : '0.8%'} • 
                Transferência SEPA: 2-24h • 
                Suporte 24/7
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-strong rounded-xl p-8"
          >
            <div className="text-center mb-8">
              <Globe className="h-12 w-12 text-neon-cyan mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                {companyInfo.name}
              </h3>
              <p className="text-gray-300 mb-6">
                {companyInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Informações da Empresa</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div><strong>Endereço:</strong> {companyInfo.address}</div>
                  <div><strong>IBAN:</strong> {companyInfo.iban}</div>
                  <div><strong>Registro:</strong> {companyInfo.registration}</div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Benefícios</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Compliance Europeu Completo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Transferências SEPA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Suporte Multilíngue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-neon-green" />
                    <span>Seguro de Operações</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 glass border-white/10 rounded-lg p-2">
                <span className="text-sm text-gray-400">Idioma:</span>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 rounded transition-colors ${
                      language === lang.code 
                        ? 'bg-neon-cyan text-black' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsApp}
                className="btn-neon bg-blue-500 text-white hover:bg-blue-600 font-semibold px-8 py-3"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </Button>
              
              <Button 
                onClick={handleTelegram}
                variant="outline"
                className="btn-neon border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold px-8 py-3"
                size="lg"
              >
                <Send className="h-5 w-5 mr-2" />
                Telegram
              </Button>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>100% Regulado</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Banknote className="h-3 w-3" />
                  <span>Taxas Justas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>24/7 Disponível</span>
                </div>
              </div>
              <p>Atendimento especializado em criptomoedas europeias</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}