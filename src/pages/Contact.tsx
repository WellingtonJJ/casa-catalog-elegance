
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Configurações do EmailJS - você precisará configurar estas variáveis
      const serviceId = 'YOUR_SERVICE_ID'; // Substitua pelo seu Service ID
      const templateId = 'YOUR_TEMPLATE_ID'; // Substitua pelo seu Template ID  
      const publicKey = 'YOUR_PUBLIC_KEY'; // Substitua pela sua Public Key
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_name: 'EmpoRio', // Nome da empresa
      };

      console.log('Enviando email com parâmetros:', templateParams);
      
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email enviado com sucesso:', response);
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Obrigado pelo contato. Responderemos em breve!",
      });

      // Limpar formulário após envio bem-sucedido
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro. Tente novamente ou entre em contato via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const phone = "5521964603524";
    const message = encodeURIComponent("Olá! Gostaria de mais informações sobre os produtos da EmpoRio.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Entre em <span className="text-gold-400">Contato</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream-100 max-w-2xl mx-auto leading-relaxed font-poppins">
            Estamos aqui para ajudar você a criar o lar dos seus sonhos
          </p>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Informações de Contato */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-8">
                Fale Conosco
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-gold-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 font-poppins">Endereço</h3>
                    <p className="text-gray-600 font-poppins">
                      Rio de Janeiro, RJ<br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-gold-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 font-poppins">Telefone</h3>
                    <p className="text-gray-600 font-poppins">(21) 99609-8810</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-gold-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 font-poppins">Email</h3>
                    <p className="text-gray-600 font-poppins">comercial@imporio.com.br</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-gold-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 font-poppins">Horário de Atendimento</h3>
                    <p className="text-gray-600 font-poppins">
                      Segunda a Sexta: 8h às 17h<br />
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppDirect}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold font-poppins flex items-center transition-colors"
              >
                <i className="fab fa-whatsapp text-2xl mr-3"></i>
                Conversar no WhatsApp
              </button>
            </div>

            {/* Formulário */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-6">
                Envie sua Mensagem
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Assunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="Informações sobre produtos">Informações sobre produtos</option>
                      <option value="Catálogos">Catálogos</option>
                      <option value="Dúvidas">Dúvidas</option>
                      <option value="Sugestões">Sugestões</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Digite sua mensagem aqui..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 rounded-lg font-semibold font-poppins transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </button>
              </form>

              {/* Instruções de configuração */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                  ⚠️ Configuração Necessária
                </h4>
                <p className="text-sm text-yellow-700">
                  Para que o formulário funcione, você precisa:
                </p>
                <ol className="text-sm text-yellow-700 mt-2 ml-4 list-decimal">
                  <li>Criar uma conta gratuita no <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline">EmailJS</a></li>
                  <li>Configurar um serviço de email (Gmail, Outlook, etc.)</li>
                  <li>Criar um template de email</li>
                  <li>Substituir as variáveis YOUR_SERVICE_ID, YOUR_TEMPLATE_ID e YOUR_PUBLIC_KEY no código</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
