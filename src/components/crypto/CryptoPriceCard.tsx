'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bitcoin, 
  CircleDollarSign, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  Expand,
  BarChart3,
  Activity
} from 'lucide-react';
import { formatPrice, formatChange, CryptoPrice } from '@/lib/crypto';
import TradingViewWidget from './TradingViewWidget';

interface CryptoPriceCardProps {
  crypto: CryptoPrice;
  index: number;
  onExpand?: (symbol: string) => void;
}

export function CryptoPriceCard({ crypto, index, onExpand }: CryptoPriceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const cryptoIcons = {
    BTC: <Bitcoin className="h-6 w-6 text-orange-500" />,
    ETH: <CircleDollarSign className="h-6 w-6 text-blue-500" />,
    USDT: <DollarSign className="h-6 w-6 text-green-500" />
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onExpand && !isExpanded) {
      onExpand(crypto.symbol);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="w-full"
    >
      <Card className={`glass-strong border-white/10 transition-all duration-300 ${
        isExpanded ? 'border-neon-green shadow-2xl' : 'hover:border-white/20'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center space-x-3">
            {cryptoIcons[crypto.symbol as keyof typeof cryptoIcons]}
            <div>
              <CardTitle className="text-lg font-bold text-white">
                {crypto.name}/BRL
              </CardTitle>
              <div className="text-sm text-gray-400">{crypto.symbol}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="outline" 
              className={`${
                crypto.change24h >= 0 
                  ? 'text-neon-green border-neon-green' 
                  : 'text-red-500 border-red-500'
              }`}
            >
              {crypto.change24h >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {formatChange(crypto.change24h)}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleExpand}
              className="text-gray-400 hover:text-white"
            >
              <Expand className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Preço Principal */}
          <motion.div 
            key={crypto.price}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-white mb-1">
              {formatPrice(crypto.price)}
            </div>
            <div className={`text-sm ${
              crypto.change24h >= 0 ? 'text-neon-green' : 'text-red-500'
            }`}>
              {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}% hoje
            </div>
          </motion.div>

          {/* Tabs para diferentes visualizações */}
          {isExpanded && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 glass border-white/10">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-neon-green data-[state=active]:text-black"
                >
                  <Activity className="h-4 w-4 mr-1" />
                  Visão
                </TabsTrigger>
                <TabsTrigger 
                  value="chart" 
                  className="data-[state=active]:bg-neon-green data-[state=active]:text-black"
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Gráfico
                </TabsTrigger>
                <TabsTrigger 
                  value="trade" 
                  className="data-[state=active]:bg-neon-green data-[state=active]:text-black"
                >
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Operar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <div className="space-y-3">
                  {/* Widget TradingView Compacto */}
                  <div className="glass border-white/10 rounded-lg p-2">
                    <TradingViewWidget 
                      symbol={`${crypto.symbol}BRL`} 
                      height={120}
                    />
                  </div>
                  
                  {/* Estatísticas Rápidas */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="glass border-white/10 rounded p-2">
                      <div className="text-gray-400 text-xs">Mínima 24h</div>
                      <div className="text-white font-semibold">
                        {formatPrice(crypto.price * 0.98)}
                      </div>
                    </div>
                    <div className="glass border-white/10 rounded p-2">
                      <div className="text-gray-400 text-xs">Máxima 24h</div>
                      <div className="text-white font-semibold">
                        {formatPrice(crypto.price * 1.02)}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chart" className="mt-4">
                <div className="glass border-white/10 rounded-lg p-2">
                  <TradingViewWidget 
                    symbol={`${crypto.symbol}BRL`} 
                    height={300}
                    showChart={true}
                  />
                </div>
              </TabsContent>

              <TabsContent value="trade" className="mt-4">
                <div className="space-y-3">
                  <Button 
                    className="w-full btn-neon bg-neon-green text-black hover:bg-green-400 font-semibold"
                    onClick={() => window.location.href = '/comprar'}
                  >
                    Comprar {crypto.symbol}
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full btn-neon border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-semibold"
                    onClick={() => window.location.href = '/vender'}
                  >
                    Vender {crypto.symbol}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Botões de Ação Rápida (quando não expandido) */}
          {!isExpanded && (
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm"
                className="btn-neon bg-neon-green text-black hover:bg-green-400 text-xs"
                onClick={() => window.location.href = '/comprar'}
              >
                Comprar
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="btn-neon border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black text-xs"
                onClick={() => window.location.href = '/vender'}
              >
                Vender
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}