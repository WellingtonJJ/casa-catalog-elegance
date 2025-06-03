
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  background_image: string;
  cta_text: string | null;
  display_order: number;
}

export const useHeroSlides = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setSlides(data || []);
    } catch (error) {
      console.error('Error fetching slides:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os slides.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSlide = async (slideData: Omit<HeroSlide, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .insert([slideData])
        .select()
        .single();

      if (error) throw error;
      
      setSlides(prev => [...prev, data]);
      toast({
        title: "Slide adicionado!",
        description: "Novo slide criado com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error adding slide:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o slide.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSlide = async (id: string, slideData: Partial<HeroSlide>) => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .update(slideData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setSlides(prev => prev.map(slide => slide.id === id ? data : slide));
      toast({
        title: "Slide atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error updating slide:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o slide.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteSlide = async (id: string) => {
    try {
      const { error } = await supabase
        .from('hero_slides')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSlides(prev => prev.filter(slide => slide.id !== id));
      toast({
        title: "Slide removido!",
        description: "O slide foi excluído com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o slide.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return {
    slides,
    loading,
    addSlide,
    updateSlide,
    deleteSlide,
    refetch: fetchSlides
  };
};
