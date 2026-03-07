import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { DayTour } from '@/lib/api';
import { useDayTours } from '@/hooks/useTours';
import { Clock, MapPin, ChevronRight, Loader2 } from 'lucide-react';

const DayToursSection = () => {
  const { t } = useLanguage();
  const { data: dayTours = [], isLoading } = useDayTours();

  return (
    <section id="day-tours" className="section-padding bg-muted">
      <div className="container-wide">
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

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dayTours.map((tour) => (
              <DayTourCard key={tour.id} tour={tour} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface DayTourCardProps {
  tour: DayTour;
  t: (key: string) => string;
}

const DayTourCard = ({ tour, t }: DayTourCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/day-tours/${tour.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="card-premium group bg-card overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
    >
      {/* Image with Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.heroImage}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Duration Badge */}
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{tour.duration}</span>
          </div>
        </div>

        {/* Tour Type Badge */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-sm">
          <span className="text-xs font-medium">{tour.tourType}</span>
        </div>
        
        {/* Title on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-primary-foreground transition-colors">
            {tour.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-2 text-primary text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">{tour.startsEnds}</span>
        </div>

        {/* Summary */}
        <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
          {tour.summary}
        </p>

        {/* Highlights Preview */}
        <div className="mb-5">
          <ul className="space-y-1.5">
            {tour.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="truncate">{highlight}</span>
              </li>
            ))}
            {tour.highlights.length > 3 && (
              <li className="text-sm text-primary font-medium">
                +{tour.highlights.length - 3} more highlights
              </li>
            )}
          </ul>
        </div>

        {/* Read More Link */}
        <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 transition-all">
          <span>{t('readMore')}</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default DayToursSection;
