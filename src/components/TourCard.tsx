import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tour } from '@/lib/api';
import { Calendar, ChevronRight, ChevronDown, Waves, TreePine, Compass, Palmtree, Heart, Camera, Sparkles, MapPin } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
  index: number;
  onSelect: () => void;
  isExpanded?: boolean;
  subPackages?: Tour[];
  onSubPackageSelect?: (tour: Tour) => void;
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

const TourCard = ({ tour, index, onSelect, isExpanded, subPackages, onSubPackageSelect }: TourCardProps) => {
  const { t } = useLanguage();

  return (
    <div
      className="card-premium bg-card overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Main Card Area */}
      <div
        className="group cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex flex-col md:flex-row md:h-[320px]">
          {/* Image Section */}
          <div className="relative h-64 md:h-full md:w-2/5 flex-shrink-0 overflow-hidden">
            <img
              src={tour.heroImage}
              alt={tour.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* Duration Badge — hidden for parent tours with sub-packages */}
            {!subPackages && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-sm flex items-center gap-2 shadow-lg">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {tour.duration.days} {t('days')} / {tour.duration.nights} {t('nights')}
                </span>
              </div>
            )}
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
              {subPackages ? (
                <>
                  {isExpanded ? 'Hide Packages' : 'View Packages'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </>
              ) : (
                <>
                  {t('viewItinerary')}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Sub-Packages Section (inside the same card) */}
      {isExpanded && subPackages && subPackages.length > 0 && (
        <div className="border-t border-border/50 bg-muted/30 p-5 md:p-6 lg:p-8 animate-fade-in">
          <div className="mb-5">
            <h4 className="text-lg md:text-xl font-serif font-medium text-foreground">
              Choose Your Package
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Select a duration that suits your travel plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subPackages.map((pkg, pkgIndex) => (
              <div
                key={pkg.id}
                className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer group/pkg border border-border/30 hover:border-primary/40 flex flex-col"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubPackageSelect?.(pkg);
                }}
                style={{ animationDelay: `${pkgIndex * 80}ms` }}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/pkg:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-sm flex items-center gap-1.5 shadow-lg">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">
                      {pkg.duration.days} {t('days')} / {pkg.duration.nights} {t('nights')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h5 className="text-base font-serif font-medium mb-2 group-hover/pkg:text-primary transition-colors line-clamp-1">
                    {pkg.name}
                  </h5>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3 flex-wrap">
                    <MapPin className="w-3 h-3 text-primary/60 flex-shrink-0" />
                    {pkg.route.map((place, idx) => (
                      <React.Fragment key={place}>
                        <span className="font-medium">{place}</span>
                        {idx < pkg.route.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-primary/40" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button className="w-full btn-primary flex items-center justify-center gap-2 text-sm group/btn mt-auto">
                    {t('viewItinerary')}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourCard;
