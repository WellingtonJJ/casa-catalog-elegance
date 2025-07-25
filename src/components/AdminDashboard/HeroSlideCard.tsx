import React, { useState } from 'react';
import { Edit, X, Save, Trash2, Image } from 'lucide-react';
import ImageUpload from '../ImageUpload';
import { HeroSlide } from '@/hooks/useHeroSlides';

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

export default HeroSlideCard; 