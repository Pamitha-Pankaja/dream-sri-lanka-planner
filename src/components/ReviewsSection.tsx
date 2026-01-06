import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star, Quote, ExternalLink, Users, Heart, ThumbsUp } from 'lucide-react';

const ReviewsSection = () => {
  const { t } = useLanguage();

  const reviews = [
    {
      name: 'Sarah & Michael',
      country: 'Germany',
      rating: 5,
      text: 'An absolutely magical journey through Sri Lanka. Every detail was perfect, from the boutique hotels to our amazing guide Saman. The highlight was definitely watching elephants at sunrise in Yala.',
      tour: 'Classic Sri Lanka Discovery',
    },
    {
      name: 'David Cohen',
      country: 'Israel',
      rating: 5,
      text: 'Third time using Visit Sri Lanka and they never disappoint. The surf spots they took us to were incredible - some of the best waves I\'ve ever ridden. Can\'t wait to come back!',
      tour: 'Surf & Beach Adventure',
    },
    {
      name: 'Emma & James',
      country: 'UK',
      rating: 5,
      text: 'We wanted a romantic getaway and Visit Sri Lanka delivered beyond our expectations. The private beach dinners, the luxury resorts, the personal touches - pure perfection.',
      tour: 'Tropical Coastal Luxury',
    },
  ];

  const trustIndicators = [
    { icon: Users, text: t('localGuides'), value: '15+' },
    { icon: Heart, text: t('authenticTravel'), value: '100%' },
    { icon: ThumbsUp, text: t('guestSatisfaction'), value: '98%' },
  ];

  return (
    <section id="reviews" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif mb-4">
            {t('reviewsTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('reviewsSubtitle')}
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {trustIndicators.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-serif font-medium text-primary">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-sunset text-sunset" />
                ))}
              </div>

              <p className="text-foreground mb-6 italic">"{review.text}"</p>

              <div className="border-t border-border pt-4">
                <div className="font-medium">{review.name}</div>
                <div className="text-sm text-muted-foreground">{review.country} • {review.tour}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TripAdvisor Link */}
        <div className="text-center">
          <a
            href="https://www.tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {t('readOnTripadvisor')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
