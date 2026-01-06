import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'why-sri-lanka', label: t('whySriLanka') },
    { id: 'tours', label: t('tours') },
    { id: 'day-tours', label: t('dayTours') },
    { id: 'experiences', label: t('experiences') },
    { id: 'reviews', label: t('reviews') },
    { id: 'contact', label: t('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className={`text-xl md:text-2xl font-serif font-bold tracking-tight transition-colors ${
            isScrolled ? 'text-foreground' : 'text-primary-foreground'
          }`}
        >
          Visit Sri Lanka
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/80 hover:text-primary-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className={isScrolled ? '' : 'text-primary-foreground'}>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-elevated border-t border-border animate-fade-in">
          <div className="container-wide py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
