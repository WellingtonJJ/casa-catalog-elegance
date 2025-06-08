
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Sobre a <span className="text-gold-400">EmpoRio</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream-100 max-w-3xl mx-auto leading-relaxed font-poppins">
            Transformando casas em lares especiais há mais de uma década
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-6">
                Nossa História
              </h2>
              <p className="text-lg text-gray-600 mb-6 font-poppins leading-relaxed">
                A EmpoRio nasceu do sonho de tornar cada casa um verdadeiro lar. Fundada no coração do Rio de Janeiro, 
                nossa empresa começou como uma pequena loja familiar que acreditava no poder dos detalhes para 
                transformar ambientes.
              </p>
              <p className="text-lg text-gray-600 mb-6 font-poppins leading-relaxed">
                Ao longo dos anos, crescemos e nos especializamos em curar uma seleção única de utensílios domésticos 
                que combinam funcionalidade, beleza e qualidade excepcional. Cada produto em nosso catálogo é 
                cuidadosamente escolhido por nossa equipe de especialistas.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Nossa loja"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
              Princípios que guiam cada decisão e cada produto que oferecemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-gem text-2xl text-gold-600"></i>
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">Qualidade Premium</h3>
              <p className="text-gray-600 font-poppins">
                Selecionamos apenas produtos que atendem aos mais altos padrões de qualidade e durabilidade.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl text-gold-600"></i>
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">Paixão pelo Lar</h3>
              <p className="text-gray-600 font-poppins">
                Acreditamos que cada casa merece ser um refúgio acolhedor e inspirador para seus moradores.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-2xl text-gold-600"></i>
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">Atendimento Pessoal</h3>
              <p className="text-gray-600 font-poppins">
                Oferecemos um atendimento personalizado para ajudar você a encontrar exatamente o que precisa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-20 bg-gradient-to-r from-gold-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-8">
            Nossa Missão
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed font-poppins mb-8">
            "Tornar cada casa um lar único e especial, oferecendo produtos de qualidade excepcional 
            que elevam o cotidiano e criam momentos memoráveis em família."
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
