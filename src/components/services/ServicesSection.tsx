'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  TrendingUp, 
  ArrowRightLeft, 
  Shield, 
  Handshake, 
  Car, 
  Home,
  MessageCircle,
  Send,
  ChevronRight,
  Star,
  Lock,
  Globe,
  Wallet,
  Building
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  badge?: string;
  popular?: boolean;
  href: string;
}

const services: Service[] = [
  {
    id: 'virtual-cards',
    title: 'Cartões de Crédito Virtuais',
    description: 'Carregue cartões internacionais com suas criptomoedas. Aceitos em milhões de estabelecimentos worldwide.',
    icon: <CreditCard className="h-8 w-8 text-neon-green" />,
    features: [
      'Cartão Visa/Mastercard Virtual',
      'Recarga instantânea com crypto',
      'Aceitação global',
      'Zero taxas de anuidade',
      'Cashback em compras'
    ],
    badge: 'Popular',
    popular: true,
    href: '/servicos/cartoes-virtuais'
  },
  {
    id: 'forex-crypto',
    title: 'Compra e Venda Crypto em Euro',
    description: 'Negocie criptomoedas com EUR. Taxas competitivas e liquidez imediata para mercado europeu.',
    icon: <TrendingUp className="h-8 w-8 text-neon-cyan" />,
    features: [
      'BTC/EUR, ETH/EUR, USDT/EUR',
      'Transferências SEPA',
      'Compliance europeia',
      'Taxas de 0.5%',
      'Suporte 24/7 em português'
    ],
    badge: 'Novo',
    href: '/servicos/crypto-euro'
  },
  {
    id: 'forex-fiat',
    title: 'Câmbio Moedas Fiat BRL/EUR/USD',
    description: 'Conversão rápida entre moedas fiduciárias com as melhores taxas do mercado.',
    icon: <ArrowRightLeft className="h-8 w-8 text-primary" />,
    features: [
      'BRL ⇄ EUR ⇄ USD',
      'Taxas bancárias reduzidas',
      'Transferência em 2h',
      'Cotação em tempo real',
      'Sem limites mensais'
    ],
    href: '/servicos/cambio-fiat'
  },
  {
    id: 'secure-wallets',
    title: 'Wallets Seguros e Confidenciais',
    description: 'Carteiras criptográficas com encriptação militar e proteção total de privacidade.',
    icon: <Shield className="h-8 w-8 text-neon-green" />,
    features: [
      'Encriptação AES-256',
      'Autenticação biométrica',
      'Backup na nuvem criptografado',
      'Multisig 2FA',
      'Transações privadas (Monero)'
    ],
    badge: 'Premium',
    href: '/servicos/wallets-seguras'
  },
  {
    id: 'escrow-services',
    title: 'Escrow Negotiation Services',
    description: 'Serviços de custódia segura para transações P2P. Proteção garantida para comprador e vendedor.',
    icon: <Handshake className="h-8 w-8 text-neon-cyan" />,
    features: [
      'Custódia 100% segura',
      'Liberação automática',
      'Resolução de disputas',
      'Taxa de 1% do valor',
      'Suporte jurídico'
    ],
    href: '/servicos/escrow-services'
  },
  {
    id: 'real-estate',
    title: 'Compra Veículos e Imóveis Crypto',
    description: 'Adquira bens reais com criptomoedas. Representação legal e documentação completa.',
    icon: <Building className="h-8 w-8 text-primary" />,
    features: [
      'Carros e imóveis',
      'Escritura em cartório',
      'Financiamento crypto',
      'Avaliação online',
      'Registro blockchain'
    ],
    badge: 'Exclusivo',
    href: '/servicos/imoveis-veiculos'
  }
];

export function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Tenho interesse nos serviços personalizados NexTrustX. Podem me ajudar?');
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    const message = encodeURIComponent('Olá! Tenho interesse nos serviços personalizados NexTrustX. Podem me ajudar?');
    window.open(`https://t.me/NexTrustX?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-neon-green border-neon-green">
            🌟 Serviços Exclusivos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Serviços Personalizados
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluções sob medida para seu ecossistema cripto. De cartões virtuais a imóveis, 
            cobrimos todas as necessidades do mercado digital.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
              className="relative"
            >
              <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                expandedService === service.id ? 'border-neon-green' : 
                hoveredService === service.id ? 'border-white/30' : ''
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    {service.icon}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-lg font-bold text-white">
                      {service.title}
                    </CardTitle>
                    {service.badge && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          service.badge === 'Popular' ? 'text-neon-green border-neon-green' :
                          service.badge === 'Premium' ? 'text-yellow-500 border-yellow-500' :
                          service.badge === 'Novo' ? 'text-neon-cyan border-neon-cyan' :
                          'text-purple-500 border-purple-500'
                        }`}
                      >
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Features Preview */}
                    <div className="space-y-2">
                      {expandedService === service.id ? (
                        // Show all features when expanded
                        service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center space-x-2 text-sm text-gray-300"
                          >
                            <Star className="h-3 w-3 text-neon-green flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.div>
                        ))
                      ) : (
                        // Show first 2 features when collapsed
                        service.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                            <Star className="h-3 w-3 text-neon-green flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))
                      )}
                    </div>

                    {/* More features indicator */}
                    {service.features.length > 2 && expandedService !== service.id && (
                      <div className="text-xs text-gray-500">
                        +{service.features.length - 2} mais recursos...
                      </div>
                    )}

                    {/* Expand/Collapse Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedService(
                        expandedService === service.id ? null : service.id
                      )}
                      className="w-full text-neon-green hover:text-neon-green hover:bg-neon-green/10"
                    >
                      {expandedService === service.id ? 'Ver Menos' : 'Ver Todos Recursos'}
                      <ChevronRight className={`h-4 w-4 ml-2 transition-transform ${
                        expandedService === service.id ? 'rotate-90' : ''
                      }`} />
                    </Button>

                    {/* CTA Button when expanded */}
                    {expandedService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link href={service.href}>
                          <Button 
                            className="w-full btn-neon bg-neon-green text-black hover:bg-green-400 font-semibold"
                          onClick={handleWhatsApp}
                          asChild
                          size="lg"
                          >
                            <MessageCircle className="h-5 w-5 mr-2" />
                            Solicitar Este Serviço
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-strong rounded-xl p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-8 w-8 text-green-500" />
              <Send className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            Fale Conosco
          </h3>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Nossa equipe especializada está pronta para ajudar você a escolher o serviço ideal. 
            Atendimento personalizado em português via WhatsApp e Telegram.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

          {/* Additional Info */}
          <div className="mt-6 text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="flex items-center space-x-1">
                <Lock className="h-3 w-3" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="h-3 w-3" />
                <span>Atendimento Global</span>
              </div>
              <div className="flex items-center space-x-1">
                <Wallet className="h-3 w-3" />
                <span>Taxas Justas</span>
              </div>
            </div>
            <p>Resposta em até 5 minutos durante horário comercial</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}