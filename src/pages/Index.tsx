import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhySriLanka from '@/components/WhySriLanka';
import ToursSection from '@/components/ToursSection';
import DayToursSection from '@/components/DayToursSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
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
  );
};

export default Index;
