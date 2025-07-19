
-- Criar bucket para armazenar imagens do sistema
INSERT INTO storage.buckets (id, name, public)
VALUES ('admin-images', 'admin-images', true);

-- Criar políticas para permitir upload e visualização de imagens
-- Política para permitir que todos vejam as imagens (já que o bucket é público)
CREATE POLICY "Allow public read access on admin images"
ON storage.objects FOR SELECT
USING (bucket_id = 'admin-images');

-- Política para permitir upload apenas para usuários autenticados
CREATE POLICY "Allow authenticated users to upload admin images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'admin-images' AND auth.role() = 'authenticated');

-- Política para permitir que usuários autenticados atualizem suas próprias imagens
CREATE POLICY "Allow authenticated users to update admin images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'admin-images' AND auth.role() = 'authenticated');

-- Política para permitir que usuários autenticados deletem imagens
CREATE POLICY "Allow authenticated users to delete admin images"
ON storage.objects FOR DELETE
USING (bucket_id = 'admin-images' AND auth.role() = 'authenticated');
