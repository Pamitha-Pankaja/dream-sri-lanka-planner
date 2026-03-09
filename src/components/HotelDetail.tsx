import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Hotel } from '@/lib/api';
import {
  ArrowLeft,
  Star,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Navigation,
  Clock,
  Bed,
  Camera,
  Wifi,
  Car,
  UtensilsCrossed,
  Waves,
  TreePine,
  Sparkles,
  Shield,
  Heart,
} from 'lucide-react';

interface HotelDetailProps {
  hotel: Hotel;
  onBack: () => void;
}

const featureIcons: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi className="w-4 h-4" />,
  'Pool': <Waves className="w-4 h-4" />,
  'Swimming': <Waves className="w-4 h-4" />,
  'Restaurant': <UtensilsCrossed className="w-4 h-4" />,
  'Parking': <Car className="w-4 h-4" />,
  'Spa': <Sparkles className="w-4 h-4" />,
  'Garden': <TreePine className="w-4 h-4" />,
  'Security': <Shield className="w-4 h-4" />,
  'Beach': <Waves className="w-4 h-4" />,
  'Wellness': <Heart className="w-4 h-4" />,
};

function getFeatureIcon(feature: string) {
  for (const [key, icon] of Object.entries(featureIcons)) {
    if (feature.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return <Check className="w-4 h-4" />;
}

const HotelDetail = ({ hotel, onBack }: HotelDetailProps) => {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allImages = [hotel.heroImage, ...(hotel.galleryImages || [])].filter(Boolean);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % allImages.length);
    }
  };
  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + allImages.length) % allImages.length);
    }
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* ===== HERO SECTION ===== */}
      <div className="relative w-[100vw] -ml-[50vw] left-1/2 h-[65vh] min-h-[500px] max-h-[750px] overflow-hidden -mt-16 md:-mt-24">
        {/* Hero Image */}
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover scale-105 transition-transform duration-[2s]"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Back Button - Floating */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-[60] inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-medium rounded-full border border-white/20 transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Itinerary</span>
        </button>

        {/* Gallery Button */}
        {allImages.length > 1 && (
          <button
            onClick={() => openLightbox(0)}
            className="absolute top-6 right-6 z-10 inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-medium rounded-full border border-white/20 transition-all duration-300"
          >
            <Camera className="w-4 h-4" />
            <span className="text-sm">View All Photos ({allImages.length})</span>
          </button>
        )}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 lg:p-16">
          <div className="max-w-7xl mx-auto">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {hotel.starRating && hotel.starRating > 0 && (
                <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              )}
              {hotel.category && (
                <span className="bg-primary/90 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                  {hotel.category}
                </span>
              )}
            </div>

            {/* Hotel Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 leading-[1.1] tracking-tight">
              {hotel.name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-lg font-medium tracking-wide">{hotel.location}, Sri Lanka</span>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 5 480 0 720 10C960 20 1200 45 1440 30V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== ABOUT & FEATURES SECTION ===== */}
        <section className="py-12 md:py-16">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Description - Left Side */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[3px] rounded-full bg-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">About This Hotel</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6 leading-snug">
                Welcome to {hotel.name}
              </h2>
              <div className="text-muted-foreground leading-[1.85] text-[15px] whitespace-pre-line space-y-4">
                {hotel.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                {hotel.starRating && (
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-2xl p-4 text-center border border-amber-200/50 dark:border-amber-800/30">
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: hotel.starRating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wider">Star Rating</span>
                  </div>
                )}
                {hotel.roomTypes && hotel.roomTypes.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 rounded-2xl p-4 text-center border border-blue-200/50 dark:border-blue-800/30">
                    <div className="text-2xl font-serif font-bold text-primary mb-1">{hotel.roomTypes.length}</div>
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">Room Types</span>
                  </div>
                )}
                {hotel.features && hotel.features.length > 0 && (
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 rounded-2xl p-4 text-center border border-emerald-200/50 dark:border-emerald-800/30">
                    <div className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400 mb-1">{hotel.features.length}+</div>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Amenities</span>
                  </div>
                )}
              </div>

              {/* TripAdvisor & Booking.com Ratings */}
              {(hotel.tripAdvisorRating || hotel.bookingComRating) && (
                <div className="flex flex-wrap gap-4 mt-8">
                  {/* TripAdvisor */}
                  {hotel.tripAdvisorRating && (
                    <div className="flex items-center gap-4 bg-white dark:bg-card rounded-2xl p-5 border border-border/50 flex-1 min-w-[250px]" style={{ boxShadow: 'var(--shadow-soft)' }}>
                      <div className="flex-shrink-0">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="20" cy="20" r="20" fill="#34E0A1"/>
                          <circle cx="13.5" cy="20" r="5.5" stroke="white" strokeWidth="1.5" fill="none"/>
                          <circle cx="26.5" cy="20" r="5.5" stroke="white" strokeWidth="1.5" fill="none"/>
                          <circle cx="13.5" cy="20" r="2.5" fill="white"/>
                          <circle cx="26.5" cy="20" r="2.5" fill="white"/>
                          <path d="M20 14L17 17H23L20 14Z" fill="white"/>
                          <path d="M8 17C8 17 10 13 13.5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M32 17C32 17 30 13 26.5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl font-bold text-foreground">{hotel.tripAdvisorRating}</span>
                          <span className="text-sm text-muted-foreground font-medium">/ 5</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-[#00aa6c] uppercase tracking-wider">Tripadvisor</span>
                          {hotel.tripAdvisorReviews && (
                            <span className="text-xs text-muted-foreground">({hotel.tripAdvisorReviews.toLocaleString()} reviews)</span>
                          )}
                        </div>
                        {/* Rating dots */}
                        <div className="flex gap-1 mt-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 rounded-full ${
                                i < Math.floor(hotel.tripAdvisorRating!)
                                  ? 'bg-[#00aa6c]'
                                  : i < hotel.tripAdvisorRating!
                                    ? 'bg-[#00aa6c]/50'
                                    : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Booking.com */}
                  {hotel.bookingComRating && (
                    <div className="flex items-center gap-4 bg-white dark:bg-card rounded-2xl p-5 border border-border/50 flex-1 min-w-[250px]" style={{ boxShadow: 'var(--shadow-soft)' }}>
                      <div className="flex-shrink-0">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="40" rx="8" fill="#003580"/>
                          <text x="7" y="28" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20">B.</text>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <div className="bg-[#003580] text-white text-lg font-bold px-2.5 py-0.5 rounded-tl-lg rounded-tr-lg rounded-br-lg">
                            {hotel.bookingComRating}
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">/ 10</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-[#003580] uppercase tracking-wider">Booking.com</span>
                          {hotel.bookingComReviews && (
                            <span className="text-xs text-muted-foreground">({hotel.bookingComReviews.toLocaleString()} reviews)</span>
                          )}
                        </div>
                        {/* Rating bar */}
                        <div className="mt-1.5 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden w-full max-w-[120px]">
                          <div
                            className="h-full bg-[#003580] rounded-full transition-all duration-500"
                            style={{ width: `${(hotel.bookingComRating / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Features - Right Side */}
            {hotel.features && hotel.features.length > 0 && (
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-muted/80 to-muted rounded-3xl p-7 lg:p-8 border border-border/50 sticky top-8">
                  <h3 className="text-xl font-serif font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    Features & Amenities
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {hotel.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-background/70 hover:bg-background transition-colors duration-200 border border-transparent hover:border-border/50 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center flex-shrink-0 transition-colors">
                          <span className="text-primary">{getFeatureIcon(feature)}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===== GALLERY SECTION ===== */}
        {allImages.length > 1 && (
          <section className="py-12 md:py-16">
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-[3px] rounded-full bg-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">Gallery</span>
                <div className="w-12 h-[3px] rounded-full bg-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                Explore {hotel.name}
              </h2>
            </div>

            {/* Masonry-like Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
              {allImages.map((img, idx) => {
                // Create visual variety with different spans
                const isLarge = idx === 0;
                const isTall = idx === 3 || idx === 6;
                const isWide = idx === 4;

                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                      isLarge ? 'col-span-2 row-span-2' : ''
                    } ${isTall ? 'row-span-2' : ''} ${isWide ? 'col-span-2' : ''}`}
                    onClick={() => openLightbox(idx)}
                  >
                    <img
                      src={img}
                      alt={`${hotel.name} - ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    {/* Image number badge */}
                    <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white/80 text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {idx + 1} / {allImages.length}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== ROOM TYPES SECTION ===== */}
        {hotel.roomTypes && hotel.roomTypes.length > 0 && (
          <section className="py-12 md:py-16">
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-[3px] rounded-full bg-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">Accommodation</span>
                <div className="w-12 h-[3px] rounded-full bg-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                Room Types
              </h2>
            </div>

            {/* Room Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {hotel.roomTypes.map((room, idx) => (
                <div
                  key={idx}
                  className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                  style={{ boxShadow: 'var(--shadow-soft)' }}
                >
                  {room.image && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Room number badge */}
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <span className="text-white font-serif font-bold text-sm">{idx + 1}</span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Bed className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-foreground">{room.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{room.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== DISTANCES SECTION ===== */}
        {hotel.distances && hotel.distances.length > 0 && (
          <section className="py-12 md:py-16 pb-20">
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-[3px] rounded-full bg-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">Location</span>
                <div className="w-12 h-[3px] rounded-full bg-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                Distances & Directions
              </h2>
            </div>

            {/* Distance Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotel.distances.map((dist, idx) => (
                <div
                  key={idx}
                  className="group bg-card rounded-2xl p-5 border border-border/50 hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300"
                  style={{ boxShadow: 'var(--shadow-soft)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                      <Navigation className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-[15px] mb-2 truncate">{dist.place}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {dist.distance}
                        </span>
                        <div className="flex items-center gap-1.5 text-primary">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-sm font-semibold">{dist.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Embed if coordinates available */}
            {hotel.mapCoordinates && (
              <div className="mt-8 rounded-3xl overflow-hidden border border-border/50" style={{ boxShadow: 'var(--shadow-soft)' }}>
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${hotel.mapCoordinates.lat},${hotel.mapCoordinates.lng}&zoom=14&maptype=roadmap`}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${hotel.name} location`}
                />
              </div>
            )}
          </section>
        )}
      </div>

      {/* ===== LIGHTBOX ===== */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center border border-white/10 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center border border-white/10 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <img
            src={allImages[selectedImageIndex]}
            alt={`${hotel.name} gallery`}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center border border-white/10 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium border border-white/10">
              {selectedImageIndex + 1} / {allImages.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 2 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[80vw] overflow-x-auto px-4 py-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx); }}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === selectedImageIndex
                      ? 'border-white scale-110 opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HotelDetail;
