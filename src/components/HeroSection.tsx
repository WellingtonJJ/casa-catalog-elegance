
import React from 'react';
import { useHeroSlides } from '@/hooks/useHeroSlides';
import { HeroSlideSkeleton } from '@/components/ui/skeleton-catalog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const { slides, loading } = useHeroSlides();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  if (loading) {
    return <HeroSlideSkeleton />;
  }

  if (!slides.length) {
    return (
      <section className="relative h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-r from-gold-600 to-gold-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bem-vindos</h1>
          <p className="text-xl md:text-2xl">Configure seus slides no painel administrativo</p>
        </div>
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ backgroundImage: `url(${slide.background_image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-serif animate-fade-in">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 font-light animate-fade-in animation-delay-200">
              {slide.subtitle}
            </h2>
          )}
          {slide.description && (
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-400">
              {slide.description}
            </p>
          )}
          {slide.cta_text && (
            <button className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors hover-scale animate-fade-in animation-delay-600">
              {slide.cta_text}
            </button>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
