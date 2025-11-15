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
  Clock,
  BarChart3
} from 'lucide-react';
import { fetchCryptoPrices, formatPrice, formatChange, CryptoPrice } from '@/lib/crypto';
import { CryptoPriceCard } from '@/components/crypto/CryptoPriceCard';
import { ServicesSection } from '@/components/services/ServicesSection';

export default function Home() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCrypto, setExpandedCrypto] = useState<string | null>(null);

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

  const handleExpandCrypto = (symbol: string) => {
    setExpandedCrypto(expandedCrypto === symbol ? null : symbol);
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
                <Button size="lg" className="btn-green-enhanced font-semibold text-lg px-8 py-4">
                  Comprar Cripto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/vender">
                <Button size="lg" variant="outline" className="btn-cyan-enhanced font-semibold text-lg px-8 py-4">
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
            <div className="flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-neon-green mr-2" />
              <h2 className="text-2xl font-bold text-white">Cotações em Tempo Real</h2>
              <Badge variant="outline" className="ml-3 text-neon-green border-neon-green">
                TradingView Powered
              </Badge>
            </div>
            
            {/* Cards com Widgets TradingView */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {prices.map((crypto, index) => (
                <CryptoPriceCard
                  key={crypto.symbol}
                  crypto={crypto}
                  index={index}
                  onExpand={handleExpandCrypto}
                />
              ))}
            </div>

            {/* Indicador de Expansão */}
            {expandedCrypto && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <p className="text-sm text-gray-400">
                  Clique em "Visão Geral" para ver estatísticas ou "Gráfico" para análise completa
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Services Section - Substituindo CTA */}
      <ServicesSection />
    </div>
  );
}