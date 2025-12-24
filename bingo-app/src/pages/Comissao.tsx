import { useState, useEffect } from 'react'
import { supabaseAdmin } from '../lib/supabaseAdmin'
import ConfirmModal from '../components/ConfirmModal'
import BingoGrid from '../components/BingoGrid'

interface Bola {
  id: number
  numero: number
  timestamp: string
}

interface Premio {
  id: number
  nome: string
  tipo: string
  entregue: boolean
}

const ADMIN_LOGIN = 'pedro2025'

export default function Comissao() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginInput, setLoginInput] = useState('')
  const [senhaInput, setSenhaInput] = useState('')
  const [loginError, setLoginError] = useState('')

  const [bolasSorteadas, setBolasSorteadas] = useState<Bola[]>([])
  const [premios, setPremios] = useState<Premio[]>([])
  const [novaBola, setNovaBola] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAllBolas, setShowAllBolas] = useState(false)

  // Estados do modal de confirmação
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    isDanger: false
  })

  // Verificar autenticação no localStorage
  useEffect(() => {
    const auth = localStorage.getItem('comissao_auth')
    if (auth === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  // Buscar dados quando autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchBolasSorteadas()
      fetchPremios()
      subscribeToChanges()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

    if (loginInput === ADMIN_LOGIN && senhaInput === adminPassword) {
      localStorage.setItem('comissao_auth', 'authenticated')
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Login ou senha incorretos')
      setSenhaInput('')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('comissao_auth')
    setIsAuthenticated(false)
    setLoginInput('')
    setSenhaInput('')
  }

  const fetchBolasSorteadas = async () => {
    const { data, error } = await supabaseAdmin
      .from('bolas_sorteadas')
      .select('*')
      .order('timestamp', { ascending: false })

    if (error) {
      console.error('Erro ao buscar bolas:', error)
    } else {
      setBolasSorteadas(data || [])
    }
  }

  const fetchPremios = async () => {
    const { data, error } = await supabaseAdmin
      .from('premios')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Erro ao buscar prêmios:', error)
    } else {
      setPremios(data || [])
    }
  }

  const subscribeToChanges = () => {
    const bolasChannel = supabaseAdmin
      .channel('bolas-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bolas_sorteadas' },
        () => fetchBolasSorteadas()
      )
      .subscribe()

    const premiosChannel = supabaseAdmin
      .channel('premios-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'premios' },
        () => fetchPremios()
      )
      .subscribe()

    return () => {
      supabaseAdmin.removeChannel(bolasChannel)
      supabaseAdmin.removeChannel(premiosChannel)
    }
  }

  const sortearBola = async () => {
    const numero = parseInt(novaBola)

    if (!numero || numero < 1 || numero > 75) {
      alert('Digite um número entre 1 e 75')
      return
    }

    if (bolasSorteadas.some(b => b.numero === numero)) {
      alert('Esta bola já foi sorteada!')
      return
    }

    setConfirmModal({
      isOpen: true,
      title: 'Confirmar Sorteio',
      message: `Sortear bola número ${numero}?`,
      onConfirm: async () => {
        setLoading(true)
        const { error } = await supabaseAdmin
          .from('bolas_sorteadas')
          .insert([{ numero }] as never)

        if (error) {
          alert('Erro ao sortear bola: ' + error.message)
        } else {
          setNovaBola('')
        }
        setLoading(false)
        setConfirmModal({ ...confirmModal, isOpen: false })
      },
      isDanger: false
    })
  }

  const removerBola = (id: number, numero: number) => {
    setConfirmModal({
      isOpen: true,
      title: 'Remover Bola',
      message: `Tem certeza que deseja remover a bola ${numero}?`,
      onConfirm: async () => {
        setLoading(true)
        const { error } = await supabaseAdmin
          .from('bolas_sorteadas')
          .delete()
          .eq('id', id)

        if (error) {
          alert('Erro ao remover bola: ' + error.message)
        }
        setLoading(false)
        setConfirmModal({ ...confirmModal, isOpen: false })
      },
      isDanger: true
    })
  }

  const togglePremio = (premio: Premio) => {
    const novoStatus = !premio.entregue
    setConfirmModal({
      isOpen: true,
      title: novoStatus ? 'Marcar como Entregue' : 'Marcar como Disponível',
      message: `${novoStatus ? 'Entregar' : 'Devolver'} o prêmio "${premio.nome}"?`,
      onConfirm: async () => {
        setLoading(true)
        const { error } = await supabaseAdmin
          .from('premios')
          .update({ entregue: novoStatus } as never)
          .eq('id', premio.id)

        if (error) {
          alert('Erro ao atualizar prêmio: ' + error.message)
        }
        setLoading(false)
        setConfirmModal({ ...confirmModal, isOpen: false })
      },
      isDanger: false
    })
  }

  const reiniciarBingo = () => {
    setConfirmModal({
      isOpen: true,
      title: '⚠️ Reiniciar Bingo',
      message: 'Isso irá apagar TODAS as bolas sorteadas e marcar todos os prêmios como não entregues. Esta ação não pode ser desfeita!',
      onConfirm: async () => {
        setLoading(true)
        
        // Deletar todas as bolas
        const { error: bolasError } = await supabaseAdmin
          .from('bolas_sorteadas')
          .delete()
          .neq('id', 0) // Deleta todos

        // Resetar todos os prêmios
        const { error: premiosError } = await supabaseAdmin
          .from('premios')
          .update({ entregue: false } as never)
          .neq('id', 0) // Atualiza todos

        if (bolasError || premiosError) {
          alert('Erro ao reiniciar: ' + (bolasError?.message || premiosError?.message))
        }

        setLoading(false)
        setConfirmModal({ ...confirmModal, isOpen: false })
      },
      isDanger: true
    })
  }

  // Tela de Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">Área da Comissão</h1>
            <p className="text-gray-600 mt-2">Faça login para gerenciar o bingo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Login
              </label>
              <input
                type="text"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Digite o login"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={senhaInput}
                onChange={(e) => setSenhaInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Digite a senha"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  const numerosBolas = bolasSorteadas.map(b => b.numero)
  const ultimasCincoBolas = bolasSorteadas.slice(0, 5)

  // Painel Admin
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🎲 Painel da Comissão</h1>
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Mobile e Desktop */}
          <div className="space-y-6">
            {/* Sortear Bola */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sortear Nova Bola</h2>
              
              <div className="flex gap-3">
                <input
                  type="number"
                  min="1"
                  max="75"
                  value={novaBola}
                  onChange={(e) => setNovaBola(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sortearBola()}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-semibold text-center focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="1-75"
                  disabled={loading}
                />
                <button
                  onClick={sortearBola}
                  disabled={loading || !novaBola}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Sortear
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Total de bolas sorteadas: <span className="font-semibold text-gray-900">{bolasSorteadas.length}/75</span>
              </div>
            </div>

            {/* Últimas 5 Bolas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {showAllBolas ? 'Todas as Bolas' : 'Últimas 5 Bolas'}
                </h2>
                {bolasSorteadas.length > 5 && (
                  <button
                    onClick={() => setShowAllBolas(!showAllBolas)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    {showAllBolas ? 'Ver menos' : 'Ver todas'}
                  </button>
                )}
              </div>

              {bolasSorteadas.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhuma bola sorteada ainda</p>
              ) : (
                <div className="grid grid-cols-5 gap-3">
                  {(showAllBolas ? bolasSorteadas : ultimasCincoBolas).map((bola, index) => (
                    <div key={bola.id} className="relative group">
                      <div className={`
                        aspect-square rounded-full flex items-center justify-center
                        text-2xl font-bold shadow-lg cursor-pointer
                        transition-all duration-300 hover:scale-110
                        ${index === 0 && !showAllBolas
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-gray-900 ring-4 ring-yellow-300 scale-110'
                          : 'bg-gradient-to-br from-gray-700 to-gray-900 text-white'
                        }
                      `}>
                        {bola.numero}
                      </div>
                      <button
                        onClick={() => removerBola(bola.id, bola.numero)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Remover"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grid de Bolas (Desktop) */}
            <div className="hidden lg:block">
              <BingoGrid bolasSorteadas={numerosBolas} />
            </div>
          </div>

          {/* Coluna Direita - Prêmios */}
          <div className="space-y-6">
            {/* Controles */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={reiniciarBingo}
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reiniciar Bingo
              </button>
            </div>

            {/* Prêmios */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Gerenciar Prêmios</h2>
              
              <div className="space-y-4">
                {premios.map((premio) => (
                  <div
                    key={premio.id}
                    className={`border-2 rounded-lg p-4 transition-all ${
                      premio.entregue ? 'border-gray-300 bg-gray-50' : 'border-green-300 bg-green-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`/premios/${premio.tipo === 'coluna1' ? 'cafe.jpeg' : premio.tipo === 'coluna2' ? 'chocotone.jpeg' : premio.tipo === 'linha1' ? 'caneca.jpeg' : premio.tipo === 'linha2' ? 'kit_principia.jpeg' : 'tio_patinhas.jpg'}`}
                        alt={premio.nome}
                        className={`w-20 h-20 rounded-lg object-cover ${
                          premio.entregue ? 'opacity-40' : 'opacity-100'
                        }`}
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{premio.nome}</h3>
                        <p className="text-sm text-gray-600 capitalize">{premio.tipo.replace('_', ' ')}</p>
                        <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                          premio.entregue ? 'bg-gray-200 text-gray-700' : 'bg-green-200 text-green-800'
                        }`}>
                          {premio.entregue ? 'Entregue' : 'Disponível'}
                        </span>
                      </div>

                      <button
                        onClick={() => togglePremio(premio)}
                        disabled={loading}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          premio.entregue
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-600 text-white hover:bg-gray-700'
                        } disabled:bg-gray-300`}
                      >
                        {premio.entregue ? 'Devolver' : 'Entregar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        isDanger={confirmModal.isDanger}
      />
    </div>
  )
}
