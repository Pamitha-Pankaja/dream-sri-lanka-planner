import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAllPublishedTours } from '@/hooks/useTours';
import { Tour } from '@/lib/api';
import TourCard from './TourCard';
import TourDetail from './TourDetail';
import { Loader2 } from 'lucide-react';

interface ToursSectionProps {
  onDetailModeChange?: (isDetailMode: boolean) => void;
  onHotelDetailChange?: (isHotelDetail: boolean) => void;
}

const ToursSection = ({ onDetailModeChange, onHotelDetailChange }: ToursSectionProps) => {
  const { t } = useLanguage();
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [expandedTourId, setExpandedTourId] = useState<string | null>(null);
  const { data: allTours = [], isLoading } = useAllPublishedTours();

  const tours = useMemo(
    () => allTours.filter((tour) => !tour.parentTourName),
    [allTours]
  );

  const childrenByParent = useMemo(() => {
    const map: Record<string, Tour[]> = {};
    for (const tour of allTours) {
      if (!tour.parentTourName) continue;
      if (!map[tour.parentTourName]) map[tour.parentTourName] = [];
      map[tour.parentTourName].push(tour);
    }
    for (const children of Object.values(map)) {
      children.sort((a, b) => (a.duration?.days || 0) - (b.duration?.days || 0));
    }
    return map;
  }, [allTours]);

  const activeTour = allTours.find((tour) => tour.id === selectedTour);

  useEffect(() => {
    onDetailModeChange?.(!!activeTour);
  }, [activeTour, onDetailModeChange]);

  if (activeTour) {
    return (
      <section id="tours" className="section-padding bg-background">
        <TourDetail
          tour={activeTour}
          onHotelDetailChange={onHotelDetailChange}
          onBack={() => {
            const parent = tours.find((item) => item.name === activeTour.parentTourName);
            setSelectedTour(null);
            if (parent) {
              setExpandedTourId(parent.id);
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
              const subPackages = childrenByParent[tour.name];
              const isExpandable = !!subPackages?.length;
              return (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  index={index}
                  onSelect={() => {
                    if (isExpandable) {
                      setExpandedTourId((prev) => (prev === tour.id ? null : tour.id));
                    } else {
                      setSelectedTour(tour.id);
                    }
                  }}
                  isExpanded={expandedTourId === tour.id}
                  subPackages={isExpandable ? subPackages : undefined}
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
