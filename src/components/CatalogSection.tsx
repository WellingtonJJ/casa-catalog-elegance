import React from 'react';
import CatalogCard from './CatalogCard';

const CatalogSection = () => {
  const catalogs = [
    {
      id: 1,
      name: "Cozinha Gourmet",
      image: "https://images.unsplash.com/photo-1556909114-b6a90b49b8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Utensílios profissionais para sua cozinha",
      products: [
        { name: "Conjunto de Facas Premium", image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { name: "Panelas de Aço Inox", image: "https://images.unsplash.com/photo-1584990347449-5d5e8c22ee20?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { name: "Kit Utensílios Bambu", image: "https://images.unsplash.com/photo-1585040449514-1c7c4bf930d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
      ]
    },
    {
      id: 2,
      name: "Mesa & Jantar",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Elegância para suas refeições especiais",
      products: [
        { name: "Jogos de Pratos Finos", image: "https://images.unsplash.com/photo-1587743065668-ccbc49b75e9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { name: "Taças e Copos Crystal", image: "https://images.unsplash.com/photo-1586450604702-83b3c11b0d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { name: "Talheres Dourados", image: "https://images.unsplash.com/photo-1595171861331-b81e92bf5e0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
      ]
    },
    {
      id: 3,
      name: "Organização & Decoração",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Soluções práticas e bonitas para organizar",
      products: [
        { name: "Cestas Organizadoras", image: "https://images.unsplash.com/photo-1584622650979-c5a7e09ad5cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { name: "Velas Aromáticas", image: "https://images.unsplash.com/photo-1602874801006-7ad193b2bdac?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { name: "Vasos Decorativos", image: "https://images.unsplash.com/photo-1576530616984-8b9fb6b20a3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
      ]
    },
    {
      id: 4,
      name: "Banho & Bem-estar",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Conforto e luxo para seu banheiro",
      products: [
        { name: "Toalhas Premium", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { name: "Dispenser Elegantes", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        { name: "Acessórios Dourados", image: "https://images.unsplash.com/photo-1584464491060-d4c97c9b5b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
      ]
    }
  ];

  return (
    <section id="catalogs" className="py-20 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nossos <span className="text-gold-600">Catálogos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
            Cada catálogo foi cuidadosamente curado para oferecer produtos excepcionais que elevam o padrão da sua casa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {catalogs.map((catalog, index) => (
            <div
              key={catalog.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CatalogCard catalog={catalog} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6 font-poppins">
            Interessado em algum catálogo específico?
          </p>
          <button
            onClick={() => {
              const phone = "5511999999999";
              const message = encodeURIComponent("Olá! Gostaria de mais informações sobre os catálogos.");
              window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto shadow-lg font-poppins"
          >
            <i className="fab fa-whatsapp mr-3"></i>
            Conversar no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
