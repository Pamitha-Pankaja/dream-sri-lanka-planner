import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Award, Users, MapPin, Heart } from 'lucide-react';
import tripadvisorBadges from '@/assets/tripadvisor-badges.png';
import logoImage from '@/assets/Logo/Logo.png';

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, value: '5000+', label: t('happyTravelers') },
    { icon: MapPin, value: '50+', label: t('destinations') },
    { icon: Award, value: '15+', label: t('yearsExperience') },
    { icon: Heart, value: '98%', label: t('satisfaction') },
  ];

  return (
    <section id="about" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={logoImage} 
            alt="Ceylon Round Tours Logo" 
            className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 object-contain animate-fade-in"
          />
        </div>
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            {t('aboutUs')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-3 mb-4">
            {t('aboutTitle')}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            {t('aboutDescription')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-card rounded-2xl p-6 text-center shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-3xl font-serif font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif mb-6">{t('aboutWhoWeAre')}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('aboutParagraph1')}
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('aboutParagraph2')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('aboutParagraph3')}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8">
            <h4 className="text-xl font-serif mb-4">{t('whyChooseUs')}</h4>
            <ul className="space-y-3">
              {[
                t('reasonLocalExperts'),
                t('reasonPersonalized'),
                t('reasonLuxury'),
                t('reason24Support'),
                t('reasonFairPricing'),
              ].map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span className="text-foreground">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TripAdvisor Badges */}
        <div className="text-center">
          <h4 className="text-xl font-serif mb-6">{t('awardsRecognition')}</h4>
          <div className="bg-card rounded-2xl p-6 shadow-soft inline-block">
            <img 
              src={tripadvisorBadges} 
              alt="TripAdvisor Awards - Travellers' Choice 2020-2023 and Certificate of Excellence 2017-2019"
              className="max-w-full h-auto max-h-32 mx-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            {t('awardDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
//test new