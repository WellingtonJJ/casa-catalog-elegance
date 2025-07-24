
-- Adicionar colunas quantity e sku na tabela catalog_products
ALTER TABLE catalog_products 
ADD COLUMN quantity integer DEFAULT 0 NOT NULL,
ADD COLUMN sku text;

-- Criar índice para SKU para melhor performance nas consultas
CREATE INDEX idx_catalog_products_sku ON catalog_products(sku);

-- Comentários para documentar as novas colunas
COMMENT ON COLUMN catalog_products.quantity IS 'Quantidade disponível do produto em estoque';
COMMENT ON COLUMN catalog_products.sku IS 'Código SKU único do produto para identificação';
