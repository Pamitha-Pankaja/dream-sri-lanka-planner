import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Compass } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const { t } = useLanguage();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 2 seconds
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
      className={`fixed inset-0 z-[100] bg-gradient-to-br from-ocean-deep via-ocean to-jungle flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-white animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border border-white/50 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full border border-white/30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto animate-fade-up">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
          <Compass className="w-12 h-12 text-white" />
        </div>
        
        {/* Company Name */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
          Ceylon Round Tours
        </h1>
        
        {/* Welcome Text */}
        <p className="text-xl md:text-2xl text-white/80">
          {t('welcome')}
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
