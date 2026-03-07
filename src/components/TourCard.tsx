import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tour } from '@/lib/api';
import { Calendar, ChevronRight, Waves, TreePine, Compass, Palmtree, Heart, Camera, Sparkles } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
  index: number;
  onSelect: () => void;
}

const tagIcons: Record<string, React.ElementType> = {
  surf: Waves,
  safari: Compass,
  beach: Palmtree,
  culture: Heart,
  nature: TreePine,
  adventure: Sparkles,
  wildlife: Camera,
  relaxation: Heart,
};

const TourCard = ({ tour, index, onSelect }: TourCardProps) => {
  const { t } = useLanguage();

  return (
    <div
      className="card-premium group cursor-pointer bg-card overflow-hidden"
      onClick={onSelect}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row md:h-[320px]">
        {/* Image Section - Fixed aspect ratio on desktop */}
        <div className="relative h-64 md:h-full md:w-2/5 flex-shrink-0 overflow-hidden">
          <img
            src={tour.heroImage}
            alt={tour.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

          {/* Duration Badge */}
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-sm flex items-center gap-2 shadow-lg">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {tour.duration.days} {t('days')} / {tour.duration.nights} {t('nights')}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 md:p-6 lg:p-8 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {tour.name}
          </h3>

          <p className="text-muted-foreground text-sm md:text-base mb-3 line-clamp-2">
            {tour.summary}
          </p>

          {/* Route Preview */}
          <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground mb-3">
            {tour.route.map((place, idx) => (
              <React.Fragment key={place}>
                <span className="font-medium">{place}</span>
                {idx < tour.route.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-primary/50" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tour.tags.slice(0, 5).map((tag) => {
              const Icon = tagIcons[tag] || Sparkles;
              return (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/80 rounded-full text-xs font-medium text-secondary-foreground border border-border/50"
                >
                  <Icon className="w-3 h-3" />
                  {t(tag)}
                </span>
              );
            })}
          </div>

          {/* CTA */}
          <button className="self-start btn-primary flex items-center gap-2 group/btn mt-auto">
            {t('viewItinerary')}
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
