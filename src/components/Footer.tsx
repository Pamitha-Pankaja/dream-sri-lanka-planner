import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, Mail, Phone, Send, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import tripadvisorBadges from '@/assets/tripadvisor-badges.png';

const WHATSAPP_NUMBER = '94777077325';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sriLankaTime = currentTime.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Colombo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const sriLankaDate = currentTime.toLocaleDateString('en-US', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'd like to receive travel inspirations. My email: ${email}`)}`, '_blank');
      setEmail('');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const siteLinks = [
    { label: t('aboutUs'), action: () => scrollToSection('about') },
    { label: t('tours'), action: () => scrollToSection('tours') },
    { label: t('reviews'), action: () => scrollToSection('reviews') },
    { label: t('contact'), action: () => scrollToSection('contact') },
  ];

  const dayTourLinks = [
    'Private Day Tour in Colombo',
    'Private Day Tour to Kandy',
    'Private Day Tour to Galle',
    'Private Day Tour to Yala',
    'Private Day Tour to Sigiriya',
    'Private White Water Rafting',
  ];

  const tourLinks = [
    'Luxury Classic Sri Lanka',
    'Luxury Wild Holidays',
    'Luxury Honeymoon',
    'Discover Luxury Secret',
    'Tea Plantations & Coastal',
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Top Section: Logo + Newsletter + Social */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Logo variant="light" size="lg" />
              <p className="text-primary-foreground/60 text-sm italic">
                Inspire to Explore
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-lg font-serif mb-3">Receive Travel Inspirations</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-2.5 rounded-l-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-primary-foreground/40"
                />
                <button type="submit" className="px-4 py-2.5 bg-primary rounded-r-lg hover:bg-primary/90 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-b border-primary-foreground/10 bg-primary-foreground/5">
        <div className="container-wide px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">(+94) 777 077 325</span>
            </a>
            <a href="tel:+94777077325"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">(+94) 777 077 325</span>
            </a>
            <a href="mailto:info@anvillankatravels.com"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Mail className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium">info@anvillankatravels.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center">
            <img
              src={tripadvisorBadges}
              alt="TripAdvisor Awards"
              className="max-h-16 md:max-h-20 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Explore The Site */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/90">
                Explore The Site
              </h4>
              <ul className="space-y-2.5">
                {siteLinks.map((link) => (
                  <li key={link.label}>
                    <button onClick={link.action}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors hover:underline underline-offset-2">
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <LanguageSwitcher />
                </li>
              </ul>
            </div>

            {/* Day Tours */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/90">
                Day Tours
              </h4>
              <ul className="space-y-2.5">
                {dayTourLinks.map((tour) => (
                  <li key={tour}>
                    <button onClick={() => scrollToSection('day-tours')}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors hover:underline underline-offset-2 text-left">
                      {tour}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tour Packages */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/90">
                Tour Packages
              </h4>
              <ul className="space-y-2.5">
                {tourLinks.map((tour) => (
                  <li key={tour}>
                    <button onClick={() => scrollToSection('tours')}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors hover:underline underline-offset-2 text-left">
                      {tour}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary-foreground/90">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary-foreground/40 shrink-0" />
                  <span className="text-sm text-primary-foreground/60">
                    Sri Lanka
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 text-primary-foreground/40 shrink-0" />
                  <span className="text-sm text-primary-foreground/60">+94 777 077 325</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 text-primary-foreground/40 shrink-0" />
                  <span className="text-sm text-primary-foreground/60">info@anvillankatravels.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 mt-0.5 text-primary-foreground/40 shrink-0" />
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Time + Copyright */}
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-primary-foreground/50">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">
              {sriLankaTime}
            </span>
            <span className="text-primary-foreground/30">|</span>
            <span className="text-sm">
              {sriLankaDate}
            </span>
            <span className="text-xs text-primary-foreground/30 ml-1">(Sri Lanka)</span>
          </div>
          <p className="text-primary-foreground/40 text-sm">
            © Copyright {currentYear}. Anvil Lanka Travels. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
