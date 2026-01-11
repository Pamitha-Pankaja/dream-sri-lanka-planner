import React from 'react';
import { Compass } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showIcon?: boolean;
}

const Logo = ({ className = '', variant = 'dark', showIcon = true }: LogoProps) => {
  const textColor = variant === 'light' ? 'text-primary-foreground' : 'text-foreground';
  const iconBg = variant === 'light' ? 'bg-white/20' : 'bg-primary/10';
  const iconColor = variant === 'light' ? 'text-white' : 'text-primary';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center`}>
          <Compass className={`w-5 h-5 ${iconColor}`} />
        </div>
      )}
      <div className="flex flex-col">
        <span className={`text-lg md:text-xl font-serif font-bold tracking-tight leading-tight ${textColor}`}>
          Ceylon Round
        </span>
        <span className={`text-xs font-medium uppercase tracking-widest ${variant === 'light' ? 'text-white/80' : 'text-primary'}`}>
          Tours
        </span>
      </div>
    </div>
  );
};

export default Logo;
