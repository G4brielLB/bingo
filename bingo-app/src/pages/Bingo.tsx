import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabaseClient'
import type { Database } from '../types/database'

type BolasSorteadas = Database['public']['Tables']['bolas_sorteadas']['Row']
type Premios = Database['public']['Tables']['premios']['Row']

export default function BingoLive() {
  const [bolas, setBolas] = useState<BolasSorteadas[]>([])
  const [premios, setPremios] = useState<Premios[]>([])
  const [mostrarTodas, setMostrarTodas] = useState(false)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Fetch inicial
  useEffect(() => {
    fetchBolas()
    fetchPremios()
    setupRealtimeSubscription()
  }, [])

  // Timer countdown
  useEffect(() => {
    if (bolas.length > 0) return // Ignora timer se já começou

    const targetDate = new Date('2025-12-25T16:00:00Z').getTime() // 13h UTC-3
    
    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [bolas.length])

  async function fetchBolas() {
    const { data, error } = await supabase
      .from('bolas_sorteadas')
      .select('*')
      .order('timestamp', { ascending: false })

    if (!error && data) {
      setBolas(data)
    }
    setLoading(false)
  }

  async function fetchPremios() {
    const { data, error } = await supabase
      .from('premios')
      .select('*')
      .order('id', { ascending: true })

    if (!error && data) {
      setPremios(data)
    }
  }

  function setupRealtimeSubscription() {
    const bolasChannel = supabase
      .channel('bolas_sorteadas_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bolas_sorteadas' },
        (payload) => {
          setBolas((prev) => [payload.new as BolasSorteadas, ...prev])
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'bolas_sorteadas' },
        (payload) => {
          setBolas((prev) => prev.filter((b) => b.id !== (payload.old as BolasSorteadas).id))
        }
      )
      .subscribe()

    const premiosChannel = supabase
      .channel('premios_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'premios' },
        (payload) => {
          setPremios((prev) =>
            prev.map((p) => (p.id === (payload.new as Premios).id ? (payload.new as Premios) : p))
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(bolasChannel)
      supabase.removeChannel(premiosChannel)
    }
  }

  const ultimasCinco = bolas.slice(0, 5)
  const bingoEmAndamento = bolas.length > 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 text-xl">Carregando...</div>
      </div>
    )
  }

  // Estado: Bingo não iniciado
  if (!bingoEmAndamento) {
    const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header com botão voltar */}
        <div className="bg-white border-b border-gray-200 p-6 md:p-8">
          <div className="container mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-gray-900 hover:text-red-700 transition-colors duration-300 text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Voltar para Página Inicial</span>
            </Link>
          </div>
        </div>

        {/* Conteúdo Central */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-4xl">
            <div className="mb-8 animate-fade-in-down">
              <svg className="w-24 h-24 md:w-32 md:h-32 mx-auto text-red-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 animate-fade-in">
              Bingo dos Nietenses 2025
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light animate-fade-in-up">
              {isExpired ? 'Aguarde, estamos quase começando!' : 'Nosso bingo tão esperado está quase chegando, segure a ansiedade!'}
            </p>

            {/* Timer */}
            <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto mb-8 animate-fade-in-up">
              <div className="bg-white rounded-lg p-4 md:p-6 border-2 border-gray-200 shadow-sm">
                <div className="text-4xl md:text-6xl font-light text-gray-900 mb-2">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-gray-500 text-sm md:text-base font-medium">Dias</div>
              </div>
              <div className="bg-white rounded-lg p-4 md:p-6 border-2 border-gray-200 shadow-sm">
                <div className="text-4xl md:text-6xl font-light text-gray-900 mb-2">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-gray-500 text-sm md:text-base font-medium">Horas</div>
              </div>
              <div className="bg-white rounded-lg p-4 md:p-6 border-2 border-gray-200 shadow-sm">
                <div className="text-4xl md:text-6xl font-light text-gray-900 mb-2">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-gray-500 text-sm md:text-base font-medium">Min</div>
              </div>
              <div className="bg-white rounded-lg p-4 md:p-6 border-2 border-gray-200 shadow-sm">
                <div className="text-4xl md:text-6xl font-light text-gray-900 mb-2">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-gray-500 text-sm md:text-base font-medium">Seg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Estado: Bingo em andamento
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal - Bolas Sorteadas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Última Bola */}
            <div className="bg-red-700 rounded-2xl p-8 md:p-12 text-center shadow-sm border-2 border-red-800">
              <p className="text-red-100 text-lg md:text-xl mb-4 font-medium">Última Bola Sorteada</p>
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-white rounded-full flex items-center justify-center shadow-md border-4 border-red-800">
                <span className="text-6xl md:text-7xl font-medium text-gray-900">
                  {ultimasCinco[0]?.numero || '-'}
                </span>
              </div>
            </div>

            {/* Últimas 5 Bolas */}
            {ultimasCinco.length > 1 && (
              <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-gray-200 shadow-sm">
                <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-6">Últimas Sorteadas</h2>
                <div className="grid grid-cols-4 gap-4">
                  {ultimasCinco.slice(1, 5).map((bola) => (
                    <div
                      key={bola.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 border border-gray-200"
                    >
                      <span className="text-3xl font-medium text-gray-900">{bola.numero}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botão Ver Todas */}
            <button
              onClick={() => setMostrarTodas(!mostrarTodas)}
              className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-lg py-4 font-medium transition-colors duration-300 flex items-center justify-center gap-2 text-gray-900 shadow-sm"
            >
              <span>{mostrarTodas ? 'Ocultar' : 'Ver Todas as Bolas Sorteadas'}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${mostrarTodas ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Todas as Bolas */}
            {mostrarTodas && (
              <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Todas as Bolas ({bolas.length})
                </h3>
                <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
                  {bolas.map((bola) => (
                    <div
                      key={bola.id}
                      className="bg-gray-50 rounded-lg p-3 flex items-center justify-center aspect-square hover:bg-gray-100 transition-colors duration-300 border border-gray-200"
                    >
                      <span className="text-xl font-medium text-gray-900">{bola.numero}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna Lateral - Prêmios */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-gray-200 shadow-sm sticky top-4">
              <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Prêmios
              </h2>

              <div className="space-y-4">
                {premios.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nenhum prêmio cadastrado</p>
                ) : (
                  premios.map((premio) => (
                    <div
                      key={premio.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        premio.entregue
                          ? 'bg-gray-50 border-gray-300 opacity-60'
                          : 'bg-yellow-50 border-yellow-600 hover:border-yellow-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-lg text-gray-900">{premio.nome}</h3>
                        {premio.entregue && (
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 capitalize">{premio.tipo}</p>
                      {premio.entregue && (
                        <p className="text-xs text-green-600 mt-2 font-medium">✓ Já sorteado</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
