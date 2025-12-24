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
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Regulamento Oficial</h1>
          <p className="text-red-100 text-lg md:text-xl font-light">
            Bingo dos Nietenses 2025
          </p>
        </div>
      </section>

      {/* Regulamento Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-12">
            
            {/* Introdução */}
            <div>
              <p className="text-gray-700 leading-relaxed text-lg font-light">
                Este regulamento estabelece as regras e condições para participação no Bingo dos Nietenses 2025. 
                A participação no evento implica na aceitação integral deste regulamento.
              </p>
            </div>

            {/* Seção 1 */}
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-red-600">1.</span>
                Aquisição de Cartelas
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed ml-8">
                <p>• Cada participante pode adquirir <strong className="text-gray-900">quantas cartelas desejar</strong>, sem limite máximo.</p>
                <p>• As cartelas <strong className="text-gray-900">não são nominais</strong> e podem ser utilizadas por qualquer pessoa.</p>
                <p>• Após a aquisição, não serão permitidas devoluções ou trocas de cartelas.</p>
              </div>
            </div>

            {/* Seção 2 */}
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-red-600">2.</span>
                Premiação
              </h2>
              <div className="space-y-4 ml-8">
                <p className="text-gray-700 leading-relaxed">
                  O Bingo dos Nietenses 2025 distribuirá <strong className="text-gray-900">5 (cinco) prêmios</strong> na seguinte ordem:
                </p>
                <div className="bg-red-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">1º Prêmio:</span>
                    <span className="text-gray-800">Coluna 1 - Primeiro participante a completar uma coluna inteira</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">2º Prêmio:</span>
                    <span className="text-gray-800">Coluna 2 - Segundo participante a completar uma coluna inteira</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">3º Prêmio:</span>
                    <span className="text-gray-800">Linha 1 - Primeiro participante a completar uma linha inteira</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">4º Prêmio:</span>
                    <span className="text-gray-800">Linha 2 - Segundo participante a completar uma linha inteira</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-semibold min-w-[140px]">5º Prêmio:</span>
                    <span className="text-gray-800">Cartela Cheia - Primeiro participante a completar todos os números da cartela</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4">
                  • Os prêmios <strong className="text-gray-900">não podem ser trocados</strong> por dinheiro ou outros bens.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  • O bingo <strong className="text-gray-900">somente será encerrado</strong> após a distribuição de todos os 5 prêmios.
                </p>
              </div>
            </div>

            {/* Seção 3 */}
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-red-600">3.</span>
                Regras de Conquista
              </h2>
              <div className="space-y-4 ml-8">
                <p className="text-gray-700 leading-relaxed">
                  Para garantir a distribuição justa dos prêmios entre diferentes participantes, aplicam-se as seguintes restrições:
                </p>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">Linha:</p>
                    <p>• Um participante que ganhar um prêmio de <strong>Linha</strong> (Linha 1 ou Linha 2) <strong className="text-gray-900">não poderá mais ganhar outro prêmio de Linha</strong>.</p>
                    <p>• No entanto, poderá ainda concorrer aos prêmios de <strong>Coluna</strong> e <strong>Cartela Cheia</strong>.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">Coluna:</p>
                    <p>• Um participante que ganhar um prêmio de <strong>Coluna</strong> (Coluna 1 ou Coluna 2) <strong className="text-gray-900">não poderá mais ganhar outro prêmio de Coluna</strong>.</p>
                    <p>• No entanto, poderá ainda concorrer aos prêmios de <strong>Linha</strong> e <strong>Cartela Cheia</strong>.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">Cartela Cheia:</p>
                    <p>• Todos os participantes podem concorrer à <strong>Cartela Cheia</strong>, independentemente de terem ganho prêmios anteriores.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 4 */}
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-red-600">4.</span>
                Critério de Desempate
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed ml-8">
                <p>
                  Em caso de <strong className="text-gray-900">dois ou mais participantes</strong> completarem simultaneamente a mesma modalidade 
                  (Linha, Coluna ou Cartela Cheia), será realizado o seguinte procedimento de desempate:
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Procedimento de Desempate:</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Será realizado um sorteio de <strong>um único número</strong> adicional.</li>
                    <li>O participante que <strong>possuir esse número em sua cartela</strong> vencedora será declarado o ganhador.</li>
                    <li>Caso <strong>nenhum</strong> dos participantes empatados possua o número sorteado, <strong>ou mais de um possua</strong>, 
                    será sorteado um novo número, repetindo o processo até que haja um único vencedor.</li>
                  </ol>
                </div>
                <p className="text-sm text-gray-600 italic">
                  * Em situações excepcionais, a organização do evento reserva-se o direito de aplicar critérios adicionais de desempate, 
                  sempre visando a justiça e transparência do processo.
                </p>
              </div>
            </div>

            {/* Seção 5 */}
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-red-600">5.</span>
                Disposições Gerais
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed ml-8">
                <p>• A organização do evento reserva-se o direito de alterar este regulamento a qualquer momento, mediante comunicação prévia aos participantes.</p>
                <p>• Casos omissos serão resolvidos pela organização do Bingo dos Nietenses 2025.</p>
                <p>• Dúvidas sobre o regulamento podem ser esclarecidas junto à organização antes do início do evento.</p>
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
