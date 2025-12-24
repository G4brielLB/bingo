import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden transition-opacity duration-700">
        {/* Background Image com overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-8 animate-fade-in-down">
            <svg className="w-20 h-20 md:w-28 md:h-28 mx-auto text-white hover:scale-110 hover:rotate-12 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight animate-fade-in">
            Bingo dos Nietenses 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light animate-fade-in-up">
            Celebre o Natal com diversão e prêmios incríveis
          </p>
          <Link
            to="/bingo"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-medium text-lg md:text-xl px-10 md:px-14 py-4 md:py-5 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
          >
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Acompanhar Bingo ao Vivo
          </Link>
        </div>
      </section>

      {/* Descrição Section */}
      <section className="py-20 md:py-32 bg-gray-50 transition-all duration-500">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
                Uma Tradição Natalina Especial
              </h2>
              <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-10 md:p-16 border border-gray-100 hover:shadow-md transition-shadow duration-500">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                Bem-vindo ao <strong className="text-red-600 font-medium">Bingo dos Nietenses 2025</strong>. 
                Uma celebração que reúne família, amigos e a comunidade em um 
                momento único de alegria e confraternização.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
                Prepare-se para uma noite inesquecível, repleta de emoção, risadas e 
                prêmios especiais cuidadosamente selecionados para tornar seu Natal 
                ainda mais especial.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center space-y-3 p-6 hover:bg-gray-50 rounded-lg transition-all duration-300 group cursor-pointer">
                  <svg className="w-8 h-8 text-red-600 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <span className="text-gray-800 font-medium group-hover:text-red-600 transition-colors duration-300">Prêmios Incríveis</span>
                </div>
                <div className="flex flex-col items-center space-y-3 p-6 hover:bg-gray-50 rounded-lg transition-all duration-300 group cursor-pointer">
                  <svg className="w-8 h-8 text-green-600 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-gray-800 font-medium group-hover:text-green-600 transition-colors duration-300">Para Toda Família</span>
                </div>
                <div className="flex flex-col items-center space-y-3 p-6 hover:bg-gray-50 rounded-lg transition-all duration-300 group cursor-pointer">
                  <svg className="w-8 h-8 text-yellow-600 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800 font-medium group-hover:text-yellow-600 transition-colors duration-300">Diversão Garantida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botões de Ação Section */}
      <section className="py-20 md:py-32 bg-white transition-all duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
              Tudo Pronto Para Você
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="text-xl text-gray-600 font-light">
              Escolha uma opção abaixo e prepare-se para a diversão
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Botão Cartelas */}
            <Link
              to="/cartelas"
              className="group bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-xl p-10 transition-all duration-500 border border-gray-200 hover:border-red-600 hover:-translate-y-2"
            >
              <svg className="w-16 h-16 mb-6 text-red-600 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <h3 className="text-2xl font-medium text-gray-900 mb-3 text-center group-hover:text-red-600 transition-colors duration-300">
                Compre Cartelas
              </h3>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Adquira suas cartelas e garanta sua participação
              </p>
              <div className="text-red-600 font-medium text-center group-hover:translate-x-2 transition-transform duration-300 flex items-center justify-center gap-2">
                <span>Comprar Agora</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Botão Regulamento */}
            <Link
              to="/regulamento"
              className="group bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-xl p-10 transition-all duration-500 border border-gray-200 hover:border-green-600 hover:-translate-y-2"
            >
              <svg className="w-16 h-16 mb-6 text-green-600 mx-auto group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-2xl font-medium text-gray-900 mb-3 text-center group-hover:text-green-600 transition-colors duration-300">
                Regulamento
              </h3>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Conheça as regras e como participar do evento
              </p>
              <div className="text-green-600 font-medium text-center group-hover:translate-x-2 transition-transform duration-300 flex items-center justify-center gap-2">
                <span>Ver Regras</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Botão Prêmios */}
            <Link
              to="/premios"
              className="group bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-xl p-10 transition-all duration-500 border border-gray-200 hover:border-yellow-600 hover:-translate-y-2"
            >
              <svg className="w-16 h-16 mb-6 text-yellow-600 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <h3 className="text-2xl font-medium text-gray-900 mb-3 text-center group-hover:text-yellow-600 transition-colors duration-300">
                Prêmios
              </h3>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Descubra os prêmios incríveis que você pode ganhar
              </p>
              <div className="text-yellow-600 font-medium text-center group-hover:translate-x-2 transition-transform duration-300 flex items-center justify-center gap-2">
                <span>Ver Prêmios</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

