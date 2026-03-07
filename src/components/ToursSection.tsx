import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTours, useSubPackages } from '@/hooks/useTours';
import TourCard from './TourCard';
import TourDetail from './TourDetail';
import { Loader2 } from 'lucide-react';

const EXPANDABLE_TOUR_NAME = 'Cultural and Classic';

const ToursSection = () => {
  const { t } = useLanguage();
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [expandedTourId, setExpandedTourId] = useState<string | null>(null);
  const { data: tours = [], isLoading } = useTours();
  const { data: subPackages = [] } = useSubPackages(EXPANDABLE_TOUR_NAME);

  const activeTour = tours.find(tour => tour.id === selectedTour)
    || subPackages.find(tour => tour.id === selectedTour);

  if (activeTour) {
    return (
      <section id="tours" className="section-padding bg-background">
        <TourDetail
          tour={activeTour}
          onBack={() => {
            const wasSubPackage = subPackages.some(sp => sp.id === selectedTour);
            const expandableTour = tours.find(t => t.name === EXPANDABLE_TOUR_NAME);
            setSelectedTour(null);
            if (wasSubPackage && expandableTour) {
              setExpandedTourId(expandableTour.id);
            }
          }}
        />
      </section>
    );
  }

  return (
    <section id="tours" className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            {t('ourJourneys')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6">
            {t('toursTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('toursSubtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-8">
            {tours.map((tour, index) => {
              const isExpandable = tour.name === EXPANDABLE_TOUR_NAME;
              return (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  index={index}
                  onSelect={() => {
                    if (isExpandable) {
                      setExpandedTourId(prev => prev === tour.id ? null : tour.id);
                    } else {
                      setSelectedTour(tour.id);
                    }
                  }}
                  isExpanded={expandedTourId === tour.id}
                  subPackages={isExpandable && subPackages.length > 0 ? subPackages : undefined}
                  onSubPackageSelect={(subTour) => setSelectedTour(subTour.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ToursSection;
