interface BingoGridProps {
  bolasSorteadas: number[]
}

export default function BingoGrid({ bolasSorteadas }: BingoGridProps) {
  const letras = ['B', 'I', 'N', 'G', 'O']
  
  // Gera números por coluna: B(1-15), I(16-30), N(31-45), G(46-60), O(61-75)
  const getColunaNumeros = (letraIndex: number): number[] => {
    const inicio = letraIndex * 15 + 1
    return Array.from({ length: 15 }, (_, i) => inicio + i)
  }

  const getCorLetra = (letra: string) => {
    const cores = {
      B: 'bg-red-600',
      I: 'bg-blue-600',
      N: 'bg-yellow-600',
      G: 'bg-green-600',
      O: 'bg-purple-600'
    }
    return cores[letra as keyof typeof cores]
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-2xl w-fit mx-auto">
      <h3 className="text-white text-lg font-semibold mb-3 text-center">
        Painel de Bolas
      </h3>
      
      <div className="space-y-2">
        {/* Cada linha: letra + 15 números */}
        {letras.map((letra, letraIndex) => {
          const numeros = getColunaNumeros(letraIndex)
          
          return (
            <div key={letra} className="flex items-center gap-2">
              {/* Header da letra */}
              <div
                className={`${getCorLetra(letra)} text-white font-bold text-lg rounded-lg text-center shadow-lg w-12 h-12 flex items-center justify-center shrink-0`}
              >
                {letra}
              </div>
              
              {/* Números da linha */}
              <div className="flex gap-1.5">
                {numeros.map((numero) => {
                  const foiSorteada = bolasSorteadas.includes(numero)
                  
                  return (
                    <div
                      key={numero}
                      className={`
                        relative w-12 h-12 rounded-full font-bold text-base
                        flex items-center justify-center transition-all duration-300
                        ${foiSorteada 
                          ? 'bg-white text-gray-900 shadow-[0_6px_16px_rgba(0,0,0,0.4),inset_0_-3px_6px_rgba(0,0,0,0.2),inset_0_3px_8px_rgba(255,255,255,0.9)] scale-105' 
                          : 'bg-gray-700 text-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_2px_6px_rgba(0,0,0,0.4)]'
                        }
                      `}
                    >
                      {numero}
                      {foiSorteada && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full shadow-lg animate-pulse" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
