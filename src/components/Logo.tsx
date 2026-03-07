import React from 'react';
import logoImage from '@/assets/Logo/Logo.png';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', variant = 'dark', size = 'md' }: LogoProps) => {
  const textColor = variant === 'light' ? 'text-primary-foreground' : 'text-foreground';
  
  // Size configurations for the logo
  const sizeClasses = {
    sm: 'w-8 h-8 md:w-10 md:h-10',
    md: 'w-10 h-10 md:w-12 md:h-12',
    lg: 'w-16 h-16 md:w-20 md:h-20',
  };

  const textSizeClasses = {
    sm: 'text-base md:text-lg',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl md:text-3xl',
  };

  const subtextSizeClasses = {
    sm: 'text-[0.6rem]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <img 
        src={logoImage} 
        alt="Anvil Lanka Travels Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      <div className="flex flex-col">
        <span className={`${textSizeClasses[size]} font-serif font-bold tracking-tight leading-tight ${textColor}`}>
          Anvil Lanka
        </span>
        <span className={`${subtextSizeClasses[size]} font-medium uppercase tracking-widest ${variant === 'light' ? 'text-white/80' : 'text-primary'}`}>
          Travels
        </span>
      </div>
    </div>
  );
};

export default Logo;
