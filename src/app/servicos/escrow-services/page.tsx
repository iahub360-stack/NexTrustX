'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Handshake, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  MessageCircle,
  Send,
  Users,
  Gavel,
  Clock,
  DollarSign,
  FileText,
  Lock,
  TrendingUp
} from 'lucide-react';

const escrowServices = [
  {
    type: 'Digital Goods',
    description: 'Intermediação para produtos e serviços digitais',
    icon: <DollarSign className="h-8 w-8 text-blue-500" />,
    features: [
      'Liberação automática',
      'Disputa 24h',
      'Taxa: 1%',
      'Múltiplas moedas',
      'API integrada'
    ],
    riskLevel: 'Baixo',
    color: 'text-blue-500'
  },
  {
    type: 'Real Estate',
    description: 'Custódia para transações imobiliárias',
    icon: <FileText className="h-8 w-8 text-green-500" />,
    features: [
      'Verificação de documentos',
      'Inspeção virtual',
      'Taxa: 2%',
      'Suporte jurídico',
      'Registro blockchain'
    ],
    riskLevel: 'Médio',
    color: 'text-green-500'
  },
  {
    type: 'International Trade',
    description: 'Serviços de escrow para comércio internacional',
    icon: <Gavel className="h-8 w-8 text-purple-500" />,
    features: [
      'Compliance global',
      'Múltiplas jurisdições',
      'Taxa: 1.5%',
      'Tradução de documentos',
      'Arbitragem disponível'
    ],
    riskLevel: 'Médio',
    color: 'text-purple-500'
  },
  {
    type: 'High Value Assets',
    description: 'Proteção premium para transações de alto valor',
    icon: <Shield className="h-8 w-8 text-orange-500" />,
    features: [
      'Seguro adicional',
      'Verificação avançada',
      'Taxa: 0.8%',
      'Seguro corporativo',
      'Gestor dedicado'
    ],
    riskLevel: 'Alto',
    color: 'text-orange-500'
  }
];

const processSteps = [
  {
    step: 1,
    title: "Acordo Inicial",
    description: "Ambas as partes concordam com os termos do escrow"
  },
  {
    step: 2,
    title: "Depósito Seguro",
    description: "O comprador deposita os fundos no escrow seguro"
  },
  {
    step: 3,
    title: "Entrega/Confirmação",
    description: "O vendedor entrega e o comprador confirma a recebimento"
  },
  {
    step: 4,
    title: "Liberação de Fundos",
    description: "Fundos liberados automaticamente para o vendedor"
  },
  {
    step: 5,
    title: "Suporte Pós-transação",
    description: "Suporte contínuo por 30 dias após a conclusão"
  }
];

export default function EscrowServicesPage() {
  const [selectedService, setSelectedService] = useState('Digital Goods');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [showProcess, setShowProcess] = useState(false);

  const currentService = escrowServices.find(s => s.type === selectedService);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse nos Serviços de Escrow NexTrustX.\n\nServiço: ${selectedService}\nValor: ${transactionAmount || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse nos Serviços de Escrow NexTrustX.\n\nServiço: ${selectedService}\nValor: ${transactionAmount || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://t.me/NexTrustX?text=${message}`, '_blank');
  };

  const calculateFee = () => {
    if (!transactionAmount || !currentService) return '0';
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount)) return '0';
    
    const feePercent = parseFloat(currentService.features.find(f => f.includes('Taxa:'))?.split(':')[1] || '1');
    const fee = amount * (feePercent / 100);
    
    return fee.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'USD'
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
              🤝 Serviços de Escrow
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Escrow Negotiation Services
              <span className="block text-neon-cyan">Proteção Garantida • Transações Seguras</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Serviços de custódia segura para transações P2P. 
              Proteção garantida para comprador e vendedor com resolução de disputas.
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

      {/* Services Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {escrowServices.map((service, index) => (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                onClick={() => setSelectedService(service.type)}
                className="cursor-pointer"
              >
                <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                  selectedService === service.type ? 'border-neon-cyan' : 'hover:border-white/30'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg font-bold text-white mb-2">
                      {service.type}
                    </CardTitle>
                    <p className="text-gray-400 text-sm mb-3">
                      {service.description}
                    </p>
                    <Badge className={`${service.color} border-current mb-3`}>
                      Risco: {service.riskLevel}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-neon-cyan flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Transaction Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-strong rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Simular Transação
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Valor da Transação
                </label>
                <input
                  type="number"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  placeholder="10000"
                  className="w-full px-4 py-3 glass border-white/10 rounded-lg text-white bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Taxa de Serviço
                </label>
                <div className="px-4 py-3 glass border-white/10 rounded-lg text-neon-cyan font-bold">
                  {calculateFee()}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Valor Líquido
                </label>
                <div className="px-4 py-3 glass border-white/10 rounded-lg text-white font-bold">
                  {transactionAmount ? (parseFloat(transactionAmount) - parseFloat(calculateFee().replace(/[^0-9.-]/g, ''))).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'USD'
                  }) : '-'}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => setShowProcess(!showProcess)}
                variant="outline"
                className="btn-neon border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black mb-6"
              >
                {showProcess ? 'Ocultar' : 'Ver'} Processo de Escrow
              </Button>
            </div>

            {showProcess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass border-white/10 rounded-lg p-6"
              >
                <h4 className="text-lg font-semibold text-white mb-4 text-center">
                  Como Funciona Nosso Escrow
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {processSteps.map((step, index) => (
                    <div key={step.step} className="text-center">
                      <div className="w-12 h-12 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-neon-cyan font-bold">{step.step}</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        <div className="font-semibold text-white mb-1">{step.title}</div>
                        <div>{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: <Shield className="h-8 w-8 text-neon-green" />,
                title: "Proteção 100%",
                description: "Fundos seguros até liberação automática"
              },
              {
                icon: <Users className="h-8 w-8 text-neon-cyan" />,
                title: "Resolução de Disputas",
                description: "Equipe especializada para mediar conflitos"
              },
              {
                icon: <Lock className="h-8 w-8 text-neon-green" />,
                title: "Segurança Jurídica",
                description: "Suporte legal e conformidade regulatória"
              }
            ].map((benefit, index) => (
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
              Negocie com Segurança Total
            </h2>
            
            <div className="mb-8 p-4 glass border-white/10 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Sua configuração:</div>
              <div className="text-lg text-white">
                <strong>Serviço:</strong> {selectedService} | 
                <strong>Valor:</strong> {transactionAmount || 'A definir'} USD
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">
              Proteja suas transações com nosso serviço de escrow profissional. 
              Ideal para negócios de alto valor e comércio internacional.
            </p>

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
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Confiável</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Rápido</span>
                </div>
              </div>
              <p>Especialistas em transações seguras desde 2019</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}