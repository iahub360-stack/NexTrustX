'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Eye, 
  Key, 
  Server, 
  Users, 
  CheckCircle,
  ArrowLeft,
  Fingerprint,
  Database,
  Globe
} from 'lucide-react';

export default function PrivacidadePage() {
  const privacyFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-neon-green" />,
      title: "Sem KYC",
      description: "Não coletamos seus dados pessoais. Nenhuma identificação, documento ou verificação necessária.",
      details: "Operações 100% anônimas como o Bitcoin foi projetado para ser."
    },
    {
      icon: <Lock className="h-8 w-8 text-neon-cyan" />,
      title: "Carteiras Virgens",
      description: "Cada transação utiliza endereços de carteira únicos e nunca utilizados anteriormente.",
      details: "Gerados localmente e descartados após o uso para máxima privacidade."
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Privacidade Total",
      description: "Nenhuma informação sobre suas transações é armazenada ou compartilhada.",
      details: "O que acontece na NexTrustX, fica na NexTrustX."
    },
    {
      icon: <Key className="h-8 w-8 text-neon-green" />,
      title: "TrustWallet Core",
      description: "Usamos TrustWallet Core para geração e envio automático de criptomoedas.",
      details: "Tecnologia auditada e confiável para segurança máxima."
    },
    {
      icon: <Server className="h-8 w-8 text-neon-cyan" />,
      title: "Geração Local",
      description: "Todas as chaves são criadas localmente no seu dispositivo.",
      details: "Nunca são enviadas para nossos servidores ou terceiros."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Remix Opcional",
      description: "Transações podem ser misturadas (remix) para máxima confidencialidade.",
      details: "Serviço opcional para quebrar a rastreabilidade da blockchain."
    }
  ];

  const securityPrinciples = [
    {
      title: "Confie no Código",
      description: "Nossa plataforma é construída sobre código aberto e tecnologia blockchain verificável.",
      icon: <Database className="h-6 w-6" />
    },
    {
      title: "Não em Papéis",
      description: "Segurança digital avançada, sem dependência de documentos físicos ou burocracia.",
      icon: <Fingerprint className="h-6 w-6" />
    },
    {
      title: "Descentralização",
      description: "Operamos sob os princípios da web3, sem pontos únicos de falha.",
      icon: <Globe className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-neon-green border-neon-green">
            Privacidade e Segurança
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Sua Privacidade é 
            <span className="block text-neon-green">Nosso Compromisso</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Construído sobre os princípios da descentralização, oferecemos uma plataforma P2P 
            que respeita sua privacidade e segurança acima de tudo.
          </p>
        </div>

        {/* Main Privacy Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {privacyFeatures.map((feature, index) => (
            <Card key={index} className="card-hover glass-strong border-white/10">
              <CardHeader>
                <div className="mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-300">
                  {feature.description}
                </p>
                <p className="text-sm text-gray-400">
                  {feature.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Principles */}
        <div className="glass-strong rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Nossos Princípios de Segurança
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityPrinciples.map((principle, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass border-white/10 mb-4">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-400">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
                <Shield className="h-6 w-6 text-neon-green" />
                <span>Como Funciona</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-neon-green mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Geração de Endereços</div>
                    <div className="text-sm text-gray-400">
                      Cada operação gera um novo endereço de carteira usando TrustWallet Core
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-neon-green mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Processamento Local</div>
                    <div className="text-sm text-gray-400">
                      Todas as chaves privadas são geradas e armazenadas localmente
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-neon-green mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Descarte Seguro</div>
                    <div className="text-sm text-gray-400">
                      Após a transação, todas as chaves são permanentemente descartadas
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-neon-green mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Sem Logs</div>
                    <div className="text-sm text-gray-400">
                      Não armazenamos IP, navegador ou qualquer informação de identificação
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
                <Lock className="h-6 w-6 text-neon-cyan" />
                <span>Proteções Adicionais</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-neon-cyan mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Conexão Segura</div>
                    <div className="text-sm text-gray-400">
                      Todo o tráfego é criptografado com SSL/TLS de última geração
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-neon-cyan mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Monitoramento 24/7</div>
                    <div className="text-sm text-gray-400">
                      Sistemas monitorados continuamente para garantir disponibilidade
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-neon-cyan mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Atualizações Automáticas</div>
                    <div className="text-sm text-gray-400">
                      Bibliotecas de segurança atualizadas automaticamente
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-neon-cyan mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Auditoria Regular</div>
                    <div className="text-sm text-gray-400">
                      Código e segurança auditados por especialistas independentes
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="glass-strong rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Transações Privadas. Zero Burocracia.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Confie no código, não em papéis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/comprar">
                <Button size="lg" className="btn-neon bg-neon-green text-black hover:bg-green-400 font-semibold">
                  Experimentar Agora
                </Button>
              </Link>
              <Link href="/contato">
                <Button size="lg" variant="outline" className="btn-neon border-white text-white hover:bg-white hover:text-black">
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}