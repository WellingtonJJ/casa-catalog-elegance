import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { useHeroSlides, HeroSlide } from '@/hooks/useHeroSlides';
import { useCatalogs, Catalog, CatalogProduct } from '@/hooks/useCatalogs';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [editingCatalog, setEditingCatalog] = useState<string | null>(null);
  const [showNewSlideForm, setShowNewSlideForm] = useState(false);
  const [showNewCatalogForm, setShowNewCatalogForm] = useState(false);
  
  const { slides, loading: slidesLoading, addSlide, updateSlide, deleteSlide } = useHeroSlides();
  const { catalogs, loading: catalogsLoading, addCatalog, updateCatalog, deleteCatalog } = useCatalogs();

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
    try {
      await deleteSlide(id);
    } catch (error) {
      // Error already handled in hook
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
      const catalog = await addCatalog(catalogToAdd);
      
      // Add products if any
      if (products.length > 0) {
        await updateCatalog(catalog.id, { products: products.map(p => ({
          ...p,
          id: '',
          catalog_id: catalog.id,
          display_order: 0
        })) });
      }
      
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
      // Error already handled in hook
    }
  };

  const handleDeleteCatalog = async (id: string) => {
    try {
      await deleteCatalog(id);
    } catch (error) {
      // Error already handled in hook
    }
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

            {slidesLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-gold-600" />
              </div>
            ) : (
              <>
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
                        value={newSlide.subtitle || ''}
                        onChange={(e) => setNewSlide({...newSlide, subtitle: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                      />
                      <input
                        type="url"
                        placeholder="URL da Imagem"
                        value={newSlide.background_image}
                        onChange={(e) => setNewSlide({...newSlide, background_image: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Texto do Botão"
                        value={newSlide.cta_text || ''}
                        onChange={(e) => setNewSlide({...newSlide, cta_text: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <textarea
                      placeholder="Descrição"
                      value={newSlide.description || ''}
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
              </>
            )}
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

            {catalogsLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-gold-600" />
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
              </>
            )}
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
            value={editData.subtitle || ''}
            onChange={(e) => setEditData({...editData, subtitle: e.target.value})}
            className="px-3 py-2 border rounded-lg"
            placeholder="Subtítulo"
          />
          <input
            type="url"
            value={editData.background_image}
            onChange={(e) => setEditData({...editData, background_image: e.target.value})}
            className="px-3 py-2 border rounded-lg"
            placeholder="URL da Imagem"
          />
          <input
            type="text"
            value={editData.cta_text || ''}
            onChange={(e) => setEditData({...editData, cta_text: e.target.value})}
            className="px-3 py-2 border rounded-lg"
            placeholder="Texto do Botão"
          />
        </div>
        <textarea
          value={editData.description || ''}
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
          src={slide.background_image}
          alt={slide.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{slide.title} {slide.subtitle}</h3>
          <p className="text-sm text-gray-600">{slide.description}</p>
          <span className="text-xs text-gray-500">CTA: {slide.cta_text}</span>
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
      products: [...newCatalog.products, { name: '', image: '', description: '', display_order: 0 }]
    });
  };

  const updateProduct = (index: number, field: string, value: string) => {
    const updatedProducts = newCatalog.products.map((product: any, i: number) => 
      i === index ? { ...product, [field]: value } : product
    );
    setNewCatalog({ ...newCatalog, products: updatedProducts });
  };

  const removeProduct = (index: number) => {
    setNewCatalog({
      ...newCatalog,
      products: newCatalog.products.filter((_: any, i: number) => i !== index)
    });
  };

  return (
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
          value={newCatalog.full_description}
          onChange={(e) => setNewCatalog({...newCatalog, full_description: e.target.value})}
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
              value={newCatalog.hero_image}
              onChange={(e) => setNewCatalog({...newCatalog, hero_image: e.target.value})}
              className="px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Texto do Botão CTA"
              value={newCatalog.hero_cta_text}
              onChange={(e) => setNewCatalog({...newCatalog, hero_cta_text: e.target.value})}
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
            {newCatalog.products.map((product: any, index: number) => (
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
          onClick={onSave}
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
            value={editData.description || ''}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <textarea
            placeholder="Descrição Completa"
            value={editData.full_description || ''}
            onChange={(e) => setEditData({...editData, full_description: e.target.value})}
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
                value={editData.hero_image}
                onChange={(e) => setEditData({...editData, hero_image: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Texto do Botão CTA"
                value={editData.hero_cta_text || ''}
                onChange={(e) => setEditData({...editData, hero_cta_text: e.target.value})}
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
              {(editData.products || []).map((product, index) => (
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
                    value={product.description || ''}
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
            src={catalog.hero_image}
            alt="Hero"
            className="w-full h-20 object-cover rounded mb-2"
          />
          <p className="text-xs text-gray-600">CTA: {catalog.hero_cta_text}</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Produtos ({catalog.products?.length || 0})</h4>
          <div className="grid grid-cols-3 gap-1">
            {(catalog.products || []).slice(0, 3).map((product, index) => (
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
          {(catalog.products?.length || 0) > 3 && (
            <p className="text-xs text-gray-500 mt-1">+{(catalog.products?.length || 0) - 3} mais</p>
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
