import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tour } from '@/data/tours';
import { ArrowLeft, Calendar, MapPin, Check, Building2 } from 'lucide-react';
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

      {/* Places to Stay */}
      {tour.placesToStay && tour.placesToStay.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif mb-8 text-center">{t('placesToStay')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tour.placesToStay.map((stay, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-5 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1">{stay.location}</p>
                    <h4 className="font-medium text-foreground mb-1">{stay.hotel}</h4>
                    <p className="text-xs text-muted-foreground">{stay.type}</p>
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
        
        <div className="space-y-8">
          {tour.itinerary.map((day, idx) => (
            <div
              key={idx}
              className="grid md:grid-cols-5 gap-6 bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              {/* Image */}
              <div className="md:col-span-2 h-64 md:h-auto">
                <img
                  src={day.image}
                  alt={day.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-lg font-medium">
                    {day.day}
                  </span>
                  <div>
                    <span className="text-sm text-muted-foreground">{t('day')} {day.day}</span>
                    <h3 className="text-xl font-serif font-medium">{day.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{day.location}</span>
                </div>

                <p className="text-muted-foreground mb-4">{day.description}</p>

                {/* Accommodation */}
                {day.accommodation && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 bg-secondary/50 px-3 py-2 rounded-lg w-fit">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>{t('overnightAt')} <strong className="text-foreground">{day.accommodation}</strong></span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {day.activities.map((activity, actIdx) => (
                    <span
                      key={actIdx}
                      className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground"
                    >
                      {activity}
                    </span>
                  ))}
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
