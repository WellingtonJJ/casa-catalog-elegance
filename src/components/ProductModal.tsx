
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string;
  display_order: number;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl font-bold text-gray-800">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.description && (
            <div>
              <p className="font-poppins text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
          
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                const phone = "5521964603524";
                const message = encodeURIComponent(`Olá! Gostaria de mais informações sobre o produto "${product.name}".`);
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-poppins font-semibold transition-colors flex items-center"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Solicitar Informações
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
