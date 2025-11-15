# Deploy na Vercel - NexTrustX

Este documento contém todas as informações necessárias para fazer o deploy da NexTrustX na Vercel.

## 🚀 Pré-requisitos

1. **Conta Vercel**
   - Crie uma conta em [vercel.com](https://vercel.com)
   - Instale a CLI: `npm i -g vercel`

2. **Variáveis de Ambiente**
   - Copie `.env.example` para `.env`
   - Configure as variáveis necessárias

3. **Projeto Configurado**
   - ✅ Next.js 15 com App Router
   - ✅ Otimizado para produção
   - ✅ API Binance com cache
   - ✅ TradingView Widgets funcionais
   - ✅ Configurações de segurança

## 📋 Configurações Implementadas

### API Binance
- **Cache**: 30 segundos para reduzir requisições
- **Timeout**: 5 segundos para evitar falhas
- **Fallback**: Dados mock se API falhar
- **Headers**: CORS configurado para produção

### TradingView Widgets
- **Domínios Autorizados**: `s3.tradingview.com`, `www.tradingview.com`
- **Scripts Externos**: Carregados dinamicamente
- **Responsivo**: Funciona em mobile e desktop
- **Tema Dark**: Configurado para combinar com o design

### Otimizações para Vercel
- **Imagens**: WebP e AVIF para melhor performance
- **Bundle Split**: Vendor e app separados
- **Headers**: Cache configurado para assets estáticos
- **Functions**: Timeout de 10 segundos para APIs

## 🛠️ Comandos de Deploy

### Deploy de Produção
```bash
# Usar o script automatizado
npm run deploy

# Ou manualmente
vercel --prod
```

### Deploy de Staging
```bash
npm run deploy:staging
```

### Build Local
```bash
npm run build
```

### Desenvolvimento Local
```bash
npm run dev
npm run vercel-dev  # Para testar como no Vercel
```

## ⚙️ Arquivos de Configuração

### `next.config.ts`
- Configurado para Vercel
- Otimizações de produção habilitadas
- Domínios externos autorizados
- Headers CORS para APIs
- Redirects configurados

### `vercel.json`
- Configurações específicas do Vercel
- Functions timeout: 10 segundos
- Regiões otimizadas para Brasil (iad1)
- Headers de cache configurados

### `.env.example`
- Template para variáveis de ambiente
- URLs configuradas para Vercel
- Variáveis da API Binance

## 🔧 Funcionalidades que Continuam Funcionando

### ✅ API Binance
- **Endpoint**: `/api/prices`
- **Cache**: 30 segundos em memória
- **Fallback**: Mock data se API falhar
- **Performance**: Timeout de 5 segundos

### ✅ TradingView Widgets
- **Símbolos**: BTC/BRL, ETH/BRL, USDT/BRL
- **Gráficos**: Widget avançado com gráfico completo
- **Visão Geral**: Widget compacto com informações
- **Responsivo**: Altura dinâmica (120px mobile, 300px desktop)

### ✅ Socket.io
- **WebSocket**: Funciona perfeitamente em produção
- **Server**: Configurado para Vercel Functions
- **Real-time**: Atualizações de preços em tempo real

## 📱 Mobile e PWA

### ✅ Design Responsivo
- **Breakpoints**: Mobile (<768px), Tablet (769-1024px), Desktop (>1024px)
- **Touch Targets**: Mínimo 44px para elementos interativos
- **Performance**: Otimizado para dispositivos móveis

### ✅ PWA Features
- **Manifest**: Configurado para instalação como app
- **Service Worker**: Registrado para cache offline
- **Safe Areas**: Suporte para notches iOS
- **Ícones**: Múltiplos tamanhos para todos os dispositivos

## 🚨 Possíveis Problemas e Soluções

### API Binance
**Problema**: Rate limiting da Binance
**Solução**: Cache de 30 segundos + fallback

### TradingView
**Problema**: Scripts externos bloqueados
**Solução**: Domínios autorizados no config

### Mobile
**Problema**: Performance em dispositivos lentos
**Solução**: Imagens otimizadas + lazy loading

## 🎯 Recomendações

1. **Monitoramento**: Configure analytics para monitorar performance
2. **CDN**: Vercel já fornece CDN global
3. **Cache**: Configure cache headers para APIs externas
4. **Testes**: Teste em múltiplos dispositivos antes do deploy
5. **Rollback**: Mantenha backup da versão anterior

## 📊 Performance Esperada

- **FCP**: < 1.8s (First Contentful Paint)
- **LCP**: < 2.5s (Largest Contentful Paint)
- **TTI**: < 3.5s (Time to Interactive)
- **CLS**: < 0.1 (Cumulative Layout Shift)

## 🔗 Links Úteis

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Documentação Vercel](https://vercel.com/docs)
- [Status Vercel](https://vercel.com/status)
- [Analytics](https://vercel.com/analytics)

## 📞 Suporte

Caso ocorra algum problema durante o deploy:

1. Verifique os logs no Vercel Dashboard
2. Confirme as variáveis de ambiente
3. Verifique se o build foi bem-sucedido
4. Teste localmente com `npm run vercel-dev`

---

**Status**: ✅ Configurado e pronto para deploy na Vercel