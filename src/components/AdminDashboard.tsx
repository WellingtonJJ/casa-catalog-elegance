import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
}

interface Product {
  name: string;
  image: string;
  description: string;
}

interface Catalog {
  id: number;
  name: string;
  image: string;
  description: string;
  fullDescription: string;
  heroImage: string;
  heroCtaText: string;
  products: Product[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [editingSlide, setEditingSlide] = useState<number | null>(null);
  const [editingCatalog, setEditingCatalog] = useState<number | null>(null);
  const [showNewSlideForm, setShowNewSlideForm] = useState(false);
  const [showNewCatalogForm, setShowNewCatalogForm] = useState(false);
  
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([
    {
      id: 1,
      title: "Descubra nossos",
      subtitle: "catálogos premium",
      description: "Utensílios elegantes e funcionais para transformar sua casa em um lar ainda mais especial",
      backgroundImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      ctaText: "Solicitar Orçamento"
    },
    {
      id: 2,
      title: "Qualidade",
      subtitle: "Premium",
      description: "Produtos cuidadosamente selecionados para atender aos padrões mais exigentes de qualidade",
      backgroundImage: "https://images.unsplash.com/photo-1556909114-b6a90b49b8ba",
      ctaText: "Ver Catálogos"
    }
  ]);

  const [catalogs, setCatalogs] = useState<Catalog[]>([
    {
      id: 1,
      name: 'Cozinha Gourmet',
      image: 'https://images.unsplash.com/photo-1556909114-b6a90b49b8ba',
      description: 'Utensílios profissionais para sua cozinha',
      fullDescription: 'Nossa linha de utensílios para cozinha gourmet oferece produtos de alta qualidade para transformar sua experiência culinária. Desde facas profissionais até panelas de aço inox premium, cada item foi cuidadosamente selecionado para atender às necessidades dos cozinheiros mais exigentes.',
      heroImage: 'https://images.unsplash.com/photo-1556909114-b6a90b49b8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      heroCtaText: 'Solicitar via WhatsApp',
      products: [
        { name: 'Conjunto de Facas Premium', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65', description: 'Facas profissionais de aço carbono alemão' },
        { name: 'Panelas de Aço Inox', image: 'https://images.unsplash.com/photo-1584990347449-5d5e8c22ee20', description: 'Conjunto completo de panelas premium' }
      ]
    },
    {
      id: 2,
      name: 'Mesa & Jantar',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      description: 'Elegância para suas refeições especiais',
      fullDescription: 'Transforme suas refeições em momentos inesquecíveis com nossa coleção de mesa e jantar. De jogos de pratos finos a taças de cristal, cada detalhe é pensado para criar uma experiência sofisticada e acolhedora.',
      heroImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      heroCtaText: 'Solicitar via WhatsApp',
      products: [
        { name: 'Jogos de Pratos Finos', image: 'https://images.unsplash.com/photo-1587743065668-ccbc49b75e9b', description: 'Pratos de porcelana com design exclusivo' },
        { name: 'Taças e Copos Crystal', image: 'https://images.unsplash.com/photo-1586450604702-83b3c11b0d5d', description: 'Taças de cristal lapidado à mão' }
      ]
    }
  ]);

  const [newSlide, setNewSlide] = useState<Omit<HeroSlide, 'id'>>({
    title: '',
    subtitle: '',
    description: '',
    backgroundImage: '',
    ctaText: ''
  });

  const [newCatalog, setNewCatalog] = useState<Omit<Catalog, 'id'>>({
    name: '',
    image: '',
    description: '',
    fullDescription: '',
    heroImage: '',
    heroCtaText: '',
    products: []
  });

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    onLogout();
  };

  // Hero Slides Management
  const handleSaveSlide = (slideData: HeroSlide) => {
    setHeroSlides(slides => slides.map(slide => 
      slide.id === slideData.id ? slideData : slide
    ));
    setEditingSlide(null);
    toast({
      title: "Slide atualizado!",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleAddSlide = () => {
    if (!newSlide.title || !newSlide.backgroundImage) {
      toast({
        title: "Erro",
        description: "Título e imagem são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const slide: HeroSlide = {
      ...newSlide,
      id: Math.max(...heroSlides.map(s => s.id)) + 1
    };
    
    setHeroSlides(slides => [...slides, slide]);
    setNewSlide({
      title: '',
      subtitle: '',
      description: '',
      backgroundImage: '',
      ctaText: ''
    });
    setShowNewSlideForm(false);
    
    toast({
      title: "Slide adicionado!",
      description: "Novo slide criado com sucesso.",
    });
  };

  const handleDeleteSlide = (id: number) => {
    setHeroSlides(slides => slides.filter(slide => slide.id !== id));
    toast({
      title: "Slide removido!",
      description: "O slide foi excluído com sucesso.",
    });
  };

  // Catalogs Management
  const handleSaveCatalog = (catalogData: Catalog) => {
    setCatalogs(cats => cats.map(cat => 
      cat.id === catalogData.id ? catalogData : cat
    ));
    setEditingCatalog(null);
    toast({
      title: "Catálogo atualizado!",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleAddCatalog = () => {
    if (!newCatalog.name || !newCatalog.image || !newCatalog.heroImage) {
      toast({
        title: "Erro",
        description: "Nome, imagem e imagem do hero são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const catalog: Catalog = {
      ...newCatalog,
      id: Math.max(...catalogs.map(c => c.id)) + 1
    };
    
    setCatalogs(cats => [...cats, catalog]);
    setNewCatalog({
      name: '',
      image: '',
      description: '',
      fullDescription: '',
      heroImage: '',
      heroCtaText: '',
      products: []
    });
    setShowNewCatalogForm(false);
    
    toast({
      title: "Catálogo adicionado!",
      description: "Novo catálogo criado com sucesso.",
    });
  };

  const handleDeleteCatalog = (id: number) => {
    setCatalogs(cats => cats.filter(cat => cat.id !== id));
    toast({
      title: "Catálogo removido!",
      description: "O catálogo foi excluído com sucesso.",
    });
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
              <span className="ml-4 px-3 py-1 bg-gold-100 text-gold-800 text-sm rounded-full font-poppins">
                Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('/', '_blank')}
                className="text-gray-600 hover:text-gray-800 font-poppins"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Ver Site
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-poppins"
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
              className={`py-2 px-1 border-b-2 font-medium text-sm font-poppins ${
                activeTab === 'hero'
                  ? 'border-gold-500 text-gold-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-home mr-2"></i>
              Hero Carousel
            </button>
            <button
              onClick={() => setActiveTab('catalogs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm font-poppins ${
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

        {/* Hero Carousel Management */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 font-playfair">
                Gerenciar Hero Carousel
              </h2>
              <button
                onClick={() => setShowNewSlideForm(true)}
                className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-poppins flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Slide
              </button>
            </div>

            {/* New Slide Form */}
            {showNewSlideForm && (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Novo Slide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Título"
                    value={newSlide.title}
                    onChange={(e) => setNewSlide({...newSlide, title: e.target.value})}
                    className="px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Subtítulo"
                    value={newSlide.subtitle}
                    onChange={(e) => setNewSlide({...newSlide, subtitle: e.target.value})}
                    className="px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="URL da Imagem"
                    value={newSlide.backgroundImage}
                    onChange={(e) => setNewSlide({...newSlide, backgroundImage: e.target.value})}
                    className="px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Texto do Botão"
                    value={newSlide.ctaText}
                    onChange={(e) => setNewSlide({...newSlide, ctaText: e.target.value})}
                    className="px-3 py-2 border rounded-lg"
                  />
                </div>
                <textarea
                  placeholder="Descrição"
                  value={newSlide.description}
                  onChange={(e) => setNewSlide({...newSlide, description: e.target.value})}
                  rows={3}
                  className="w-full mt-4 px-3 py-2 border rounded-lg"
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleAddSlide}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </button>
                  <button
                    onClick={() => setShowNewSlideForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Slides List */}
            <div className="space-y-4">
              {heroSlides.map((slide) => (
                <HeroSlideCard
                  key={slide.id}
                  slide={slide}
                  isEditing={editingSlide === slide.id}
                  onEdit={() => setEditingSlide(slide.id)}
                  onSave={handleSaveSlide}
                  onCancel={() => setEditingSlide(null)}
                  onDelete={() => handleDeleteSlide(slide.id)}
                />
              ))}
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
              <button
                onClick={() => setShowNewCatalogForm(true)}
                className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-poppins flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Catálogo
              </button>
            </div>

            {/* New Catalog Form */}
            {showNewCatalogForm && (
              <div className="mb-6 p-6 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Novo Catálogo</h3>
                
                <div className="space-y-4">
                  {/* Informações Básicas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nome do Catálogo"
                      value={newCatalog.name}
                      onChange={(e) => setNewCatalog({...newCatalog, name: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="url"
                      placeholder="URL da Imagem Principal"
                      value={newCatalog.image}
                      onChange={(e) => setNewCatalog({...newCatalog, image: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <textarea
                    placeholder="Descrição Curta"
                    value={newCatalog.description}
                    onChange={(e) => setNewCatalog({...newCatalog, description: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-lg"
                  />

                  <textarea
                    placeholder="Descrição Completa (Para página do catálogo)"
                    value={newCatalog.fullDescription}
                    onChange={(e) => setNewCatalog({...newCatalog, fullDescription: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg"
                  />

                  {/* Hero do Catálogo */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Hero da Página do Catálogo</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="url"
                        placeholder="URL da Imagem de Background do Hero"
                        value={newCatalog.heroImage}
                        onChange={(e) => setNewCatalog({...newCatalog, heroImage: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Texto do Botão CTA"
                        value={newCatalog.heroCtaText}
                        onChange={(e) => setNewCatalog({...newCatalog, heroCtaText: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={handleAddCatalog}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </button>
                  <button
                    onClick={() => setShowNewCatalogForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Catalogs List */}
            <div className="space-y-6">
              {catalogs.map((catalog) => (
                <CatalogCard
                  key={catalog.id}
                  catalog={catalog}
                  isEditing={editingCatalog === catalog.id}
                  onEdit={() => setEditingCatalog(catalog.id)}
                  onSave={handleSaveCatalog}
                  onCancel={() => setEditingCatalog(null)}
                  onDelete={() => handleDeleteCatalog(catalog.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Hero Slide Card Component
const HeroSlideCard: React.FC<{
  slide: HeroSlide;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (slide: HeroSlide) => void;
  onCancel: () => void;
  onDelete: () => void;
}> = ({ slide, isEditing, onEdit, onSave, onCancel, onDelete }) => {
  const [editData, setEditData] = useState(slide);

  const handleSave = () => {
    onSave(editData);
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="px-3 py-2 border rounded-lg"
            placeholder="Título"
          />
          <input
            type="text"
            value={editData.subtitle}
            onChange={(e) => setEditData({...editData, subtitle: e.target.value})}
            className="px-3 py-2 border rounded-lg"
            placeholder="Subtítulo"
          />
          <input
            type="url"
            value={editData.backgroundImage}
            onChange={(e) => setEditData({...editData, backgroundImage: e.target.value})}
            className="px-3 py-2 border rounded-lg"
            placeholder="URL da Imagem"
          />
          <input
            type="text"
            value={editData.ctaText}
            onChange={(e) => setEditData({...editData, ctaText: e.target.value})}
            className="px-3 py-2 border rounded-lg"
            placeholder="Texto do Botão"
          />
        </div>
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({...editData, description: e.target.value})}
          rows={3}
          className="w-full mt-4 px-3 py-2 border rounded-lg"
          placeholder="Descrição"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={slide.backgroundImage}
          alt={slide.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{slide.title} {slide.subtitle}</h3>
          <p className="text-sm text-gray-600">{slide.description}</p>
          <span className="text-xs text-gray-500">CTA: {slide.ctaText}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 p-2"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 p-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Enhanced Catalog Card Component
const CatalogCard: React.FC<{
  catalog: Catalog;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (catalog: Catalog) => void;
  onCancel: () => void;
  onDelete: () => void;
}> = ({ catalog, isEditing, onEdit, onSave, onCancel, onDelete }) => {
  const [editData, setEditData] = useState(catalog);

  const handleSave = () => {
    onSave(editData);
  };

  const addProduct = () => {
    setEditData({
      ...editData,
      products: [...editData.products, { name: '', image: '', description: '' }]
    });
  };

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = editData.products.map((product, i) => 
      i === index ? { ...product, [field]: value } : product
    );
    setEditData({ ...editData, products: updatedProducts });
  };

  const removeProduct = (index: number) => {
    setEditData({
      ...editData,
      products: editData.products.filter((_, i) => i !== index)
    });
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Editando: {catalog.name}</h3>
        
        <div className="space-y-4">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome do Catálogo"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="px-3 py-2 border rounded-lg"
            />
            <input
              type="url"
              placeholder="URL da Imagem Principal"
              value={editData.image}
              onChange={(e) => setEditData({...editData, image: e.target.value})}
              className="px-3 py-2 border rounded-lg"
            />
          </div>

          <textarea
            placeholder="Descrição Curta"
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <textarea
            placeholder="Descrição Completa"
            value={editData.fullDescription}
            onChange={(e) => setEditData({...editData, fullDescription: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg"
          />

          {/* Hero do Catálogo */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Hero da Página</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="URL da Imagem de Background do Hero"
                value={editData.heroImage}
                onChange={(e) => setEditData({...editData, heroImage: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Texto do Botão CTA"
                value={editData.heroCtaText}
                onChange={(e) => setEditData({...editData, heroCtaText: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Produtos */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Produtos do Catálogo</h4>
              <button
                onClick={addProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center"
              >
                <Plus className="w-3 h-3 mr-1" />
                Adicionar Produto
              </button>
            </div>
            
            <div className="space-y-3">
              {editData.products.map((product, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 border rounded bg-white">
                  <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={product.name}
                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="url"
                    placeholder="URL da Imagem"
                    value={product.image}
                    onChange={(e) => updateProduct(index, 'image', e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Descrição"
                    value={product.description}
                    onChange={(e) => updateProduct(index, 'description', e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <button
                    onClick={() => removeProduct(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div>
          <img
            src={catalog.image}
            alt={catalog.name}
            className="w-full h-32 object-cover rounded"
          />
          <h3 className="font-semibold mt-2">{catalog.name}</h3>
          <p className="text-sm text-gray-600">{catalog.description}</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Hero da Página</h4>
          <img
            src={catalog.heroImage}
            alt="Hero"
            className="w-full h-20 object-cover rounded mb-2"
          />
          <p className="text-xs text-gray-600">CTA: {catalog.heroCtaText}</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Produtos ({catalog.products.length})</h4>
          <div className="grid grid-cols-3 gap-1">
            {catalog.products.slice(0, 3).map((product, index) => (
              <div key={index} className="text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-12 object-cover rounded"
                />
                <p className="text-xs text-gray-600 mt-1 truncate">{product.name}</p>
              </div>
            ))}
          </div>
          {catalog.products.length > 3 && (
            <p className="text-xs text-gray-500 mt-1">+{catalog.products.length - 3} mais</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 p-4 bg-gray-50">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 p-2"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 p-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
