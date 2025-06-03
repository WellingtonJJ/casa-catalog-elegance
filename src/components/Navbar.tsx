
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full z-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-playfair text-2xl font-bold text-gray-800 hover:text-gold-600 transition-colors">
              Impo<span className="text-gold-600">Rio</span>
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
                to="/admin"
                className="bg-gold-600 text-white hover:bg-gold-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <i className="fas fa-user-cog mr-2"></i>
                Admin
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

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="text-gray-800 hover:text-gold-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/catalogs"
                className="text-gray-800 hover:text-gold-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogos
              </Link>
              <Link
                to="/admin"
                className="bg-gold-600 text-white hover:bg-gold-700 block px-3 py-2 rounded-lg text-base font-medium mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user-cog mr-2"></i>
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
