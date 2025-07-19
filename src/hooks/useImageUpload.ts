
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface ImageUploadResult {
  url: string;
  path: string;
}

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, folder: string = ''): Promise<ImageUploadResult | null> => {
    try {
      setUploading(true);

      // Validações
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
        return null;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast({
          title: "Erro",
          description: "A imagem deve ter no máximo 5MB.",
          variant: "destructive",
        });
        return null;
      }

      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}-${randomString}.${fileExtension}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from('admin-images')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        toast({
          title: "Erro no upload",
          description: "Não foi possível fazer upload da imagem.",
          variant: "destructive",
        });
        return null;
      }

      // Obter URL pública da imagem
      const { data: publicData } = supabase.storage
        .from('admin-images')
        .getPublicUrl(filePath);

      toast({
        title: "Upload realizado!",
        description: "Imagem enviada com sucesso.",
      });

      return {
        url: publicData.publicUrl,
        path: filePath
      };

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro durante o upload.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('admin-images')
        .remove([path]);

      if (error) {
        console.error('Delete error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    uploading
  };
};
