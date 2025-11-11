'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Lock, 
  Key, 
  Smartphone, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  Send,
  Eye,
  EyeOff,
  Fingerprint,
  Cloud,
  Database,
  AlertTriangle,
  Monitor,
  Download
} from 'lucide-react';

const walletTypes = [
  {
    type: 'Cold Storage',
    description: 'Carteiras offline para máxima segurança',
    icon: <Lock className="h-8 w-8 text-blue-500" />,
    features: [
      '100% offline',
      'Proteção contra hackers',
      'Controle total das chaves',
      'Ideal para grandes valores'
    ],
    security: 'Máxima',
    color: 'text-blue-500'
  },
  {
    type: 'Hot Storage',
    description: 'Carteiras online para conveniência diária',
    icon: <Smartphone className="h-8 w-8 text-green-500" />,
    features: [
      'Acesso rápido',
      'Transações fáceis',
      'App dedicado',
      'Backup automático'
    ],
    security: 'Alta',
    color: 'text-green-500'
  },
  {
    type: 'Hardware Wallet',
    description: 'Dispositivos físicos de segurança',
    icon: <Shield className="h-8 w-8 text-purple-500" />,
    features: [
      'Proteção de hardware',
      'Autenticação biométrica',
      'Segurança militar',
      'Ideal para instituições'
    ],
    security: 'Militar',
    color: 'text-purple-500'
  }
];

const securityFeatures = [
  {
    icon: <Key className="h-6 w-6 text-neon-green" />,
    title: "Encriptação AES-256",
    description: "Padrão militar de encriptação para proteção máxima"
  },
  {
    icon: <Fingerprint className="h-6 w-6 text-neon-cyan" />,
    title: "Autenticação Biométrica",
    description: "Reconhecimento facial, impressão digital e PIN"
  },
  {
    icon: <Cloud className="h-6 w-6 text-neon-green" />,
    title: "Backup Criptografado",
    description: "Sincronização segura na nuvem com recuperação"
  },
  {
    icon: <Database className="h-6 w-6 text-neon-cyan" />,
    title: "Multisig 2FA",
    description: "Múltiplas assinaturas e autenticação de dois fatores"
  },
  {
    icon: <EyeOff className="h-6 w-6 text-neon-green" />,
    title: "Transações Privadas",
    description: "Suporte a moedas privadas como Monero e Zcash"
  },
  {
    icon: <Monitor className="h-6 w-6 text-neon-cyan" />,
    title: "Monitoramento 24/7",
    description: "Alertas de segurança e detecção de atividades suspeitas"
  }
];

const supportedCoins = [
  { name: 'Bitcoin', symbol: 'BTC', type: 'cold' },
  { name: 'Ethereum', symbol: 'ETH', type: 'hot' },
  { name: 'USDT', symbol: 'USDT', type: 'hot' },
  { name: 'Monero', symbol: 'XMR', type: 'cold' },
  { name: 'Zcash', symbol: 'ZEC', type: 'cold' },
  { name: 'Litecoin', symbol: 'LTC', type: 'hot' },
  { name: 'Cardano', symbol: 'ADA', type: 'hot' },
  { name: 'Polkadot', symbol: 'DOT', type: 'cold' },
  { name: 'Chainlink', symbol: 'LINK', type: 'hardware' }
];

export default function WalletsSegurasPage() {
  const [selectedWallet, setSelectedWallet] = useState('Cold Storage');
  const [showFeatures, setShowFeatures] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse nas Wallets Seguras NexTrustX.\n\nTipo: ${selectedWallet}\nMoedas: ${selectedCoins.join(', ') || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse nas Wallets Seguras NexTrustX.\n\nTipo: ${selectedWallet}\nMoedas: ${selectedCoins.join(', ') || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://t.me/NexTrustX?text=${message}`, '_blank');
  };

  const toggleCoin = (coin: string) => {
    setSelectedCoins(prev => 
      prev.includes(coin) 
        ? prev.filter(c => c !== coin)
        : [...prev, coin]
    );
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
              🔐 Segurança Máxima
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Wallets Seguras e Confidenciais
              <span className="block text-neon-green">Criptografia de Ponta • Proteção Total</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Carteiras criptográficas com encriptação militar e proteção total de privacidade. 
              Soluções para indivíduos e instituições.
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

      {/* Wallet Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {walletTypes.map((wallet, index) => (
              <motion.div
                key={wallet.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                onClick={() => setSelectedWallet(wallet.type)}
                className="cursor-pointer"
              >
                <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                  selectedWallet === wallet.type ? 'border-neon-green' : 'hover:border-white/30'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {wallet.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-2">
                      {wallet.type}
                    </CardTitle>
                    <p className="text-gray-400 text-sm mb-3">
                      {wallet.description}
                    </p>
                    <Badge className={`${wallet.color} border-current`}>
                      Segurança: {wallet.security}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {wallet.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-neon-green flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Recursos de Segurança Avançada
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="glass-strong border-white/10 h-full text-center">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Supported Coins */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="glass-strong rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Criptomoedas Suportadas
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {supportedCoins.map((coin, index) => (
                <motion.div
                  key={coin.symbol}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => toggleCoin(coin.symbol)}
                  className="cursor-pointer"
                >
                  <div className={`glass border-white/10 rounded-lg p-4 text-center transition-all ${
                    selectedCoins.includes(coin.symbol) 
                      ? 'border-neon-green bg-neon-green/10' 
                      : 'hover:border-white/30'
                  }`}>
                    <div className="text-lg font-bold text-white mb-1">
                      {coin.symbol}
                    </div>
                    <div className="text-sm text-gray-400">
                      {coin.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {coin.type}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={() => setShowFeatures(!showFeatures)}
                variant="outline"
                className="btn-neon border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black mb-6"
              >
                {showFeatures ? 'Ocultar' : 'Ver'} Detalhes Técnicos
              </Button>
            </div>

            {showFeatures && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass border-white/10 rounded-lg p-6 text-left"
              >
                <h4 className="text-lg font-semibold text-white mb-4">Especificações Técnicas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div>
                    <strong>Encriptação:</strong> AES-256 + GCM
                  </div>
                  <div>
                    <strong>Backup:</strong> Criptografado ponta a ponta
                  </div>
                  <div>
                    <strong>Autenticação:</strong> 2FA + Biometria
                  </div>
                  <div>
                    <strong>Protocolos:</strong> BIP39, BIP44, SLIP39
                  </div>
                  <div>
                    <strong>Compliance:</strong> FATF Travel Rule
                  </div>
                  <div>
                    <strong>Auditoria:</strong> Smart-contract verificado
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="glass-strong rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Proteja Seus Ativos Digitais
            </h2>
            
            <div className="mb-8 p-4 glass border-white/10 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Sua configuração:</div>
              <div className="text-lg text-white">
                <strong>Tipo:</strong> {selectedWallet} | 
                <strong>Moedas:</strong> {selectedCoins.length > 0 ? selectedCoins.join(', ') : 'A definir'}
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">
              Nossa equipe especializada em segurança criptográfica está pronta para ajudar. 
              Soluções personalizadas para indivíduos e empresas.
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
                  <span>Segurança Militar</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lock className="h-3 w-3" />
                  <span>100% Privado</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Auditoriado</span>
                </div>
              </div>
              <p>Consultoria especializada em segurança de ativos digitais</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}