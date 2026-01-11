import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Compass } from 'lucide-react';
import sigiriyaImage from '@/assets/sigiriya-fortress.jpg';

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
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sigiriyaImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-white animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border border-white/50 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full border border-white/30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
        {/* Logo */}
        <div className="w-28 h-28 md:w-36 md:h-36 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-8">
          <Compass className="w-14 h-14 md:w-20 md:h-20 text-white" />
        </div>
        
        {/* Welcome Text */}
        <p className="text-3xl md:text-5xl lg:text-6xl text-white/90 font-serif mb-4 animate-fade-up">
          {t('welcome')}
        </p>
        
        {/* Company Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white drop-shadow-2xl">
          Ceylon Round Tours
        </h1>
      </div>
    </div>
  );
};

export default WelcomeScreen;
