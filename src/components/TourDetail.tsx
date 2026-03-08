import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tour, Hotel, api } from '@/lib/api';
import { ArrowLeft, Calendar, MapPin, Check, Building2, ArrowUp, ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import TourMap from './TourMap';
import HotelDetail from './HotelDetail';

interface TourDetailProps {
  tour: Tour;
  onBack: () => void;
}

const TourDetail = ({ tour, onBack }: TourDetailProps) => {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [hotelCache, setHotelCache] = useState<Record<string, Hotel>>({});
  const [loadingHotel, setLoadingHotel] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Track scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extract location images from itinerary
  const getLocationImages = () => {
    const locationImages: Record<string, string> = {};
    tour.itinerary.forEach((day) => {
      if (day.location && day.image) {
        locationImages[day.location] = day.image;
      }
    });
    return locationImages;
  };

  const locationImages = getLocationImages();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHotelClick = async (hotelId: string) => {
    const scrollToHotel = () => {
      document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
    };
    if (hotelCache[hotelId]) {
      setSelectedHotel(hotelCache[hotelId]);
      setTimeout(scrollToHotel, 50);
      return;
    }
    setLoadingHotel(hotelId);
    try {
      const hotel = await api.getHotel(hotelId);
      setHotelCache((prev) => ({ ...prev, [hotelId]: hotel }));
      setSelectedHotel(hotel);
      setTimeout(scrollToHotel, 50);
    } catch (error) {
      console.error('Failed to load hotel:', error);
    } finally {
      setLoadingHotel(null);
    }
  };

  // If viewing a hotel detail, show it
  if (selectedHotel) {
    return (
      <HotelDetail
        hotel={selectedHotel}
        onBack={() => setSelectedHotel(null)}
      />
    );
  }

  return (
    <div className="container-wide">
      {/* Enhanced Back Button - More Visible */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg border-2 border-primary/30 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>{t('backToTours')}</span>
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

      {/* Route Map */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-serif mb-8 text-center">{t('routeMap')}</h2>
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
          <TourMap route={tour.route} locationImages={locationImages} />
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

                  {/* Accommodation / Hotel */}
                  {(day.accommodation || day.hotelId) && (
                    <div
                      className={`flex items-center gap-2 mb-3 bg-secondary/50 px-3 py-2 rounded-lg w-fit ${
                        day.hotelId ? 'cursor-pointer hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all group/hotel' : ''
                      }`}
                      onClick={() => day.hotelId && handleHotelClick(day.hotelId)}
                    >
                      <Building2 className={`w-4 h-4 ${day.hotelId ? 'text-primary' : 'text-primary'}`} />
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">{t('overnightAt')}</span>
                        <span className={`text-sm font-semibold ${day.hotelId ? 'text-primary group-hover/hotel:underline' : 'text-foreground'}`}>
                          {loadingHotel === day.hotelId ? 'Loading...' : day.accommodation}
                        </span>
                      </div>
                      {day.hotelId && (
                        <ChevronRight className="w-4 h-4 text-primary/60 group-hover/hotel:translate-x-0.5 transition-transform" />
                      )}
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

      {/* FAQs */}
      {tour.faqs && tour.faqs.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif text-center">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {tour.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl shadow-soft overflow-hidden border border-border/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                >
                  <span className="font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === idx ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <div className="border-t border-border/50 pt-4">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Scroll to Top Button - Positioned above WhatsApp button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-[60] p-3.5 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 animate-fade-in group"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default TourDetail;
