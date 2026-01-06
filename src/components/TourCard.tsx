import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tour } from '@/data/tours';
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
      className="card-premium group cursor-pointer bg-card"
      onClick={onSelect}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0">
        {/* Image Section */}
        <div className="lg:col-span-2 relative h-64 md:h-full min-h-[300px] overflow-hidden">
          <img
            src={tour.heroImage}
            alt={tour.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          
          {/* Duration Badge */}
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              {tour.duration.days} {t('days')} / {tour.duration.nights} {t('nights')}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-medium mb-3 group-hover:text-primary transition-colors">
              {tour.name}
            </h3>
            
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {tour.summary}
            </p>

            {/* Route Preview */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
              {tour.route.map((place, idx) => (
                <React.Fragment key={place}>
                  <span className="font-medium">{place}</span>
                  {idx < tour.route.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-primary/50" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tour.tags.map((tag) => {
                const Icon = tagIcons[tag] || Sparkles;
                return (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-xs font-medium text-secondary-foreground"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t(tag)}
                  </span>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <button className="self-start btn-primary flex items-center gap-2 group/btn">
            {t('viewItinerary')}
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
