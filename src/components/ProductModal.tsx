
import React from 'react';
import { X } from 'lucide-react';
import { CatalogProduct } from '@/hooks/useCatalogs';

interface ProductModalProps {
  product: CatalogProduct;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-playfair">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6">
          {/* Image */}
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 font-playfair">
                Detalhes do Produto
              </h3>
              {product.description ? (
                <p className="text-gray-600 leading-relaxed font-poppins text-sm md:text-base">
                  {product.description}
                </p>
              ) : (
                <p className="text-gray-500 italic font-poppins text-sm md:text-base">
                  Sem descrição disponível
                </p>
              )}
            </div>

            {/* Contact Button */}
            <div className="pt-4 border-t">
              <button
                onClick={() => {
                  const phone = "5521964603524";
                  const message = encodeURIComponent(`Olá! Gostaria de mais informações sobre o produto: ${product.name}`);
                  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg font-poppins text-sm md:text-base"
              >
                <i className="fab fa-whatsapp mr-3 text-lg md:text-xl"></i>
                Consultar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
