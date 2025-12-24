-- Script para inserir os prêmios no Supabase
-- Execute este código no SQL Editor do Supabase

-- Limpar prêmios existentes (opcional - remova se quiser manter dados antigos)
-- DELETE FROM premios;

-- Inserir os 5 prêmios do Bingo dos Nietenses 2025
INSERT INTO premios (nome, tipo, entregue) VALUES
  ('Smart Watch Premium', 'coluna1', false),
  ('Fone Bluetooth Premium', 'coluna2', false),
  ('Cesta de Natal Especial', 'linha1', false),
  ('Kit Churrasco Completo', 'linha2', false),
  ('TV Smart 43" 4K', 'cartela_cheia', false);

-- Verificar se os prêmios foram inseridos corretamente
SELECT * FROM premios ORDER BY id;
