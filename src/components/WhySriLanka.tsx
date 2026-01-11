import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Palmtree, Waves, TreePine, Building2, Heart, Mountain } from 'lucide-react';
import kalpitiyaBeachSunset from '@/assets/kalpitiya-beach-sunset.jpg';
import sigiriyaSunset from '@/assets/sigiriya-sunset.jpg';

const WhySriLanka = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Palmtree, title: t('tropicalBeaches'), desc: t('tropicalBeachesDesc') },
    { icon: Waves, title: t('surfCulture'), desc: t('surfCultureDesc') },
    { icon: TreePine, title: t('wildlifeNature'), desc: t('wildlifeNatureDesc') },
    { icon: Building2, title: t('culturalHeritage'), desc: t('culturalHeritageDesc') },
    { icon: Heart, title: t('localExperiences'), desc: t('localExperiencesDesc') },
    { icon: Mountain, title: t('adventureAwaits'), desc: t('adventureAwaitsDesc') },
  ];

  return (
    <section id="why-sri-lanka" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            {t('discoverParadise')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6">
            {t('whySriLankaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('whySriLankaSubtitle')}
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={kalpitiyaBeachSunset}
                alt="Sri Lanka beach sunset with palm trees"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-elevated hidden md:block">
              <img
                src={sigiriyaSunset}
                alt="Sigiriya Rock at sunset"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-serif text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {features.slice(4).map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySriLanka;
