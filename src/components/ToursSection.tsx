import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { tours } from '@/data/tours';
import TourCard from './TourCard';
import TourDetail from './TourDetail';

const ToursSection = () => {
  const { t } = useLanguage();
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  const activeTour = tours.find(tour => tour.id === selectedTour);

  if (activeTour) {
    return (
      <section id="tours" className="section-padding bg-background">
        <TourDetail tour={activeTour} onBack={() => setSelectedTour(null)} />
      </section>
    );
  }

  return (
    <section id="tours" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
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

        {/* Tour Cards */}
        <div className="space-y-8">
          {tours.map((tour, index) => (
            <TourCard
              key={tour.id}
              tour={tour}
              index={index}
              onSelect={() => setSelectedTour(tour.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
