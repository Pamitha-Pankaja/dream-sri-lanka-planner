import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import HeroSection from '@/components/HeroSection';
import WhySriLanka from '@/components/WhySriLanka';
import ToursSection from '@/components/ToursSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <HeroSection />
        <WhySriLanka />
        <ToursSection />
        <ExperiencesSection />
        <ReviewsSection />
        <ContactSection />
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <WhatsAppButton floating />
      </div>
    </LanguageProvider>
  );
};

export default Index;
