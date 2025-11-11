import Link from 'next/link';
import { Bitcoin, CircleDollarSign, DollarSign, MessageCircle, Send, FileText, Shield } from 'lucide-react';

export function Footer() {
  const footerLinks = [
    {
      title: 'Serviços',
      links: [
        { href: '/comprar', label: 'Comprar Cripto' },
        { href: '/vender', label: 'Vender Cripto' },
        { href: '/privacidade', label: 'Privacidade e Segurança' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { href: '/contato', label: 'Contato' },
        { href: '/termos', label: 'Termos de Uso' },
        { href: '/politica', label: 'Política de Privacidade' },
      ],
    },
    {
      title: 'Contato Direto',
      links: [
        { href: 'https://wa.me/5516988142848', label: 'WhatsApp Suporte', external: true },
        { href: 'https://t.me/NexTrustX', label: 'Telegram Suporte', external: true },
        { href: 'mailto:suporte@nextrustx.com', label: 'Email Suporte', external: true },
      ],
    },
  ];

  return (
    <footer className="glass-strong border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <Bitcoin className="h-8 w-8 text-neon-green" />
                <CircleDollarSign className="h-8 w-8 text-neon-cyan" />
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <span className="text-2xl font-bold text-white">
                Nex<span className="text-neon-green">Trust</span><span className="text-neon-cyan">X</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Trust in the Decentralized Way.
            </p>
            <p className="text-gray-500 text-xs">
              Transações privadas. Zero burocracia. Confie no código, não em papéis.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-2"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 NexTrustX — Powered by Bridge360
          </div>
          <div className="flex space-x-4">
            <a
              href="https://wa.me/5516988142848"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-green transition-colors duration-200"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/NexTrustX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-cyan transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </a>
            <Link
              href="/termos"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FileText className="h-5 w-5" />
            </Link>
            <Link
              href="/privacidade"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Shield className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}