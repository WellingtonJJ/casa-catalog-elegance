
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, Loader2, Eye, Image, Users, BarChart3, Settings, HelpCircle } from 'lucide-react';
import { useHeroSlides, HeroSlide } from '@/hooks/useHeroSlides';
import { useCatalogs, Catalog, CatalogProduct } from '@/hooks/useCatalogs';
import { supabase } from '@/integrations/supabase/client';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [editingCatalog, setEditingCatalog] = useState<string | null>(null);
  const [showNewSlideForm, setShowNewSlideForm] = useState(false);
  const [showNewCatalogForm, setShowNewCatalogForm] = useState(false);
  
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
      
      // Create the catalog first
      const catalog = await addCatalog(catalogToAdd);
      
      // If there are products, add them directly using Supabase
      if (products && products.length > 0) {
        const productsToInsert = products.map((product, index) => ({
          catalog_id: catalog.id,
          name: product.name,
          image: product.image,
          description: product.description,
          display_order: index + 1
        }));

        const { error: productsError } = await supabase
          .from('catalog_products')
          .insert(productsToInsert);

        if (productsError) {
          console.error('Error adding products:', productsError);
          toast({
            title: "Aviso",
            description: "Catálogo criado, mas houve erro ao adicionar alguns produtos. Você pode editá-los posteriormente.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Catálogo criado!",
            description: `Catálogo criado com sucesso com ${products.length} produtos.`,
          });
        }
      } else {
        toast({
          title: "Catálogo criado!",
          description: "Catálogo criado com sucesso.",
        });
      }
      
      // Refresh the catalogs list to show the new catalog with products
      await refetch();
      
      // Reset form
      setNewCatalog({
        name: '',
        image: '',
        description: '',
        full_description: '',
        hero_image: '',
        hero_cta_text: '',
        products: []
      });
      setShowNewCatalogForm(false);
    } catch (error) {
      console.error('Error adding catalog:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o catálogo.",
        variant: "destructive",
      });
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

  // Calculate stats for overview
  const totalSlides = slides.length;
  const totalCatalogs = catalogs.length;
  const totalProducts = catalogs.reduce((sum, catalog) => sum + (catalog.products?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg flex items-center justify-center mr-3">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-playfair text-xl font-bold text-gray-800">
                    Painel Administrativo
                  </h1>
                  <p className="text-xs text-gray-500 font-poppins">EmpoRio - Casa Premium</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.open('/', '_blank')}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-poppins text-sm"
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
          <nav className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center px-4 py-3 rounded-md font-medium text-sm transition-all duration-200 font-poppins ${
                activeTab === 'overview'
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`flex items-center px-4 py-3 rounded-md font-medium text-sm transition-all duration-200 font-poppins ${
                activeTab === 'hero'
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Image className="w-4 h-4 mr-2" />
              Slides da Página Inicial
            </button>
            <button
              onClick={() => setActiveTab('catalogs')}
              className={`flex items-center px-4 py-3 rounded-md font-medium text-sm transition-all duration-200 font-poppins ${
                activeTab === 'catalogs'
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-book w-4 h-4 mr-2"></i>
              Catálogos e Produtos
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold font-playfair mb-2">Bem-vindo ao Painel!</h2>
              <p className="text-gold-100 font-poppins text-lg">
                Gerencie facilmente o conteúdo do seu site. Use as abas acima para navegar entre as diferentes seções.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Slides Ativos</p>
                    <p className="text-3xl font-bold text-gray-900 font-playfair">{totalSlides}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-poppins">Slides na página inicial</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Catálogos</p>
                    <p className="text-3xl font-bold text-gray-900 font-playfair">{totalCatalogs}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-book text-green-600 text-xl"></i>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-poppins">Catálogos disponíveis</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Produtos Total</p>
                    <p className="text-3xl font-bold text-gray-900 font-playfair">{totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-poppins">Em todos os catálogos</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-playfair">Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('hero')}
                  className="flex items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-gold-300 hover:bg-gold-50 transition-colors group"
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
                  className="flex items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-gold-300 hover:bg-gold-50 transition-colors group"
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
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2 font-playfair">Como usar este painel</h3>
                  <ul className="text-blue-700 space-y-1 font-poppins text-sm">
                    <li>• Use "Slides da Página Inicial" para gerenciar as imagens e textos que aparecem no topo do site</li>
                    <li>• Use "Catálogos e Produtos" para criar e editar os catálogos que os clientes veem</li>
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 font-playfair">
                  Slides da Página Inicial
                </h2>
                <p className="text-gray-600 font-poppins mt-1">
                  Gerencie as imagens e textos que aparecem no topo da página inicial
                </p>
              </div>
              <button
                onClick={() => setShowNewSlideForm(true)}
                className="flex items-center px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-poppins transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Slide
              </button>
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
                  <div className="mb-6 p-6 border-2 border-dashed border-gold-200 rounded-lg bg-gold-50">
                    <div className="flex items-center mb-4">
                      <Plus className="w-5 h-5 text-gold-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gold-800 font-playfair">Adicionar Novo Slide</h3>
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                          URL da Imagem de Fundo *
                        </label>
                        <input
                          type="url"
                          placeholder="https://exemplo.com/imagem.jpg"
                          value={newSlide.background_image}
                          onChange={(e) => setNewSlide({...newSlide, background_image: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
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
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-poppins transition-colors"
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
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 font-playfair mb-2">Nenhum slide criado</h3>
                    <p className="text-gray-500 font-poppins">Clique em "Novo Slide" para começar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {slides.map((slide) => (
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
                )}
              </>
            )}
          </div>
        )}

        {/* Catalogs Management */}
        {activeTab === 'catalogs' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 font-playfair">
                  Catálogos e Produtos
                </h2>
                <p className="text-gray-600 font-poppins mt-1">
                  Crie e gerencie os catálogos que seus clientes verão
                </p>
              </div>
              <button
                onClick={() => setShowNewCatalogForm(true)}
                className="flex items-center px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-poppins transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Catálogo
              </button>
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
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <i className="fas fa-book text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-lg font-medium text-gray-600 font-playfair mb-2">Nenhum catálogo criado</h3>
                    <p className="text-gray-500 font-poppins">Clique em "Novo Catálogo" para começar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
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
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Hero Slide Card Component with improved UI
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
      <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
        <div className="flex items-center mb-4">
          <Edit className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-blue-800 font-playfair">Editando Slide</h3>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">URL da Imagem</label>
            <input
              type="url"
              value={editData.background_image}
              onChange={(e) => setEditData({...editData, background_image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
              placeholder="URL da Imagem"
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
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-poppins transition-colors"
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

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center p-4">
        <img
          src={slide.background_image}
          alt={slide.title}
          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Imagem';
          }}
        />
        <div className="ml-4 flex-1">
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
        <div className="flex gap-2 ml-4">
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

// New Catalog Form Component
const NewCatalogForm: React.FC<{
  newCatalog: any;
  setNewCatalog: (catalog: any) => void;
  onSave: () => void;
  onCancel: () => void;
}> = ({ newCatalog, setNewCatalog, onSave, onCancel }) => {
  const addProduct = () => {
    setNewCatalog({
      ...newCatalog,
      products: [...(newCatalog.products || []), { name: '', image: '', description: '', display_order: 0 }]
    });
  };

  const updateProduct = (index: number, field: string, value: string) => {
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
    <div className="mb-6 p-6 border-2 border-dashed border-gold-200 rounded-lg bg-gold-50">
      <div className="flex items-center mb-4">
        <Plus className="w-5 h-5 text-gold-600 mr-2" />
        <h3 className="text-lg font-semibold text-gold-800 font-playfair">Adicionar Novo Catálogo</h3>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">URL da Imagem Principal *</label>
            <input
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              value={newCatalog.image}
              onChange={(e) => setNewCatalog({...newCatalog, image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins"
            />
          </div>
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

        {/* Hero do Catálogo */}
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3 font-playfair text-gray-800">Hero da Página do Catálogo</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">URL da Imagem de Fundo *</label>
              <input
                type="url"
                placeholder="https://exemplo.com/hero-image.jpg"
                value={newCatalog.hero_image}
                onChange={(e) => setNewCatalog({...newCatalog, hero_image: e.target.value})}
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
          </div>
        </div>

        {/* Produtos */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold font-playfair text-gray-800">Produtos do Catálogo</h4>
            <button
              onClick={addProduct}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm flex items-center font-poppins transition-colors"
            >
              <Plus className="w-3 h-3 mr-1" />
              Adicionar Produto
            </button>
          </div>
          
          <div className="space-y-3">
            {(newCatalog.products || []).map((product: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 border border-gray-200 rounded-lg bg-white">
                <input
                  type="text"
                  placeholder="Nome do Produto"
                  value={product.name}
                  onChange={(e) => updateProduct(index, 'name', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                />
                <input
                  type="url"
                  placeholder="URL da Imagem"
                  value={product.image}
                  onChange={(e) => updateProduct(index, 'image', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={product.description || ''}
                  onChange={(e) => updateProduct(index, 'description', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                />
                <button
                  onClick={() => removeProduct(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm flex items-center justify-center transition-colors"
                  title="Remover produto"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            {(!newCatalog.products || newCatalog.products.length === 0) && (
              <p className="text-gray-500 text-sm italic font-poppins">Nenhum produto adicionado ainda. Clique em "Adicionar Produto" para começar.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={onSave}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center font-poppins transition-colors"
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
      products: [...(editData.products || []), { 
        id: '', 
        catalog_id: editData.id, 
        name: '', 
        image: '', 
        description: '', 
        display_order: 0 
      }]
    });
  };

  const updateProduct = (index: number, field: keyof CatalogProduct, value: string) => {
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
      <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
        <div className="flex items-center mb-4">
          <Edit className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-blue-800 font-playfair">Editando: {catalog.name}</h3>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">URL da Imagem Principal</label>
              <input
                type="url"
                placeholder="URL da Imagem Principal"
                value={editData.image}
                onChange={(e) => setEditData({...editData, image: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
              />
            </div>
          </div>

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

          {/* Hero do Catálogo */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 font-playfair text-gray-800">Hero da Página</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">URL da Imagem de Fundo</label>
                <input
                  type="url"
                  placeholder="URL da Imagem de Background do Hero"
                  value={editData.hero_image}
                  onChange={(e) => setEditData({...editData, hero_image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins"
                />
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
            </div>
          </div>

          {/* Produtos */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold font-playfair text-gray-800">Produtos do Catálogo</h4>
              <button
                onClick={addProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center font-poppins transition-colors"
              >
                <Plus className="w-3 h-3 mr-1" />
                Adicionar Produto
              </button>
            </div>
            
            <div className="space-y-3">
              {(editData.products || []).map((product, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 border border-gray-200 rounded bg-white">
                  <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={product.name}
                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                  />
                  <input
                    type="url"
                    placeholder="URL da Imagem"
                    value={product.image}
                    onChange={(e) => updateProduct(index, 'image', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                  />
                  <input
                    type="text"
                    placeholder="Descrição"
                    value={product.description || ''}
                    onChange={(e) => updateProduct(index, 'description', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm font-poppins"
                  />
                  <button
                    onClick={() => removeProduct(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm flex items-center justify-center transition-colors"
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
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center font-poppins transition-colors"
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

  // Card style similar to HeroSlideCard
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center p-4">
        <img
          src={catalog.image}
          alt={catalog.name}
          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Catálogo';
          }}
        />
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-gray-800 font-playfair text-lg">
            {catalog.name}
          </h3>
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
        <div className="flex gap-2 ml-4">
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
