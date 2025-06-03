import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { Catalog } from '@/hooks/useCatalogs';

interface CatalogCardProps {
  catalog: Catalog;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ catalog }) => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const phone = "5511999999999";
    const message = encodeURIComponent(`Olá! Gostaria de solicitar o catálogo "${catalog.name}".`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="group relative">
      <Link 
        to={`/catalog/${catalog.id}`}
        className="block relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
      >
        {/* Badge de destaque */}
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 fill-current" />
          Destaque
        </div>

        {/* Imagem Principal com overlay gradiente mais suave */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={catalog.image}
            alt={catalog.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Conteúdo sobre a imagem */}
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="font-playfair text-3xl font-bold text-white mb-2 drop-shadow-2xl">
              {catalog.name}
            </h3>
            <p className="text-gray-100 font-poppins text-sm leading-relaxed drop-shadow-lg">
              {catalog.description}
            </p>
          </div>
        </div>

        {/* Container de conteúdo com glassmorphism sutil */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-white relative">
          {/* Produtos em Destaque */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-poppins text-xl font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                Produtos em Destaque
              </h4>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
            
            {catalog.products && catalog.products.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {catalog.products.slice(0, 3).map((product, index) => (
                  <div 
                    key={product.id} 
                    className="text-center group/product"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-24 w-full mb-3 rounded-2xl overflow-hidden shadow-md group-hover/product:shadow-lg transition-all duration-300">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover/product:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/product:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <p className="text-sm text-gray-700 font-poppins font-medium leading-tight group-hover/product:text-gray-900 transition-colors duration-300">
                      {product.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
                <p className="font-poppins text-gray-500 font-medium">Produtos em breve...</p>
                <p className="font-poppins text-gray-400 text-sm mt-1">Novidades chegando em breve!</p>
              </div>
            )}
          </div>

          {/* Divisor sutil */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

          {/* Botões com design premium */}
          <div className="space-y-4">
            {/* Botão Ver Catálogo */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-[1px] group/btn">
              <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-500 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-[1.02] font-poppins">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                <Eye className="w-5 h-5 mr-3" />
                <span className="relative z-10">Ver Catálogo Completo</span>
              </div>
            </div>
            
            {/* Botão WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white py-4 px-6 font-semibold transition-all duration-500 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-[1.02] font-poppins group/whatsapp"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/whatsapp:translate-x-[100%] transition-transform duration-1000"></div>
              <MessageCircle className="w-5 h-5 mr-3 group-hover/whatsapp:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Solicitar via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
      </Link>
    </div>
  );
};

export default CatalogCard;
