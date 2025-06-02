
import React from 'react';

interface Product {
  name: string;
  image: string;
}

interface Catalog {
  id: number;
  name: string;
  image: string;
  description: string;
  products: Product[];
}

interface CatalogCardProps {
  catalog: Catalog;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ catalog }) => {
  const handleWhatsAppClick = () => {
    const phone = "5511999999999";
    const message = encodeURIComponent(`Olá! Gostaria de solicitar o catálogo "${catalog.name}".`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Imagem Principal */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={catalog.image}
          alt={catalog.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="font-playfair text-2xl font-bold text-white mb-1">
            {catalog.name}
          </h3>
          <p className="text-cream-200 font-inter">
            {catalog.description}
          </p>
        </div>
      </div>

      {/* Produtos em Destaque */}
      <div className="p-6">
        <h4 className="font-inter text-lg font-semibold text-gray-800 mb-4">
          Produtos em Destaque:
        </h4>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {catalog.products.map((product, index) => (
            <div key={index} className="text-center">
              <div className="relative h-20 w-full mb-2 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-gray-600 font-inter leading-tight">
                {product.name}
              </p>
            </div>
          ))}
        </div>

        {/* Botão WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 font-inter"
        >
          <i className="fab fa-whatsapp mr-2 text-lg"></i>
          Solicitar via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default CatalogCard;
