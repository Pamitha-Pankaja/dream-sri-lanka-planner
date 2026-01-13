import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tour } from '@/data/tours';
import { ArrowLeft, Calendar, MapPin, Check, Building2, Star } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import SriLankaMap from './SriLankaMap';

interface TourDetailProps {
  tour: Tour;
  onBack: () => void;
}

const TourDetail = ({ tour, onBack }: TourDetailProps) => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container-wide">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        {t('backToTours')}
      </button>

      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-12 h-[50vh] min-h-[400px]">
        <img
          src={tour.heroImage}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {tour.duration.days} {t('days')} / {tour.duration.nights} {t('nights')}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-foreground mb-4">
            {tour.name}
          </h1>
          
          <p className="text-primary-foreground/90 text-lg max-w-3xl">
            {tour.summary}
          </p>
        </div>
      </div>

      {/* Highlights & CTA */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 bg-muted rounded-2xl p-8">
          <h2 className="text-2xl font-serif mb-6">Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tour.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-elevated flex flex-col gap-4">
          <h3 className="text-xl font-serif mb-2">Ready to Book?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Contact us to customize this itinerary and get a personalized quote.
          </p>
          <button onClick={scrollToContact} className="btn-primary w-full">
            {t('inquireNow')}
          </button>
          <WhatsAppButton 
            message={`Hi! I'm interested in the ${tour.name} tour. Can you tell me more?`}
            className="w-full justify-center"
          >
            {t('chatWhatsApp')}
          </WhatsAppButton>
        </div>
      </div>

      {/* Places to Stay - Enhanced */}
      {tour.placesToStay && tour.placesToStay.length > 0 && (
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              {t('placesToStay')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif mt-2">Where You'll Stay</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tour.placesToStay.map((stay, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 group"
              >
                {/* Star Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-accent-foreground fill-current" />
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-accent font-bold uppercase tracking-wide mb-1">{stay.location}</p>
                    <h4 className="font-serif font-semibold text-foreground text-lg leading-tight mb-2">{stay.hotel}</h4>
                    <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
                      {stay.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Route Map */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-serif mb-8 text-center">{t('routeMap')}</h2>
        <div className="bg-muted rounded-2xl p-8">
          <SriLankaMap route={tour.route} />
        </div>
      </div>

      {/* Day-by-Day Itinerary */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-serif mb-8 text-center">{t('dayByDay')}</h2>

        <div className="space-y-6">
          {tour.itinerary.map((day, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:h-[280px]">
                {/* Image Section - Fixed width on desktop */}
                <div className="relative h-56 md:h-full md:w-2/5 flex-shrink-0 overflow-hidden">
                  <img
                    src={day.image}
                    alt={day.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                  {/* Day Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-lg">
                    <span className="text-[10px] uppercase font-medium leading-none">{t('day')}</span>
                    <span className="text-xl font-serif font-bold leading-none">{day.day}</span>
                  </div>

                  {/* Location on image - mobile */}
                  <div className="absolute bottom-4 left-4 md:hidden">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{day.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                  {/* Location - desktop */}
                  <div className="hidden md:flex items-center gap-2 text-primary mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{day.location}</span>
                  </div>

                  <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-medium mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {day.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{day.description}</p>

                  {/* Accommodation */}
                  {day.accommodation && (
                    <div className="flex items-center gap-2 mb-3 bg-secondary/50 px-3 py-2 rounded-lg w-fit">
                      <Building2 className="w-4 h-4 text-primary" />
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">{t('overnightAt')}</span>
                        <span className="text-sm font-semibold text-foreground">{day.accommodation}</span>
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {day.activities.slice(0, 4).map((activity, actIdx) => (
                      <span
                        key={actIdx}
                        className="px-2.5 py-1 bg-secondary/80 rounded-full text-xs font-medium text-secondary-foreground border border-border/50"
                      >
                        {activity}
                      </span>
                    ))}
                    {day.activities.length > 4 && (
                      <span className="px-2.5 py-1 text-xs font-medium text-primary">
                        +{day.activities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
        <h2 className="text-2xl sm:text-3xl font-serif mb-4">Ready to Experience {tour.name}?</h2>
        <p className="mb-8 opacity-90 max-w-2xl mx-auto">
          Let us help you plan the perfect Sri Lankan adventure. Every journey is customized to your preferences.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToContact} className="btn-secondary">
            {t('customizeTrip')}
          </button>
          <WhatsAppButton 
            message={`Hi! I want to book the ${tour.name} tour!`}
          >
            {t('chatWhatsApp')}
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
