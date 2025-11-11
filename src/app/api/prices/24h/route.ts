import { NextResponse } from 'next/server';

const BINANCE_24H_URL = 'https://api.binance.com/api/v3/ticker/24hr';

const cryptoPairs = [
  { symbol: 'BTCBRL', name: 'Bitcoin', crypto: 'BTC' },
  { symbol: 'ETHBRL', name: 'Ethereum', crypto: 'ETH' },
  { symbol: 'USDTBRL', name: 'Tether', crypto: 'USDT' }
];

export async function GET() {
  try {
    // Fetch 24h statistics from Binance API
    const response = await fetch(BINANCE_24H_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch 24h data from Binance');
    }

    const data = await response.json();
    
    // Filter and format the data we need
    const changes = cryptoPairs
      .map(pair => {
        const binanceData = data.find((item: any) => item.symbol === pair.symbol);
        return {
          symbol: pair.crypto,
          name: pair.name,
          change24h: binanceData ? parseFloat(binanceData.priceChangePercent) : 0
        };
      })
      .filter(item => item.change24h !== 0);

    return NextResponse.json(changes);
  } catch (error) {
    console.error('Error fetching 24h price changes:', error);
    
    // Fallback to mock data if API fails
    const fallbackChanges = [
      { symbol: 'BTC', name: 'Bitcoin', change24h: 2.5 },
      { symbol: 'ETH', name: 'Ethereum', change24h: 1.8 },
      { symbol: 'USDT', name: 'Tether', change24h: 0.1 }
    ];

    return NextResponse.json(fallbackChanges);
  }
}