import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import { useCatalogs } from '@/hooks/useCatalogs';
import { SEO } from '../components/SEO';

const Catalog = () => {
  const { id } = useParams();
  const { catalogs, loading } = useCatalogs();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-poppins text-lg">Carregando catálogo...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const catalog = catalogs.find(cat => cat.id === id);

  if (!catalog) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="font-poppins text-2xl font-bold text-gray-800 mb-4 tracking-tight">Catálogo não encontrado</h1>
            <Link to="/" className="text-gold-600 hover:text-gold-700 font-poppins underline">
              Voltar para a página inicial
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const phone = "5521996098810";
    const message = encodeURIComponent(`Olá! Gostaria de solicitar o catálogo "${catalog.name}".`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <SEO
        title={`${catalog.name} - ImpoRio |  Variedades de produtos na sua loja`}
        description={catalog.description || `Catálogo de ${catalog.name} com produtos importados da China. Soliciento via WhatsApp.`}
        keywords={`${catalog.name}, utensílios, catálogo, ImpoRio, importação, China, ${catalog.description || ''}`}
        canonical={`https://imporio.com.br/catalogo/${catalog.id}`}
        image={catalog.image}
      />

      <Navbar />

      {/* Hero do Catálogo */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${catalog.hero_image})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center pt-12">
          <div className="text-center text-white px-4">
            <h1 className="font-playfair text-5xl font-bold mb-4 tracking-tight leading-tight">
              {catalog.name}
            </h1>
            <p className="font-poppins text-xl max-w-2xl mx-auto mb-6 leading-relaxed text-gray-100">
              {catalog.description}
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Descrição Completa */}
          {catalog.full_description && (
            <div className="mb-16 text-center">
              <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-6 tracking-tight">
                Sobre este Catálogo
              </h2>
              <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-justify">
                {catalog.full_description}
              </p>
            </div>
          )}

          {/* Grid de Produtos */}
          <div className="mb-20">
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-10 tracking-tight text-center">
              Produtos em Destaque
            </h3>
            {catalog.products && catalog.products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {catalog.products
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="h-64 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="font-poppins text-lg font-semibold text-gray-800 mb-2 leading-snug">
                          {product.name}
                        </h4>
                        {product.description && (
                          <p className="font-poppins text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {product.description}
                          </p>
                        )}
                        <div className="mt-4 text-gold-600 font-poppins text-sm font-medium">
                          Clique para ver mais detalhes
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 font-poppins">Produtos em breve...</p>
              </div>
            )}
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-gold-100 to-cream-100 rounded-2xl p-10 text-center shadow-md">
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4 leading-tight">
              Interessado neste catálogo?
            </h3>
            <p className="font-poppins text-gray-700 mb-6 text-lg max-w-xl mx-auto leading-relaxed">
              Entre em contato conosco pelo WhatsApp e solicite mais informações sobre preços e disponibilidade.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-poppins font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto text-lg shadow-md"
            >
              <i className="fab fa-whatsapp mr-3 text-xl"></i>
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
};

export default Catalog;
