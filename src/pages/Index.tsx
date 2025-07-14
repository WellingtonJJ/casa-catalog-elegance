
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CatalogSection from '../components/CatalogSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream-50">
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
