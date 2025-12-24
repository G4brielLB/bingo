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
    <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
      <h3 className="text-white text-xl font-semibold mb-4 text-center">
        Painel de Bolas
      </h3>
      
      <div className="grid grid-cols-5 gap-2">
        {/* Headers das letras */}
        {letras.map((letra) => (
          <div
            key={letra}
            className={`${getCorLetra(letra)} text-white font-bold text-2xl py-3 rounded-lg text-center`}
          >
            {letra}
          </div>
        ))}

        {/* Grid de números */}
        {Array.from({ length: 15 }).map((_, rowIndex) => (
          letras.map((letra, colIndex) => {
            const numero = getColunaNumeros(colIndex)[rowIndex]
            const foiSorteada = bolasSorteadas.includes(numero)
            
            return (
              <div
                key={`${letra}-${numero}`}
                className={`
                  relative aspect-square rounded-lg font-semibold text-lg
                  flex items-center justify-center transition-all duration-300
                  ${foiSorteada 
                    ? 'bg-white text-gray-900 scale-105 shadow-lg ring-2 ring-yellow-400' 
                    : 'bg-gray-800 text-gray-500'
                  }
                `}
              >
                {numero}
                {foiSorteada && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
            )
          })
        ))}
      </div>
    </div>
  )
}
