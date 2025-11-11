'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  Star, 
  CheckCircle, 
  Globe, 
  Smartphone,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  Send
} from 'lucide-react';

const cardTypes = [
  {
    type: 'Visa Virtual',
    description: 'Cartão de crédito virtual worldwide com bandeira Visa',
    features: ['Aceite global', 'Cashback 2%', 'Limite até US$5.000', 'Anuidade zero'],
    color: 'text-blue-500'
  },
  {
    type: 'Mastercard Virtual',
    description: 'Cartão de crédito premium com bandeira Mastercard',
    features: ['Aceite global', 'Cashback 3%', 'Limite até US$10.000', 'Anuidade zero'],
    color: 'text-orange-500'
  },
  {
    type: 'NexTrustX Black',
    description: 'Cartão exclusivo VIP com benefícios premium',
    features: ['Cashback 5%', 'Concierge 24/7', 'Limite ilimitado', 'Acesso lounges'],
    color: 'text-black'
  }
];

const pricing = [
  {
    plan: 'Starter',
    price: '20 USDT',
    originalPrice: '25 USDT',
    period: 'única',
    features: [
      '1 cartão virtual',
      'Recarga instantânea',
      'Validade 2 anos',
      'Suporte email'
    ],
    highlighted: false
  },
  {
    plan: 'Premium',
    price: '45 USDT',
    originalPrice: '60 USDT',
    period: 'única',
    features: [
      '2 cartões virtuais',
      'Recarga instantânea',
      'Validade 5 anos',
      'Suporte prioritário',
      'Cashback aumentado',
      'App exclusivo'
    ],
    highlighted: true
  },
  {
    plan: 'Business',
    price: '100 USDT',
    originalPrice: '150 USDT',
    period: 'única',
    features: [
      '5 cartões virtuais',
      'Recarga instantânea',
      'Validade vitalícia',
      'Gerenciador empresarial',
      'API de integração',
      'Conta gerente dedicada'
    ],
    highlighted: false
  }
];

export default function VirtualCardsPage() {
  const [selectedCard, setSelectedCard] = useState('Visa Virtual');
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse nos Cartões de Crédito Virtuais NexTrustX.\n\nCartão escolhido: ${selectedCard}\nPlano: ${selectedPlan}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse nos Cartões de Crédito Virtuais NexTrustX.\n\nCartão escolhido: ${selectedCard}\nPlano: ${selectedPlan}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://t.me/NexTrustX?text=${message}`, '_blank');
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
              💳 Serviço Exclusivo
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Cartões de Crédito Virtuais
              <span className="block text-neon-green">Carregados com Crypto</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Cartões de crédito internacionais recarregáveis com criptomoedas. 
              Aceitos em milhões de estabelecimentos worldwide com taxas competitivas.
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

      {/* Cards Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Escolha Seu Cartão Ideal
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {cardTypes.map((card, index) => (
              <motion.div
                key={card.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedCard(card.type)}
                className="cursor-pointer"
              >
                <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                  selectedCard === card.type ? 'border-neon-green' : 'hover:border-white/30'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <CreditCard className={`h-12 w-12 ${card.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-2">
                      {card.type}
                    </CardTitle>
                    <p className="text-gray-400 text-sm">
                      {card.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {card.features.map((feature, idx) => (
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
          </div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Planos de Recarga
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Recarregue seus cartões com criptomoedas. Taxas de movimentação 
              inferiores a 5% para clientes VIP.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                onClick={() => setSelectedPlan(plan.plan)}
                className="cursor-pointer"
              >
                <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                  plan.highlighted ? 'border-neon-green' : 'hover:border-white/30'
                }`}>
                  <CardHeader className="text-center pb-4">
                    {plan.highlighted && (
                      <Badge className="mb-3 text-neon-green border-neon-green">
                        Mais Popular
                      </Badge>
                    )}
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {plan.plan}
                    </CardTitle>
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-neon-green">
                        {plan.price}
                      </div>
                      <div className="text-sm text-gray-400 line-through">
                        {plan.originalPrice}
                      </div>
                      <div className="text-sm text-gray-300">
                        pagamento {plan.period}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <Star className="h-4 w-4 text-neon-green flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                icon: <Globe className="h-8 w-8 text-neon-green" />,
                title: "Aceite Global",
                description: "Millhões de estabelecimentos em 180+ países"
              },
              {
                icon: <Smartphone className="h-8 w-8 text-neon-cyan" />,
                title: "App Exclusivo",
                description: "Gerencie seus cartões pelo aplicativo NexTrustX"
              },
              {
                icon: <Shield className="h-8 w-8 text-neon-green" />,
                title: "Segurança Máxima",
                description: "Encriptação de ponta e proteção contra fraudes"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-neon-cyan" />,
                title: "Cashback Premium",
                description: "Ganhe até 5% de volta em todas as compras"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
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
              Solicite Seu Cartão Virtual Agora
            </h2>
            
            <div className="mb-8 p-4 glass border-white/10 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Sua seleção:</div>
              <div className="text-lg text-white">
                <strong>Cartão:</strong> {selectedCard} | 
                <strong>Plano:</strong> {selectedPlan}
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">
              Nossa equipe especializada está pronta para processar seu pedido. 
              Entrega digital em até 24 horas após aprovação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsApp}
                className="btn-neon bg-green-500 text-white hover:bg-green-600 font-semibold px-8 py-3"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Solicitar via WhatsApp
              </Button>
              
              <Button 
                onClick={handleTelegram}
                variant="outline"
                className="btn-neon border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold px-8 py-3"
                size="lg"
              >
                <Send className="h-5 w-5 mr-2" />
                Solicitar via Telegram
              </Button>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-3 w-3" />
                  <span>Entrega Global</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Aprovação Rápida</span>
                </div>
              </div>
              <p>Resposta em até 2 horas durante horário comercial</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}