'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle,
  ArrowLeft,
  Users,
  Headphones,
  Zap
} from 'lucide-react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const supportChannels = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="h-8 w-8 text-green-500" />,
      description: 'Resposta rápida via WhatsApp',
      action: 'Conversar',
      link: 'https://wa.me/5516988142848',
      color: 'bg-green-500 hover:bg-green-600',
      responseTime: '5-15 minutos'
    },
    {
      name: 'Telegram',
      icon: <Send className="h-8 w-8 text-blue-500" />,
      description: 'Suporte via Telegram',
      action: 'Conversar',
      link: 'https://t.me/NexTrustX',
      color: 'bg-blue-500 hover:bg-blue-600',
      responseTime: '10-20 minutos'
    },
    {
      name: 'Email',
      icon: <Mail className="h-8 w-8 text-gray-500" />,
      description: 'Suporte via email',
      action: 'Enviar Email',
      link: 'mailto:suporte@nextrustx.com',
      color: 'bg-gray-500 hover:bg-gray-600',
      responseTime: '1-2 horas'
    }
  ];

  const supportInfo = [
    {
      icon: <Clock className="h-6 w-6 text-neon-green" />,
      title: 'Horário de Atendimento',
      content: '24 horas por dia, 7 dias por semana'
    },
    {
      icon: <Zap className="h-6 w-6 text-neon-cyan" />,
      title: 'Tempo Médio de Resposta',
      content: '5-20 minutos durante o horário comercial'
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Equipe Especializada',
      content: 'Atendimento por especialistas em criptomoedas'
    },
    {
      icon: <Headphones className="h-6 w-6 text-neon-green" />,
      title: 'Suporte Multicanal',
      content: 'WhatsApp, Telegram e Email disponíveis'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
            Suporte 24/7
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Estamos Aqui para 
            <span className="block text-neon-green">Ajudar Você</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nossa equipe de especialistas está disponível 24/7 para atender suas dúvidas 
            e garantir a melhor experiência possível.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="card-hover glass-strong border-white/10">
              <CardHeader className="text-center">
                <div className="mb-4">
                  {channel.icon}
                </div>
                <CardTitle className="text-xl font-bold text-white">
                  {channel.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-center">
                  {channel.description}
                </p>
                <div className="text-center">
                  <Badge variant="outline" className="text-neon-green border-neon-green">
                    {channel.responseTime}
                  </Badge>
                </div>
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-neon ${channel.color} text-white w-full font-semibold`}
                >
                  {channel.action}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportInfo.map((info, index) => (
            <Card key={index} className="glass border-white/10">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {info.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Envie uma Mensagem
              </CardTitle>
              <p className="text-gray-400">
                Preencha o formulário abaixo e nossa equipe entrará em contato o mais rápido possível.
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-neon-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-gray-400">
                    Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="glass border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="glass border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Descreva sua dúvida ou problema..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="glass border-white/10 text-white"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-neon bg-neon-green text-black hover:bg-green-400 w-full font-semibold"
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Perguntas Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="glass border-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Quanto tempo demora para receber as criptomoedas?
                  </h4>
                  <p className="text-sm text-gray-400">
                    Após a confirmação do pagamento PIX, as criptomoedas são enviadas em até 30 minutos.
                  </p>
                </div>

                <div className="glass border-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    É seguro usar a NexTrustX?
                  </h4>
                  <p className="text-sm text-gray-400">
                    Sim. Utilizamos tecnologia de ponta, carteiras virgens para cada transação e não armazenamos seus dados.
                  </p>
                </div>

                <div className="glass border-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Quais criptomoedas são suportadas?
                  </h4>
                  <p className="text-sm text-gray-400">
                    Atualmente suportamos Bitcoin (BTC), Ethereum (ETH) e Tether (USDT) na rede TRC20.
                  </p>
                </div>

                <div className="glass border-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Posso vender qualquer quantidade?
                  </h4>
                  <p className="text-sm text-gray-400">
                    Sim. Operamos com valores a partir de R$ 50,00 para compras e não há limite máximo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <div className="glass-strong rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Emergência? Fale Conosco Imediatamente
          </h2>
          <p className="text-gray-300 mb-6">
            Para problemas urgentes relacionados a transações, utilize nossos canais de atendimento rápido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5516988142848"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon bg-green-500 text-white hover:bg-green-600 font-semibold px-8 py-3"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Emergência
            </a>
            <a
              href="https://t.me/NexTrustX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon bg-blue-500 text-white hover:bg-blue-600 font-semibold px-8 py-3"
            >
              <Send className="h-5 w-5 mr-2" />
              Telegram Emergência
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}