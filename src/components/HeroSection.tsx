import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useSwipeable } from 'react-swipeable';
import { useHeroSlides } from '@/hooks/useHeroSlides';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { slides, loading } = useHeroSlides();

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Navegação manual
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Swipe handler
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (loading) {
    return (
      <section className="relative h-[70vh] md:h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-400 mx-auto"></div>
          <p className="text-white mt-4 font-poppins">Carregando...</p>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-[70vh] md:h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="font-playfair text-4xl mb-4">Casa Premium</h1>
          <p className="font-poppins">Nenhum slide encontrado</p>
        </div>
      </section>
    );
  }

  return (
    <Carousel className="relative" {...swipeHandlers}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={slide.id}
            style={{ display: index === currentSlide ? 'block' : 'none' }}
          >
            <section
              className="relative h-[70vh] md:h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.background_image})`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

              <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-0">
                <h1 className="font-playfair text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
                  {slide.title}
                  {slide.subtitle && (
                    <span className="block text-gold-400 text-4xl md:text-5xl lg:text-4xl mt-2">
                      {slide.subtitle}
                    </span>
                  )}
                </h1>

                {slide.description && (
                  <p className="text-lg md:text-xl lg:text-2xl text-cream-100 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up font-poppins">
                    {slide.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                  <button
                    onClick={() => document.getElementById('catalogs')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-400 font-poppins"
                  >
                    Ver Catálogos
                  </button>
                </div>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Indicadores de slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-400 ${
                index === currentSlide ? 'bg-gold-400 scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
};

export default HeroSection;
