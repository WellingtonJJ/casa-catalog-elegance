
import React from 'react';

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    const phone = "5511999999999";
    const message = encodeURIComponent("Olá! Gostaria de conhecer seus catálogos de utensílios para casa.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Descubra nossos
          <span className="block text-gold-400">catálogos premium</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-cream-100 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up font-inter">
          Utensílios elegantes e funcionais para transformar sua casa em um lar ainda mais especial
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-xl font-inter"
          >
            <i className="fab fa-whatsapp mr-3 text-xl"></i>
            Solicitar Orçamento
          </button>
          
          <button
            onClick={() => document.getElementById('catalogs')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 font-inter"
          >
            Ver Catálogos
          </button>
        </div>
        
        <div className="mt-12 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl opacity-70"></i>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
