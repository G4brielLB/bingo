// Script de teste para verificar conexão com Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

console.log('🔍 Verificando configuração do Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key (primeiros 50 chars):', supabaseKey?.substring(0, 50) + '...')
console.log('Key existe?', !!supabaseKey)
console.log('Key é JWT válido?', supabaseKey?.startsWith('eyJ'))

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Variáveis de ambiente não carregadas!')
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
  console.log('VITE_SUPABASE_PUBLISHABLE_KEY:', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
} else {
  console.log('✅ Variáveis de ambiente carregadas')
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  console.log('🔄 Tentando buscar prêmios...')
  
  const { data, error } = await supabase
    .from('premios')
    .select('*')
    .limit(1)
  
  if (error) {
    console.error('❌ ERRO ao buscar prêmios:', error)
  } else {
    console.log('✅ SUCESSO! Prêmios encontrados:', data)
  }
}

export {}
