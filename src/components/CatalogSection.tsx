
import React from 'react';
import { Link } from 'react-router-dom';
import CatalogCard from './CatalogCard';
import { useCatalogs } from '@/hooks/useCatalogs';

const CatalogSection = () => {
  const { catalogs, loading } = useCatalogs();

  if (loading) {
    return (
      <section id="catalogs" className="py-20 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Nossos <span className="text-gold-600">Catálogos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
              Cada catálogo foi cuidadosamente curado para oferecer produtos excepcionais que elevam o padrão da sua casa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="text-center">
                        <div className="h-20 bg-gray-300 rounded-lg mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded"></div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="h-12 bg-gray-300 rounded-lg"></div>
                    <div className="h-12 bg-gray-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Mostrar apenas catálogos na home
  // const displayedCatalogs = catalogs.slice(1, 4);
  const displayedCatalogs = [catalogs[3], catalogs[1], catalogs[2]];

  return (
    <section id="catalogs" className="py-20 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nossos <span className="text-gold-600">Catálogos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
            Cada catálogo foi cuidadosamente curado para oferecer produtos excepcionais que elevam o padrão da sua casa
          </p>
        </div>

        {catalogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 font-poppins">
              Nenhum catálogo disponível no momento.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCatalogs.map((catalog, index) => (
                <div
                  key={catalog.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CatalogCard catalog={catalog} />
                </div>
              ))}
            </div>

            {/* Botão Ver Mais - só aparece se houver mais de 3 catálogos */}
            {catalogs.length > 3 && (
              <div className="text-center mt-12">
                <Link
                  to="/catalogs"
                  className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg font-poppins"
                >
                  <i className="fas fa-eye mr-3"></i>
                  Ver Mais Catálogos
                </Link>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6 font-poppins">
            Interessado em algum catálogo específico?
          </p>
          <button
            onClick={() => {
              const phone = "5521964603524";
              const message = encodeURIComponent("Olá! Gostaria de mais informações sobre os catálogos.");
              window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto shadow-lg font-poppins"
          >
            <i className="fab fa-whatsapp mr-3"></i>
            Conversar no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
