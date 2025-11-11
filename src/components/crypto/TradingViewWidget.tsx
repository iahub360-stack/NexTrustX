'use client';

import { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  width?: string | number;
  height?: string | number;
  showChart?: boolean;
  locale?: string;
  colorTheme?: 'light' | 'dark';
}

function TradingViewWidget({ 
  symbol, 
  width = '100%', 
  height = 110,
  showChart = false,
  locale = 'br',
  colorTheme = 'dark'
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Limpa conteúdo anterior
    container.current.innerHTML = '';

    const script = document.createElement("script");
    
    if (showChart) {
      // Widget de gráfico completo
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.innerHTML = `
        {
          "symbol": "BINANCE:${symbol}",
          "width": "${width}",
          "height": "${height}",
          "colorTheme": "${colorTheme}",
          "isTransparent": true,
          "locale": "${locale}",
          "largeChartUrl": "https://www.nextrustx.org",
          "hideVolume": false,
          "hideLegend": false,
          "saveImage": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    } else {
      // Widget de informações do símbolo (compacto)
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      script.innerHTML = `
        {
          "symbol": "BINANCE:${symbol}",
          "colorTheme": "${colorTheme}",
          "isTransparent": true,
          "locale": "${locale}",
          "largeChartUrl": "https://www.nextrustx.org",
          "width": "${width}",
          "height": "${height}"
        }`;
    }
    
    script.type = "text/javascript";
    script.async = true;
    
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, width, height, showChart, locale, colorTheme]);

  if (showChart) {
    return (
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    );
  }

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright text-xs text-gray-500 mt-1">
        <a 
          href={`https://br.tradingview.com/symbols/BINANCE-${symbol}/`} 
          rel="noopener nofollow" 
          target="_blank"
          className="hover:text-neon-green transition-colors"
        >
          <span className="text-xs">Análise via TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);