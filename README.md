# 🎄 Bingo dos Nietenses 2025

Aplicação web fullstack para gerenciamento e transmissão ao vivo do **Bingo dos Nietenses 2025** — um bingo natalino de família com sorteios em tempo real, exibição de prêmios e painel administrativo para a comissão.

---

## 📋 Visão Geral

A aplicação permite que os participantes acompanhem o sorteio do bingo ao vivo pelo celular ou computador, enquanto a comissão gerencia os números sorteados e os prêmios por meio de um painel protegido por senha. Todas as atualizações são propagadas em tempo real para todos os usuários conectados via **Supabase Realtime**.

---

## 🚀 Funcionalidades

| Página | Rota | Descrição |
|---|---|---|
| **Início** | `/` | Landing page com apresentação do evento e acesso rápido às demais seções |
| **Bingo ao Vivo** | `/bingo` | Exibe a última bola sorteada, histórico de bolas e status dos prêmios em tempo real |
| **Prêmios** | `/premios` | Galeria com os 5 prêmios do evento, imagens e status de entrega |
| **Cartelas** | `/cartelas` | Planos de compra de cartelas com botão de contato via WhatsApp |
| **Regulamento** | `/regulamento` | Regras completas do bingo (coluna, linha, cartela cheia e desempate) |
| **Comissão** | `/comissao` | Painel admin (protegido por senha) para sortear bolas, gerenciar prêmios e reiniciar o bingo |

### Prêmios

| Condição de Vitória | Prêmio |
|---|---|
| 1ª Coluna Completa | Pacote de Café Baobá (Clássico) |
| 2ª Coluna Completa | Chocotone (Brasil Cacau) |
| 1ª Linha Completa | Caneca com Trufas (Cacau Show) |
| 2ª Linha Completa | Kit de Amostras (Principia) |
| Cartela Cheia | Pix de R$ 100,00 🏆 |

---

## 🛠️ Tecnologias

- **[React 19](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)** — interface de usuário
- **[Vite](https://vite.dev/)** — bundler e servidor de desenvolvimento
- **[Tailwind CSS](https://tailwindcss.com/)** — estilização utilitária
- **[React Router DOM](https://reactrouter.com/)** — roteamento client-side
- **[Supabase](https://supabase.com/)** — banco de dados PostgreSQL + Realtime subscriptions
- **[Vercel](https://vercel.com/)** — hospedagem e deploy

---

## 🗄️ Banco de Dados (Supabase)

### Tabelas

**`bolas_sorteadas`**
| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `int` | Chave primária |
| `numero` | `int` | Número sorteado (1–75) |
| `timestamp` | `timestamptz` | Data/hora do sorteio |

**`premios`**
| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `int` | Chave primária |
| `nome` | `text` | Nome do prêmio |
| `tipo` | `text` | Tipo: `coluna1`, `coluna2`, `linha1`, `linha2`, `cartela_cheia` |
| `entregue` | `bool` | Se o prêmio já foi entregue |

Para popular os prêmios, execute o script [`supabase-premios-insert.sql`](./supabase-premios-insert.sql) no SQL Editor do Supabase.

---

## ⚙️ Variáveis de Ambiente

Crie o arquivo `bingo-app/.env` com base no modelo abaixo:

```env
# URL do projeto Supabase
VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co

# Chave pública (anon key) — usada nas páginas públicas
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>

# Chave de service role — usada APENAS no painel da comissão (bypassa RLS)
VITE_SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Número de WhatsApp para compra de cartelas (formato internacional, sem +)
VITE_WHATSAPP_NUMBER=5511999999999

# Senha do painel da comissão
VITE_ADMIN_PASSWORD=<senha-secreta>
```

> ⚠️ **Nunca** comite a `VITE_SUPABASE_SERVICE_ROLE_KEY` no repositório. Ela concede acesso irrestrito ao banco de dados.

---

## 💻 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- Conta no [Supabase](https://supabase.com/) com as tabelas criadas

### Instalação

```bash
# 1. Entre na pasta do app
cd bingo-app

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env   # edite o arquivo com suas credenciais

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build para produção

```bash
cd bingo-app
npm run build
```

Os arquivos gerados estarão na pasta `bingo-app/dist/`.

---

## 🌐 Deploy

O projeto está configurado para deploy na **Vercel**. O arquivo [`vercel.json`](./bingo-app/vercel.json) já inclui a rewrite necessária para que o roteamento client-side (React Router) funcione corretamente:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Basta importar o repositório na Vercel, apontar o diretório raiz para `bingo-app/` e configurar as variáveis de ambiente nas configurações do projeto.

---

## 📁 Estrutura do Projeto

```
bingo/
├── bingo-app/                  # Aplicação React
│   ├── public/
│   │   └── premios/            # Imagens dos prêmios
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   ├── Navigation.tsx  # Barra de navegação
│   │   │   ├── Footer.tsx      # Rodapé
│   │   │   ├── BingoGrid.tsx   # Grid visual das bolas (1–75)
│   │   │   └── ConfirmModal.tsx # Modal de confirmação de ações
│   │   ├── pages/              # Páginas da aplicação
│   │   │   ├── Home.tsx        # Página inicial
│   │   │   ├── Bingo.tsx       # Bingo ao vivo
│   │   │   ├── Premios.tsx     # Galeria de prêmios
│   │   │   ├── Cartelas.tsx    # Compra de cartelas
│   │   │   ├── Regulamento.tsx # Regras do bingo
│   │   │   └── Comissao.tsx    # Painel administrativo
│   │   ├── lib/
│   │   │   ├── supabaseClient.ts   # Cliente Supabase público
│   │   │   └── supabaseAdmin.ts    # Cliente Supabase admin (service role)
│   │   ├── types/
│   │   │   └── database.ts     # Tipos TypeScript do banco de dados
│   │   ├── App.tsx             # Configuração de rotas
│   │   └── main.tsx            # Entry point
│   ├── package.json
│   └── vercel.json
├── supabase-premios-insert.sql # Script SQL para inserir os prêmios
├── fluxo.md                    # Documentação de fluxo e arquitetura
└── prompt.md                   # Planejamento do projeto
```

---

## 🔒 Acesso ao Painel da Comissão

O painel em `/comissao` exige login com:

- **Login:** definido diretamente no código-fonte (`ADMIN_LOGIN` em `Comissao.tsx`)
- **Senha:** definida na variável de ambiente `VITE_ADMIN_PASSWORD`

A autenticação é salva no `localStorage` do navegador. O painel permite:

- Sortear uma nova bola (1–75)
- Remover uma bola sorteada por engano
- Visualizar o grid completo das bolas sorteadas
- Marcar prêmios como entregues ou devolvê-los
- Reiniciar o bingo (apaga todas as bolas e reseta os prêmios)

---

## 📜 Licença

Projeto privado desenvolvido para uso familiar. Todos os direitos reservados.
