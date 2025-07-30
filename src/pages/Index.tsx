
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CatalogSection from '../components/CatalogSection';
import Footer from '../components/Footer';
import { SEO } from '../components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <SEO
        title="ImpoRio - Variedades de produtos na sua loja"
        description="Conheça a história, missão e valores da ImpoRio, empresa especializada em utilidades domésticas, organização e decoração."
        keywords="ImpoRio, sobre nós, utilidades domésticas, importação, missão, valores, empresa"
        canonical="https://imporio.com.br/sobre"
        image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      />
      <Navbar />
      <HeroSection />
      <CatalogSection />
      <Footer />
      {/* Espaçamento para o menu mobile inferior */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

export default Index;
