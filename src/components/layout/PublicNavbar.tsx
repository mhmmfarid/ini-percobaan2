import React, { useState, useEffect } from 'react';
import { ExternalLink, Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

export const PublicNavbar: React.FC = () => {
  const { setCurrentView, setAuthModalOpen, setAuthMode } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang', href: '#tentang' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Unit Magang', href: '#unit' },
    { label: 'Alur Seleksi', href: '#alur' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleOpenPortal = (mode: 'login' | 'register') => {
    // Open application portal in new view
    setAuthMode(mode);
    setCurrentView(mode === 'register' ? 'pendaftaran' : 'beranda');
  };

  return (
    <nav
      className={`fixed top-8 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-800'
          : 'bg-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D5FA8] to-[#0B2A4A] p-2 flex items-center justify-center text-white shadow-md border border-white/20">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="font-extrabold text-base sm:text-lg font-heading leading-tight tracking-tight">
              BPS KOTA DEPOK
            </div>
            <div className={`text-[10px] tracking-wider uppercase font-semibold ${isScrolled ? 'text-[#1D5FA8]' : 'text-blue-200'}`}>
              Sistem Informasi Magang
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors hover:text-[#D9692B] ${
                isScrolled ? 'text-slate-600' : 'text-slate-200'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setCurrentView('verifikasi-sertifikat')}
            className={`transition-colors hover:text-[#D9692B] ${
              isScrolled ? 'text-slate-600' : 'text-slate-200'
            }`}
          >
            Verifikasi Sertifikat
          </button>
        </div>

        {/* CTA Buttons - opens portal */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant={isScrolled ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => handleOpenPortal('login')}
            className={!isScrolled ? 'text-white border-white/30 hover:bg-white/10' : ''}
          >
            Masuk Portal
          </Button>

          <Button
            variant="accent"
            size="sm"
            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            onClick={() => handleOpenPortal('register')}
          >
            Daftar Sekarang
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="accent"
            size="sm"
            onClick={() => handleOpenPortal('register')}
          >
            Daftar
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 text-white px-4 pt-3 pb-5 space-y-3 mt-2 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1.5 text-slate-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setCurrentView('verifikasi-sertifikat');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-sm font-medium py-1.5 text-slate-300 hover:text-white"
          >
            Verifikasi Sertifikat
          </button>
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-1/2 text-white bg-slate-800 border-slate-700"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenPortal('login');
              }}
            >
              Masuk
            </Button>
            <Button
              variant="accent"
              size="sm"
              className="w-1/2"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenPortal('register');
              }}
            >
              Daftar Portal
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
