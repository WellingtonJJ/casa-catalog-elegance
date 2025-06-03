
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useHeroSlides } from '@/hooks/useHeroSlides';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { slides, loading } = useHeroSlides();

  const handleWhatsAppClick = () => {
    const phone = "5521964603524";
    const message = encodeURIComponent("Olá! Gostaria de conhecer seus catálogos de utensílios para casa.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-400 mx-auto"></div>
          <p className="text-white mt-4 font-poppins">Carregando...</p>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="font-playfair text-4xl mb-4">Casa Premium</h1>
          <p className="font-poppins">Nenhum slide encontrado</p>
        </div>
      </section>
    );
  }

  return (
    <Carousel className="relative">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id}>
            <section 
              className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.background_image})`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              
              <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                  {slide.title}
                  {slide.subtitle && (
                    <span className="block text-gold-400">{slide.subtitle}</span>
                  )}
                </h1>
                
                {slide.description && (
                  <p className="text-xl md:text-2xl text-cream-100 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up font-poppins">
                    {slide.description}
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">

                  
                  <button
                    onClick={() => document.getElementById('catalogs')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 font-poppins"
                  >
                    Ver Catálogos
                  </button>
                </div>
                
                <div className="mt-12 animate-bounce">
                  <i className="fas fa-chevron-down text-white text-2xl opacity-70"></i>
                </div>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Indicadores */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-gold-400 scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Controles do Carrossel */}
      {slides.length > 1 && (
        <>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 border-white/30 text-white hover:bg-black/40 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 border-white/30 text-white hover:bg-black/40 z-20" />
        </>
      )}
    </Carousel>
  );
};

export default HeroSection;
