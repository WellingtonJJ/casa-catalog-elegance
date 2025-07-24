import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { 
  Plus, Edit, Trash2, Save, X, Loader2, Eye, Image, Users, 
  BarChart3, Settings, HelpCircle, ExternalLink, Power, PowerOff,
  ChevronDown, LayoutGrid, List
} from 'lucide-react';
import { useHeroSlides, HeroSlide } from '@/hooks/useHeroSlides';
import { useCatalogs, Catalog, CatalogProduct } from '@/hooks/useCatalogs';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from './ImageUpload';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [editingCatalog, setEditingCatalog] = useState<string | null>(null);
  const [showNewSlideForm, setShowNewSlideForm] = useState(false);
  const [showNewCatalogForm, setShowNewCatalogForm] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { slides, loading: slidesLoading, addSlide, updateSlide, deleteSlide } = useHeroSlides();
  const { catalogs, loading: catalogsLoading, addCatalog, updateCatalog, deleteCatalog, refetch } = useCatalogs();

  const [newSlide, setNewSlide] = useState<Omit<HeroSlide, 'id'>>({
    title: '',
    subtitle: '',
    description: '',
    background_image: '',
    cta_text: '',
    display_order: 0
  });

  const [newCatalog, setNewCatalog] = useState<Omit<Catalog, 'id' | 'products'> & { products: Omit<CatalogProduct, 'id' | 'catalog_id'>[] }>({
    name: '',
    image: '',
    description: '',
    full_description: '',
    hero_image: '',
    hero_cta_text: '',
    active: true,
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
  const handleSaveSlide = async (slideData: HeroSlide) => {
    try {
      await updateSlide(slideData.id, slideData);
      setEditingSlide(null);
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleAddSlide = async () => {
    if (!newSlide.title || !newSlide.background_image) {
      toast({
        title: "Erro",
        description: "Título e imagem são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const maxOrder = Math.max(...slides.map(s => s.display_order), 0);
      await addSlide({
        ...newSlide,
        display_order: maxOrder + 1
      });
      
      setNewSlide({
        title: '',
        subtitle: '',
        description: '',
        background_image: '',
        cta_text: '',
        display_order: 0
      });
      setShowNewSlideForm(false);
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este slide? Esta ação não pode ser desfeita.')) {
      try {
        await deleteSlide(id);
      } catch (error) {
        // Error already handled in hook
      }
    }
  };

  // Catalogs Management
  const handleSaveCatalog = async (catalogData: Catalog) => {
    try {
      await updateCatalog(catalogData.id, catalogData);
      setEditingCatalog(null);
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleAddCatalog = async () => {
    if (!newCatalog.name || !newCatalog.image || !newCatalog.hero_image) {
      toast({
        title: "Erro",
        description: "Nome, imagem e imagem do hero são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { products, ...catalogToAdd } = newCatalog;
      
      console.log('Adding catalog with products:', { catalogToAdd, products });
      
      // Use the updated addCatalog function that handles products
      await addCatalog(catalogToAdd, products);
      
      // Reset form
      setNewCatalog({
        name: '',
        image: '',
        description: '',
        full_description: '',
        hero_image: '',
        hero_cta_text: '',
        active: true,
        products: []
      });
      setShowNewCatalogForm(false);
    } catch (error) {
      console.error('Error in handleAddCatalog:', error);
    }
  };

  const handleDeleteCatalog = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este catálogo? Esta ação não pode ser desfeita.')) {
      try {
        await deleteCatalog(id);
      } catch (error) {
        // Error already handled in hook
      }
    }
  };

  const handleToggleCatalogActive = async (catalog: Catalog) => {
    try {
      const newActiveState = !catalog.active;
      await updateCatalog(catalog.id, { active: newActiveState });
      toast({
        title: newActiveState ? "Catálogo ativado!" : "Catálogo desativado!",
        description: `O catálogo foi ${newActiveState ? 'ativado' : 'desativado'} com sucesso.`,
      });
    } catch (error) {
      console.error('Error toggling catalog active state:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do catálogo.",
        variant: "destructive",
      });
    }
  };

  const handlePreviewCatalog = (catalogId: string) => {
    window.open(`/catalog/${catalogId}`, '_blank');
  };

  // Calculate stats for overview
  const totalSlides = slides.length;
  const totalCatalogs = catalogs.length;
  const activeCatalogs = catalogs.filter(catalog => catalog.active).length;
  const totalProducts = catalogs.reduce((sum, catalog) => sum + (catalog.products?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg flex items-center justify-center mr-3">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-playfair text-xl font-bold">
                    Painel Administrativo
                  </h1>
                  <p className="text-xs text-gray-300 font-poppins">ImpoRio - Casa Premium</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.open('/', '_blank')}
                className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors font-poppins text-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Site
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-poppins text-sm"
              >
                <i className="fas fa-sign-out-alt w-4 h-4 mr-2"></i>
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Improved Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white p-1 rounded-xl shadow">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 font-poppins ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 font-poppins ${
                activeTab === 'hero'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Image className="w-4 h-4 mr-2" />
              Slides
            </button>
            <button
              onClick={() => setActiveTab('catalogs')}
              className={`flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 font-poppins ${
                activeTab === 'catalogs'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-book w-4 h-4 mr-2"></i>
              Catálogos
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-white shadow-lg">
              <h2 className="text-3xl font-bold font-playfair mb-2">Bem-vindo ao Painel!</h2>
              <p className="text-gold-100 font-poppins text-lg max-w-3xl">
                Gerencie facilmente o conteúdo do seu site. Use as abas acima para navegar entre as diferentes seções.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow border border-gray-100 transition-transform hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Slides Ativos</p>
                    <p className="text-3xl font-bold text-gray-900 font-playfair">{totalSlides}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Image className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-poppins">Slides na página inicial</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow border border-gray-100 transition-transform hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Catálogos Totais</p>
                    <p className="text-3xl font-bold text-gray-900 font-playfair">{totalCatalogs}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-book text-green-600 text-xl"></i>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-poppins">Catálogos disponíveis</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow border border-gray-100 transition-transform hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Catálogos Ativos</p>
                    <p className="text-3xl font-bold text-gray-900 font-playfair">{activeCatalogs}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Power className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-poppins">Visíveis no site</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow border border-gray-100 transition-transform hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Produtos Total</p>
                    <p className="text-3xl font-bold text-gray-900 font-playfair">{totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-poppins">Em todos os catálogos</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-playfair">Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('hero')}
                  className="flex items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold-300 hover:bg-gold-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center mr-4">
                    <Plus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800 font-poppins">Adicionar Novo Slide</p>
                    <p className="text-sm text-gray-500 font-poppins">Para a página inicial</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('catalogs')}
                  className="flex items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold-300 hover:bg-gold-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center mr-4">
                    <Plus className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800 font-poppins">Criar Novo Catálogo</p>
                    <p className="text-sm text-gray-500 font-poppins">Com produtos</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2 font-playfair">Como usar este painel</h3>
                  <ul className="text-blue-700 space-y-1 font-poppins text-sm">
                    <li>• Use "Slides" para gerenciar as imagens e textos que aparecem no topo do site</li>
                    <li>• Use "Catálogos" para criar e editar os catálogos que os clientes veem</li>
                    <li>• Sempre preencha os campos obrigatórios antes de salvar</li>
                    <li>• Use imagens de boa qualidade (recomendado: mínimo 1200px de largura)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Carousel Management */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 font-playfair">
                  Slides da Página Inicial
                </h2>
                <p className="text-gray-600 font-poppins mt-1">
                  Gerencie as imagens e textos que aparecem no topo da página inicial
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowNewSlideForm(true)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white rounded-lg font-poppins transition-all shadow-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Slide
                </button>
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button 
                    onClick={() => setViewMode('grid')} 
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500'}`}
                    title="Visualização em grade"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-500'}`}
                    title="Visualização em lista"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {slidesLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gold-600" />
                <span className="ml-3 text-gray-600 font-poppins">Carregando slides...</span>
              </div>
            ) : (
              <>
                {/* New Slide Form */}
                {showNewSlideForm && (
                  <div className="mb-6 p-6 border-2 border-dashed border-gold-200 rounded-xl bg-gold-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Plus className="w-5 h-5 text-gold-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gold-800 font-playfair">Adicionar Novo Slide</h3>
                      </div>
                      <button 
                        onClick={() => setShowNewSlideForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                          Título Principal *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Bem-vindo à EmpoRio"
                          value={newSlide.title}
                          onChange={(e) => setNewSlide({...newSlide, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Casa Premium"
                          value={newSlide.subtitle || ''}
                          onChange={(e) => setNewSlide({...newSlide, subtitle: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <ImageUpload
                          value={newSlide.background_image}
                          onChange={(url) => setNewSlide({...newSlide, background_image: url})}
                          folder="slides"
                          label="Imagem de Fundo"
                          required
                          placeholder="URL da imagem de fundo do slide"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                          Texto do Botão
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Ver Produtos"
                          value={newSlide.cta_text || ''}
                          onChange={(e) => setNewSlide({...newSlide, cta_text: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                        Descrição
                      </label>
                      <textarea
                        placeholder="Descreva o que este slide representa..."
                        value={newSlide.description || ''}
                        onChange={(e) => setNewSlide({...newSlide, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
                      />
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleAddSlide}
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-poppins transition-colors shadow"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Slide
                      </button>
                      <button
                        onClick={() => setShowNewSlideForm(false)}
                        className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-poppins transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Slides List */}
                {slides.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 font-playfair mb-2">Nenhum slide criado</h3>
                    <p className="text-gray-500 font-poppins">Clique em "Novo Slide" para começar</p>
                  </div>
                ) : (
                  <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}`}>
                    {slides.map((slide) => (
                      <HeroSlideCard
                        key={slide.id}
                        slide={slide}
                        viewMode={viewMode}
                        isEditing={editingSlide === slide.id}
                        onEdit={() => setEditingSlide(slide.id)}
                        onSave={handleSaveSlide}
                        onCancel={() => setEditingSlide(null)}
                        onDelete={() => handleDeleteSlide(slide.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Catalogs Management */}
        {activeTab === 'catalogs' && (
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 font-playfair">
                  Catálogos e Produtos
                </h2>
                <p className="text-gray-600 font-poppins mt-1">
                  Crie e gerencie os catálogos que seus clientes verão
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowNewCatalogForm(true)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white rounded-lg font-poppins transition-all shadow-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Catálogo
                </button>
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button 
                    onClick={() => setViewMode('grid')} 
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500'}`}
                    title="Visualização em grade"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-500'}`}
                    title="Visualização em lista"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {catalogsLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gold-600" />
                <span className="ml-3 text-gray-600 font-poppins">Carregando catálogos...</span>
              </div>
            ) : (
              <>
                {/* New Catalog Form */}
                {showNewCatalogForm && (
                  <NewCatalogForm
                    newCatalog={newCatalog}
                    setNewCatalog={setNewCatalog}
                    onSave={handleAddCatalog}
                    onCancel={() => setShowNewCatalogForm(false)}
                  />
                )}

                {/* Catalogs List */}
                {catalogs.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <i className="fas fa-book text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-lg font-medium text-gray-600 font-playfair mb-2">Nenhum catálogo criado</h3>
                    <p className="text-gray-500 font-poppins">Clique em "Novo Catálogo" para começar</p>
                  </div>
                ) : (
                  <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}`}>
                    {catalogs.map((catalog) => (
                      <CatalogCard
                        key={catalog.id}
                        catalog={catalog}
                        viewMode={viewMode}
                        isEditing={editingCatalog === catalog.id}
                        onEdit={() => setEditingCatalog(catalog.id)}
                        onSave={handleSaveCatalog}
                        onCancel={() => setEditingCatalog(null)}
                        onDelete={() => handleDeleteCatalog(catalog.id)}
                        onToggleActive={() => handleToggleCatalogActive(catalog)}
                        onPreview={() => handlePreviewCatalog(catalog.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Hero Slide Card Component with improved UI and ImageUpload
const HeroSlideCard: React.FC<{
  slide: HeroSlide;
  viewMode: 'grid' | 'list';
  isEditing: boolean;
  onEdit: () => void;
  onSave: (slide: HeroSlide) => void;
  onCancel: () => void;
  onDelete: () => void;
}> = ({ slide, viewMode, isEditing, onEdit, onSave, onCancel, onDelete }) => {
  const [editData, setEditData] = useState(slide);

  const handleSave = () => {
    onSave(editData);
  };

  if (isEditing) {
    return (
      <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Edit className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800 font-playfair">Editando Slide</h3>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Título Principal</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
              placeholder="Título"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Subtítulo</label>
            <input
              type="text"
              value={editData.subtitle || ''}
              onChange={(e) => setEditData({...editData, subtitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
              placeholder="Subtítulo"
            />
          </div>
          <div className="md:col-span-2">
            <ImageUpload
              value={editData.background_image}
              onChange={(url) => setEditData({...editData, background_image: url})}
              folder="slides"
              label="Imagem de Fundo"
              required
              placeholder="URL da imagem de fundo do slide"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Texto do Botão</label>
            <input
              type="text"
              value={editData.cta_text || ''}
              onChange={(e) => setEditData({...editData, cta_text: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
              placeholder="Texto do Botão"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Descrição</label>
          <textarea
            value={editData.description || ''}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
            placeholder="Descrição"
          />
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-poppins transition-colors shadow"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </button>
          <button
            onClick={onCancel}
            className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-poppins transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return viewMode === 'grid' ? (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative h-40">
        <img
          src={slide.background_image}
          alt={slide.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x160?text=Imagem+Slide';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <h3 className="font-semibold text-white font-playfair text-lg truncate">
            {slide.title}
          </h3>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        {slide.subtitle && (
          <p className="text-gold-600 font-poppins text-sm mb-2">{slide.subtitle}</p>
        )}
        <p className="text-gray-600 font-poppins text-sm mb-3 line-clamp-2">{slide.description}</p>
        {slide.cta_text && (
          <span className="inline-block mt-auto px-2 py-1 bg-gold-100 text-gold-800 text-xs rounded font-poppins w-fit">
            Botão: {slide.cta_text}
          </span>
        )}
        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar slide"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir slide"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row items-start p-4">
        <img
          src={slide.background_image}
          alt={slide.title}
          className="w-full md:w-32 h-32 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/128x128?text=Imagem';
          }}
        />
        <div className="ml-0 md:ml-4 mt-3 md:mt-0 flex-1">
          <h3 className="font-semibold text-gray-800 font-playfair text-lg">
            {slide.title} {slide.subtitle && <span className="text-gold-600">{slide.subtitle}</span>}
          </h3>
          <p className="text-gray-600 font-poppins text-sm mt-1">{slide.description}</p>
          {slide.cta_text && (
            <span className="inline-block mt-2 px-2 py-1 bg-gold-100 text-gold-800 text-xs rounded font-poppins">
              Botão: {slide.cta_text}
            </span>
          )}
        </div>
        <div className="flex gap-2 mt-3 md:mt-0 ml-auto">
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar slide"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir slide"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// New Catalog Form Component with ImageUpload
const NewCatalogForm: React.FC<{
  newCatalog: any;
  setNewCatalog: (catalog: any) => void;
  onSave: () => void;
  onCancel: () => void;
}> = ({ newCatalog, setNewCatalog, onSave, onCancel }) => {
  const addProduct = () => {
    setNewCatalog({
      ...newCatalog,
      products: [...(newCatalog.products || []), { 
        name: '', 
        image: '', 
        description: '', 
        display_order: 0,
        quantity: 0,
        sku: ''
      }]
    });
  };

  const updateProduct = (index: number, field: string, value: string | number) => {
    const updatedProducts = (newCatalog.products || []).map((product: any, i: number) => 
      i === index ? { ...product, [field]: value } : product
    );
    setNewCatalog({ ...newCatalog, products: updatedProducts });
  };

  const removeProduct = (index: number) => {
    setNewCatalog({
      ...newCatalog,
      products: (newCatalog.products || []).filter((_: any, i: number) => i !== index)
    });
  };

  return (
    <div className="mb-6 p-6 border-2 border-dashed border-gold-200 rounded-xl bg-gold-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Plus className="w-5 h-5 text-gold-600 mr-2" />
          <h3 className="text-lg font-semibold text-gold-800 font-playfair">Adicionar Novo Catálogo</h3>
        </div>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Nome do Catálogo *</label>
            <input
              type="text"
              placeholder="Ex: Utensílios de Cozinha"
              value={newCatalog.name}
              onChange={(e) => setNewCatalog({...newCatalog, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageUpload
            value={newCatalog.image}
            onChange={(url) => setNewCatalog({...newCatalog, image: url})}
            folder="catalogs"
            label="Imagem Principal"
            required
            placeholder="Imagem que aparece na listagem de catálogos"
          />
          <ImageUpload
            value={newCatalog.hero_image}
            onChange={(url) => setNewCatalog({...newCatalog, hero_image: url})}
            folder="catalogs/hero"
            label="Imagem de Fundo do Hero"
            required
            placeholder="Imagem de fundo da página do catálogo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Descrição Curta</label>
          <textarea
            placeholder="Descrição que aparece na listagem de catálogos"
            value={newCatalog.description || ''}
            onChange={(e) => setNewCatalog({...newCatalog, description: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Descrição Completa</label>
          <textarea
            placeholder="Descrição detalhada que aparece na página do catálogo"
            value={newCatalog.full_description || ''}
            onChange={(e) => setNewCatalog({...newCatalog, full_description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Texto do Botão CTA</label>
          <input
            type="text"
            placeholder="Ex: Entrar em Contato"
            value={newCatalog.hero_cta_text || ''}
            onChange={(e) => setNewCatalog({...newCatalog, hero_cta_text: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
          />
        </div>

        {/* Produtos */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold font-playfair text-gray-800">Produtos do Catálogo</h4>
            <button
              onClick={addProduct}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center font-poppins transition-colors shadow"
            >
              <Plus className="w-3 h-3 mr-1" />
              Adicionar Produto
            </button>
          </div>
          
          <div className="space-y-4">
            {(newCatalog.products || []).map((product: any, index: number) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-poppins">Nome do Produto</label>
                    <input
                      type="text"
                      placeholder="Nome do Produto"
                      value={product.name}
                      onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-poppins">Descrição</label>
                    <input
                      type="text"
                      placeholder="Descrição do produto"
                      value={product.description || ''}
                      onChange={(e) => updateProduct(index, 'description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-poppins">SKU</label>
                    <input
                      type="text"
                      placeholder="SKU do produto"
                      value={product.sku || ''}
                      onChange={(e) => updateProduct(index, 'sku', e.target.value.toUpperCase())}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-poppins">Quantidade</label>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={product.quantity || 0}
                      onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                    />
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <ImageUpload
                      value={product.image}
                      onChange={(url) => updateProduct(index, 'image', url)}
                      folder="products"
                      label="Imagem do Produto"
                      placeholder="Imagem do produto"
                    />
                  </div>
                  <button
                    onClick={() => removeProduct(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center transition-colors h-10"
                    title="Remover produto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {(!newCatalog.products || newCatalog.products.length === 0) && (
              <p className="text-gray-500 text-sm italic font-poppins text-center py-4">
                Nenhum produto adicionado ainda. Clique em "Adicionar Produto" para começar.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={onSave}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg flex items-center font-poppins transition-colors shadow"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Catálogo
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center font-poppins transition-colors"
        >
          <X className="w-4 h-4 mr-2" />
          Cancelar
        </button>
      </div>
    </div>
  );
};

const CatalogCard: React.FC<{
  catalog: Catalog;
  viewMode: 'grid' | 'list';
  isEditing: boolean;
  onEdit: () => void;
  onSave: (catalog: Catalog) => void;
  onCancel: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  onPreview: () => void;
}> = ({ catalog, viewMode, isEditing, onEdit, onSave, onCancel, onDelete, onToggleActive, onPreview }) => {
  const [editData, setEditData] = useState(catalog);
  const [expanded, setExpanded] = useState(false);

  const handleSave = () => {
    onSave(editData);
  };

  const addProduct = () => {
    setEditData({
      ...editData,
      products: [...(editData.products || []), { 
        id: '', 
        catalog_id: editData.id, 
        name: '', 
        image: '', 
        description: '', 
        display_order: 0,
        quantity: 0,
        sku: ''
      }]
    });
  };

  const updateProduct = (index: number, field: keyof CatalogProduct, value: string | number) => {
    const updatedProducts = (editData.products || []).map((product, i) => 
      i === index ? { ...product, [field]: value } : product
    );
    setEditData({ ...editData, products: updatedProducts });
  };

  const removeProduct = (index: number) => {
    setEditData({
      ...editData,
      products: (editData.products || []).filter((_, i) => i !== index)
    });
  };

  if (isEditing) {
    return (
      <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Edit className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800 font-playfair">Editando: {catalog.name}</h3>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Nome do Catálogo</label>
              <input
                type="text"
                placeholder="Nome do Catálogo"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={editData.active}
                onChange={(e) => setEditData({...editData, active: e.target.checked})}
                className="sr-only"
              />
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                editData.active ? 'bg-green-600' : 'bg-gray-200'
              }`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  editData.active ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 font-poppins">
                {editData.active ? 'Catálogo Ativo' : 'Catálogo Inativo'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload
              value={editData.image}
              onChange={(url) => setEditData({...editData, image: url})}
              folder="catalogs"
              label="Imagem Principal"
              required
              placeholder="Imagem que aparece na listagem"
            />
            <ImageUpload
              value={editData.hero_image}
              onChange={(url) => setEditData({...editData, hero_image: url})}
              folder="catalogs/hero"
              label="Imagem de Fundo do Hero"
              required
              placeholder="Imagem de fundo da página do catálogo"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Descrição Curta</label>
              <textarea
                placeholder="Descrição Curta"
                value={editData.description || ''}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Descrição Completa</label>
              <textarea
                placeholder="Descrição Completa"
                value={editData.full_description || ''}
                onChange={(e) => setEditData({...editData, full_description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Texto do Botão CTA</label>
            <input
              type="text"
              placeholder="Texto do Botão CTA"
              value={editData.hero_cta_text || ''}
              onChange={(e) => setEditData({...editData, hero_cta_text: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
            />
          </div>

          {/* Produtos */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold font-playfair text-gray-800">Produtos do Catálogo</h4>
              <button
                onClick={addProduct}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded text-sm flex items-center font-poppins transition-colors shadow"
              >
                <Plus className="w-3 h-3 mr-1" />
                Adicionar Produto
              </button>
            </div>
            
            <div className="space-y-4">
              {(editData.products || []).map((product, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded bg-white space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 font-poppins">Nome</label>
                      <input
                        type="text"
                        placeholder="Nome do Produto"
                        value={product.name}
                        onChange={(e) => updateProduct(index, 'name', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 font-poppins">Descrição</label>
                      <input
                        type="text"
                        placeholder="Descrição"
                        value={product.description || ''}
                        onChange={(e) => updateProduct(index, 'description', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 font-poppins">SKU</label>
                      <input
                        type="text"
                        placeholder="SKU do produto"
                        value={product.sku || ''}
                        onChange={(e) => updateProduct(index, 'sku', e.target.value.toUpperCase())}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 font-poppins">Quantidade</label>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        value={product.quantity || 0}
                        onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                      />
                    </div>
                  </div>
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <ImageUpload
                        value={product.image}
                        onChange={(url) => updateProduct(index, 'image', url)}
                        folder="products"
                        label="Imagem do Produto"
                        placeholder="Imagem do produto"
                      />
                    </div>
                    <button
                      onClick={() => removeProduct(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center transition-colors h-10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg flex items-center font-poppins transition-colors shadow"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center font-poppins transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return viewMode === 'grid' ? (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative h-48">
        <img
          src={catalog.image}
          alt={catalog.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x192?text=Imagem+Catálogo';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <div>
            <h3 className="font-semibold text-white font-playfair text-lg truncate">
              {catalog.name}
            </h3>
            <span className={`inline-flex items-center mt-1 px-2 py-1 rounded-full text-xs ${
              catalog.active 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {catalog.active ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-gray-600 font-poppins text-sm mb-3 line-clamp-2">{catalog.description}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-poppins">
            {catalog.products?.length || 0} produtos
          </span>
          <div className="flex gap-2">
            <button
              onClick={onPreview}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Visualizar catálogo"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleActive}
              className={`p-2 rounded-lg transition-colors ${
                catalog.active 
                  ? 'text-orange-600 hover:bg-orange-50' 
                  : 'text-green-600 hover:bg-green-50'
              }`}
              title={catalog.active ? 'Desativar catálogo' : 'Ativar catálogo'}
            >
              {catalog.active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar catálogo"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row items-start p-4">
        <img
          src={catalog.image}
          alt={catalog.name}
          className="w-full md:w-32 h-32 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/128x128?text=Catálogo';
          }}
        />
        <div className="ml-0 md:ml-4 mt-3 md:mt-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-800 font-playfair text-lg">
              {catalog.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              catalog.active 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {catalog.active ? (
                <>
                  <Power className="w-3 h-3 mr-1" />
                  Ativo
                </>
              ) : (
                <>
                  <PowerOff className="w-3 h-3 mr-1" />
                  Inativo
                </>
              )}
            </span>
          </div>
          <p className="text-gray-600 font-poppins text-sm mt-1">{catalog.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-poppins">
              {catalog.products?.length || 0} produtos
            </span>
            {catalog.hero_cta_text && (
              <span className="inline-block px-2 py-1 bg-gold-100 text-gold-800 text-xs rounded font-poppins">
                CTA: {catalog.hero_cta_text}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-3 md:mt-0 ml-auto">
          <button
            onClick={onPreview}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Visualizar catálogo"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleActive}
            className={`p-2 rounded-lg transition-colors ${
              catalog.active 
                ? 'text-orange-600 hover:bg-orange-50' 
                : 'text-green-600 hover:bg-green-50'
            }`}
            title={catalog.active ? 'Desativar catálogo' : 'Ativar catálogo'}
          >
            {catalog.active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar catálogo"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir catálogo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
