import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/hooks/useLocations';
import {
  Clock,
  MapPin,
  ArrowLeft,
  Loader2,
  Calendar,
  Ticket,
  Shirt,
  Lightbulb,
  Navigation,
  Accessibility,
  Building,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppButton from './WhatsAppButton';
import Navbar from './Navbar';
import Footer from './Footer';

const categoryLabels: Record<string, { label: string; color: string }> = {
  cultural: { label: 'Cultural Site', color: 'bg-purple-100 text-purple-800' },
  natural: { label: 'Natural Wonder', color: 'bg-green-100 text-green-800' },
  beach: { label: 'Beach Destination', color: 'bg-blue-100 text-blue-800' },
  wildlife: { label: 'Wildlife Sanctuary', color: 'bg-amber-100 text-amber-800' },
  adventure: { label: 'Adventure Spot', color: 'bg-red-100 text-red-800' },
  historical: { label: 'Historical Site', color: 'bg-stone-100 text-stone-800' },
  religious: { label: 'Religious Site', color: 'bg-indigo-100 text-indigo-800' },
};

const LocationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: location, isLoading } = useLocation(slug);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Location not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const categoryInfo = categoryLabels[location.category] || { label: 'Destination', color: 'bg-gray-100 text-gray-800' };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={location.heroImage}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-8 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color}`}>
                {categoryInfo.label}
              </span>
              {location.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full text-xs bg-white/20 text-white">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
              {location.name}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl">
              {location.briefDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif mb-4">About This Place</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {location.description}
              </p>
            </section>

            {/* Opening Hours */}
            {location.openingHours && location.openingHours.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  Opening Hours
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {location.openingHours.map((hours) => (
                    <div
                      key={hours.day}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <span className="font-medium">{hours.day}</span>
                      <span className={hours.isClosed ? 'text-red-500' : 'text-muted-foreground'}>
                        {hours.isClosed
                          ? 'Closed'
                          : `${formatTime(hours.openTime)} - ${formatTime(hours.closeTime)}`}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Dress Code */}
            {location.dressCode && (
              <section>
                <h2 className="text-2xl md:text-3xl font-serif mb-4 flex items-center gap-3">
                  <Shirt className="w-6 h-6 text-primary" />
                  Dress Code
                </h2>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-amber-900 dark:text-amber-100 whitespace-pre-line">
                    {location.dressCode}
                  </p>
                </div>
              </section>
            )}

            {/* Nearby Attractions */}
            {location.attractions && location.attractions.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3">
                  <Navigation className="w-6 h-6 text-primary" />
                  Nearby Attractions
                </h2>
                <div className="grid gap-4">
                  {location.attractions.map((attraction, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
                    >
                      {attraction.image && (
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium mb-1">{attraction.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                          {attraction.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          {attraction.distance && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {attraction.distance}
                            </span>
                          )}
                          {attraction.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {attraction.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 self-center" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Travel Tips */}
            {location.tips && location.tips.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  Travel Tips
                </h2>
                <div className="space-y-3">
                  {location.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {location.galleryImages && location.galleryImages.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-serif mb-4 flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  Photo Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {location.galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${location.name} gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info Card */}
              <div className="card-premium p-6 bg-card">
                <h3 className="text-xl font-serif mb-4">Quick Information</h3>
                <div className="space-y-4">
                  {location.averageVisitDuration && (
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <span className="text-muted-foreground">Visit Duration</span>
                        <p className="font-medium">{location.averageVisitDuration}</p>
                      </div>
                    </div>
                  )}
                  {location.bestTimeToVisit && (
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <span className="text-muted-foreground">Best Time</span>
                        <p className="font-medium">{location.bestTimeToVisit}</p>
                      </div>
                    </div>
                  )}
                  {location.mapCoordinates && (
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <span className="text-muted-foreground">Location</span>
                        <p className="font-medium">
                          {location.mapCoordinates.lat.toFixed(4)}°N, {location.mapCoordinates.lng.toFixed(4)}°E
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Entrance Fees */}
              {location.entranceFee && (location.entranceFee.local || location.entranceFee.foreign) && (
                <div className="card-premium p-6 bg-card">
                  <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    Entrance Fees
                  </h3>
                  <div className="space-y-3">
                    {location.entranceFee.foreign && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Foreign Visitors</span>
                        <span className="font-semibold text-primary">{location.entranceFee.foreign}</span>
                      </div>
                    )}
                    {location.entranceFee.local && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Local Visitors</span>
                        <span className="font-medium">{location.entranceFee.local}</span>
                      </div>
                    )}
                    {location.entranceFee.children && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Children</span>
                        <span className="font-medium">{location.entranceFee.children}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Facilities */}
              {location.facilities && location.facilities.length > 0 && (
                <div className="card-premium p-6 bg-card">
                  <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Facilities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {location.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-muted rounded-full text-sm"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessibility */}
              {location.accessibility && (
                <div className="card-premium p-6 bg-card">
                  <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
                    <Accessibility className="w-5 h-5 text-primary" />
                    Accessibility
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {location.accessibility}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="card-premium p-6 bg-primary/5 border-primary/20">
                <h3 className="text-lg font-serif mb-3">Plan Your Visit</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Want to include {location.name} in your Sri Lanka tour? Contact us for a customized itinerary.
                </p>
                <WhatsAppButton
                  message={`Hi! I'm interested in visiting ${location.name}. Can you help me plan a tour that includes this destination?`}
                  className="w-full justify-center"
                >
                  Plan My Trip
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
      <WhatsAppButton floating />
    </div>
  );
};

export default LocationDetail;
