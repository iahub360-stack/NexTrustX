'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Car, 
  Home, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  Send,
  FileText,
  Gavel,
  TrendingUp,
  Clock,
  Users,
  MapPin,
  DollarSign,
  Camera,
  Calendar
} from 'lucide-react';

const propertyTypes = [
  {
    type: 'Residencial',
    description: 'Casas, apartamentos e condomínios residenciais',
    icon: <Home className="h-8 w-8 text-blue-500" />,
    features: ['Financiamento até 84 meses', 'Documentação completa', 'Registro em cartório', 'Posse imediata']
  },
  {
    type: 'Comercial',
    description: 'Imóveis comerciais e espaços empresariais',
    icon: <Building className="h-8 w-8 text-green-500" />,
    features: ['Alto potencial de valorização', 'Locação garantida', 'Flexibilidade de uso', 'Benefícios fiscais']
  },
  {
    type: 'Terrenos',
    description: 'Terrenos urbanos e rurais para desenvolvimento',
    icon: <MapPin className="h-8 w-8 text-orange-500" />,
    features: ['Potencial de construção', 'Investimento seguro', 'Valorização natural', 'Múltiplos usos']
  },
  {
    type: 'Veículos',
    description: 'Carros, motos e veículos especiais',
    icon: <Car className="h-8 w-8 text-purple-500" />,
    features: ['Financiamento até 60 meses', 'Inspeção completa', 'Transferência garantida', 'Seguro integrado']
  }
];

const legalStructures = [
  {
    name: 'Pessoa Física',
    description: 'Ideal para investimentos pessoais e residência',
    benefits: ['Simplicidade', 'Menos burocracia', 'Isenção fiscal em vendas', 'Financiamento facilitado'],
    icon: <Users className="h-6 w-6 text-neon-green" />
  },
  {
    name: 'Pessoa Jurídica',
    description: 'Perfeito para investimentos empresariais',
    benefits: ['Proteção patrimonial', 'Dedutibilidade fiscal', 'Crédito corporativo', 'Planejamento sucessório'],
    icon: <Building className="h-6 w-6 text-neon-cyan" />
  },
  {
    name: 'Offshore',
    description: 'Estrutura internacional com vantagens fiscais',
    benefits: ['Privacidade máxima', 'Otimização fiscal', 'Proteção internacional', 'Planejamento global'],
    icon: <Shield className="h-6 w-6 text-neon-green" />
  }
];

const listings = [
  {
    title: 'Casa de Praia - Florianópolis',
    type: 'Residencial',
    price: 'R$ 850.000',
    crypto: '45 BTC',
    location: 'Florianópolis, SC',
    image: '🏖️',
    features: ['4 quartos', '2 suítes', 'piscina', 'vista para o mar'],
    hot: true
  },
  {
    title: 'Apartamento Premium - São Paulo',
    type: 'Residencial',
    price: 'R$ 650.000',
    crypto: '35 BTC',
    location: 'São Paulo, SP',
    image: '🏢️',
    features: ['3 quartos', '2 vagas', 'academia', 'segurança 24h'],
    hot: false
  },
  {
    title: 'Terreno Comercial - Brasília',
    type: 'Comercial',
    price: 'R$ 1.200.000',
    crypto: '65 BTC',
    location: 'Brasília, DF',
    image: '🏗️',
    features: ['2.000m²', 'zona privilegiada', 'frente para rua principal', 'alto potencial'],
    hot: true
  },
  {
    title: 'BMW Série 3 - 2023',
    type: 'Veículos',
    price: 'R$ 180.000',
    crypto: '9.5 BTC',
    location: 'São Paulo, SP',
    image: '🚗️',
    features: ['0km', 'automático', 'teto solar', 'assistente virtual'],
    hot: false
  }
];

export default function ImoveisVeiculosPage() {
  const [selectedType, setSelectedType] = useState('Residencial');
  const [selectedStructure, setSelectedStructure] = useState('Pessoa Física');
  const [showListings, setShowListings] = useState(false);
  const [reserveAmount, setReserveAmount] = useState('');

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse no serviço de Compra de Imóveis/Veículos NexTrustX.\n\nTipo: ${selectedType}\nEstrutura: ${selectedStructure}\nValor reserva: ${reserveAmount || 'A definir'}\n\nPodem me ajudar com mais informações?`);
    window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse no serviço de Compra de Imóveis/Veículos NexTrustX.\n\nTipo: ${selectedType}\nEstrutura: ${selectedStructure}\nValor reserva: ${reserveAmount || 'A definir'}\n\nPodem me ajudar com mais informações?`);
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
              🏠 Investimento Imobiliário
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Compra Veículos e Imóveis com Crypto
              <span className="block text-neon-green">Representação Legal • Documentação Completa</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Adquira bens reais com criptomoedas. Identifique o que pretende, 
              envie 30% como sinal e negociamos por você com documentação completa.
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

      {/* Property Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {propertyTypes.map((property, index) => (
              <motion.div
                key={property.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                onClick={() => setSelectedType(property.type)}
                className="cursor-pointer"
              >
                <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                  selectedType === property.type ? 'border-neon-green' : 'hover:border-white/30'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {property.icon}
                    </div>
                    <CardTitle className="text-lg font-bold text-white mb-2">
                      {property.type}
                    </CardTitle>
                    <p className="text-gray-400 text-sm mb-3">
                      {property.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {property.features.map((feature, idx) => (
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

          {/* Legal Structure Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-strong rounded-xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Estrutura Jurídica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {legalStructures.map((structure, index) => (
                <motion.div
                  key={structure.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  onClick={() => setSelectedStructure(structure.name)}
                  className="cursor-pointer"
                >
                  <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                    selectedStructure === structure.name ? 'border-neon-green' : 'hover:border-white/30'
                  }`}>
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-4">
                        {structure.icon}
                      </div>
                      <CardTitle className="text-lg font-bold text-white mb-2">
                        {structure.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-3">
                        {structure.description}
                      </p>
                      <div className="space-y-2">
                        {structure.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-neon-green flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => setShowListings(!showListings)}
                variant="outline"
                className="btn-neon border-neon-green text-neon-green hover:bg-neon-green hover:text-black"
              >
                {showListings ? 'Ocultar' : 'Ver'} Imóveis Disponíveis
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Listings */}
      {showListings && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Oportunidades Disponíveis
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((listing, index) => (
                  <motion.div
                    key={listing.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                  >
                    <Card className={`glass-strong border-white/10 h-full transition-all duration-300 ${
                      listing.hot ? 'border-neon-green' : 'hover:border-white/30'
                    }`}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <CardTitle className="text-lg font-bold text-white">
                              {listing.title}
                            </CardTitle>
                            <div className="text-sm text-gray-400">
                              {listing.location}
                            </div>
                          </div>
                          {listing.hot && (
                            <Badge className="text-neon-green border-neon-green">
                              🔥 Hot
                            </Badge>
                          )}
                        </div>
                        <div className="text-3xl font-bold text-neon-green mb-2">
                          {listing.image}
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <div className="text-sm text-gray-400">Preço</div>
                            <div className="text-xl font-bold text-white">
                              {listing.price}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Crypto</div>
                            <div className="text-xl font-bold text-neon-cyan">
                              {listing.crypto}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {listing.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs text-gray-400 border-gray-400">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <Button 
                            size="sm"
                            className="btn-neon bg-neon-green text-black hover:bg-green-400"
                            onClick={() => {
                              const message = encodeURIComponent(`Olá! Tenho interesse no imóvel/veículo:\n\n${listing.title}\n${listing.price}\n${listing.crypto}\n\nPodem me ajudar?`);
                              window.open(`https://wa.me/5516988142848?text=${message}`, '_blank');
                            }}
                          >
                            Reservar Agora
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="glass-strong rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Invista com Criptomoedas
            </h2>
            
            <div className="mb-8 p-4 glass border-white/10 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Sua configuração:</div>
              <div className="text-lg text-white">
                <strong>Tipo:</strong> {selectedType} | 
                <strong>Estrutura:</strong> {selectedStructure} | 
                <strong>Reserva:</strong> {reserveAmount || 'A definir'}
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">
              Nossa equipe especializada está pronta para ajudar você a adquirir o imóvel 
              ou veículo dos seus sonhos com criptomoedas. Documentação completa 
              e representação legal garantida.
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

              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>100% Legal</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="h-3 w-3" />
                  <span>Documentação</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Seguro</span>
                </div>
              </div>
              <p>Especialistas em aquisições desde 2018</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}