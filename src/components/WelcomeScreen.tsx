import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import sigiriyaImage from '@/assets/sigiriya-fortress.jpg';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const { t } = useLanguage();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[pulse_8s_ease-in-out_infinite]"
        style={{ backgroundImage: `url(${sigiriyaImage})` }}
      />
      
      {/* Elegant Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
        {/* Welcome Text */}
        <p className="text-4xl md:text-6xl lg:text-7xl text-white/90 font-serif mb-6 animate-fade-up tracking-wide">
          {t('welcome')}
        </p>
        
        {/* Company Name */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold text-white drop-shadow-2xl tracking-tight">
          Ceylon Round Tours
        </h1>
        
        {/* Subtle tagline */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-white/50" />
          <span className="text-white/70 text-lg md:text-xl font-light tracking-widest uppercase">
            Sri Lanka
          </span>
          <span className="w-12 h-px bg-white/50" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
