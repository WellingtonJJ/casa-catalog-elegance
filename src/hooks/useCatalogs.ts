
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface CatalogProduct {
  id: string;
  catalog_id: string;
  name: string;
  image: string;
  description: string | null;
  display_order: number;
}

export interface Catalog {
  id: string;
  name: string;
  image: string;
  description: string | null;
  full_description: string | null;
  hero_image: string;
  hero_cta_text: string | null;
  active: boolean;
  products?: CatalogProduct[];
}

export const useCatalogs = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCatalogs = async () => {
    try {
      const { data, error } = await supabase
        .from('catalogs')
        .select(`
          *,
          products:catalog_products(*)
        `)
        .order('created_at');

      if (error) throw error;
      setCatalogs(data || []);
    } catch (error) {
      console.error('Error fetching catalogs:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os catálogos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addCatalog = async (catalogData: Omit<Catalog, 'id' | 'products'>) => {
    try {
      const { data, error } = await supabase
        .from('catalogs')
        .insert([catalogData])
        .select()
        .single();

      if (error) throw error;
      
      const newCatalog = { ...data, products: [] };
      setCatalogs(prev => [...prev, newCatalog]);
      toast({
        title: "Catálogo adicionado!",
        description: "Novo catálogo criado com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error adding catalog:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o catálogo.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCatalog = async (id: string, catalogData: Partial<Catalog>) => {
    try {
      const { products, ...catalogUpdate } = catalogData;
      
      const { data, error } = await supabase
        .from('catalogs')
        .update(catalogUpdate)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Se há produtos para atualizar
      if (products) {
        // Deletar produtos existentes
        await supabase
          .from('catalog_products')
          .delete()
          .eq('catalog_id', id);

        // Inserir novos produtos
        if (products.length > 0) {
          const productsToInsert = products.map((product, index) => ({
            catalog_id: id,
            name: product.name,
            image: product.image,
            description: product.description,
            display_order: index + 1
          }));

          await supabase
            .from('catalog_products')
            .insert(productsToInsert);
        }
      }
      
      await fetchCatalogs(); // Recarregar dados
      toast({
        title: "Catálogo atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error updating catalog:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o catálogo.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCatalog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('catalogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCatalogs(prev => prev.filter(catalog => catalog.id !== id));
      toast({
        title: "Catálogo removido!",
        description: "O catálogo foi excluído com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting catalog:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o catálogo.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  return {
    catalogs,
    loading,
    addCatalog,
    updateCatalog,
    deleteCatalog,
    refetch: fetchCatalogs
  };
};
