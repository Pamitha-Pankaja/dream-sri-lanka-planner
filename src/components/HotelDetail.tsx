import React, { useState } from 'react';
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
} from 'lucide-react';

interface HotelDetailProps {
  hotel: Hotel;
  onBack: () => void;
}

const HotelDetail = ({ hotel, onBack }: HotelDetailProps) => {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  return (
    <div className="container-wide">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg border-2 border-primary/30 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Itinerary</span>
      </button>

      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-12 h-[50vh] min-h-[400px]">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            {hotel.starRating && hotel.starRating > 0 && (
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {Array.from({ length: hotel.starRating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            )}
            {hotel.category && (
              <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                {hotel.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-3">
            {hotel.name}
          </h1>

          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{hotel.location}</span>
          </div>
        </div>
      </div>

      {/* Description & Features */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-serif mb-4">About This Hotel</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {hotel.description}
          </p>
        </div>

        {hotel.features && hotel.features.length > 0 && (
          <div className="bg-muted rounded-2xl p-6">
            <h3 className="text-lg font-serif mb-4">Features & Amenities</h3>
            <div className="space-y-3">
              {hotel.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gallery */}
      {hotel.galleryImages && hotel.galleryImages.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-serif mb-6 text-center">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img}
                  alt={`${hotel.name} - ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Room Types */}
      {hotel.roomTypes && hotel.roomTypes.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-serif mb-6 text-center">Room Types</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.roomTypes.map((room, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
              >
                {room.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-serif font-medium">{room.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Distances */}
      {hotel.distances && hotel.distances.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-serif mb-6 text-center">Distances & Directions</h2>
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
            <div className="divide-y divide-border">
              {hotel.distances.map((dist, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{dist.place}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground font-medium">{dist.distance}</span>
                    <div className="flex items-center gap-1 text-primary">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{dist.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white/80 hover:text-white p-2"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={allImages[selectedImageIndex]}
            alt={`${hotel.name} gallery`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white/80 hover:text-white p-2"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {selectedImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetail;
