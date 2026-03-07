import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, Mail } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

const Footer = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <Logo variant="light" className="mb-2" />
            <p className="text-primary-foreground/70 text-sm italic">
              {t('footerTagline')}
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-center">
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">WhatsApp</span>
            </a>
            <a
              href="mailto:info@anvillankatravels.com"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">info@anvillankatravels.com</span>
            </a>
          </div>

          {/* Language & Copyright */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-end">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Anvil Lanka Travels. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
