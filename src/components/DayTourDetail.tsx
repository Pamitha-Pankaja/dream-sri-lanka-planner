import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { dayTours } from '@/data/tours';
import { Clock, MapPin, Users, ArrowLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppButton from './WhatsAppButton';
import Navbar from './Navbar';
import Footer from './Footer';

const DayTourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const tour = dayTours.find(t => t.id === id);
  
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Tour not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={tour.heroImage}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/#day-tours')}
          className="absolute top-24 left-4 md:left-8 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToTours')}
        </Button>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-wide">
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
              {tour.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{tour.startsEnds}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{tour.tourType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif mb-4">{t('overview')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {tour.overview}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif mb-4">{t('tourHighlights')}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif mb-6">{t('itinerary')}</h2>
              <div className="space-y-6">
                {tour.itinerary.map((step, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-l-0 last:pb-0">
                    <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif mb-4">{t('gallery')}</h2>
              <div className="grid grid-cols-3 gap-3">
                {tour.galleryImages.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${tour.name} gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="card-premium p-6 bg-card">
                <h3 className="text-xl font-serif mb-4">{t('bookThisTour')}</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{tour.startsEnds}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{tour.tourType} Tour</span>
                  </div>
                </div>
                <WhatsAppButton
                  message={`Hi! I'm interested in the ${tour.name}. Can you tell me more about availability and pricing?`}
                  className="w-full justify-center"
                >
                  {t('inquireNow')}
                </WhatsAppButton>
              </div>

              {/* Inclusions */}
              <div className="card-premium p-6 bg-card">
                <h3 className="text-lg font-serif mb-4">{t('inclusions')}</h3>
                <ul className="space-y-2">
                  {tour.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="card-premium p-6 bg-card">
                <h3 className="text-lg font-serif mb-4">{t('exclusions')}</h3>
                <ul className="space-y-2">
                  {tour.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton floating />
    </div>
  );
};

export default DayTourDetail;
