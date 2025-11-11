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
  title: "NexTrustX — Plataforma P2P Crypto sem KYC",
  description: "Compre ou venda cripto via PIX — sem KYC, sem demora. BTC, ETH, USDT (TRC20) com cotação em tempo real e pagamento instantâneo.",
  keywords: ["NexTrustX", "P2P", "Crypto", "Bitcoin", "Ethereum", "USDT", "PIX", "sem KYC", "Brasil"],
  authors: [{ name: "NexTrustX Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "NexTrustX — Plataforma P2P Crypto sem KYC",
    description: "Compre ou venda cripto via PIX — sem KYC, sem demora. BTC, ETH, USDT (TRC20) com cotação em tempo real e pagamento instantâneo.",
    url: "https://nextrustx.com",
    siteName: "NexTrustX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexTrustX — Plataforma P2P Crypto sem KYC",
    description: "Compre ou venda cripto via PIX — sem KYC, sem demora.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
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
