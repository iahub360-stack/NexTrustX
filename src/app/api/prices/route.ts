import { NextResponse } from 'next/server';

const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price';

const cryptoPairs = [
  { symbol: 'BTCBRL', name: 'Bitcoin', crypto: 'BTC' },
  { symbol: 'ETHBRL', name: 'Ethereum', crypto: 'ETH' },
  { symbol: 'USDTBRL', name: 'Tether', crypto: 'USDT' }
];

export async function GET() {
  try {
    // Fetch prices from Binance API
    const response = await fetch(BINANCE_API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch prices from Binance');
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

    return NextResponse.json(prices);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    
    // Fallback to mock data if API fails
    const fallbackPrices = [
      { symbol: 'BTC', name: 'Bitcoin', price: 350000, change24h: 2.5 },
      { symbol: 'ETH', name: 'Ethereum', price: 12000, change24h: 1.8 },
      { symbol: 'USDT', name: 'Tether', price: 5.5, change24h: 0.1 }
    ];

    return NextResponse.json(fallbackPrices);
  }
}