
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('hero');
  
  const [heroData, setHeroData] = useState({
    title: 'Descubra nossos catálogos premium',
    subtitle: 'Utensílios elegantes e funcionais para transformar sua casa em um lar ainda mais especial',
    backgroundImage: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    ctaText: 'Solicitar Orçamento'
  });

  const [catalogs] = useState([
    { id: 1, name: 'Cozinha Gourmet', products: 15, status: 'Ativo' },
    { id: 2, name: 'Mesa & Jantar', products: 22, status: 'Ativo' },
    { id: 3, name: 'Organização & Decoração', products: 18, status: 'Ativo' },
    { id: 4, name: 'Banho & Bem-estar', products: 12, status: 'Ativo' }
  ]);

  const handleSaveHero = () => {
    toast({
      title: "Hero Section atualizada!",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="font-playfair text-2xl font-bold text-gray-800">
                Casa <span className="text-gold-600">Premium</span>
              </h1>
              <span className="ml-4 px-3 py-1 bg-gold-100 text-gold-800 text-sm rounded-full font-inter">
                Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('/', '_blank')}
                className="text-gray-600 hover:text-gray-800 font-inter"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Ver Site
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-inter"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('hero')}
              className={`py-2 px-1 border-b-2 font-medium text-sm font-inter ${
                activeTab === 'hero'
                  ? 'border-gold-500 text-gold-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-home mr-2"></i>
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab('catalogs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm font-inter ${
                activeTab === 'catalogs'
                  ? 'border-gold-500 text-gold-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-book mr-2"></i>
              Catálogos
            </button>
          </nav>
        </div>

        {/* Hero Section Management */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-playfair">
              Gerenciar Hero Section
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 font-inter"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    Subtítulo
                  </label>
                  <textarea
                    value={heroData.subtitle}
                    onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 font-inter"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    URL da Imagem de Fundo
                  </label>
                  <input
                    type="url"
                    value={heroData.backgroundImage}
                    onChange={(e) => setHeroData({...heroData, backgroundImage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 font-inter"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    Texto do Botão CTA
                  </label>
                  <input
                    type="text"
                    value={heroData.ctaText}
                    onChange={(e) => setHeroData({...heroData, ctaText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 font-inter"
                  />
                </div>
                
                <button
                  onClick={handleSaveHero}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors font-inter"
                >
                  <i className="fas fa-save mr-2"></i>
                  Salvar Alterações
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Preview da Imagem
                </label>
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={heroData.backgroundImage}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Imagem+não+encontrada';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Catalogs Management */}
        {activeTab === 'catalogs' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 font-playfair">
                Gerenciar Catálogos
              </h2>
              <button className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-inter">
                <i className="fas fa-plus mr-2"></i>
                Novo Catálogo
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                      Produtos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {catalogs.map((catalog) => (
                    <tr key={catalog.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                        {catalog.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-inter">
                        {catalog.products} itens
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 font-inter">
                          {catalog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-gold-600 hover:text-gold-900 mr-4">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
