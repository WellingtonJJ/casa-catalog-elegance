
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
  featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
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
        .order('display_order');

      if (error) throw error;
      
      // Transform the data to ensure all required fields are present
      const transformedData: Catalog[] = (data || []).map(catalog => ({
        ...catalog,
        featured: catalog.featured ?? false,
        display_order: catalog.display_order ?? 0,
        products: catalog.products || []
      }));
      
      setCatalogs(transformedData);
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

  const addCatalog = async (catalogData: Omit<Catalog, 'id' | 'products'>, products?: Omit<CatalogProduct, 'id' | 'catalog_id'>[]) => {
    try {
      console.log('Creating catalog with data:', catalogData);
      console.log('Products to add:', products);

      // First, create the catalog
      const { data: catalog, error: catalogError } = await supabase
        .from('catalogs')
        .insert([catalogData])
        .select()
        .single();

      if (catalogError) {
        console.error('Error creating catalog:', catalogError);
        throw catalogError;
      }

      console.log('Catalog created successfully:', catalog);

      // If there are products, add them
      if (products && products.length > 0) {
        console.log('Adding products to catalog:', catalog.id);
        
        const productsToInsert = products.map((product, index) => ({
          catalog_id: catalog.id,
          name: product.name,
          image: product.image,
          description: product.description,
          display_order: index + 1
        }));

        console.log('Products to insert:', productsToInsert);

        const { data: insertedProducts, error: productsError } = await supabase
          .from('catalog_products')
          .insert(productsToInsert)
          .select();

        if (productsError) {
          console.error('Error adding products:', productsError);
          throw productsError;
        }

        console.log('Products inserted successfully:', insertedProducts);
      }

      // Refetch all catalogs to get the updated data with products
      await fetchCatalogs();
      
      toast({
        title: "Catálogo criado!",
        description: `Catálogo criado com sucesso${products && products.length > 0 ? ` com ${products.length} produtos` : ''}.`,
      });

      return catalog;
    } catch (error) {
      console.error('Error in addCatalog:', error);
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

  const updateCatalogOrder = async (catalogId: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('catalogs')
        .update({ display_order: newOrder } as any)
        .eq('id', catalogId);

      if (error) throw error;
      
      await fetchCatalogs();
      toast({
        title: "Ordem atualizada!",
        description: "A ordem dos catálogos foi alterada com sucesso.",
      });
    } catch (error) {
      console.error('Error updating catalog order:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a ordem.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const toggleCatalogFeatured = async (catalogId: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('catalogs')
        .update({ featured } as any)
        .eq('id', catalogId);

      if (error) throw error;
      
      await fetchCatalogs();
      toast({
        title: featured ? "Catálogo destacado!" : "Catálogo removido do destaque!",
        description: featured ? "O catálogo agora aparecerá na página inicial." : "O catálogo foi removido da página inicial.",
      });
    } catch (error) {
      console.error('Error toggling catalog featured:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o destaque do catálogo.",
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
    updateCatalogOrder,
    toggleCatalogFeatured,
    deleteCatalog,
    refetch: fetchCatalogs
  };
};
