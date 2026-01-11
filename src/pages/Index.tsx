import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhySriLanka from '@/components/WhySriLanka';
import ToursSection from '@/components/ToursSection';
import DayToursSection from '@/components/DayToursSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import WelcomeScreen from '@/components/WelcomeScreen';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { languageChanged, resetLanguageChanged } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // Check if user has seen welcome before in this session
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  // Handle hash navigation (e.g., coming from day tour page with /#section)
  useEffect(() => {
    if (location.hash && !showWelcome) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash, showWelcome]);

  // Show welcome screen again when language changes
  useEffect(() => {
    if (languageChanged) {
      setShowWelcome(true);
    }
  }, [languageChanged]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem('hasSeenWelcome', 'true');
    resetLanguageChanged();
  };

  return (
    <>
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      
      <div className={`min-h-screen ${showWelcome ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <WhySriLanka />
        <ToursSection />
        <DayToursSection />
        <ExperiencesSection />
        <ReviewsSection />
        <ContactSection />
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <WhatsAppButton floating />
      </div>
    </>
  );
};

export default Index;
