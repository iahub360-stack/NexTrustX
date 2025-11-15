import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexTrustX — Compre Bitcoin com PIX Sem KYC | Rápido & Seguro",
  description: "🚀 Plataforma #1 P2P de cripto do Brasil. Compre Bitcoin, Ethereum, USDT via PIX instantâneo. Sem KYC, sem burocracia. Cotação em tempo real 24/7. 💰",
  keywords: [
    "NexTrustX", "P2P crypto Brasil", "comprar Bitcoin PIX", "vender cripto PIX", 
    "Bitcoin sem KYC", "Ethereum Brasil", "USDT TRC20", "PIX cripto", 
    "exchange P2P", "crypto instantâneo", "comprar BTC", "vender ETH", 
    "criptomoedas Brasil", "PIX Bitcoin", "sem documento crypto", "trade P2P",
    "crypto app", "Bitcoin mobile", "Ethereum mobile", "USDT mobile"
  ],
  authors: [{ name: "NexTrustX Team", url: "https://nextrustx.org" }],
  creator: "NexTrustX",
  publisher: "NexTrustX",
  category: "finance",
  classification: "finance",
  referrer: "no-referrer-when-downgrade",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/icon-152x152.png", sizes: "152x152", type: "image/png" }
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NexTrustX",
    startupImage: [
      {
        url: "/apple-startup.png",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
      }
    ]
  },
  openGraph: {
    title: "🚀 NexTrustX — Compre Bitcoin com PIX Sem KYC",
    description: "💰 Plataforma #1 P2P do Brasil. Bitcoin, Ethereum, USDT via PIX instantâneo. Sem KYC, sem burocracia. Cotação real 24/7.",
    url: "https://nextrustx.org",
    siteName: "NexTrustX",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "https://nextrustx.org/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "NexTrustX - Compre Bitcoin com PIX"
      },
      {
        url: "https://nextrustx.org/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "NexTrustX - Crypto P2P Brasil"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🚀 NexTrustX — Compre Bitcoin com PIX Sem KYC",
    description: "💰 Plataforma #1 P2P do Brasil. Bitcoin, Ethereum, USDT via PIX instantâneo. Sem KYC!",
    images: ["https://nextrustx.org/og-image-1200x630.png"],
    site: "@nextrustx",
    creator: "@nextrustx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  other: {
    "msapplication-TileColor": "#86efac",
    "msapplication-config": "/browserconfig.xml"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#86efac" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NexTrustX" />
        <meta name="application-name" content="NexTrustX" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.binance.com" />
        <link rel="preconnect" href="https://s3.tradingview.com" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//stats.g.doubleclick.net" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <div className="animated-bg" />
        <div className="relative min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
