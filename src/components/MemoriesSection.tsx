import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Heart, Camera } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

// Import memory photos
import memory1 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.52 (1).jpeg';
import memory2 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.52.jpeg';
import memory3 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.53 (1).jpeg';
import memory4 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.53 (2).jpeg';
import memory5 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.53.jpeg';
import memory6 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.54 (1).jpeg';
import memory7 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.54 (2).jpeg';
import memory8 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.54.jpeg';
import memory9 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.55 (1).jpeg';
import memory10 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.55 (2).jpeg';
import memory11 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.55.jpeg';
import memory12 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.56 (1).jpeg';
import memory13 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.56.jpeg';

const MemoriesSection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const memories = [
    memory1, memory2, memory3, memory4, memory5, memory6, memory7,
    memory8, memory9, memory10, memory11, memory12, memory13
  ];

  const openImage = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % memories.length;
    setSelectedImage(memories[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (selectedIndex - 1 + memories.length) % memories.length;
    setSelectedImage(memories[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  return (
    <section id="memories" className="section-padding bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-6">
            <Camera className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Captured Moments
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Travel Memories
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real moments from real travelers. Experience the magic of Sri Lanka through their eyes.
          </p>
        </div>

        {/* Memories Gallery - Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {memories.map((memory, idx) => (
            <div
              key={idx}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
              onClick={() => openImage(memory, idx)}
            >
              <div className="relative">
                <img
                  src={memory}
                  alt={`Travel memory ${idx + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Heart icon */}
                  <div className="absolute top-4 right-4 transform translate-x-8 group-hover:translate-x-0 transition-transform duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card rounded-3xl p-8 md:p-12 shadow-elevated max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-serif mb-4">
              Create Your Own Memories
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of travelers who've discovered the beauty of Sri Lanka
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeImage}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 overflow-hidden bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-medium">
                {selectedIndex + 1} / {memories.length}
              </span>
            </div>

            {/* Image */}
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Memory"
                className="max-w-full max-h-[95vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MemoriesSection;
