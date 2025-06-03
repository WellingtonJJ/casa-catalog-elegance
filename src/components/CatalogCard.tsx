import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Star, ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Catalog } from '@/hooks/useCatalogs';

interface CatalogCardProps {
  catalog: Catalog;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ catalog }) => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const phone = "5521964603524";
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
        <div className="relative h-56 overflow-hidden">
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
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white relative">
          {/* Produtos em Destaque */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-poppins text-lg font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                Produtos em Destaque
              </h4>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
            
            {catalog.products && catalog.products.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {catalog.products.slice(0, 3).map((product, index) => (
                  <div 
                    key={product.id} 
                    className="text-center group/product"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-20 w-full mb-2 rounded-xl overflow-hidden shadow-md group-hover/product:shadow-lg transition-all duration-300">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover/product:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/product:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <p className="text-xs text-gray-700 font-poppins font-medium leading-tight group-hover/product:text-gray-900 transition-colors duration-300">
                      {product.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Star className="w-6 h-6 text-gray-400" />
                </div>
                <p className="font-poppins text-gray-500 font-medium text-sm">Produtos em breve...</p>
              </div>
            )}
          </div>

          {/* Divisor sutil */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>

          {/* Botões lado a lado com design premium */}
          <div className="flex gap-3">
  {/* Botão Ver Catálogo */}
  <Link
    to={`/catalog/${catalog.id}`}
    className="
      flex-1 flex items-center justify-center gap-2
      bg-white border border-gray-200 rounded-xl
      text-gray-900 font-semibold font-poppins text-base
      py-3 px-4 shadow-sm
      transition-all duration-200
      hover:bg-gray-50 hover:shadow-md
      active:bg-gray-100 active:shadow-sm
      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      group
    "
    tabIndex={0}
  >
    <Eye className="w-4 h-4 text-blue-600" />
    <span>Ver Catálogo</span>
  </Link>

  {/* Botão WhatsApp */}
  <button
    type="button"
    onClick={handleWhatsAppClick}
    className="
      flex-1 flex items-center justify-center gap-2
      bg-green-600 border border-green-600 rounded-xl
      text-white font-semibold font-poppins text-base
      py-3 px-4 shadow-sm
      transition-all duration-200
      hover:bg-green-700 hover:shadow-md
      active:bg-green-800 active:shadow-sm
      focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400
      group
    "
    tabIndex={0}
    aria-label={`Solicitar catálogo de ${catalog.name} no WhatsApp`}
  >
    <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-white" />
    <span>Solicite por WhatsApp</span>
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
