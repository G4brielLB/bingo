import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Regulamento() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-3xl md:text-5xl font-light mb-4 tracking-tight">
            REGULAMENTO – BINGO DOS NIETENSES 2025
          </h1>
        </div>
      </section>

      {/* Regulamento Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-12">

            {/* Seção 1 */}
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-red-600">1.</span>
                Aquisição de Cartelas
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed ml-8">
                <p>
                  • Os participantes podem adquirir quantas cartelas desejarem, mas, após a aquisição, não será permitido a troca ou a devolução de nenhuma cartela.
                </p>
              </div>
            </div>

            {/* Seção 2 */}
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-red-600">2.</span>
                Premiação
              </h2>
              <div className="space-y-4 ml-8">
                <div className="bg-red-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">COLUNA 1:</span>
                    <span className="text-gray-800">
                      O primeiro participante que completar uma coluna. Depois de completar, ele não poderá mais concorrer ao prêmio da COLUNA 2, somente aos da LINHA 1 e 2 e da CARTELA CHEIA.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">COLUNA 2:</span>
                    <span className="text-gray-800">
                      O segundo participante que completar uma coluna. Depois de completar, ele poderá concorrer aos prêmios da LINHA 1 e 2 e da CARTELA CHEIA.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">LINHA 1:</span>
                    <span className="text-gray-800">
                      O primeiro participante que completar uma linha. Depois de completar, ele não poderá mais concorrer ao prêmio da LINHA 2, somente ao da CARTELA CHEIA.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">LINHA 2:</span>
                    <span className="text-gray-800">
                      O segundo participante que completar uma linha. Depois de completar, ele poderá concorrer ao prêmio da CARTELA CHEIA.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">CARTELA CHEIA:</span>
                    <span className="text-gray-800">O primeiro participante que completar uma cartela inteira.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 3 */}
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-red-600">3.</span>
                Regras de Desempate
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed ml-8">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Procedimento de Desempate:</h3>
                  <p>
                    • Se mais de um participante completar uma coluna, linha ou cartela cheia ao mesmo tempo, o desempate ocorrerá com cada participante sorteando um número. Quem sortear o número maior, leva o prêmio.
                  </p>
                  <p className="mt-3">
                    • É importante ressaltar que os números sorteados no desempate retornarão à Roleta.
                  </p>
                </div>
              </div>
            </div>

            {/* Fechamento */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-center text-gray-600 font-light italic">
                Boa sorte a todos os participantes!
              </p>
              <p className="text-center text-gray-500 text-sm mt-2">
                Bingo dos Nietenses 2025 - Celebrando o Natal com alegria e união
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
