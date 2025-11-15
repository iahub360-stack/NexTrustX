#!/bin/bash

# Deploy Script para NexTrustX na Vercel
# Uso: ./deploy.sh [staging|production]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Função para mostrar status
status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Função para mostrar sucesso
success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Função para mostrar erro
error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Função para mostrar warning
warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    error "Vercel CLI não encontrado. Instale com: npm i -g vercel"
    exit 1
fi

# Verificar variáveis de ambiente
if [ ! -f ".env" ]; then
    warning "Arquivo .env não encontrado. Usando variáveis padrão."
fi

# Parâmetro de ambiente
ENVIRONMENT=${1:-production}

if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    error "Ambiente inválido. Use: ./deploy.sh [staging|production]"
    exit 1
fi

status "Iniciando deploy do NexTrustX para ambiente: $ENVIRONMENT"

# Verificar build
status "Verificando build do projeto..."
if [ ! -d ".next" ]; then
    status "Build não encontrado. Executando build..."
    npm run build
    if [ $? -ne 0 ]; then
        error "Build falhou. Verifique os erros acima."
        exit 1
    fi
fi

# Deploy para Vercel
if [ "$ENVIRONMENT" = "staging" ]; then
    status "Fazendo deploy para ambiente de staging..."
    vercel --prod
else
    status "Fazendo deploy para ambiente de produção..."
    vercel --prod
fi

# Verificar status do deploy
if [ $? -eq 0 ]; then
    success "Deploy concluído com sucesso!"
    status "A aplicação estará disponível em alguns minutos."
    
    if [ "$ENVIRONMENT" = "staging" ]; then
        status "URL de Staging: https://nextrustx-staging.vercel.app"
    else
        status "URL de Produção: https://nextrustx.vercel.app"
    fi
    
    status "Próximos passos:"
    status "1. Verifique se a API Binance está funcionando"
    status "2. Teste os widgets do TradingView"
    status "3. Monitore os logs em tempo real"
    
else
    error "Deploy falhou. Verifique os logs acima."
    exit 1
fi