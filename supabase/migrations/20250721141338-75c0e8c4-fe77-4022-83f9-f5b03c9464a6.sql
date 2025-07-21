
-- Adicionar as colunas display_order e featured à tabela catalogs
ALTER TABLE public.catalogs 
ADD COLUMN display_order integer NOT NULL DEFAULT 0,
ADD COLUMN featured boolean NOT NULL DEFAULT false;

-- Atualizar os catálogos existentes com valores padrão baseados na ordem de criação
UPDATE public.catalogs 
SET display_order = ROW_NUMBER() OVER (ORDER BY created_at);
