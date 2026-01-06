import React from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '94771234567'; // Replace with actual number
const DEFAULT_MESSAGE = 'Hello! I\'m interested in planning a trip to Sri Lanka.';

interface WhatsAppButtonProps {
  floating?: boolean;
  message?: string;
  children?: React.ReactNode;
  className?: string;
}

const WhatsAppButton = ({ floating = false, message = DEFAULT_MESSAGE, children, className = '' }: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
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
