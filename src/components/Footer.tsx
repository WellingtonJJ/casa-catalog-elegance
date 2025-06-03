
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-playfair text-3xl font-bold mb-4">
              Casa <span className="text-gold-400">Premium</span>
            </h3>
            <p className="text-gray-300 mb-6 font-poppins leading-relaxed">
              Transformamos casas em lares especiais através de utensílios cuidadosamente selecionados. 
              Nossa missão é oferecer produtos de qualidade premium que elevam o padrão do seu lar.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <i className="fab fa-whatsapp text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-poppins text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3 font-poppins">
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">Início</a></li>
              <li><a href="#catalogs" className="text-gray-300 hover:text-gold-400 transition-colors">Catálogos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">Contato</a></li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Painel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-poppins text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-3 font-poppins">
              <div className="flex items-center text-gray-300">
                <i className="fas fa-phone mr-3 text-gold-400"></i>
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center text-gray-300">
                <i className="fas fa-envelope mr-3 text-gold-400"></i>
                <span>contato@casapremium.com</span>
              </div>
              <div className="flex items-start text-gray-300">
                <i className="fas fa-map-marker-alt mr-3 text-gold-400 mt-1"></i>
                <span>São Paulo, SP<br />Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 font-poppins">
            &copy; 2024 Casa Premium. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
