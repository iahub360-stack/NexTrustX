# NexTrustX - Plataforma de Criptomoedas

Plataforma moderna e segura para compra e venda de criptomoedas via PIX, com serviços personalizados e atendimento especializado.

## 🚀 Melhorias Implementadas

### ✅ Serviços Personalizados Aprimorados
- **Expansão de Cards**: Os usuários agora podem expandir cada serviço para ver informações detalhadas sem sair da página principal
- **Informações Completas**: Cada serviço expandido exibe:
  - Descrição completa do serviço
  - Benefícios exclusivos
  - Preços transparentes
  - Prazo de entrega
- **Contato Direto**: Botões de WhatsApp e Telegram em cada serviço expandido para atendimento personalizado

### ✅ Sistema de Pagamento PIX Revolucionado
- **Redirecionamento Automático**: Ao confirmar compra, o usuário é redirecionado para a página de pagamento externa
- **URL Dinâmica**: Geração automática do link de pagamento: `https://pix.nextrustx.com.br/pagar?projeto=NexTrustX&valor=XXX`
- **Confirmação de Pagamento**: Sistema intuitivo onde o usuário confirma quando o pagamento foi realizado
- **Envio Automático**: Após confirmação, envio de informações detalhadas da operação para WhatsApp/Telegram

### ✅ Preços Atualizados dos Serviços
- **Cartões Virtuais**: Taxa única R$ 100 | Recarga: 3%
- **Crypto em Euro**: Taxa de negociação e Mínimo: Valores a negociar
- **Câmbio Fiat**: Taxa de negociação e Mínimo: Valores a negociar
- **Escrow Services**: Taxa: 3% do valor | Mínimo: R$ 1.000 | Sem máximo
- **Compra de Veículos**: Preços a negociar

### ✅ Taxas Atualizadas
- **Compra de Cripto**: Taxa de 17.5% aplicada sobre o preço real
- **Venda de Cripto**: Taxa de 17.5% aplicada sobre o preço real
- **Valor Mínimo**: R$ 10 para compra (reduzido de R$ 50)
- **Cálculo Transparente**: Taxa aplicada de forma clara no cálculo

### ✅ Interface Visual Aprimorada
- **Botões de Alta Visibilidade**: Removido sombreamento excessivo com novos estilos:
  - `btn-green-enhanced`: Gradientes verdes com brilho neon
  - `btn-cyan-enhanced`: Gradientes ciano com efeitos hover
  - Sombras aprimoradas e transições suaves
- **Design Responsivo**: Interface adaptada para todos os dispositivos
- **Animações Fluidas**: Transições suaves com Framer Motion

### ✅ Atendimento Multilíngue
- **Suporte Completo**: Atendimento personalizado em português, francês, inglês e espanhol
- **Contato Direto**: WhatsApp e Telegram disponíveis 24/7

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database**: Prisma ORM com SQLite
- **State Management**: Zustand
- **Real-time**: Socket.io

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                 # Página principal
│   ├── comprar/                 # Página de compra
│   ├── vender/                  # Página de venda
│   ├── contato/                 # Página de contato
│   ├── privacidade/             # Política de privacidade
│   └── api/                     # APIs do backend
├── components/
│   ├── services/                # Componentes de serviços
│   ├── crypto/                  # Componentes de cripto
│   ├── transaction/             # Componentes de transação
│   ├── chat/                    # Widget de chat
│   └── ui/                      # Componentes UI base
├── lib/
│   ├── crypto.ts                # Funções de cripto
│   ├── transactions.ts         # Lógica de transações
│   ├── db.ts                    # Configuração do banco
│   └── socket.ts                # Configuração WebSocket
```

## 🚀 Funcionalidades Principais

### 💱 Compra de Criptomoedas
- Suporte para BTC, ETH, USDT (TRC20)
- Cotações em tempo real via TradingView
- Pagamento via PIX com integração externa
- Processo simplificado de confirmação

### 🛡️ Serviços Personalizados
- Cartões de Crédito Virtuais (R$ 100 taxa única, 3% recarga)
- Compra e Venda Crypto em Euro (valores a negociar)
- Câmbio de Moedas Fiat (valores a negociar)
- Wallets Seguras e Confidenciais
- Serviços de Escrow (3% do valor, mínimo R$ 1.000)
- Compra de Imóveis e Veículos (preços a negociar)

### 📊 Recursos Adicionais
- Preços em tempo real
- Widgets TradingView
- Sistema de transações
- Chat de suporte
- Notificações toast

## 🔧 Instalação e Execução

1. **Instalar dependências**:
```bash
npm install
```

2. **Configurar banco de dados**:
```bash
npm run db:push
```

3. **Iniciar servidor de desenvolvimento**:
```bash
npm run dev
```

4. **Verificar qualidade do código**:
```bash
npm run lint
```

## 🌐 URLs de Desenvolvimento

- **Aplicação**: http://localhost:3000
- **API de Preços**: http://localhost:3000/api/prices
- **API de Saúde**: http://localhost:3000/api/health

## 📱 Contato e Suporte

- **WhatsApp**: +55 16 98814-2848
- **Telegram**: @NexTrustX
- **Email**: suporte@nextrustx.com.br
- **Idiomas**: Português, Francês, Inglês, Espanhol

## 🔐 Segurança

- Encriptação AES-256
- Autenticação biométrica
- Backup criptografado
- Transações privadas
- Proteção contra ataques

## 📈 Futuras Implementações

- [ ] Integração com mais exchanges
- [ ] Aplicativo mobile nativo
- [ ] API pública para desenvolvedores
- [ ] Sistema de staking
- [ ] Carteira DeFi integrada
- [ ] Suporte para mais criptomoedas

## 📄 Licença

Este projeto é propriedade da NexTrustX e está protegido por direitos autorais.

---

**NexTrustX** - Sua ponte para o futuro das finanças digitais