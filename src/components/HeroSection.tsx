
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaAction: () => void;
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleWhatsAppClick = () => {
    const phone = "5511999999999";
    const message = encodeURIComponent("Olá! Gostaria de conhecer seus catálogos de utensílios para casa.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const slides: HeroSlide[] = [
    {
      id: 1,
      title: "Descubra nossos",
      subtitle: "catálogos premium",
      description: "Utensílios elegantes e funcionais para transformar sua casa em um lar ainda mais especial",
      backgroundImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      ctaText: "Solicitar Orçamento",
      ctaAction: handleWhatsAppClick
    },
    {
      id: 2,
      title: "Qualidade",
      subtitle: "Premium",
      description: "Produtos cuidadosamente selecionados para atender aos padrões mais exigentes de qualidade",
      backgroundImage: "https://images.unsplash.com/photo-1556909114-b6a90b49b8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      ctaText: "Ver Catálogos",
      ctaAction: () => document.getElementById('catalogs')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 3,
      title: "Atendimento",
      subtitle: "Personalizado",
      description: "Nossa equipe especializada está pronta para ajudar você a escolher os melhores produtos",
      backgroundImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      ctaText: "Falar no WhatsApp",
      ctaAction: handleWhatsAppClick
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <Carousel className="relative">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id}>
            <section 
              className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.backgroundImage})`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              
              <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                  {slide.title}
                  <span className="block text-gold-400">{slide.subtitle}</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-cream-100 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up font-poppins">
                  {slide.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                  <button
                    onClick={slide.ctaAction}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-xl font-poppins"
                  >
                    <i className="fab fa-whatsapp mr-3 text-xl"></i>
                    {slide.ctaText}
                  </button>
                  
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

      {/* Controles do Carrossel */}
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 border-white/30 text-white hover:bg-black/40 z-20" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 border-white/30 text-white hover:bg-black/40 z-20" />
    </Carousel>
  );
};

export default HeroSection;
