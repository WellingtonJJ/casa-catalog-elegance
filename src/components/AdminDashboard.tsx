import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Catalog, CatalogProduct } from '@/hooks/useCatalogs';
import { HeroSlide } from '@/hooks/useHeroSlides';
import { ImageIcon, Plus, Trash } from 'lucide-react';
import { uploadImage } from '@/lib/utils';

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideDialogOpen, setIsSlideDialogOpen] = useState(false);
  const [isCatalogDialogOpen, setIsCatalogDialogOpen] = useState(false);
  const [isEditSlideDialogOpen, setIsEditSlideDialogOpen] = useState(false);
  const [isEditCatalogDialogOpen, setIsEditCatalogDialogOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [newCatalog, setNewCatalog] = useState<Omit<Catalog, 'id' | 'products'> & { products: Omit<CatalogProduct, 'catalog_id' | 'id'>[] }>({
    name: '',
    image: '',
    description: '',
    full_description: '',
    hero_image: '',
    hero_cta_text: '',
    active: true,
    products: []
  });
  const [newSlide, setNewSlide] = useState<Omit<HeroSlide, 'id'>>({
    title: '',
    subtitle: '',
    description: '',
    background_image: '',
    cta_text: '',
    display_order: 1
  });
  const [slideImage, setSlideImage] = useState<File | null>(null);
  const [catalogImage, setCatalogImage] = useState<File | null>(null);
  const [catalogHeroImage, setCatalogHeroImage] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<CatalogProduct, 'id' | 'catalog_id'>>({
    name: '',
    image: '',
    description: '',
    display_order: 1
  });

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
    }
  };

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
    }
  };

  useEffect(() => {
    Promise.all([fetchSlides(), fetchCatalogs()]).finally(() => setLoading(false));
  }, []);

  const handleSlideInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewSlide({ ...newSlide, [e.target.name]: e.target.value });
  };

  const handleCatalogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewCatalog({ ...newCatalog, [e.target.name]: e.target.value });
  };

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSlideImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSlideImage(e.target.files[0]);
    }
  };

  const handleCatalogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCatalogImage(e.target.files[0]);
    }
  };

  const handleCatalogHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCatalogHeroImage(e.target.files[0]);
    }
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  const addSlide = async () => {
    try {
      setLoading(true);
      if (!slideImage) {
        toast({
          title: "Erro",
          description: "Por favor, selecione uma imagem para o slide.",
          variant: "destructive",
        });
        return;
      }

      const background_image = await uploadImage(slideImage, 'hero_slides');

      const { data, error } = await supabase
        .from('hero_slides')
        .insert([{ ...newSlide, background_image }])
        .select()
        .single();

      if (error) throw error;

      setSlides(prev => [...prev, data]);
      toast({
        title: "Slide adicionado!",
        description: "Novo slide criado com sucesso.",
      });
      setIsSlideDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding slide:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o slide.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSlide = async (id: string, slideData: Partial<HeroSlide>) => {
    try {
      setLoading(true);
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
      setIsEditSlideDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error updating slide:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o slide.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSlide = async (id: string) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const addCatalog = async () => {
    try {
      setLoading(true);
      if (!catalogImage || !catalogHeroImage) {
        toast({
          title: "Erro",
          description: "Por favor, selecione as imagens para o catálogo.",
          variant: "destructive",
        });
        return;
      }

      const image = await uploadImage(catalogImage, 'catalogs');
      const hero_image = await uploadImage(catalogHeroImage, 'catalogs');

      const { data, error } = await supabase
        .from('catalogs')
        .insert([{ ...newCatalog, image, hero_image }])
        .select()
        .single();

      if (error) throw error;

      setCatalogs(prev => [...prev, { ...data, products: [] }]);
      toast({
        title: "Catálogo adicionado!",
        description: "Novo catálogo criado com sucesso.",
      });
      setIsCatalogDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding catalog:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o catálogo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCatalog = async (id: string, catalogData: Partial<Catalog>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('catalogs')
        .update(catalogData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setCatalogs(prev => prev.map(catalog => catalog.id === id ? { ...catalog, ...data } : catalog));
      toast({
        title: "Catálogo atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
      setIsEditCatalogDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error updating catalog:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o catálogo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCatalog = async (id: string) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewCatalog({
      name: '',
      image: '',
      description: '',
      full_description: '',
      hero_image: '',
      hero_cta_text: '',
      active: true,
      products: []
    });
    setNewSlide({
      title: '',
      subtitle: '',
      description: '',
      background_image: '',
      cta_text: '',
      display_order: slides.length + 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 font-playfair">Admin Dashboard</h1>
        <Tabs defaultValue="slides" className="w-full">
          <TabsList>
            <TabsTrigger value="slides">Slides</TabsTrigger>
            <TabsTrigger value="catalogs">Catálogos</TabsTrigger>
            <Button variant="destructive" onClick={onLogout}>Logout</Button>
          </TabsList>
          <TabsContent value="slides">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700 font-playfair">Gerenciar Slides</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Slide
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Slide</DialogTitle>
                    <DialogDescription>
                      Adicione um novo slide para a página inicial.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Título
                      </Label>
                      <Input id="title" name="title" value={newSlide.title} onChange={handleSlideInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subtitle" className="text-right">
                        Subtítulo
                      </Label>
                      <Input id="subtitle" name="subtitle" value={newSlide.subtitle} onChange={handleSlideInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Descrição
                      </Label>
                      <Textarea id="description" name="description" value={newSlide.description} onChange={handleSlideInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="background_image" className="text-right">
                        Imagem de Fundo
                      </Label>
                      <Input type="file" id="background_image" name="background_image" onChange={handleSlideImageChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="cta_text" className="text-right">
                        Texto do CTA
                      </Label>
                      <Input id="cta_text" name="cta_text" value={newSlide.cta_text} onChange={handleSlideInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="display_order" className="text-right">
                        Ordem de Exibição
                      </Label>
                      <Input type="number" id="display_order" name="display_order" value={newSlide.display_order} onChange={handleSlideInputChange} className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={addSlide}>Adicionar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {loading ? (
              <div className="text-center">Carregando...</div>
            ) : (
              <Table>
                <TableCaption>Lista de slides da página inicial.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ordem</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Subtítulo</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slides.map((slide) => (
                    <TableRow key={slide.id}>
                      <TableCell className="font-medium">{slide.display_order}</TableCell>
                      <TableCell>{slide.title}</TableCell>
                      <TableCell>{slide.subtitle}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="secondary" size="sm">
                                Editar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Editar Slide</DialogTitle>
                                <DialogDescription>
                                  Edite os detalhes do slide selecionado.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="title" className="text-right">
                                    Título
                                  </Label>
                                  <Input id="title" defaultValue={slide.title} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="subtitle" className="text-right">
                                    Subtítulo
                                  </Label>
                                  <Input id="subtitle" defaultValue={slide.subtitle} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="description" className="text-right">
                                    Descrição
                                  </Label>
                                  <Textarea id="description" defaultValue={slide.description} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="background_image" className="text-right">
                                    Imagem de Fundo
                                  </Label>
                                  <Input type="file" id="background_image" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="cta_text" className="text-right">
                                    Texto do CTA
                                  </Label>
                                  <Input id="cta_text" defaultValue={slide.cta_text} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="display_order" className="text-right">
                                    Ordem de Exibição
                                  </Label>
                                  <Input type="number" id="display_order" defaultValue={slide.display_order} className="col-span-3" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={() => updateSlide(slide.id, {})}>Salvar</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="destructive" size="sm" onClick={() => deleteSlide(slide.id)}>Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          <TabsContent value="catalogs">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700 font-playfair">Gerenciar Catálogos</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Catálogo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Catálogo</DialogTitle>
                    <DialogDescription>
                      Adicione um novo catálogo à lista de catálogos.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nome
                      </Label>
                      <Input id="name" name="name" value={newCatalog.name} onChange={handleCatalogInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Imagem
                      </Label>
                      <Input type="file" id="image" name="image" onChange={handleCatalogImageChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Descrição
                      </Label>
                      <Textarea id="description" name="description" value={newCatalog.description} onChange={handleCatalogInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="full_description" className="text-right">
                        Descrição Completa
                      </Label>
                      <Textarea id="full_description" name="full_description" value={newCatalog.full_description} onChange={handleCatalogInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hero_image" className="text-right">
                        Imagem Hero
                      </Label>
                      <Input type="file" id="hero_image" name="hero_image" onChange={handleCatalogHeroImageChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hero_cta_text" className="text-right">
                        Texto Hero CTA
                      </Label>
                      <Input id="hero_cta_text" name="hero_cta_text" value={newCatalog.hero_cta_text} onChange={handleCatalogInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="active" className="text-right">
                        Ativo
                      </Label>
                      <Switch id="active" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={addCatalog}>Adicionar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {loading ? (
              <div className="text-center">Carregando...</div>
            ) : (
              <Table>
                <TableCaption>Lista de catálogos disponíveis.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catalogs.map((catalog) => (
                    <TableRow key={catalog.id}>
                      <TableCell className="font-medium">{catalog.name}</TableCell>
                      <TableCell>{catalog.description}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="secondary" size="sm">
                                Editar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Editar Catálogo</DialogTitle>
                                <DialogDescription>
                                  Edite os detalhes do catálogo selecionado.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Nome
                                  </Label>
                                  <Input id="name" defaultValue={catalog.name} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="image" className="text-right">
                                    Imagem
                                  </Label>
                                  <Input type="file" id="image" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="description" className="text-right">
                                    Descrição
                                  </Label>
                                  <Textarea id="description" defaultValue={catalog.description} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="full_description" className="text-right">
                                    Descrição Completa
                                  </Label>
                                  <Textarea id="full_description" defaultValue={catalog.full_description} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="hero_image" className="text-right">
                                    Imagem Hero
                                  </Label>
                                  <Input type="file" id="hero_image" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="hero_cta_text" className="text-right">
                                    Texto Hero CTA
                                  </Label>
                                  <Input id="hero_cta_text" defaultValue={catalog.hero_cta_text} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="active" className="text-right">
                                    Ativo
                                  </Label>
                                  <Switch id="active" defaultChecked={catalog.active} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={() => updateCatalog(catalog.id, {})}>Salvar</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="destructive" size="sm" onClick={() => deleteCatalog(catalog.id)}>Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
