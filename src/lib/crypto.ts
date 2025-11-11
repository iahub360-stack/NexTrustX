export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    // Fetch both prices and 24h changes in parallel
    const [pricesResponse, changesResponse] = await Promise.all([
      fetch('/api/prices'),
      fetch('/api/prices/24h')
    ]);

    if (!pricesResponse.ok || !changesResponse.ok) {
      throw new Error('Failed to fetch crypto data');
    }

    const prices = await pricesResponse.json();
    const changes = await changesResponse.json();

    // Combine the data
    return prices.map((price: CryptoPrice) => {
      const change = changes.find((c: CryptoPrice) => c.symbol === price.symbol);
      return {
        ...price,
        change24h: change ? change.change24h : 0
      };
    });
  } catch (error) {
    console.error('Error in fetchCryptoPrices:', error);
    
    // Fallback to mock data
    return [
      { symbol: 'BTC', name: 'Bitcoin', price: 350000, change24h: 2.5 },
      { symbol: 'ETH', name: 'Ethereum', price: 12000, change24h: 1.8 },
      { symbol: 'USDT', name: 'Tether', price: 5.5, change24h: 0.1 }
    ];
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: Math.max(2, price > 1000 ? 0 : 8)
  }).format(price);
}

export function formatChange(change: number): string {
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
}