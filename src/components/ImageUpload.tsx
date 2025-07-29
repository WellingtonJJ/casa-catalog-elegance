
import React, { useState, useRef } from 'react';
import { Upload, Link, X, Loader2, Image } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  aspectRatio?: string;
  compact?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value = '',
  onChange,
  folder = '',
  placeholder = 'URL da imagem ou faça upload',
  label = 'Imagem',
  required = false,
  aspectRatio,
  compact = false
}) => {
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url');
  const [urlInput, setUrlInput] = useState(value);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadImage, uploading } = useImageUpload();

  const handleUrlChange = (url: string) => {
    setUrlInput(url);
    setPreview(url);
    onChange(url);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Mostrar preview imediatamente
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Fazer upload
    const result = await uploadImage(file, folder);
    if (result) {
      onChange(result.url);
      setUrlInput(result.url);
    } else {
      // Se falhou, voltar ao estado anterior
      setPreview(value);
    }

    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearImage = () => {
    setPreview('');
    setUrlInput('');
    onChange('');
  };

  // Determinar altura do preview baseado no aspectRatio e compact
  const getPreviewHeight = () => {
    if (compact) return 'h-20';
    if (aspectRatio === '16/9') return 'h-32';
    if (aspectRatio === '5/2') return 'h-24';
    return 'h-32';
  };

  return (
    <div className={`space-y-${compact ? '2' : '3'}`}>
      <div className="flex items-center justify-between">
        <label className={`block text-${compact ? 'xs' : 'sm'} font-medium text-gray-700 font-poppins`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {!compact && (
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUploadMode('url')}
              className={`flex items-center px-3 py-1 rounded text-xs font-poppins transition-colors ${
                uploadMode === 'url'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Link className="w-3 h-3 mr-1" />
              URL
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('upload')}
              className={`flex items-center px-3 py-1 rounded text-xs font-poppins transition-colors ${
                uploadMode === 'upload'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-3 h-3 mr-1" />
              Upload
            </button>
          </div>
        )}
      </div>

      {!compact && uploadMode === 'url' ? (
        <div className="relative">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent font-poppins pr-8"
          />
          {urlInput && (
            <button
              type="button"
              onClick={clearImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`w-full px-4 py-${compact ? '2' : '3'} border-2 border-dashed border-gray-300 rounded-lg hover:border-gold-400 hover:bg-gold-50 transition-colors flex flex-col items-center justify-center space-y-${compact ? '1' : '2'} font-poppins`}
          >
            {uploading ? (
              <>
                <Loader2 className={`w-${compact ? '4' : '6'} h-${compact ? '4' : '6'} text-gold-600 animate-spin`} />
                <span className={`text-${compact ? 'xs' : 'sm'} text-gray-600`}>Enviando...</span>
              </>
            ) : (
              <>
                <Upload className={`w-${compact ? '4' : '6'} h-${compact ? '4' : '6'} text-gray-400`} />
                <span className={`text-${compact ? 'xs' : 'sm'} text-gray-600`}>
                  {compact ? 'Selecionar imagem' : 'Clique para selecionar uma imagem'}
                </span>
                {!compact && (
                  <span className="text-xs text-gray-500">
                    JPG, PNG, WEBP (máx. 5MB)
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      )}

      {/* Preview da imagem */}
      {preview && (
        <div className="relative">
          <div className={`w-full ${getPreviewHeight()} rounded-lg border border-gray-200 overflow-hidden bg-gray-50`}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x128?text=Erro+ao+Carregar';
              }}
            />
          </div>
          <button
            type="button"
            onClick={clearImage}
            className={`absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors`}
            title="Remover imagem"
          >
            <X className={`w-${compact ? '2' : '3'} h-${compact ? '2' : '3'}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
