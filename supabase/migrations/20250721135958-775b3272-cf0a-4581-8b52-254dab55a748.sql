
-- Adicionar colunas para controlar destaque e ordem dos catálogos
ALTER TABLE catalogs 
ADD COLUMN featured BOOLEAN DEFAULT FALSE,
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Adicionar coluna para controlar ordem dos slides
ALTER TABLE hero_slides 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Atualizar slides existentes com ordem sequencial
UPDATE hero_slides 
SET display_order = row_number() OVER (ORDER BY created_at) - 1 
WHERE display_order = 0;

-- Atualizar catálogos existentes com ordem sequencial
UPDATE catalogs 
SET display_order = row_number() OVER (ORDER BY created_at) - 1 
WHERE display_order = 0;
