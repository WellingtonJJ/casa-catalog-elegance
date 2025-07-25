import React, { useState, useCallback } from 'react';
import { Edit, X, Save, Trash2, Plus, Power, PowerOff, ExternalLink, Loader2 } from 'lucide-react';
import ImageUpload from '../ImageUpload';
import { Catalog, CatalogProduct } from '@/hooks/useCatalogs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

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
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isValid = editData.name && editData.image && editData.hero_image;

  const handleSave = async () => {
    setSaving(true);
    await onSave(editData);
    setSaving(false);
  };

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const addProduct = useCallback(() => {
    setEditData(prev => ({
      ...prev,
      products: [
        ...(prev.products || []),
        { 
          id: '', 
          catalog_id: prev.id, 
          name: '', 
          image: '', 
          description: '', 
          display_order: 0,
          quantity: 0,
          sku: ''
        }
      ]
    }));
  }, []);

  const updateProduct = useCallback((index: number, field: keyof CatalogProduct, value: string | number) => {
    setEditData(prev => {
      const updatedProducts = (prev.products || []).map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      );
      return { ...prev, products: updatedProducts };
    });
  }, []);

  const removeProduct = useCallback((index: number) => {
    setEditData(prev => ({
      ...prev,
      products: (prev.products || []).filter((_, i) => i !== index)
    }));
  }, []);

  return (
    <>
      {/* Modal de Edição */}
      <Dialog open={isEditing} onOpenChange={open => !open && onCancel()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 rounded-2xl">
          <div className="sticky top-0 z-10 bg-white shadow-sm">
            <DialogHeader className="px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900 font-playfair">
                    Editar Catálogo
                  </DialogTitle>
                  <p className="text-sm text-gray-500 mt-1 font-poppins">
                    Personalize as informações do seu catálogo
                  </p>
                </div>
                <button 
                  onClick={onCancel}
                  className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </DialogHeader>
          </div>

          <div className="overflow-y-auto px-6 pb-24 pt-2 max-h-[70vh]">
            {/* Seção Informações Básicas */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gold-500 rounded-full"></div>
                Informações do Catálogo
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Catálogo *
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={e => setEditData({...editData, name: e.target.value})}
                      onBlur={() => handleBlur('name')}
                      className={`w-full px-4 py-2.5 border ${
                        !editData.name && touched.name 
                          ? 'border-red-500' 
                          : 'border-gray-300 hover:border-gray-400'
                      } rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors`}
                      placeholder="Ex: Coleção Verão 2023"
                    />
                    {!editData.name && touched.name && (
                      <p className="mt-1 text-sm text-red-500">Nome é obrigatório</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editData.active}
                        onChange={e => setEditData({...editData, active: e.target.checked})}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 bg-gray-300 rounded-full transition-colors ${
                        editData.active ? 'bg-green-500' : ''
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
                          editData.active ? 'translate-x-5' : ''
                        }`}></div>
                      </div>
                    </label>
                    <span className="text-sm text-gray-700">
                      {editData.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição Curta
                    </label>
                    <textarea
                      value={editData.description || ''}
                      onChange={e => setEditData({...editData, description: e.target.value})}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-300 hover:border-gray-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                      placeholder="Breve descrição para listagens"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <ImageUpload
                    value={editData.image}
                    onChange={url => setEditData({...editData, image: url})}
                    folder="catalogs"
                    label="Imagem Principal *"
                    required
                    aspectRatio="5/2"
                  />
                  
                  <ImageUpload
                    value={editData.hero_image}
                    onChange={url => setEditData({...editData, hero_image: url})}
                    folder="catalogs/hero"
                    label="Imagem de Fundo *"
                    required
                    aspectRatio="16/9"
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição Completa
                  </label>
                  <textarea
                    value={editData.full_description || ''}
                    onChange={e => setEditData({...editData, full_description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 hover:border-gray-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                    placeholder="Descrição detalhada do catálogo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto do Botão (CTA)
                  </label>
                  <input
                    type="text"
                    value={editData.hero_cta_text || ''}
                    onChange={e => setEditData({...editData, hero_cta_text: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 hover:border-gray-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                    placeholder="Ex: Ver Coleção"
                  />
                </div>
              </div>
            </div>

            {/* Seção Produtos */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">
                <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  Produtos do Catálogo
                </h3>
                <button
                  onClick={addProduct}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Produto
                </button>
              </div>

              <div className="space-y-4">
                {editData.products?.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-xl">
                    <p className="text-gray-500">Nenhum produto adicionado</p>
                    <button
                      onClick={addProduct}
                      className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center gap-1 mx-auto"
                    >
                      <Plus className="w-4 h-4" /> Adicionar primeiro produto
                    </button>
                  </div>
                ) : (
                  editData.products?.map((product, index) => (
                    <div key={index} className="p-4 border border-gray-400 rounded-lg bg-gray-50 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-500 mb-1">Nome do Produto</label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={e => updateProduct(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nome do produto"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">SKU</label>
                          <input
                            type="text"
                            value={product.sku || ''}
                            onChange={e => updateProduct(index, 'sku', e.target.value.toUpperCase())}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Código único"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Quantidade</label>
                          <input
                            type="number"
                            min="0"
                            value={product.quantity || 0}
                            onChange={e => updateProduct(index, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Descrição</label>
                        <textarea
                          value={product.description || ''}
                          onChange={e => updateProduct(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Descrição do produto"
                          rows={2}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                          <ImageUpload
                            value={product.image}
                            onChange={url => updateProduct(index, 'image', url)}
                            folder="products"
                            label="Imagem do Produto"
                            compact
                          />
                        </div>
                        
                        <div className="md:col-span-3 flex items-end justify-end">
                          <button
                            onClick={() => removeProduct(index)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            <Trash2 className="w-4 h-4" /> Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Rodapé Fixo */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 border border-gray-300 hover:border-gray-400 rounded-lg text-gray-700 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid || saving}
              className={`px-5 py-2.5 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2 ${
                isValid 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-sm' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Visualização - Modo Grade */}
      {!isEditing && viewMode === 'grid' && (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all duration-300 h-full flex flex-col group">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
            <img
              src={catalog.image || 'https://via.placeholder.com/600x192?text=Imagem+Catálogo'}
              alt={catalog.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
              <div className="flex justify-between items-end">
                <h3 className="font-semibold text-white text-lg line-clamp-1">
                  {catalog.name}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  catalog.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {catalog.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col">
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
              {catalog.description || 'Sem descrição'}
            </p>
            
            <div className="mt-auto flex justify-between items-center">
              <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {catalog.products?.length || 0} produtos
              </span>
              
              <div className="flex gap-1">
                <button
                  onClick={onPreview}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  aria-label="Visualizar catálogo"
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
                  aria-label={catalog.active ? 'Desativar catálogo' : 'Ativar catálogo'}
                >
                  {catalog.active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                </button>
                <button
                  onClick={onEdit}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Editar catálogo"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Excluir catálogo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visualização - Modo Lista */}
      {!isEditing && viewMode === 'list' && (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start p-5 gap-5">
            <div className="relative w-full md:w-32 h-32 flex-shrink-0">
              <img
                src={catalog.image || 'https://via.placeholder.com/128x128?text=Catálogo'}
                alt={catalog.name}
                className="w-full h-full object-cover rounded-lg border border-gray-200"
              />
              <span className={`absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                catalog.active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {catalog.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {catalog.name}
                </h3>
                
                <div className="flex gap-1">
                  <button
                    onClick={onPreview}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    aria-label="Visualizar catálogo"
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
                    aria-label={catalog.active ? 'Desativar catálogo' : 'Ativar catálogo'}
                  >
                    {catalog.active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={onEdit}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="Editar catálogo"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onDelete}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Excluir catálogo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mt-2 mb-3">
                {catalog.description || 'Sem descrição'}
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  {catalog.products?.length || 0} produtos
                </span>
                {catalog.hero_cta_text && (
                  <span className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                    CTA: {catalog.hero_cta_text}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogCard;