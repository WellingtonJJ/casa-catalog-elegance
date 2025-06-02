import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Catalog = () => {
  const { id } = useParams();

  const catalogs = [
    {
      id: 1,
      name: "Cozinha Gourmet",
      image: "https://images.unsplash.com/photo-1556909114-b6a90b49b8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Utensílios profissionais para sua cozinha",
      fullDescription: "Nossa linha de utensílios para cozinha gourmet oferece produtos de alta qualidade para transformar sua experiência culinária. Desde facas profissionais até panelas de aço inox premium, cada item foi cuidadosamente selecionado para atender às necessidades dos cozinheiros mais exigentes.",
      products: [
        { name: "Conjunto de Facas Premium", image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Facas profissionais de aço carbono alemão" },
        { name: "Panelas de Aço Inox", image: "https://images.unsplash.com/photo-1584990347449-5d5e8c22ee20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Conjunto completo de panelas premium" },
        { name: "Kit Utensílios Bambu", image: "https://images.unsplash.com/photo-1585040449514-1c7c4bf930d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Utensílios sustentáveis de bambu" },
        { name: "Tábuas de Corte Premium", image: "https://images.unsplash.com/photo-1556909195-4cc3c2bf6191?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Tábuas de madeira nobre tratada" },
        { name: "Conjunto de Bowls", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Bowls de cerâmica premium" },
        { name: "Eletrodomésticos", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Liquidificadores e processadores" }
      ]
    },
    {
      id: 2,
      name: "Mesa & Jantar",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Elegância para suas refeições especiais",
      fullDescription: "Transforme suas refeições em momentos inesquecíveis com nossa coleção de mesa e jantar. De jogos de pratos finos a taças de cristal, cada detalhe é pensado para criar uma experiência sofisticada e acolhedora.",
      products: [
        { name: "Jogos de Pratos Finos", image: "https://images.unsplash.com/photo-1587743065668-ccbc49b75e9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Pratos de porcelana com design exclusivo" },
        { name: "Taças e Copos Crystal", image: "https://images.unsplash.com/photo-1586450604702-83b3c11b0d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Taças de cristal lapidado à mão" },
        { name: "Talheres Dourados", image: "https://images.unsplash.com/photo-1595171861331-b81e92bf5e0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Talheres de aço inox com acabamento dourado" },
        { name: "Guardanapos de Linho", image: "https://images.unsplash.com/photo-1620792854144-5149df96f86b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Guardanapos de linho puro com bordados" },
        { name: "Centros de Mesa", image: "https://images.unsplash.com/photo-1551803443-a9e989824746?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Arranjos florais e esculturas decorativas" },
        { name: "Sousplats", image: "https://images.unsplash.com/photo-1605296867304-46d66714a09c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Sousplats de prata e madrepérola" }
      ]
    },
    {
      id: 3,
      name: "Organização & Decoração",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Soluções práticas e bonitas para organizar",
      fullDescription: "Mantenha sua casa organizada e charmosa com nossa seleção de produtos para organização e decoração. Cestas, velas e vasos que combinam funcionalidade e estilo, transformando cada espaço em um ambiente acolhedor.",
      products: [
        { name: "Cestas Organizadoras", image: "https://images.unsplash.com/photo-1584622650979-c5a7e09ad5cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Cestas de vime e tecido para todos os ambientes" },
        { name: "Velas Aromáticas", image: "https://images.unsplash.com/photo-1602874801006-7ad193b2bdac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Velas com fragrâncias relaxantes e duradouras" },
        { name: "Vasos Decorativos", image: "https://images.unsplash.com/photo-1576530616984-8b9fb6b20a3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Vasos de cerâmica e vidro para todos os estilos" },
        { name: "Espelhos Decorativos", image: "https://images.unsplash.com/photo-1617847249633-c6cdef4b5029?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Espelhos com molduras elegantes e modernas" },
        { name: "Quadros e Posters", image: "https://images.unsplash.com/photo-1545389339-036a5b64462a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Quadros e posters para todos os gostos" },
        { name: "Almofadas", image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Almofadas de diversos tamanhos, cores e texturas" }
      ]
    },
    {
      id: 4,
      name: "Banho & Bem-estar",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Conforto e luxo para seu banheiro",
      fullDescription: "Transforme seu banheiro em um santuário de relaxamento com nossa coleção de produtos para banho e bem-estar. Toalhas macias, dispensers elegantes e acessórios dourados que proporcionam uma experiência de spa em casa.",
      products: [
        { name: "Toalhas Premium", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Toalhas de algodão egípcio com alta absorção" },
        { name: "Dispenser Elegantes", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Dispensers de sabonete líquido e álcool em gel" },
        { name: "Acessórios Dourados", image: "https://images.unsplash.com/photo-1584464491060-d4c97c9b5b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Acessórios de banheiro com acabamento dourado" },
        { name: "Roupões de Algodão", image: "https://images.unsplash.com/photo-1571101648974-4458133f73c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Roupões de algodão macio e confortável" },
        { name: "Tapetes de Banho", image: "https://images.unsplash.com/photo-1596727749543-4c99ca97597c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Tapetes de banho antiderrapantes e absorventes" },
        { name: "Sais de Banho", image: "https://images.unsplash.com/photo-1563795345784-f139ca98c99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", description: "Sais de banho com óleos essenciais relaxantes" }
      ]
    },
  ];

  const catalog = catalogs.find(cat => cat.id === parseInt(id || '1'));

  if (!catalog) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="font-poppins text-2xl font-bold text-gray-800 mb-4">Catálogo não encontrado</h1>
            <Link to="/" className="text-gold-600 hover:text-gold-700 font-poppins">
              Voltar para a página inicial
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const phone = "5511999999999";
    const message = encodeURIComponent(`Olá! Gostaria de solicitar o catálogo "${catalog.name}".`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      
      {/* Hero do Catálogo */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${catalog.image})` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-playfair text-5xl font-bold mb-4">{catalog.name}</h1>
            <p className="font-poppins text-xl mb-6">{catalog.description}</p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-poppins font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              <i className="fab fa-whatsapp mr-3"></i>
              Solicitar via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Descrição Completa */}
          <div className="mb-12 text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-6">Sobre este Catálogo</h2>
            <p className="font-poppins text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {catalog.fullDescription}
            </p>
          </div>

          {/* Grid de Produtos */}
          <div className="mb-12">
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-8 text-center">Produtos em Destaque</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catalog.products.map((product, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-poppins text-lg font-semibold text-gray-800 mb-2">{product.name}</h4>
                    <p className="font-poppins text-gray-600 text-sm">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-gold-100 to-cream-100 rounded-2xl p-8 text-center">
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Interessado neste catálogo?</h3>
            <p className="font-poppins text-gray-600 mb-6">
              Entre em contato conosco pelo WhatsApp e solicite mais informações sobre preços e disponibilidade.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-poppins font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto text-lg"
            >
              <i className="fab fa-whatsapp mr-3 text-xl"></i>
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalog;
