import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { dayTours, DayTour } from '@/data/tours';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const DayToursSection = () => {
  const { t } = useLanguage();

  const tagIcons: Record<string, string> = {
    surf: '🏄',
    safari: '🦁',
    beach: '🏖️',
    culture: '🛕',
    nature: '🌿',
    adventure: '⛰️',
    wildlife: '🐘',
    relaxation: '🧘',
  };

  return (
    <section id="day-tours" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            {t('exploreSriLanka')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6">
            {t('dayToursTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('dayToursSubtitle')}
          </p>
        </div>

        {/* Day Tour Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dayTours.map((tour) => (
            <DayTourCard key={tour.id} tour={tour} t={t} tagIcons={tagIcons} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface DayTourCardProps {
  tour: DayTour;
  t: (key: string) => string;
  tagIcons: Record<string, string>;
}

const DayTourCard = ({ tour, t, tagIcons }: DayTourCardProps) => {
  return (
    <div className="card-premium group bg-card overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.heroImage}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Duration Badge */}
        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium">{tour.duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-primary text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">{tour.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-primary transition-colors">
          {tour.name}
        </h3>

        {/* Summary */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {tour.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tour.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground flex items-center gap-1"
            >
              {tagIcons[tag]} {t(tag)}
            </span>
          ))}
        </div>

        {/* CTA */}
        <WhatsAppButton
          message={`Hi! I'm interested in the ${tour.name}. Can you tell me more about availability and pricing?`}
          className="w-full justify-center text-sm"
        >
          {t('inquireNow')}
          <ChevronRight className="w-4 h-4" />
        </WhatsAppButton>
      </div>
    </div>
  );
};

export default DayToursSection;
