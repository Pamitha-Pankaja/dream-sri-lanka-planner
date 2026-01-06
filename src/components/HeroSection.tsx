import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppButton from './WhatsAppButton';
import heroElephants from '@/assets/hero-elephants.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroElephants}
          alt="Sri Lankan elephants at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium mb-4 animate-fade-up leading-tight">
          {t('heroTitle')}
          <span className="block text-sunset-light">{t('heroSubtitle')}</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 mb-10 max-w-2xl mx-auto animate-fade-up delay-200">
          {t('heroDescription')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
          <button 
            onClick={() => scrollToSection('tours')}
            className="btn-primary"
          >
            {t('planTrip')}
          </button>
          <WhatsAppButton message="Hello! I'd like to plan a trip to Sri Lanka.">
            {t('chatWhatsApp')}
          </WhatsAppButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/70 rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
