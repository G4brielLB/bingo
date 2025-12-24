import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './test-supabase'

// Lazy loading com fallback para named/default exports
const Home = lazy(() => import('./pages/Home.tsx'))
const Bingo = lazy(() => import('./pages/Bingo.tsx'))
const Premios = lazy(() => import('./pages/Premios.tsx'))
const Cartelas = lazy(() => import('./pages/Cartelas.tsx'))
const Regulamento = lazy(() => import('./pages/Regulamento.tsx'))
const Comissao = lazy(() => import('./pages/Comissao.tsx'))

// Loading component com animação aprimorada
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 absolute top-0 left-0"></div>
    </div>
    <p className="mt-4 text-gray-600 font-medium animate-pulse">Carregando...</p>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bingo" element={<Bingo />} />
          <Route path="/premios" element={<Premios />} />
          <Route path="/cartelas" element={<Cartelas />} />
          <Route path="/regulamento" element={<Regulamento />} />
          <Route path="/comissao" element={<Comissao />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
