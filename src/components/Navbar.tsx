
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full z-50 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img 
                  src="/lovable-uploads/be3f153d-caa8-409b-bac1-0ff2db598c56.png" 
                  alt="ImpoRio" 
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  to="/"
                  className="text-gray-800 hover:text-gold-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Início
                </Link>
                <Link
                  to="/catalogs"
                  className="text-gray-800 hover:text-gold-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Catálogos
                </Link>
                <Link
                  to="/about"
                  className="text-gray-800 hover:text-gold-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Sobre
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-800 hover:text-gold-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contato
                </Link>
              </div>
            </div>

            {/* Menu Mobile Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 hover:text-gold-600 focus:outline-none"
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <Link
            to="/"
            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gold-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-home text-lg mb-1"></i>
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link
            to="/catalogs"
            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gold-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-th-large text-lg mb-1"></i>
            <span className="text-xs font-medium">Catálogos</span>
          </Link>
          <Link
            to="/about"
            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gold-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-info-circle text-lg mb-1"></i>
            <span className="text-xs font-medium">Sobre</span>
          </Link>
          <Link
            to="/contact"
            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gold-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-envelope text-lg mb-1"></i>
            <span className="text-xs font-medium">Contato</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay (se necessário para outras opções) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed top-16 left-0 right-0 bg-white border-b shadow-lg">
            <div className="px-4 py-3">
              <p className="text-gray-600 text-sm">Use a navegação inferior</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
