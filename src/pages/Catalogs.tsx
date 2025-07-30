import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogCard from '@/components/CatalogCard';
import { useCatalogs } from '@/hooks/useCatalogs';
import { Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';

const Catalogs = () => {
  const { catalogs, loading } = useCatalogs();
  const activeCatalogs = catalogs.filter(catalog => catalog.active);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Catálogos - ImpoRio |  Variedades de produtos na sua loja"
        description="Conheça a história, missão e valores da ImpoRio, empresa especializada em utilidades domésticas, organização e decoração."
        keywords="ImpoRio, sobre nós, utilidades domésticas, importação, missão, valores, empresa"
        canonical="https://imporio.com.br/sobre"
        image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Nossos <span className="text-gold-400">Catálogos</span>
          </h1>
          <p className="font-poppins text-xl md:text-2xl text-cream-100 max-w-3xl mx-auto leading-relaxed">
            Explore nossa coleção cuidadosamente selecionada de produtos para seu lar.
          </p>
        </div>
      </section>

      {/* Catalogs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-12 h-12 animate-spin text-gold-600" />
              <span className="ml-4 text-lg text-gray-600 font-poppins">
                Carregando catálogos...
              </span>
            </div>
          ) : activeCatalogs.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-playfair tracking-tight">
                Nenhum catálogo disponível
              </h3>
              <p className="text-lg text-gray-600 font-poppins">
                Em breve teremos novos catálogos disponíveis para você.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-center font-playfair text-3xl font-bold text-gray-800 mb-12 tracking-tight">
                Catálogos Disponíveis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {activeCatalogs.map((catalog) => (
                  <CatalogCard key={catalog.id} catalog={catalog} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalogs;
