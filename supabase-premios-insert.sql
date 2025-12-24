-- Script para inserir os prêmios no Supabase
-- Execute este código no SQL Editor do Supabase

-- Limpar prêmios existentes (opcional - remova se quiser manter dados antigos)
-- DELETE FROM premios;

-- Inserir os 5 prêmios do Bingo dos Nietenses 2025 (ordem corrigida)
INSERT INTO premios (nome, tipo, entregue) VALUES
    ('Pacote de Café Baobá (Clássico)', 'coluna1', false),
    ('Chocotone (Brasil Cacau)', 'coluna2', false),
    ('Caneca com Trufas (Cacau Show)', 'linha1', false),
    ('Kit de Amostras (Principia)', 'linha2', false),
    ('Pix de R$ 100,00', 'cartela_cheia', false);

SELECT * FROM premios ORDER BY id;
