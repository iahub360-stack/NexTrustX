'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Bitcoin, CircleDollarSign, DollarSign } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/comprar', label: 'Comprar Cripto' },
    { href: '/vender', label: 'Vender Cripto' },
    { href: '/privacidade', label: 'Privacidade' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <nav className="glass-strong sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Bitcoin className="h-8 w-8 text-neon-green" />
                <CircleDollarSign className="h-8 w-8 text-neon-cyan" />
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <span className="text-2xl font-bold text-white">
                Nex<span className="text-neon-green">Trust</span><span className="text-neon-cyan">X</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="btn-neon bg-neon-green text-black hover:bg-green-400 font-semibold">
              Começar
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-strong">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button className="btn-neon bg-neon-green text-black hover:bg-green-400 font-semibold w-full">
                Começar
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}