import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useHeroSlides } from '@/hooks/useHeroSlides';
import { useCatalogs } from '@/hooks/useCatalogs';
import { useBulkOperations } from '@/hooks/useBulkOperations';
import { ImageUpload } from './ImageUpload';
import { SearchFilter } from './SearchFilter';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { DragDropList } from './DragDropList';
import { CatalogCardSkeleton, HeroSlideSkeleton } from '@/components/ui/skeleton-catalog';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Grid3X3, 
  List, 
  Save,
  X,
  Upload,
  CheckSquare,
  Square
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SlideFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  slide?: any;
}

interface CatalogFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  catalog?: any;
}

const SlideForm: React.FC<SlideFormProps> = ({ show, onClose, onSubmit, slide }) => {
  const [newSlide, setNewSlide] = useState({
    title: slide?.title || '',
    subtitle: slide?.subtitle || '',
    description: slide?.description || '',
    background_image: slide?.background_image || '',
    cta_text: slide?.cta_text || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewSlide({ ...newSlide, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(newSlide);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${show ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{slide ? 'Editar Slide' : 'Novo Slide'}</h2>
          <Button onClick={onClose} variant="ghost"><X className="w-5 h-5" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
            <Input type="text" id="title" name="title" value={newSlide.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtítulo</label>
            <Input type="text" id="subtitle" name="subtitle" value={newSlide.subtitle} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
            <Textarea id="description" name="description" value={newSlide.description} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="background_image" className="block text-sm font-medium text-gray-700">Imagem de Fundo</label>
            <Input type="text" id="background_image" name="background_image" value={newSlide.background_image} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="cta_text" className="block text-sm font-medium text-gray-700">Texto do CTA</label>
            <Input type="text" id="cta_text" name="cta_text" value={newSlide.cta_text} onChange={handleChange} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-gold-600 hover:bg-gold-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CatalogForm: React.FC<CatalogFormProps> = ({ show, onClose, onSubmit, catalog }) => {
  const [newCatalog, setNewCatalog] = useState({
    name: catalog?.name || '',
    image: catalog?.image || '',
    description: catalog?.description || '',
    full_description: catalog?.full_description || '',
    hero_image: catalog?.hero_image || '',
    hero_cta_text: catalog?.hero_cta_text || '',
    active: catalog?.active || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewCatalog({ ...newCatalog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(newCatalog);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${show ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{catalog ? 'Editar Catálogo' : 'Novo Catálogo'}</h2>
          <Button onClick={onClose} variant="ghost"><X className="w-5 h-5" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <Input type="text" id="name" name="name" value={newCatalog.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagem</label>
            <Input type="text" id="image" name="image" value={newCatalog.image} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
            <Textarea id="description" name="description" value={newCatalog.description} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="full_description" className="block text-sm font-medium text-gray-700">Descrição Completa</label>
            <Textarea id="full_description" name="full_description" value={newCatalog.full_description} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="hero_image" className="block text-sm font-medium text-gray-700">Imagem Hero</label>
            <Input type="text" id="hero_image" name="hero_image" value={newCatalog.hero_image} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="hero_cta_text" className="block text-sm font-medium text-gray-700">Texto Hero CTA</label>
            <Input type="text" id="hero_cta_text" name="hero_cta_text" value={newCatalog.hero_cta_text} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="active" className="block text-sm font-medium text-gray-700">Ativo</label>
            <Checkbox id="active" checked={newCatalog.active} onCheckedChange={(checked) => setNewCatalog({ ...newCatalog, active: checked })} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-gold-600 hover:bg-gold-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { slides, loading: slidesLoading, addSlide, updateSlide, deleteSlide } = useHeroSlides();
  const { catalogs, loading: catalogsLoading, addCatalog, updateCatalog, deleteCatalog } = useCatalogs();
  
  // Bulk operations
  const catalogBulk = useBulkOperations();
  const slideBulk = useBulkOperations();
  
  // Search and filter states
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogFilters, setCatalogFilters] = useState<Record<string, string[]>>({
    status: [],
  });
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: "default" | "destructive";
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  // Form states
  const [showNewSlideForm, setShowNewSlideForm] = useState(false);
  const [showNewCatalogForm, setShowNewCatalogForm] = useState(false);
  const [newSlide, setNewSlide] = useState({
    title: '',
    subtitle: '',
    description: '',
    background_image: '',
    cta_text: '',
  });
  const [newCatalog, setNewCatalog] = useState({
    name: '',
    image: '',
    description: '',
    full_description: '',
    hero_image: '',
    hero_cta_text: '',
    active: false,
  });
  const [editingSlide, setEditingSlide] = useState(null);
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter catalogs based on search and filters
  const filteredCatalogs = catalogs.filter(catalog => {
    const matchesSearch = catalog.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                         catalog.description?.toLowerCase().includes(catalogSearch.toLowerCase());
    
    const matchesFilters = catalogFilters.status.length === 0 || 
                          catalogFilters.status.includes(catalog.active ? 'active' : 'inactive');
    
    return matchesSearch && matchesFilters;
  });

  const showConfirmDialog = (title: string, description: string, onConfirm: () => void, variant: "default" | "destructive" = "default") => {
    setConfirmDialog({
      open: true,
      title,
      description,
      onConfirm,
      variant,
    });
  };

  const handleDeleteCatalog = (id: string) => {
    showConfirmDialog(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este catálogo? Esta ação não pode ser desfeita.",
      () => deleteCatalog(id),
      "destructive"
    );
  };

  const handleDeleteSlide = (id: string) => {
    showConfirmDialog(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este slide? Esta ação não pode ser desfeita.",
      () => deleteSlide(id),
      "destructive"
    );
  };

  const handleBulkDeleteCatalogs = () => {
    showConfirmDialog(
      "Confirmar exclusão em lote",
      `Tem certeza que deseja excluir ${catalogBulk.selectedCount} catálogo(s)? Esta ação não pode ser desfeita.`,
      () => catalogBulk.bulkDelete(catalogs, deleteCatalog, "catálogo"),
      "destructive"
    );
  };

  const handleSlidesReorder = async (reorderedSlides: typeof slides) => {
    try {
      await Promise.all(
        reorderedSlides.map(slide => 
          updateSlide(slide.id, { display_order: slide.display_order })
        )
      );
      toast({
        title: "Ordem atualizada",
        description: "A ordem dos slides foi atualizada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a ordem dos slides.",
        variant: "destructive",
      });
    }
  };

  const handleNewSlideSubmit = async (slideData: any) => {
    try {
      if (editingSlide) {
        await updateSlide(editingSlide.id, slideData);
        toast({
          title: "Slide atualizado!",
          description: "Slide atualizado com sucesso.",
        });
      } else {
        await addSlide(slideData);
        toast({
          title: "Slide criado!",
          description: "Slide criado com sucesso.",
        });
      }
      setEditingSlide(null);
      setNewSlide({
        title: '',
        subtitle: '',
        description: '',
        background_image: '',
        cta_text: '',
      });
    } catch (error) {
      console.error("Error submitting new slide:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o slide.",
        variant: "destructive",
      });
    }
  };

  const handleNewCatalogSubmit = async (catalogData: any) => {
    try {
      if (editingCatalog) {
        await updateCatalog(editingCatalog.id, catalogData);
        toast({
          title: "Catálogo atualizado!",
          description: "Catálogo atualizado com sucesso.",
        });
      } else {
        await addCatalog(catalogData);
        toast({
          title: "Catálogo criado!",
          description: "Catálogo criado com sucesso.",
        });
      }
      setEditingCatalog(null);
      setNewCatalog({
        name: '',
        image: '',
        description: '',
        full_description: '',
        hero_image: '',
        hero_cta_text: '',
        active: false,
      });
    } catch (error) {
      console.error("Error submitting new catalog:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o catálogo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <Button onClick={onLogout} variant="outline">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Slides Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Slides do Hero</h2>
            <div className="flex gap-2">
              {slideBulk.selectedCount > 0 && (
                <Button
                  onClick={() => showConfirmDialog(
                    "Confirmar exclusão em lote",
                    `Tem certeza que deseja excluir ${slideBulk.selectedCount} slide(s)?`,
                    () => slideBulk.bulkDelete(slides, deleteSlide, "slide"),
                    "destructive"
                  )}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Selecionados ({slideBulk.selectedCount})
                </Button>
              )}
              <Button
                onClick={() => setShowNewSlideForm(true)}
                className="bg-gold-600 hover:bg-gold-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Slide
              </Button>
            </div>
          </div>

          {slidesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <HeroSlideSkeleton key={i} />)}
            </div>
          ) : (
            <DragDropList
              items={slides}
              onReorder={handleSlidesReorder}
              className="space-y-4"
              renderItem={(slide, isDragging) => (
                <Card className={`${isDragging ? 'opacity-50' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={slideBulk.selectedItems.has(slide.id)}
                        onCheckedChange={() => slideBulk.toggleItem(slide.id)}
                      />
                      <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden">
                        <img
                          src={slide.background_image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{slide.title}</h3>
                        <p className="text-sm text-gray-600">{slide.subtitle}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setEditingSlide(slide);
                            setNewSlide(slide);
                            setShowNewSlideForm(true);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteSlide(slide.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            />
          )}
        </section>

        {/* Catalogs Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Catálogos</h2>
            <div className="flex gap-2">
              {catalogBulk.selectedCount > 0 && (
                <Button
                  onClick={handleBulkDeleteCatalogs}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Selecionados ({catalogBulk.selectedCount})
                </Button>
              )}
              <Button
                onClick={() => catalogBulk.toggleAll(filteredCatalogs)}
                variant="outline"
                size="sm"
              >
                {catalogBulk.isAllSelected ? <Square className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                variant="outline"
                size="sm"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => setShowNewCatalogForm(true)}
                className="bg-gold-600 hover:bg-gold-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Catálogo
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <SearchFilter
              searchValue={catalogSearch}
              onSearchChange={setCatalogSearch}
              filters={[
                {
                  label: "Status",
                  key: "status",
                  options: [
                    { label: "Ativo", value: "active" },
                    { label: "Inativo", value: "inactive" },
                  ],
                },
              ]}
              activeFilters={catalogFilters}
              onFilterChange={(key, values) => 
                setCatalogFilters(prev => ({ ...prev, [key]: values }))
              }
              placeholder="Buscar catálogos..."
            />
          </div>

          {catalogsLoading ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {[1, 2, 3, 4, 5, 6].map(i => <CatalogCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredCatalogs.map((catalog) => (
                <Card key={catalog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={catalog.image}
                      alt={catalog.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Checkbox
                        checked={catalogBulk.selectedItems.has(catalog.id)}
                        onCheckedChange={() => catalogBulk.toggleItem(catalog.id)}
                        className="bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    {!catalog.active && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        Inativo
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{catalog.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {catalog.description || 'Sem descrição'}
                    </p>
                    <div className="text-xs text-gray-500 mb-3">
                      {catalog.products?.length || 0} produto(s)
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setEditingCatalog(catalog);
                          setNewCatalog({
                            name: catalog.name,
                            image: catalog.image,
                            description: catalog.description || '',
                            full_description: catalog.full_description || '',
                            hero_image: catalog.hero_image,
                            hero_cta_text: catalog.hero_cta_text || '',
                            active: catalog.active,
                            products: catalog.products || []
                          });
                          setShowNewCatalogForm(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDeleteCatalog(catalog.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={() => {
          confirmDialog.onConfirm();
          setConfirmDialog(prev => ({ ...prev, open: false }));
        }}
        variant={confirmDialog.variant}
        confirmLabel={confirmDialog.variant === "destructive" ? "Excluir" : "Confirmar"}
      />

      {/* Slide Form Modal */}
      <SlideForm
        show={showNewSlideForm}
        onClose={() => {
          setShowNewSlideForm(false);
          setEditingSlide(null);
        }}
        onSubmit={handleNewSlideSubmit}
        slide={editingSlide ? newSlide : null}
      />

      {/* Catalog Form Modal */}
      <CatalogForm
        show={showNewCatalogForm}
        onClose={() => {
          setShowNewCatalogForm(false);
          setEditingCatalog(null);
        }}
        onSubmit={handleNewCatalogSubmit}
        catalog={editingCatalog ? newCatalog : null}
      />
    </div>
  );
};

export default AdminDashboard;
