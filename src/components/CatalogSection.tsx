
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
                  to="/catalogos"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Ver Todos os Catálogos
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            )}
          </>
        )}

<div className="bg-gradient-to-r from-gold-100 to-cream-100 rounded-2xl p-10 text-center shadow-md mt-16">
  <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4 leading-tight">
    Interessado em algum catálogo específico?
  </h3>
  <p className="font-poppins text-gray-700 mb-6 text-lg max-w-xl mx-auto leading-relaxed">
    Entre em contato conosco pelo WhatsApp e solicite mais informações sobre os catálogos disponíveis.
  </p>
  <button
    onClick={() => {
      const phone = "5521996098810";
      const message = encodeURIComponent("Olá! Gostaria de mais informações sobre os catálogos.");
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }}
    className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-poppins font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto text-lg shadow-md"
  >
    <i className="fab fa-whatsapp mr-3 text-xl"></i>
    Conversar no WhatsApp
  </button>
</div>

      </div>
    </section>
  );
};

export default CatalogSection;
