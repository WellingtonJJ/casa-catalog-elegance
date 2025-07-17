import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Sobre a <span className="text-gold-400">EmpoRio</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream-100 max-w-2xl mx-auto leading-relaxed font-poppins">
            Transformando casas em lares especiais.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-8">
              Nossa História
            </h2>
            <div className="space-y-6 text-lg text-gray-700 font-poppins leading-relaxed">
              <p>
                A <strong>EmpoRio</strong> nasceu da união de <strong>três irmãos com sólida experiência no comércio</strong>,
                que transformaram um momento de crise em uma nova oportunidade. Fundada no período pós-pandemia, a empresa surgiu com o propósito de <strong>levar praticidade, qualidade e custo-benefício</strong> aos lares brasileiros.
              </p>
              <p>
                Começamos com uma <strong>linha de utensílios de cozinha</strong> e, com o tempo, expandimos nosso portfólio para atender diversas necessidades do lar — sempre com o compromisso de oferecer <strong>produtos seguros e de alta qualidade</strong>.
              </p>
              <p>
                Somos um <strong>negócio familiar com visão nacional</strong>, que valoriza relações próximas com seus clientes. Acreditamos no poder da confiança, no atendimento humano e em produtos que realmente fazem diferença no dia a dia.
              </p>
              <p>
                <strong>Conheça nosso catálogo</strong> e transforme sua casa com a EmpoRio.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Nossa loja"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
              Princípios que norteiam nossas escolhas e refletem no que entregamos a você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: 'fas fa-gem',
                title: 'Qualidade Premium',
                text: 'Selecionamos apenas produtos que atendem aos mais altos padrões de qualidade e durabilidade.',
              },
              {
                icon: 'fas fa-heart',
                title: 'Paixão pelo Lar',
                text: 'Acreditamos que cada casa merece ser um refúgio acolhedor e inspirador.',
              },
              {
                icon: 'fas fa-users',
                title: 'Atendimento Pessoal',
                text: 'Oferecemos um atendimento próximo e humano para ajudar você a encontrar o que precisa.',
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center px-6">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${value.icon} text-2xl text-gold-600`}></i>
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-poppins">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-24 bg-gradient-to-r from-gold-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-8">
            Nossa Missão
          </h2>
          <p className="text-xl text-gray-700 font-poppins leading-relaxed mb-8">
            “Tornar cada casa um lar único e especial, oferecendo <strong>produtos de excelência</strong> que elevam o cotidiano e criam <strong>momentos inesquecíveis em família</strong>.”
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
