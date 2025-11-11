'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bitcoin, 
  CircleDollarSign, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  Shield,
  Zap,
  Clock
} from 'lucide-react';
import { fetchCryptoPrices, formatPrice, formatChange, CryptoPrice } from '@/lib/crypto';

export default function Home() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchCryptoPrices();
        setPrices(data);
      } catch (error) {
        console.error('Error loading prices:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
    
    // Update prices every 30 seconds
    const interval = setInterval(loadPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const cryptoIcons = {
    BTC: <Bitcoin className="h-6 w-6 text-orange-500" />,
    ETH: <CircleDollarSign className="h-6 w-6 text-blue-500" />,
    USDT: <DollarSign className="h-6 w-6 text-green-500" />
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-b-2 border-neon-green rounded-full mx-auto mb-4"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white"
          >
            Carregando cotações...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-4 text-neon-green border-neon-green">
              Sem KYC • Instantâneo • Seguro
            </Badge>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Compre ou venda cripto via PIX — 
              <span className="block text-neon-green">sem KYC, sem demora.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              BTC, ETH, USDT (TRC20) com cotação em tempo real e pagamento instantâneo.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/comprar">
                <Button size="lg" className="btn-neon bg-neon-green text-black hover:bg-green-400 font-semibold text-lg px-8 py-4">
                  Comprar Cripto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/vender">
                <Button size="lg" variant="outline" className="btn-neon border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-semibold text-lg px-8 py-4">
                  Vender Cripto
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Real-time Price Ticker */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-strong rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Cotações em Tempo Real</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {prices.map((crypto, index) => (
                <motion.div
                  key={crypto.symbol}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card-hover glass border-white/10"
                >
                  <Card className="h-full border-0 bg-transparent">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">
                        {crypto.name}/BRL
                      </CardTitle>
                      {cryptoIcons[crypto.symbol as keyof typeof cryptoIcons]}
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        key={crypto.price}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-white"
                      >
                        {formatPrice(crypto.price)}
                      </motion.div>
                      <div className={`flex items-center space-x-1 text-sm ${
                        crypto.change24h >= 0 ? 'text-neon-green' : 'text-red-500'
                      }`}>
                        {crypto.change24h >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span>{formatChange(crypto.change24h)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Por que escolher a NexTrustX?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-neon-green mx-auto mb-4" />,
                title: "Sem KYC",
                description: "Transações 100% privadas. Sem necessidade de enviar documentos ou passar por burocracia."
              },
              {
                icon: <Zap className="h-12 w-12 text-neon-cyan mx-auto mb-4" />,
                title: "Instantâneo",
                description: "Pagamentos via PIX em segundos. Criptomoedas enviadas assim que o pagamento é confirmado."
              },
              {
                icon: <Clock className="h-12 w-12 text-primary mx-auto mb-4" />,
                title: "24/7",
                description: "Atendimento e operações disponíveis a qualquer hora. Suporte via WhatsApp e Telegram."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="card-hover glass border-white/10 h-full">
                  <CardContent className="p-6 text-center">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="glass-strong rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Junte-se a milhares de usuários que já confiam na NexTrustX para suas operações P2P.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/comprar">
                <Button size="lg" className="btn-neon bg-neon-green text-black hover:bg-green-400 font-semibold">
                  Comprar Agora
                </Button>
              </Link>
              <Link href="/contato">
                <Button size="lg" variant="outline" className="btn-neon border-white text-white hover:bg-white hover:text-black">
                  Falar com Suporte
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}