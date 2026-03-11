-- 1. Cria a tabela de inventário
CREATE TABLE IF NOT EXISTS inventory (
  id bigint primary key generated always as identity,
  name text not null,
  brand text not null,
  category text not null,
  condition text not null,
  price numeric not null,
  original_price numeric,
  image text,
  description text,
  stock int default 1
);

-- 2. Permite acesso público para leitura (Select)
-- Nota: Habilita Row Level Security e cria a regra de visualização
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir visualizacao publica" ON inventory
  FOR SELECT USING (true);

-- 3. Insere 24 exemplos aleatórios baseados nos itens originais da HortSoy
INSERT INTO inventory (name, brand, category, condition, price, original_price, image, description, stock)
VALUES 
  ('Ar Condicionado Split Inverter 12000 BTUs (Lote 1)', 'Samsung', 'Eletro', 'Seminovo', 850, 1800, 'https://images.unsplash.com/photo-1527684651001-f2f2e519c5fb?auto=format&fit=crop&q=80&w=800', 'Ar condicionado Samsung Inverter. Manutenção preventiva em dia e funcionando perfeitamente.', 1),
  ('Cadeira de Escritório Ergonômica Premium (Lote 1)', 'Herman Miller (estilo)', 'Móveis', 'Bom Estado', 350, 900, 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', 'Cadeira com ajuste de altura a gás, encosto de tela mesh respirável e apoio ajustável para braços.', 1),
  ('Mesa de Reunião em L com Passa Fios (Lote 1)', 'Tok&Stok Corporate', 'Móveis', 'Seminovo', 600, 1500, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', 'Mesa ampla, excelente para até 6 pessoas. Tampo em MDF escuro com textura madeirada e pés de aço.', 1),
  ('Monitor LED 24" Full HD IPS (Lote 1)', 'Dell', 'Tecnologia', 'Excelente', 450, 950, 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800', 'Monitor profissional série P. Bordas finas, base com ajuste de altura e rotação. Acompanha cabo HDMI.', 1),
  ('Armário de Aço 2 Portas (Lote 1)', 'Pandim', 'Móveis', 'Marcas leves', 200, 600, 'https://images.unsplash.com/photo-1595514535311-9a7dc9bf5e6a?auto=format&fit=crop&q=80&w=800', 'Armário reforçado para arquivos em pastas suspensas. Cor cinza cristal, acompanha chaves reservas.', 1),
  ('Notebook Empresarial Core i5 11ª Gen (Lote 1)', 'Lenovo ThinkPad', 'Tecnologia', 'Seminovo', 1800, 4200, 'https://images.unsplash.com/photo-1531297172867-4f5050ce3153?auto=format&fit=crop&q=80&w=800', 'Core i5-1135G7, 16GB RAM DDR4, 512GB SSD NVMe. Formatado e revisado pela equipe de TI. Bateria 100%.', 1),
  
  ('Ar Condicionado Split Inverter 12000 BTUs (Lote 2)', 'Samsung', 'Eletro', 'Seminovo', 850, 1800, 'https://images.unsplash.com/photo-1527684651001-f2f2e519c5fb?auto=format&fit=crop&q=80&w=800', 'Ar condicionado Samsung Inverter. Manutenção preventiva em dia e funcionando perfeitamente.', 1),
  ('Cadeira de Escritório Ergonômica Premium (Lote 2)', 'Herman Miller (estilo)', 'Móveis', 'Bom Estado', 350, 900, 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', 'Cadeira com ajuste de altura a gás, encosto de tela mesh respirável e apoio ajustável para braços.', 1),
  ('Mesa de Reunião em L com Passa Fios (Lote 2)', 'Tok&Stok Corporate', 'Móveis', 'Seminovo', 600, 1500, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', 'Mesa ampla, excelente para até 6 pessoas. Tampo em MDF escuro com textura madeirada e pés de aço.', 1),
  ('Monitor LED 24" Full HD IPS (Lote 2)', 'Dell', 'Tecnologia', 'Excelente', 450, 950, 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800', 'Monitor profissional série P. Bordas finas, base com ajuste de altura e rotação. Acompanha cabo HDMI.', 1),
  ('Armário de Aço 2 Portas (Lote 2)', 'Pandim', 'Móveis', 'Marcas leves', 200, 600, 'https://images.unsplash.com/photo-1595514535311-9a7dc9bf5e6a?auto=format&fit=crop&q=80&w=800', 'Armário reforçado para arquivos em pastas suspensas. Cor cinza cristal, acompanha chaves reservas.', 1),
  ('Notebook Empresarial Core i5 11ª Gen (Lote 2)', 'Lenovo ThinkPad', 'Tecnologia', 'Seminovo', 1800, 4200, 'https://images.unsplash.com/photo-1531297172867-4f5050ce3153?auto=format&fit=crop&q=80&w=800', 'Core i5-1135G7, 16GB RAM DDR4, 512GB SSD NVMe. Formatado e revisado pela equipe de TI. Bateria 100%.', 1),

  ('Ar Condicionado Split Inverter 12000 BTUs (Lote 3)', 'Samsung', 'Eletro', 'Seminovo', 850, 1800, 'https://images.unsplash.com/photo-1527684651001-f2f2e519c5fb?auto=format&fit=crop&q=80&w=800', 'Ar condicionado Samsung Inverter. Manutenção preventiva em dia e funcionando perfeitamente.', 1),
  ('Cadeira de Escritório Ergonômica Premium (Lote 3)', 'Herman Miller (estilo)', 'Móveis', 'Bom Estado', 350, 900, 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', 'Cadeira com ajuste de altura a gás, encosto de tela mesh respirável e apoio ajustável para braços.', 1),
  ('Mesa de Reunião em L com Passa Fios (Lote 3)', 'Tok&Stok Corporate', 'Móveis', 'Seminovo', 600, 1500, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', 'Mesa ampla, excelente para até 6 pessoas. Tampo em MDF escuro com textura madeirada e pés de aço.', 1),
  ('Monitor LED 24" Full HD IPS (Lote 3)', 'Dell', 'Tecnologia', 'Excelente', 450, 950, 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800', 'Monitor profissional série P. Bordas finas, base com ajuste de altura e rotação. Acompanha cabo HDMI.', 1),
  ('Armário de Aço 2 Portas (Lote 3)', 'Pandim', 'Móveis', 'Marcas leves', 200, 600, 'https://images.unsplash.com/photo-1595514535311-9a7dc9bf5e6a?auto=format&fit=crop&q=80&w=800', 'Armário reforçado para arquivos em pastas suspensas. Cor cinza cristal, acompanha chaves reservas.', 1),
  ('Notebook Empresarial Core i5 11ª Gen (Lote 3)', 'Lenovo ThinkPad', 'Tecnologia', 'Seminovo', 1800, 4200, 'https://images.unsplash.com/photo-1531297172867-4f5050ce3153?auto=format&fit=crop&q=80&w=800', 'Core i5-1135G7, 16GB RAM DDR4, 512GB SSD NVMe. Formatado e revisado pela equipe de TI. Bateria 100%.', 1),

  ('Ar Condicionado Split Inverter 12000 BTUs (Lote 4)', 'Samsung', 'Eletro', 'Seminovo', 850, 1800, 'https://images.unsplash.com/photo-1527684651001-f2f2e519c5fb?auto=format&fit=crop&q=80&w=800', 'Ar condicionado Samsung Inverter. Manutenção preventiva em dia e funcionando perfeitamente.', 1),
  ('Cadeira de Escritório Ergonômica Premium (Lote 4)', 'Herman Miller (estilo)', 'Móveis', 'Bom Estado', 350, 900, 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', 'Cadeira com ajuste de altura a gás, encosto de tela mesh respirável e apoio ajustável para braços.', 1),
  ('Mesa de Reunião em L com Passa Fios (Lote 4)', 'Tok&Stok Corporate', 'Móveis', 'Seminovo', 600, 1500, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', 'Mesa ampla, excelente para até 6 pessoas. Tampo em MDF escuro com textura madeirada e pés de aço.', 1),
  ('Monitor LED 24" Full HD IPS (Lote 4)', 'Dell', 'Tecnologia', 'Excelente', 450, 950, 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800', 'Monitor profissional série P. Bordas finas, base com ajuste de altura e rotação. Acompanha cabo HDMI.', 1),
  ('Armário de Aço 2 Portas (Lote 4)', 'Pandim', 'Móveis', 'Marcas leves', 200, 600, 'https://images.unsplash.com/photo-1595514535311-9a7dc9bf5e6a?auto=format&fit=crop&q=80&w=800', 'Armário reforçado para arquivos em pastas suspensas. Cor cinza cristal, acompanha chaves reservas.', 1),
  ('Notebook Empresarial Core i5 11ª Gen (Lote 4)', 'Lenovo ThinkPad', 'Tecnologia', 'Seminovo', 1800, 4200, 'https://images.unsplash.com/photo-1531297172867-4f5050ce3153?auto=format&fit=crop&q=80&w=800', 'Core i5-1135G7, 16GB RAM DDR4, 512GB SSD NVMe. Formatado e revisado pela equipe de TI. Bateria 100%.', 1);
