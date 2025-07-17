import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, ZoomIn, Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string;
  display_order: number;
  price?: number; // Novo campo opcional
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fecha o lightbox com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isLightboxOpen]);

  // Impede scroll do body quando modal aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Resetar estados quando o modal fechar
  useEffect(() => {
    if (!isOpen) {
      setImageLoaded(false);
      setIsLightboxOpen(false);
    }
  }, [isOpen]);

  const handleWhatsApp = useCallback(() => {
    if (!product) return;
    
    const phone = "5521964603524";
    const message = encodeURIComponent(
      `Olá! Gostaria de mais informações sobre:\n*${product.name}*${product.price ? `\nValor: R$ ${product.price.toFixed(2)}` : ''}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }, [product]);

  if (!product) return null;

  return (
    <>
      {/* Modal Principal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-4xl p-0 overflow-hidden rounded-3xl shadow-2xl border-0 bg-white"
          onInteractOutside={(e) => e.preventDefault()} // Previne fechamento ao clicar fora
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Detalhes do Produto</DialogTitle>
          </DialogHeader>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gold-600 transition-colors p-2 rounded-full bg-white/90 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500"
            aria-label="Fechar modal"
          >
            <X size={26} strokeWidth={2.5} />
          </button>

          <div className="flex flex-col md:flex-row gap-0">
            {/* Área da Imagem */}
            <div className="md:w-1/2 w-full relative bg-gradient-to-br from-cream-50 to-cream-100 p-6 md:rounded-l-3xl">
              <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-md group">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-cream-200">
                    <Loader2 size={40} className="animate-spin text-gold-600" />
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onClick={() => setIsLightboxOpen(true)}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                />
                {/* <div 
                  className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Ampliar imagem"
                >
                  <ZoomIn size={22} className="text-gray-700" />
                </div> */}
              </div>
            </div>

            {/* Área de Informações */}
            <div className="md:w-1/2 w-full flex flex-col py-8 px-6 md:px-8">
              <div className="mb-6">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {product.name}
                </h2>
                
                {product.price && (
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-gold-600 font-poppins">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
                
                {product.description && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2 text-lg border-b pb-1 border-gold-100">
                      Descrição
                    </h3>
                    <p className="font-poppins text-gray-600 text-base leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 shadow-lg text-white px-6 py-4 rounded-xl font-poppins font-semibold transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  <span className="flex items-center gap-3">
                    <i className="fab fa-whatsapp text-2xl"></i>
                    Solicitar Informações
                  </span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
  
    </>
  );
};

export default ProductModal;