import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { languages, Language } from '@/lib/translations';
import { Globe, Compass } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [phase, setPhase] = useState<'welcome' | 'selecting' | 'transitioning' | 'final'>('welcome');
  const [selectedLang, setSelectedLang] = useState<Language>(language);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLang(lang);
    setLanguage(lang);
    setPhase('transitioning');
    
    setTimeout(() => {
      setPhase('final');
    }, 300);
  };

  const handleEnterSite = () => {
    setPhase('transitioning');
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-gradient-to-br from-ocean-deep via-ocean to-jungle flex items-center justify-center transition-opacity duration-700 ${
        phase === 'transitioning' && selectedLang !== language ? '' : ''
      } ${phase === 'transitioning' ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-white animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border border-white/50 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full border border-white/30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-fade-up">
          <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
            Ceylon Round Tours
          </h1>
          <p className="text-white/80 text-lg">
            {t('welcomeTagline')}
          </p>
        </div>

        {/* Welcome Message */}
        <div className="mb-10 animate-fade-up delay-200">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
            {t('welcomeMessage')}
          </h2>
          <p className="text-white/70">
            {t('selectLanguage')}
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 animate-fade-up delay-300">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                selectedLang === lang.code
                  ? 'bg-white text-foreground border-white shadow-lg scale-105'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40'
              }`}
            >
              <span className="text-2xl block mb-1">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>

        {/* Enter Button */}
        <div className="animate-fade-up delay-400">
          <button
            onClick={handleEnterSite}
            className="px-10 py-4 bg-white text-ocean-deep rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            {t('enterSite')}
          </button>
          <p className="text-white/50 text-sm mt-4 cursor-pointer hover:text-white/70" onClick={handleSkip}>
            {t('skipIntro')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
