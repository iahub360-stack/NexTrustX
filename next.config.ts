import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações para deploy na Vercel
  experimental: {
    // Habilita otimizações para produção
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Configurações de imagem para melhor performance
  images: {
    domains: [
      's3.tradingview.com',
      'www.tradingview.com',
      'api.binance.com',
      'nextrustx.org'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configurações de headers para API
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  
  // Configurações de redirecionamento
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Configurações de compilação
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configurações de ambiente
  env: {
    BINANCE_API_URL: process.env.BINANCE_API_URL || 'https://api.binance.com/api/v3/ticker/price',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  
  // Configurações de webpack para deploy
  webpack: (config, { dev, isServer }) => {
    // Otimizações para produção
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Configurações de segurança para produção
  poweredByHeader: false,
  
  // Manter configurações existentes para desenvolvimento
  reactStrictMode: false,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
