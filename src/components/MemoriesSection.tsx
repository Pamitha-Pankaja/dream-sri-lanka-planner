import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Heart, Camera, MapPin, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { api, TravelMemory } from '@/lib/api';

// Import fallback memory photos
import memory1 from '@/assets/Memories/WhatsApp Image 2026-01-13 at 18.58.52 (1).jpeg';
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

const fallbackMemories = [
  memory1, memory3, memory4, memory5, memory6, memory7,
  memory8, memory9, memory10, memory11, memory12, memory13
];

const MemoriesSection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedMemory, setSelectedMemory] = useState<TravelMemory | null>(null);
  const [apiMemories, setApiMemories] = useState<TravelMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const [useApi, setUseApi] = useState(true);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await api.getTravelMemories();
        console.log('Travel memories API response:', data);
        if (data && Array.isArray(data) && data.length > 0) {
          setApiMemories(data);
          setUseApi(true);
        } else {
          console.log('No memories from API, using fallback images');
          setUseApi(false);
        }
      } catch (error) {
        console.error('Failed to fetch travel memories:', error);
        setUseApi(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const memories = useApi 
    ? apiMemories.map(m => m.imageUrl) 
    : fallbackMemories;

  const openImage = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    if (useApi && apiMemories[index]) {
      setSelectedMemory(apiMemories[index]);
    } else {
      setSelectedMemory(null);
    }
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % memories.length;
    setSelectedImage(memories[nextIndex]);
    setSelectedIndex(nextIndex);
    if (useApi && apiMemories[nextIndex]) {
      setSelectedMemory(apiMemories[nextIndex]);
    } else {
      setSelectedMemory(null);
    }
  };

  const prevImage = () => {
    const prevIndex = (selectedIndex - 1 + memories.length) % memories.length;
    setSelectedImage(memories[prevIndex]);
    setSelectedIndex(prevIndex);
    if (useApi && apiMemories[prevIndex]) {
      setSelectedMemory(apiMemories[prevIndex]);
    } else {
      setSelectedMemory(null);
    }
  };

  return (
    <section id="memories" className="section-padding bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-6">
            <Camera className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              {t('capturedMoments')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t('travelMemories')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('travelMemoriesDesc')}
          </p>
        </div>

        {/* Memories Gallery - Masonry Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {memories.map((memory, idx) => {
              const memoryData = useApi ? apiMemories[idx] : null;
              return (
                <div
                  key={useApi ? apiMemories[idx]?.id : idx}
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                  onClick={() => openImage(memory, idx)}
                >
                  <div className="relative">
                    <img
                      src={memory}
                      alt={memoryData?.title || `Travel memory ${idx + 1}`}
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
                      
                      {/* Title and Location overlay */}
                      {memoryData && (memoryData.title || memoryData.location) && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {memoryData.title && (
                            <p className="text-white font-medium text-sm">{memoryData.title}</p>
                          )}
                          {memoryData.location && (
                            <p className="text-white/80 text-xs flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {memoryData.location}
                            </p>
                          )}
                        </div>
                      )}
                      
                      {/* Heart icon */}
                      <div className="absolute top-4 right-4 transform translate-x-8 group-hover:translate-x-0 transition-transform duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card rounded-3xl p-8 md:p-12 shadow-elevated max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-serif mb-4">
              {t('createYourMemories')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('createYourMemoriesDesc')}
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              {t('startYourJourney')}
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

            {/* Image counter and info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl text-center">
              {selectedMemory && (selectedMemory.title || selectedMemory.location) && (
                <div className="mb-2">
                  {selectedMemory.title && (
                    <p className="text-white font-medium">{selectedMemory.title}</p>
                  )}
                  {selectedMemory.location && (
                    <p className="text-white/80 text-sm flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedMemory.location}
                    </p>
                  )}
                  {selectedMemory.caption && (
                    <p className="text-white/70 text-xs mt-1 max-w-md">{selectedMemory.caption}</p>
                  )}
                </div>
              )}
              <span className="text-white font-medium text-sm">
                {selectedIndex + 1} / {memories.length}
              </span>
            </div>

            {/* Image */}
            {selectedImage && (
              <img
                src={selectedImage}
                alt={selectedMemory?.title || "Memory"}
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
