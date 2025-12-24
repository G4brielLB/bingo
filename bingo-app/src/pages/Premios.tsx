import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabaseClient'

interface Premio {
  id: string
  nome: string
  tipo: string
  descricao: string
  imagem: string
  corFundo: string
  tipoLabel: string
}

interface PremioSupabase {
  id: number
  nome: string
  tipo: string
  entregue: boolean
}

export default function Premios() {
  const [premiosEntregues, setPremiosEntregues] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  // Definição estática dos prêmios com todas as informações visuais
  const premios: Premio[] = [
    {
      id: 'coluna1',
      nome: 'Smart Watch Premium',
      tipo: 'coluna1',
      tipoLabel: 'Primeira Coluna Completa',
      descricao: 'Um smartwatch de última geração para você monitorar sua saúde e receber notificações com estilo.',
      imagem: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      corFundo: 'bg-red-600'
    },
    {
      id: 'coluna2',
      nome: 'Fone Bluetooth Premium',
      tipo: 'coluna2',
      tipoLabel: 'Segunda Coluna Completa',
      descricao: 'Fones de ouvido wireless com cancelamento de ruído para uma experiência sonora imersiva.',
      imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      corFundo: 'bg-green-700'
    },
    {
      id: 'linha1',
      nome: 'Cesta de Natal Especial',
      tipo: 'linha1',
      tipoLabel: 'Primeira Linha Completa',
      descricao: 'Uma cesta recheada com delícias natalinas, vinhos, chocolates e produtos selecionados.',
      imagem: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80',
      corFundo: 'bg-amber-700'
    },
    {
      id: 'linha2',
      nome: 'Kit Churrasco Completo',
      tipo: 'linha2',
      tipoLabel: 'Segunda Linha Completa',
      descricao: 'Kit profissional para churrasco com facas, tábua, espetos e acessórios de alta qualidade.',
      imagem: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
      corFundo: 'bg-stone-700'
    },
    {
      id: 'cartela_cheia',
      nome: 'TV Smart 43" 4K',
      tipo: 'cartela_cheia',
      tipoLabel: 'Cartela Cheia - Grande Prêmio!',
      descricao: 'Uma Smart TV 4K de 43 polegadas para você assistir seus programas favoritos com qualidade excepcional.',
      imagem: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80',
      corFundo: 'bg-red-700'
    }
  ]

  useEffect(() => {
    const fetchPremios = async () => {
      try {
        const { data, error } = await supabase
          .from('premios')
          .select('*')
          .eq('entregue', true)

        if (error) throw error

        if (data) {
          const entregues = new Set(data.map((p: PremioSupabase) => p.tipo))
          setPremiosEntregues(entregues)
        }
      } catch (error) {
        console.error('Erro ao buscar prêmios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPremios()

    // Realtime para atualizar quando prêmios forem entregues
    const channel = supabase
      .channel('premios-updates')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'premios' },
        (payload: any) => {
          if (payload.new.entregue) {
            setPremiosEntregues(prev => new Set([...prev, payload.new.tipo]))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Prêmios Incríveis</h1>
          <p className="text-red-100 text-lg md:text-xl font-light">
            Concorra a prêmios especialmente selecionados para tornar seu Natal ainda mais especial
          </p>
        </div>
      </section>

      {/* Prêmios Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-600">Carregando prêmios...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {premios.map((premio, index) => {
                const foiEntregue = premiosEntregues.has(premio.tipo)
                
                return (
                  <div
                    key={premio.id}
                    className={`transition-all duration-300 hover:-translate-y-2 ${
                      foiEntregue ? 'opacity-60' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Círculo colorido com imagem quadrada dentro */}
                    <div className="relative flex items-center justify-center py-8 mb-6">
                      {/* Círculo de fundo colorido sólido */}
                      <div className={`w-64 h-64 ${premio.corFundo} rounded-full flex items-center justify-center`}>
                        {/* Imagem quadrada centralizada */}
                        <div className="w-48 h-48 rounded-xl overflow-hidden shadow-2xl">
                          <img
                            src={premio.imagem}
                            alt={premio.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Badge de status */}
                      {foiEntregue && (
                        <div className="absolute top-4 right-4 z-20 bg-gray-900 bg-opacity-90 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Entregue
                        </div>
                      )}
                    </div>

                    {/* Conteúdo centralizado */}
                    <div className="text-center space-y-4">
                      {/* Tipo/Categoria */}
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${premio.corFundo} text-white`}>
                          {premio.tipoLabel}
                        </span>
                      </div>

                      {/* Nome do prêmio */}
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {premio.nome}
                      </h3>

                      {/* Descrição */}
                      <p className="text-gray-600 leading-relaxed">
                        {premio.descricao}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Persuasiva */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center space-y-8">
            {/* Ícone de presente */}
            <div className="flex justify-center">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
            </div>

            {/* Título persuasivo */}
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">
              Não Perca Esta Oportunidade!
            </h2>

            {/* Subtítulo com gatilhos mentais */}
            <p className="text-xl md:text-2xl font-light text-red-50 max-w-3xl mx-auto leading-relaxed">
              Estes prêmios incríveis podem ser seus! Cada cartela é uma nova chance de realizar seus sonhos neste Natal.
            </p>

            {/* Lista de benefícios */}
            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 space-y-2">
                <svg className="w-8 h-8 mx-auto text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h3 className="font-semibold text-lg">Prêmios de Valor</h3>
                <p className="text-red-100 text-sm">Produtos selecionados especialmente para você</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 space-y-2">
                <svg className="w-8 h-8 mx-auto text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-lg">Múltiplas Chances</h3>
                <p className="text-red-100 text-sm">Quanto mais cartelas, maiores suas chances</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 space-y-2">
                <svg className="w-8 h-8 mx-auto text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-lg">Diversão Garantida</h3>
                <p className="text-red-100 text-sm">Momentos inesquecíveis com a família</p>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/cartelas"
                className="group inline-flex items-center gap-3 bg-white text-red-600 hover:bg-red-50 font-semibold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Comprar Cartelas Agora
              </Link>
              
              <Link
                to="/regulamento"
                className="inline-flex items-center gap-2 text-white hover:text-red-100 font-medium text-lg transition-colors duration-300 group"
              >
                Ver Regulamento
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
