import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import TailorMadeModal from './TailorMadeModal';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  hidden?: boolean;
  forceScrolled?: boolean;
}

const Navbar = ({ hidden, forceScrolled }: NavbarProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const isScrolled = forceScrolled || scrolled;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTailorMadeOpen, setIsTailorMadeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sectionIds = ['hero', 'about', 'tours', 'day-tours', 'memories', 'reviews', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that is intersecting
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and get the most visible one
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          const id = mostVisible.target.getAttribute('id');
          if (id) setActiveSection(id);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], rootMargin: '-80px 0px -20% 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    // If we're not on the home page, navigate there first with the hash
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      // On home page, just scroll to the section
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'about', label: t('aboutUs') },
    { id: 'tours', label: t('tours') },
    { id: 'day-tours', label: t('dayTours') },
    { id: 'memories', label: t('memories') },
    { id: 'reviews', label: t('reviews') },
    { id: 'contact', label: t('contact') },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hidden
            ? '-translate-y-full opacity-0 pointer-events-none'
            : isScrolled
              ? 'bg-background/95 backdrop-blur-md shadow-soft py-3'
              : 'bg-transparent py-5'
        }`}
      >
        <div className="container-wide flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button onClick={() => scrollToSection('hero')}>
            <Logo variant={isScrolled ? 'dark' : 'light'} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.id
                    ? isScrolled ? 'text-primary' : 'text-primary-foreground'
                    : isScrolled
                      ? 'text-muted-foreground hover:text-primary'
                      : 'text-primary-foreground/80 hover:text-primary-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ease-out ${
                    activeSection === link.id
                      ? isScrolled ? 'w-full bg-primary' : 'w-full bg-primary-foreground'
                      : 'w-0 bg-transparent'
                  }`}
                />
              </button>
            ))}
            
            {/* Tailor Made Button - Highlighted */}
            <button
              onClick={() => setIsTailorMadeOpen(true)}
              className="relative px-5 py-2.5 bg-accent text-accent-foreground rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg animate-pulse-soft"
            >
              <Sparkles className="w-4 h-4" />
              {t('tailorMade')}
            </button>
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className={isScrolled ? '' : 'text-primary-foreground'}>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl border-t border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="container-wide py-4 space-y-2 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                    activeSection === link.id
                      ? 'bg-primary/10 text-primary border-l-2 border-primary'
                      : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              {/* Tailor Made Button - Mobile */}
              <button
                onClick={() => {
                  setIsTailorMadeOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 bg-accent text-accent-foreground rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {t('tailorMade')}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Tailor Made Modal */}
      <TailorMadeModal open={isTailorMadeOpen} onOpenChange={setIsTailorMadeOpen} />
    </>
  );
};

export default Navbar;
