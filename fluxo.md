```markdown
# 🎯 Fluxograma: Projeto Bingo Familiar
## Guia Completo de Desenvolvimento (1 Dia)

---

## 🤔 FASE 1.5: DECISÕES ARQUITETURAIS
**Tempo estimado: 10 minutos**

**Responda estas perguntas antes de começar:**

- [X] **Múltiplos bingos?** Vai ter mais de uma rodada/evento de bingo? 
  - ✅ SIM → Implementar tabela `rodadas` (recomendado)
  - ❌ **NÃO → Sessão única com reset** ← ESCOLHIDO
  - R: Assim que acabar um bingo, reseta tudo e começa novo

- [X] **Autenticação admin:** Opção B (service_role key)
  - Criar `supabaseAdmin.js` com service_role key
  - ⚠️ **NUNCA commitar a service_role key no Git!**

- [X] **Histórico de rodadas antigas?** Precisa consultar bingos passados?
  - ✅ SIM → Manter todas as rodadas no banco
  - ❌ **NÃO → Botão "Limpar Tudo"** ← ESCOLHIDO
  - R: Não precisa de histórico

- [X] **Usuários simultâneos esperados?** Quantas pessoas vão acessar ao mesmo tempo?
  - **< 50 pessoas** → Free tier Supabase suficiente ← ESCOLHIDO
  - > 50 pessoas → Considerar upgrade

**Decisões tomadas neste fluxo:**
- ❌ **SEM** sistema de rodadas (máxima simplicidade)
- ❌ **SEM** tabelas `config` e `cartelas` (dados estáticos no código)
- ✅ Usar service_role key para admin
- ❌ **SEM** histórico (botão "Limpar Tudo" deleta bolas e prêmios)
- ✅ Free tier (até 50 usuários simultâneos)
- ✅ **Apenas 2 tabelas:** `bolas_sorteadas` e `premios`

---

## 📦 FASE 1: SETUP INICIAL
**Tempo estimado: 30 minutos**

- [X] Criar conta no Supabase (supabase.com)
- [X] Criar novo projeto no Supabase (anotar URL + publishable key + **service_role key**)
- [ ] Criar repositório Git
- [X] Inicializar projeto React: `npm create vite@latest bingo-app -- --template react`
- [X] Instalar dependências:
  ```bash
  npm install @supabase/supabase-js react-router-dom
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

---

## 🗄️ FASE 2: BANCO DE DADOS
**Tempo estimado: 45 minutos**

### Criação de Tabelas (SQL Editor no Supabase)

- [ ] **Criar tabela `bolas_sorteadas`** (sessão única, sem rodadas)
  ```sql
  CREATE TABLE bolas_sorteadas (
    id BIGSERIAL PRIMARY KEY,
    numero INTEGER NOT NULL UNIQUE CHECK (numero >= 1 AND numero <= 75),
    timestamp TIMESTAMPTZ DEFAULT NOW()
  );
  
  CREATE INDEX idx_bolas_timestamp ON bolas_sorteadas(timestamp DESC);
  ```

- [ ] **Criar tabela `premios`** (simplificada)
  ```sql
  CREATE TABLE premios (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    tipo TEXT, -- "horizontal1", "vertical2", "quina", "bingo"
    entregue BOOLEAN DEFAULT FALSE
  );
  
  CREATE INDEX idx_premios_entregue ON premios(entregue) WHERE entregue = FALSE;
  ```

**📝 Nota:** Tabelas `config` e `cartelas` foram removidas - são informações estáticas que ficam no código frontend!

- [ ] **Habilitar Realtime**
  - Ir em `Database` → `Publications`
  - Na publication `supabase_realtime`, adicionar as tabelas `bolas_sorteadas` e `premios`
  - Ou criar nova publication se necessário
  - Certificar que eventos INSERT, UPDATE e DELETE estão habilitados

- [ ] **Configurar políticas RLS (Row Level Security)**
  ```sql
  -- Habilitar RLS nas 2 tabelas
  ALTER TABLE bolas_sorteadas ENABLE ROW LEVEL SECURITY;
  ALTER TABLE premios ENABLE ROW LEVEL SECURITY;
  
  -- Permitir leitura pública para ambas
  CREATE POLICY "Permitir leitura pública" ON bolas_sorteadas FOR SELECT USING (true);
  CREATE POLICY "Permitir leitura pública" ON premios FOR SELECT USING (true);
  
  -- ⚠️ IMPORTANTE: Para escrita (INSERT/UPDATE/DELETE), usaremos service_role key
  -- A service_role key IGNORA RLS, então não precisa criar políticas de escrita
  -- Apenas certifique-se de NUNCA expor a service_role key no frontend!
  ```

---

## ⚙️ FASE 3: CONFIGURAÇÃO
**Tempo estimado: 30 minutos**

- [ ] **Criar `/src/lib/supabaseClient.js`** (cliente público)
  ```javascript
  import { createClient } from '@supabase/supabase-js'
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  
  export const supabase = createClient(supabaseUrl, supabasePublishableKey)
  ```

- [ ] **Criar `/src/lib/supabaseAdmin.js`** (cliente admin - apenas para uso no admin)
  ```javascript
  import { createClient } from '@supabase/supabase-js'
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
  
  // ⚠️ ATENÇÃO: Service role key bypassa RLS!
  // Use APENAS na página admin (protegida por senha)
  export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
  ```

- [ ] **Criar `.env.local`**
  ```env
  VITE_SUPABASE_URL=https://tqzculidkbunzvrwjzxm.supabase.co
  VITE_SUPABASE_PUBLISHABLE_KEY=sua-publishable-key-aqui
  VITE_SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
  VITE_ADMIN_PASSWORD=senha123
  VITE_WHATSAPP_NUMBER=5586999999999
  ```

- [ ] **⚠️ SEGURANÇA: Atualizar `.gitignore`**
  ```bash
  # Adicionar ao .gitignore
  .env
  .env.local
  .env.*.local
  ```
  
  **IMPORTANTE:** Se você já commitou `.env` com credenciais:
  1. Delete o arquivo `.env` do repositório
  2. Rotacione as keys no Supabase (gere novas)
  3. Crie `.env.local` com as novas keys
  4. NUNCA commite `.env.local`

- [ ] **Configurar React Router** (`src/App.jsx`)
  ```javascript
  import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import Home from './pages/Home'
  import BingoLive from './pages/BingoLive'
  import Premios from './pages/Premios'
  import Cartelas from './pages/Cartelas'
  import Regulamento from './pages/Regulamento'
  import Admin from './pages/Admin'
  
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bingo-ao-vivo" element={<BingoLive />} />
          <Route path="/premios" element={<Premios />} />
          <Route path="/cartelas" element={<Cartelas />} />
          <Route path="/regulamento" element={<Regulamento />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    )
  }
  ```

- [ ] **Configurar Tailwind** (`tailwind.config.js`)
  ```javascript
  export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: { extend: {} },
    plugins: [],
  }
  ```

- [ ] **Criar estrutura de pastas**
  ```
  src/
  ├── components/
  │   ├── Layout.jsx
  │   ├── Navigation.jsx
  │   └── BolaSorteada.jsx
  ├── hooks/
  │   └── useBingoRealtime.js
  ├── lib/
  │   └── supabaseClient.js
  ├── pages/
  │   ├── Home.jsx
  │   ├── BingoLive.jsx
  │   ├── Premios.jsx
  │   ├── Cartelas.jsx
  │   ├── Regulamento.jsx
  │   └── Admin.jsx
  └── App.jsx
  ```

---

## 🧩 FASE 4: MÓDULOS
**Tempo estimado: 3-4 horas**

### 📱 MÓDULO 1: Tela Inicial
**Tempo: 30 minutos**

- [ ] Criar `src/pages/Home.jsx`
- [ ] Seção hero com título "Bingo Nietense 2025"
- [ ] Subtítulo/descrição do evento
- [ ] Cards com links para:
  - 🎲 Bingo ao Vivo
  - 🎁 Prêmios
  - 🎫 Comprar Cartelas
  - 📋 Regulamento
- [ ] Footer com informações de contato
- [ ] Estilização responsiva

**Checklist de funcionalidades:**
- [ ] Navigation bar com logo
- [ ] CTA principal "Acompanhar Bingo Ao Vivo"
- [ ] Grid de features/informações
- [ ] Design mobile-first

---

### 🎁 MÓDULO 2: Prêmios
**Tempo: 30 minutos**

- [ ] Criar `src/pages/Premios.jsx`
- [ ] Buscar prêmios do Supabase:
  ```javascript
  const { data: premios } = await supabase
    .from('premios')
    .select('*')
    .order('ordem', { ascending: true })
  ```
- [ ] Exibir grid de cards com:
  - Nome do prêmio
  - Tipo (horizontal, vertical, quina, bingo)
  - Status (disponível/entregue)
- [ ] Visual diferenciado para prêmios entregues (opacity, badge)
- [ ] Loading state
- [ ] Empty state (se não houver prêmios)

**Checklist de funcionalidades:**
- [ ] Grid responsivo (1 col mobile, 2-3 cols desktop)
- [ ] Animação ao carregar
- [ ] Badge colorido por tipo de prêmio
- [ ] Ícone de check para prêmios entregues

---

### 🎲 MÓDULO 3: Bingo ao Vivo ⭐
**Tempo: 1.5 horas**

- [ ] Criar `src/pages/BingoLive.jsx`
- [ ] Criar `src/hooks/useBingoRealtime.js`:
  ```javascript
  import { useEffect, useState } from 'react'
  import { supabase } from '../lib/supabaseClient'
  
  export function useBingoRealtime() {
    const [bolasSorteadas, setBolasSorteadas] = useState([])
    const [ultimaBola, setUltimaBola] = useState(null)
    const [premiosEntregues, setPremiosEntregues] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    
    useEffect(() => {
      // Buscar dados iniciais
      const fetchData = async () => {
        // Buscar bolas já sorteadas
        const { data: bolas } = await supabase
          .from('bolas_sorteadas')
          .select('*')
          .order('timestamp', { ascending: true })
        setBolasSorteadas(bolas || [])
        
        // Buscar prêmios entregues
        const { data: premios } = await supabase
          .from('premios')
          .select('*')
          .eq('entregue', true)
        setPremiosEntregues(premios || [])
      }
      fetchData()
      
      // Subscribe para realtime com retry logic
      const channel = supabase
        .channel('bingo-realtime')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'bolas_sorteadas' },
          (payload) => {
            setUltimaBola(payload.new)
            setBolasSorteadas(prev => [...prev, payload.new])
            
            // Notificação push (opcional)
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Nova bola sorteada!', {
                body: `Número ${payload.new.numero}`,
                icon: '/bingo-icon.png'
              })
            }
          }
        )
        .on('postgres_changes', 
          { event: 'UPDATE', schema: 'public', table: 'premios' },
          (payload) => {
            if (payload.new.entregue) {
              setPremiosEntregues(prev => {
                const exists = prev.find(p => p.id === payload.new.id)
                return exists ? prev : [...prev, payload.new]
              })
            }
          }
        )
        .on('system', {}, (message) => {
          if (message.event === 'close') {
            setIsConnected(false)
            // Tentar reconectar após 3s
            setTimeout(() => {
              channel.subscribe()
            }, 3000)
          }
        })
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED')
        })
      
      return () => supabase.removeChannel(channel)
    }, [])
    
    return { bolasSorteadas, ultimaBola, premiosEntregues, isConnected }
  }
  ```

- [ ] **Componente Grid 75 números com cores B-I-N-G-O**
  - [ ] Criar array [1...75]
  - [ ] Aplicar cores por letra:
    ```javascript
    const getColorByLetter = (num) => {
      if (num <= 15) return 'bg-red-500 text-white' // B
      if (num <= 30) return 'bg-blue-500 text-white' // I
      if (num <= 45) return 'bg-green-500 text-white' // N
      if (num <= 60) return 'bg-yellow-500 text-black' // G
      return 'bg-purple-500 text-white' // O
    }
    
    const isSorteada = (num) => bolasSorteadas.some(b => b.numero === num)
    ```
  - [ ] Marcar números sorteados com opacity e borda
  - [ ] Layout em grid (15 colunas x 5 linhas com headers B-I-N-G-O)

- [ ] **Painel "Últimas 5 Bolas"**
  - [ ] Exibir em destaque
  - [ ] Última bola maior e com animação

- [ ] **Animação de nova bola**
  ```css
  @keyframes novaBola {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }
  ```

- [ ] **Status do bingo**
  - [ ] Inferir status: se há bolas sorteadas, está "Em Andamento", senão "Aguardando Início"
  - [ ] Exibir badge com status

- [ ] **Seção prêmios entregues**
  - [ ] Subscribe em `premios` com `entregue = true`
  - [ ] Exibir timeline de prêmios

**Checklist de funcionalidades:**
- [ ] Auto-scroll para última bola
- [ ] Som/vibração ao sortear nova bola (opcional)
- [ ] Indicador de conexão realtime
- [ ] Botão "Recarregar" se desconectar

---

### 🔐 MÓDULO 4: Admin ⭐
**Tempo: 1.5 horas**

- [ ] Criar `src/pages/Admin.jsx`

- [ ] **Sistema de autenticação simples**
  ```javascript
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  
  const handleLogin = () => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
    }
  }
  ```

- [ ] **Grid Clicável 75 Números**
  - [ ] Importar `supabaseAdmin` de `../lib/supabaseAdmin`
  - [ ] Marcar números já sorteados (disabled)
  - [ ] Ao clicar: validar e inserir
    ```javascript
    import { supabaseAdmin } from '../lib/supabaseAdmin'
    
    const sortearBola = async (numero) => {
      // 1. Validar se já foi sorteada
      const { data: existe } = await supabaseAdmin
        .from('bolas_sorteadas')
        .select('numero')
        .eq('numero', numero)
        .single()
      
      if (existe) {
        alert('Essa bola já foi sorteada!')
        return
      }
      
      // 2. Confirmar antes de sortear
      if (!confirm(`Sortear bola ${numero}?`)) return
      
      // 3. INSERT com supabaseAdmin (bypassa RLS)
      const { error } = await supabaseAdmin
        .from('bolas_sorteadas')
        .insert({ numero })
      
      if (error) {
        alert('Erro ao sortear: ' + error.message)
      } else {
        // Toast de sucesso
        toast.success(`Bola ${numero} sorteada!`)
      }
    }
    ```
  - [ ] Feedback visual ao sortear
  - [ ] Desabilitar botão durante loading

- [ ] **Gestão de Prêmios**
  - [ ] Formulário adicionar prêmio:
    - Nome
    - Tipo (select: horizontal, vertical, quina, bingo)
    - Ordem
  - [ ] Lista de prêmios com botão "Marcar como Entregue"
  - [ ] UPDATE com `supabaseAdmin`:
    ```javascript
    await supabaseAdmin
      .from('premios')
      .update({ entregue: true })
      .eq('id', premioId)
    ```

- [ ] **Botão "Limpar Tudo"** (reset completo para novo jogo)
  - [ ] Botão vermelho destacado
  - [ ] Confirmação dupla para evitar acidentes
  - [ ] Deleta TODAS as bolas sorteadas
  - [ ] Reseta TODOS os prêmios para não entregues
    ```javascript
    const limparTudo = async () => {
      if (!confirm('⚠️ ATENÇÃO! Isso vai LIMPAR TUDO e iniciar um novo bingo. Tem certeza?')) return
      if (!confirm('Última confirmação: Deletar todas as bolas e resetar prêmios?')) return
      
      try {
        // Deletar todas as bolas
        await supabaseAdmin
          .from('bolas_sorteadas')
          .delete()
          .neq('id', 0) // Deleta tudo
        
        // Resetar todos os prêmios
        await supabaseAdmin
          .from('premios')
          .update({ entregue: false })
          .neq('id', 0) // Atualiza tudo
        
        toast.success('✅ Bingo limpo! Pronto para novo jogo!')
      } catch (error) {
        toast.error('Erro ao limpar: ' + error.message)
      }
    }
    ```

- [ ] **Painel de Estatísticas**
  - [ ] Total de bolas sorteadas
  - [ ] Prêmios restantes
  - [ ] Tempo desde última bola

- [ ] **Toast Notifications**
  - [ ] Sucesso ao sortear bola
  - [ ] Erro se falhar
  - [ ] Confirmação ao entregar prêmio

**Checklist de funcionalidades:**
- [ ] Proteção da rota (redirect se não autenticado)
- [ ] Botão "Sair" (limpar auth)
- [ ] Confirmar ações críticas (sortear, entregar prêmio)
- [ ] Desabilitar botões durante loading
- [ ] Log de ações (opcional)

---

### 📋 MÓDULO 5: Regulamento
**Tempo: 10 minutos**

- [ ] Criar `src/pages/Regulamento.jsx`
- [ ] **Usar conteúdo estático hardcoded** (sem banco de dados)
  ```javascript
  const regulamento = {
    titulo: 'Regulamento do Bingo Familiar 2024',
    secoes: [
      { titulo: 'Como Funciona', texto: '...' },
      { titulo: 'Regras de Marcação', texto: '...' },
      { titulo: 'Premiação', texto: '...' },
      { titulo: 'Contato', texto: '...' }
    ]
  }
  ```
- [ ] Renderizar seções com Tailwind
- [ ] Layout simples e legível

**Checklist de funcionalidades:**
- [ ] Tipografia legível (prose do Tailwind)
- [ ] Seções com headers
- [ ] Botão "Voltar"
- [ ] Responsivo

---

### 🎫 MÓDULO 6: Cartelas
**Tempo: 15 minutos**

- [ ] Criar `src/pages/Cartelas.jsx`
- [ ] **Usar dados estáticos (sem banco de dados)**
  ```javascript
  const cartelas = [
    { id: 1, quantidade: 1, preco: 10.00, descricao: 'Cartela individual' },
    { id: 2, quantidade: 3, preco: 25.00, descricao: 'Kit com 3 cartelas', destaque: true },
    { id: 3, quantidade: 5, preco: 40.00, descricao: 'Kit com 5 cartelas' }
  ]
  ```
- [ ] Cards com:
  - Quantidade de cartelas
  - Preço formatado
  - Descrição
  - Botão "Comprar via WhatsApp"
- [ ] Link WhatsApp:
  ```javascript
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const mensagem = `Olá! Gostaria de comprar ${cartela.quantidade} cartela(s) - R$ ${cartela.preco.toFixed(2)}`
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`
  ```

**Checklist de funcionalidades:**
- [ ] Preços formatados (R$ 10,00)
- [ ] Badge "Melhor Oferta" no kit de 3
- [ ] Abrir WhatsApp em nova aba
- [ ] Responsivo

---

## ✨ FASE 5: POLISH
**Tempo estimado: 1 hora**

### Design & UX
- [ ] **Layout responsivo**
  - [ ] Testar em mobile (375px)
  - [ ] Testar em tablet (768px)
  - [ ] Testar em desktop (1280px)

- [ ] **Paleta de cores tema bingo**
  ```css
  :root {
    --primary: #FF6B6B; /* vermelho bingo */
    --secondary: #4ECDC4; /* verde água */
    --accent: #FFE66D; /* amarelo */
    --dark: #1A535C;
    --light: #F7FFF7;
  }
  ```

- [ ] **Animações CSS**
  - [ ] Transições suaves
  - [ ] Hover effects
  - [ ] Loading spinners
  - [ ] Animação de bola sorteada

- [ ] **Estados de Loading**
  - [ ] Skeleton screens
  - [ ] Spinners
  - [ ] "Carregando prêmios..."

- [ ] **Error Handling**
  - [ ] Try-catch em todas as queries
  - [ ] Mensagens amigáveis
  - [ ] Retry buttons
  - [ ] Fallbacks

- [ ] **Acessibilidade**
  - [ ] Alt text em imagens
  - [ ] Labels em inputs
  - [ ] Contraste adequado
  - [ ] Focus visível

- [ ] **Notificações Push (Opcional)**
  - [ ] Pedir permissão ao entrar na página ao vivo:
    ```javascript
    useEffect(() => {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
      }
    }, [])
    ```
  - [ ] Notificar ao sortear nova bola (já implementado no hook)
  - [ ] Vibração no mobile:
    ```javascript
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
    ```

- [ ] **SEO Básico**
  - [ ] `<title>` descritivo
  - [ ] Meta description
  - [ ] Open Graph tags
  - [ ] Favicon

---

## 🚀 FASE 6: DEPLOY
**Tempo estimado: 30 minutos**

- [ ] **Preparar para deploy**
  - [ ] Remover console.logs
  - [ ] Testar build: `npm run build`
  - [ ] ⚠️ **CRITICAL: Verificar segurança**
    - [ ] Confirmar `.env.local` NÃO está no Git
    - [ ] Confirmar `.env` está no `.gitignore`
    - [ ] Verificar que `supabaseAdmin` só é importado em `/pages/Admin.jsx`
    - [ ] Confirmar página admin tem proteção de senha
    - [ ] Fazer grep para garantir: `grep -r "VITE_SUPABASE_SERVICE" src/`
      - ⚠️ Deve aparecer APENAS em `src/lib/supabaseAdmin.js` e `src/pages/Admin.jsx`

- [ ] **Git & GitHub**
  - [ ] `git init`
  - [ ] Criar `.gitignore` (incluir .env.local)
  - [ ] `git add .`
  - [ ] `git commit -m "Initial commit"`
  - [ ] Criar repo no GitHub
  - [ ] `git remote add origin ...`
  - [ ] `git push -u origin main`

- [ ] **Deploy no Vercel**
  - [ ] Acessar vercel.com
  - [ ] "Import Project" do GitHub
  - [ ] Configurar variáveis de ambiente:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_PUBLISHABLE_KEY`
    - `VITE_SUPABASE_SERVICE_ROLE_KEY` ⚠️ (copiar do Supabase Settings → API)
    - `VITE_ADMIN_PASSWORD` (senha forte!)
  - [ ] Deploy automático
  - [ ] ⚠️ **Verificar que build funcionou sem expor service_role key nos logs**

- [ ] **Configurações Vercel**
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
  - [ ] Framework: Vite

- [ ] **Domínio (opcional)**
  - [ ] Configurar domínio customizado
  - [ ] Ou usar: `seu-bingo.vercel.app`

- [ ] **Testar em produção**
  - [ ] Abrir URL do Vercel
  - [ ] Testar todas as rotas
  - [ ] Testar realtime (2 abas)

---

## 🧪 FASE 7: TESTES FINAIS
**Tempo estimado: 30 minutos**

### Testes Funcionais
- [ ] **Teste mobile real**
  - [ ] Abrir no celular
  - [ ] Testar navegação
  - [ ] Testar botão WhatsApp

- [ ] **Teste Admin → Live Sync**
  - [ ] Abrir admin em um navegador
  - [ ] Abrir bingo ao vivo em outro
  - [ ] Sortear bola no admin
  - [ ] Verificar atualização instantânea

- [ ] **Teste múltiplas conexões**
  - [ ] Abrir em 5+ dispositivos
  - [ ] Verificar todos recebem updates
  - [ ] Checar performance

- [ ] **Teste WhatsApp**
  - [ ] Clicar em "Comprar Cartelas"
  - [ ] Verificar se abre WhatsApp
  - [ ] Verificar mensagem pré-preenchida

- [ ] **Simular bingo completo**
  - [ ] Iniciar bingo
  - [ ] Sortear ~30 bolas
  - [ ] Tentar sortear bola duplicada (deve bloquear)
  - [ ] Entregar 2-3 prêmios
  - [ ] Testar botão "Limpar Tudo"
  - [ ] Confirmar que bolas foram deletadas
  - [ ] Confirmar que prêmios voltaram para "não entregues"
  - [ ] Sortear novas bolas para confirmar que funciona

- [ ] **Teste de Segurança**
  - [ ] Tentar acessar admin sem senha (deve bloquear)
  - [ ] Verificar que service_role key não aparece no código fonte do browser
  - [ ] Abrir DevTools → Network e verificar que requests usam publishable key (exceto admin)
  - [ ] Confirmar que página pública NÃO consegue fazer INSERT direto

### Checklist de Qualidade
- [ ] Sem erros no console
- [ ] Todas as rotas funcionando
- [ ] Imagens carregando
- [ ] Links funcionando
- [ ] Forms validando
- [ ] Realtime < 500ms latência
- [ ] Mobile 100% funcional

---

## ✅ PROJETO PRONTO!

### 📝 Documentação Final
- [ ] Criar README.md com:
  - Como rodar localmente
  - Variáveis de ambiente
  - Como acessar admin
  - Como adicionar prêmios

- [ ] Criar guia para organizadores:
  - Como iniciar o bingo
  - Como sortear bolas
  - Como marcar prêmios entregues

### 🎉 Entrega
- [ ] Compartilhar URL com família
- [ ] Testar com usuários reais
- [ ] Coletar feedback
- [ ] Aproveitar o bingo! 🎲

---

## 📊 Resumo de Tempo

| Fase | Tempo | Prioridade |
|------|-------|------------|
| Setup Inicial | 30min | Alta |
| Banco de Dados | 45min | Alta |
| Configuração | 30min | Alta |
| **Módulos** | **3-4h** | **Crítica** |
| Polish | 1h | Média |
| Deploy | 30min | Alta |
| Testes | 30min | Alta |
| **TOTAL** | **6-8h** | |

---

## 🎯 Dicas de Produtividade

1. **Comece pelo realtime primeiro** - Se o Módulo 3 funcionar, o resto é downhill
2. **Use componentes prontos** - shadcn/ui, Headless UI, DaisyUI
3. **Não reinvente a roda** - Copie estrutura de templates
4. **Teste cedo e frequentemente** - Abra 2 navegadores sempre
5. **Commit frequente** - Salve progresso a cada módulo
6. **Foco no MVP** - Animações bonitinhas deixe por último

---

## 🆘 Troubleshooting Comum

**Realtime não funciona?**
- Verificar Replication habilitado no Supabase (Database → Replication)
- Checar políticas RLS (deve ter SELECT para leitura pública)
- Ver console do browser (erros de WebSocket?)
- Testar reconexão manual (hook tem retry logic)
- Verificar se há bolas na tabela `bolas_sorteadas`

**Deploy falha?**
- Verificar env vars no Vercel (incluindo SERVICE_ROLE_KEY)
- Build local funciona? (`npm run build`)
- Checar logs do Vercel
- Confirmar variáveis têm prefixo `VITE_`

**Admin não salva?**
- Confirmar está usando `supabaseAdmin` (não `supabase`)
- Verificar service_role key está correta no `.env.local`
- Ver console: erro de "permission denied"? → RLS está bloqueando, use Admin client
- Erro de "duplicate key"? → Bola já foi sorteada (validação funcionando!)

**Bola duplicada sendo inserida?**
- Verificar constraint UNIQUE no banco: `numero INTEGER NOT NULL UNIQUE`
- Verificar validação no frontend antes de INSERT
- Se precisar resetar: usar botão "Limpar Tudo" no admin

**Service role key exposta?**
- ⚠️ NUNCA commitar `.env.local`
- Adicionar ao `.gitignore`
- Se expôs: rotacionar key no Supabase IMEDIATAMENTE
- Verificar que Admin client só é usado em página protegida por senha

**Notificações não funcionam?**
- Verificar permissão concedida: `Notification.permission === 'granted'`
- Testar em HTTPS (localhost ou produção, não HTTP)
- Alguns browsers bloqueiam notificações em modo anônimo

---

**Boa sorte! 🍀 Qualquer dúvida, me chame!**
```