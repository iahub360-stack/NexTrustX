import { NextResponse } from 'next/server';

const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price';
const CACHE_DURATION = 30; // Cache por 30 segundos

const cryptoPairs = [
  { symbol: 'BTCBRL', name: 'Bitcoin', crypto: 'BTC' },
  { symbol: 'ETHBRL', name: 'Ethereum', crypto: 'ETH' },
  { symbol: 'USDTBRL', name: 'Tether', crypto: 'USDT' }
];

// Cache em memória para evitar múltiplas requisições
let cache: { data: any, timestamp: number } | null = null;

export async function GET() {
  try {
    // Verificar se temos cache válido
    const now = Date.now();
    if (cache && (now - cache.timestamp) < CACHE_DURATION * 1000) {
      return NextResponse.json(cache.data, {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_DURATION}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Fetch prices from Binance API com timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout

    const response = await fetch(BINANCE_API_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'NexTrustX/1.0',
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter and format the data we need
    const prices = cryptoPairs
      .map(pair => {
        const binanceData = data.find((item: any) => item.symbol === pair.symbol);
        return {
          symbol: pair.crypto,
          name: pair.name,
          price: binanceData ? parseFloat(binanceData.price) : 0,
          change24h: 0 // We'll need another endpoint for 24h change
        };
      })
      .filter(item => item.price > 0);

    // Atualizar cache
    cache = {
      data: prices,
      timestamp: now
    };

    return NextResponse.json(prices, {
      headers: {
        'Cache-Control': `public, max-age=${CACHE_DURATION}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    
    // Fallback to mock data if API fails
    const fallbackPrices = [
      { symbol: 'BTC', name: 'Bitcoin', price: 350000, change24h: 2.5 },
      { symbol: 'ETH', name: 'Ethereum', price: 12000, change24h: 1.8 },
      { symbol: 'USDT', name: 'Tether', price: 5.5, change24h: 0.1 }
    ];

    return NextResponse.json(fallbackPrices, {
      headers: {
        'Cache-Control': 'no-cache, no-store',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  }
}