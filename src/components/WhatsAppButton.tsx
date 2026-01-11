import React from 'react';
import { MessageCircle } from 'lucide-react';

const DEFAULT_WHATSAPP_NUMBER = '94777077325';
const DEFAULT_MESSAGE = 'Hello! I\'m interested in planning a trip to Sri Lanka.';

interface WhatsAppButtonProps {
  floating?: boolean;
  message?: string;
  phoneNumber?: string;
  children?: React.ReactNode;
  className?: string;
}

const WhatsAppButton = ({ 
  floating = false, 
  message = DEFAULT_MESSAGE, 
  phoneNumber = DEFAULT_WHATSAPP_NUMBER,
  children, 
  className = '' 
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (floating) {
    return (
      <button
        onClick={handleClick}
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground fill-current" />
      </button>
    );
  }

  return (
    <button onClick={handleClick} className={`btn-whatsapp ${className}`}>
      <MessageCircle className="w-5 h-5" />
      {children}
    </button>
  );
};

export default WhatsAppButton;
