
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogCard from '@/components/CatalogCard';
import { useCatalogs } from '@/hooks/useCatalogs';
import { Loader2 } from 'lucide-react';

const Catalogs = () => {
  const { catalogs, loading } = useCatalogs();

  // Filter only active catalogs for public view
  const activeCatalogs = catalogs.filter(catalog => catalog.active);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
<section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
      Nossos <span className="text-gold-400">Catálogos</span>
    </h1>
    <p className="text-xl md:text-2xl text-cream-100 max-w-3xl mx-auto leading-relaxed font-poppins">
      Explore nossa coleção cuidadosamente selecionada de produtos premium para seu lar
    </p>
  </div>
</section>


      {/* Catalogs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-gold-600" />
              <span className="ml-4 text-lg text-gray-600 font-poppins">Carregando catálogos...</span>
            </div>
          ) : activeCatalogs.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-playfair">
                Nenhum catálogo disponível
              </h3>
              <p className="text-gray-600 font-poppins">
                Em breve teremos novos catálogos disponíveis para você.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeCatalogs.map((catalog) => (
                <CatalogCard key={catalog.id} catalog={catalog} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalogs;
