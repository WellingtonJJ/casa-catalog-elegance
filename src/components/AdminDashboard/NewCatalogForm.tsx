import React, { useState } from 'react';
import { Plus, X, Trash2, Save, Loader2 } from 'lucide-react';
import ImageUpload from '../ImageUpload';

const NewCatalogForm: React.FC<{
  newCatalog: any;
  setNewCatalog: (catalog: any) => void;
  onSave: () => void;
  onCancel: () => void;
}> = ({ newCatalog, setNewCatalog, onSave, onCancel }) => {
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Validação dos campos obrigatórios
  const isValid = newCatalog.name && newCatalog.image && newCatalog.hero_image;

  const handleSave = async () => {
    setSaving(true);
    await onSave();
    setSaving(false);
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

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
              onBlur={() => handleBlur('name')}
              className={`w-full px-3 py-2 border ${!newCatalog.name && touched.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins`}
            />
            {!newCatalog.name && touched.name && (
              <span className="text-xs text-red-500 font-poppins">Campo obrigatório</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ImageUpload
              value={newCatalog.image}
              onChange={(url) => setNewCatalog({...newCatalog, image: url})}
              folder="catalogs"
              label="Imagem Principal *"
              required
              placeholder="Imagem que aparece na listagem de catálogos"
            />
            {!newCatalog.image && touched.image && (
              <span className="text-xs text-red-500 font-poppins">Campo obrigatório</span>
            )}
          </div>
          <div>
            <ImageUpload
              value={newCatalog.hero_image}
              onChange={(url) => setNewCatalog({...newCatalog, hero_image: url})}
              folder="catalogs/hero"
              label="Imagem de Fundo do Hero *"
              required
              placeholder="Imagem de fundo da página do catálogo"
            />
            {!newCatalog.hero_image && touched.hero_image && (
              <span className="text-xs text-red-500 font-poppins">Campo obrigatório</span>
            )}
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
          onClick={handleSave}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg flex items-center font-poppins transition-colors shadow disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!isValid || saving}
        >
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
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

export default NewCatalogForm; 