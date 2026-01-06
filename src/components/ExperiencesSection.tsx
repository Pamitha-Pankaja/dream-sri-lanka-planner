import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import surfAdventure from '@/assets/surf-adventure.jpg';
import yalaLeopard from '@/assets/yala-leopard.jpg';
import snorkeling from '@/assets/snorkeling.jpg';
import waterfall from '@/assets/waterfall.jpg';
import localFood from '@/assets/local-food.jpg';
import ellaTrain from '@/assets/ella-train.jpg';
import mirissaSunset from '@/assets/mirissa-sunset.jpg';
import teaPlantation from '@/assets/tea-plantation.jpg';

const ExperiencesSection = () => {
  const { t } = useLanguage();

  const experiences = [
    { image: surfAdventure, title: 'Surfing', desc: 'World-class waves' },
    { image: yalaLeopard, title: 'Safari', desc: 'Wildlife encounters' },
    { image: snorkeling, title: 'Snorkeling', desc: 'Coral reefs & turtles' },
    { image: waterfall, title: 'Waterfalls', desc: 'Jungle adventures' },
    { image: localFood, title: 'Local Cuisine', desc: 'Spices & flavors' },
    { image: ellaTrain, title: 'Train Journeys', desc: 'Scenic railways' },
    { image: mirissaSunset, title: 'Beach Sunsets', desc: 'Golden moments' },
    { image: teaPlantation, title: 'Tea Plantations', desc: 'Highland beauty' },
  ];

  return (
    <section id="experiences" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif mb-4">
            {t('experiencesTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('experiencesSubtitle')}
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 cursor-pointer"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-primary-foreground">
                <h3 className="font-serif text-lg md:text-xl font-medium mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  {exp.title}
                </h3>
                <p className="text-sm text-primary-foreground/80 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
