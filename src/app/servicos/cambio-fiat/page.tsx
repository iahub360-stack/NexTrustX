'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRightLeft, 
  TrendingUp, 
  Globe, 
  Shield, 
  Star, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  Send,
  DollarSign,
  Euro,
  Banknote,
  Clock,
  Zap
} from 'lucide-react';

const currencyPairs = [
  {
    from: 'BRL',
    to: 'USD',
    fromSymbol: 'R$',
    toSymbol: '$',
    rate: '5.32',
    change24h: '+0.8%',
    volume: '$2.1B',
    features: ['Taxa 0.5%', 'Transferência 2h', 'Cotação real', 'Sem limites']
  },
  {
    from: 'BRL',
    to: 'EUR',
    fromSymbol: 'R$',
    toSymbol: '€',
    rate: '5.78',
    change24h: '+0.3%',
    volume: '€1.8B',
    features: ['Taxa 0.6%', 'Transferência 4h', 'Cotação real', 'Compliance UE']
  },
  {
    from: 'USD',
    to: 'EUR',
    fromSymbol: '$',
    toSymbol: '€',
    rate: '0.92',
    change24h: '-0.2%',
    volume: '€3.2B',
    features: ['Taxa 0.4%', 'Transferência 1h', 'Cotação real', 'Global access']
  },
  {
    from: 'USD',
    to: 'BRL',
    fromSymbol: '$',
    toSymbol: 'R$',
    rate: '0.188',
    change24h: '-0.8%',
    volume: 'R$11.3B',
    features: ['Taxa 0.3%', 'Transferência instantânea', 'Cotação real', 'PIX available']
  }
];

const benefits = [
  {
    icon: <Zap className="h-8 w-8 text-neon-green" />,
    title: "Transferências Rápidas",
    description: "Envios em minutos ou horas, não dias"
  },
  {
    icon: <Globe className="h-8 w-8 text-neon-cyan" />,
    title: "Cobertura Global",
    description: "Operações em 180+ países com moedas locais"
  },
  {
    icon: <Shield className="h-8 w-8 text-neon-green" />,
    title: "Segurança Bancária",
    description: "Contas segregadas e proteção de saldo"
  },
  {
    icon: <Star className="h-8 w-8 text-neon-cyan" />,
    title: "Taxas Competitivas",
    description: "Até 90% mais baratas que bancos tradicionais"
  }
];

export default function CambioFiatPage() {
  const [selectedPair, setSelectedPair] = useState('BRL/USD');
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');

  const currentPair = currencyPairs.find(c => `${c.from}/${c.to}` === selectedPair);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse no serviço de Câmbio de Moedas NexTrustX.\n\nOperação: ${fromCurrency} → ${toCurrency}\nValor: ${amount || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse no serviço de Câmbio de Moedas NexTrustX.\n\nOperação: ${fromCurrency} → ${toCurrency}\nValor: ${amount || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://t.me/NexTrustX?text=${message}`, '_blank');
  };

  const calculateExchange = () => {
    if (!amount || !currentPair) return '';
    const fromAmount = parseFloat(amount);
    if (isNaN(fromAmount)) return '';
    
    const rate = parseFloat(currentPair.rate);
    const result = fromAmount * rate;
    
    return result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: toCurrency
    });
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setSelectedPair(`${toCurrency}/${fromCurrency}`);
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
            <Badge variant="outline" className="mb-4 text-neon-green border-neon-green">
              💱 Câmbio Global
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Câmbio de Moedas Fiat
              <span className="block text-neon-green">BRL/EUR/USD • Taxas Reduzidas</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Conversão rápida entre moedas fiduciárias com as melhores taxas do mercado. 
              Transferências em minutos, sem burocracia bancária.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/servicos">
                <Button variant="outline" className="btn-neon border-white text-white hover:bg-white hover:text-black">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Ver Todos Serviços
                </Button>
              </Link>
              <Button onClick={handleWhatsApp} className="btn-neon bg-green-500 text-white hover:bg-green-600">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exchange Rates */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {currencyPairs.map((pair, index) => (
              <motion.div
                key={`${pair.from}/${pair.to}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                onClick={() => {
                  setSelectedPair(`${pair.from}/${pair.to}`);
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                }}
                className="cursor-pointer"
              >
                <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                  selectedPair === `${pair.from}/${pair.to}` ? 'border-neon-green' : 'hover:border-white/30'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className="text-2xl font-bold text-white mb-2">
                      {pair.from}/{pair.to}
                    </div>
                    <div className="text-3xl font-bold text-neon-green mb-1">
                      {pair.rate}
                    </div>
                    <div className={`flex items-center justify-center space-x-1 text-sm ${
                      pair.change24h.startsWith('+') ? 'text-neon-green' : 'text-red-500'
                    }`}>
                      {pair.change24h.startsWith('+') ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <ArrowRightLeft className="h-4 w-4" />
                      )}
                      <span>{pair.change24h}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Volume: {pair.volume}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {pair.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <Star className="h-3 w-3 text-neon-green flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Exchange Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-strong rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Simular Câmbio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Você envia ({fromCurrency})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1000"
                    className="w-full px-4 py-3 pr-12 glass border-white/10 rounded-lg text-white bg-transparent text-2xl"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
                    {fromCurrency}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Você recebe ({toCurrency})
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-3 pr-12 glass border-white/10 rounded-lg text-neon-green font-bold text-2xl bg-transparent">
                    {calculateExchange()}
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
                    {toCurrency}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <Button
                onClick={swapCurrencies}
                variant="outline"
                className="btn-neon border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black"
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Inverter
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Taxa de operação: {currentPair?.features.find(f => f.includes('Taxa'))?.split(' ')[1] || '0.5%'} • 
                Transferência: {currentPair?.features.find(f => f.includes('Transferência'))?.split(' ')[1] || '2h'} • 
                Cotação em tempo real
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="glass-strong border-white/10 h-full text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="glass-strong rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Comece a Operar Agora
            </h2>
            
            <div className="mb-8 p-4 glass border-white/10 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Sua operação:</div>
              <div className="text-lg text-white">
                <strong>De:</strong> {amount || '0'} {fromCurrency} → 
                <strong>Para:</strong> {calculateExchange() || '0'} {toCurrency}
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">
              Nossa equipe está pronta para processar seu câmbio. 
              Operações seguras, taxas justas e atendimento especializado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsApp}
                className="btn-neon bg-green-500 text-white hover:bg-green-600 font-semibold px-8 py-3"
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
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Banknote className="h-3 w-3" />
                  <span>Taxas Mínimas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Rapido</span>
                </div>
              </div>
              <p>Atendimento 24/7 em português, inglês e espanhol</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}