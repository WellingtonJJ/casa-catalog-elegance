
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Casa <span className="text-gold-400">Premium</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md font-inter">
              Sua parceira para encontrar os melhores utensílios para casa. 
              Qualidade, elegância e funcionalidade em cada produto.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-inter text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors font-inter">
                  Início
                </a>
              </li>
              <li>
                <a href="#catalogs" className="text-gray-300 hover:text-gold-400 transition-colors font-inter">
                  Catálogos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors font-inter">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors font-inter">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-inter text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-phone mr-3 text-gold-400"></i>
                <span className="text-gray-300 font-inter">(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope mr-3 text-gold-400"></i>
                <span className="text-gray-300 font-inter">contato@casapremium.com</span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt mr-3 text-gold-400 mt-1"></i>
                <span className="text-gray-300 font-inter">
                  São Paulo, SP<br />
                  Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-inter">
            © {currentYear} Casa Premium. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
