import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Cartelas() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  const plans = [
    {
      id: 1,
      cartelas: 1,
      preco: 10,
      precoOriginal: null,
      desconto: null,
      badge: null,
      popular: false,
      cor: 'red'
    },
    {
      id: 2,
      cartelas: 3,
      preco: 20,
      precoOriginal: 30,
      desconto: 50,
      badge: 'MAIS POPULAR',
      popular: true,
      cor: 'green'
    },
    {
      id: 3,
      cartelas: 6,
      preco: 30,
      precoOriginal: 60,
      desconto: 50,
      badge: 'MELHOR VALOR',
      popular: false,
      cor: 'yellow'
    }
  ]

  const handleWhatsAppClick = (plan: typeof plans[0]) => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5500000000000'
    const message = encodeURIComponent(
      `Olá! Gostaria de comprar ${plan.cartelas} ${plan.cartelas === 1 ? 'cartela' : 'cartelas'} do Bingo dos Nietenses por R$ ${plan.preco},00. 🎄`
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="mb-6 animate-fade-in-down">
            <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight animate-fade-in">
            Garanta Suas Cartelas Agora
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-4 animate-fade-in-up">
            Não perca a chance de participar do evento mais esperado do ano
          </p>
          <div className="flex items-center justify-center gap-4 text-sm md:text-base animate-fade-in-up">
            <div className="flex items-center gap-2 text-red-600 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Vagas Limitadas</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Compra Segura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Quanto mais cartelas, maiores suas chances de ganhar!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${
                  selectedPlan === plan.id
                    ? `border-${plan.cor}-600`
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.popular ? 'md:scale-105 md:-mt-4' : ''} hover:-translate-y-2 group`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-${plan.cor}-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 md:p-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <svg className={`w-16 h-16 mx-auto text-${plan.cor}-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>

                  {/* Quantidade */}
                  <div className="text-center mb-6">
                    <div className="text-5xl md:text-6xl font-light text-gray-900 mb-2">
                      {plan.cartelas}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {plan.cartelas === 1 ? 'Cartela' : 'Cartelas'}
                    </div>
                  </div>

                  {/* Preço */}
                  <div className="text-center mb-6">
                    {plan.precoOriginal && (
                      <div className="text-gray-400 line-through text-lg mb-1">
                        R$ {plan.precoOriginal},00
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-600 text-2xl">R$</span>
                      <span className={`text-5xl font-medium text-${plan.cor}-600`}>{plan.preco}</span>
                      <span className="text-gray-600 text-2xl">,00</span>
                    </div>
                    {plan.desconto && (
                      <div className={`mt-2 inline-block bg-${plan.cor}-100 text-${plan.cor}-700 px-3 py-1 rounded-full text-sm font-medium`}>
                        {plan.desconto}% de desconto
                      </div>
                    )}
                  </div>

                  {/* Valor por cartela */}
                  <div className="text-center mb-8 pb-8 border-b border-gray-200">
                    <span className="text-gray-500 text-sm">
                      {plan.cartelas > 1 && `Apenas R$ ${(plan.preco / plan.cartelas).toFixed(2)} por cartela`}
                      {plan.cartelas === 1 && 'Ideal para começar'}
                    </span>
                  </div>

                  {/* Benefícios */}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-gray-700">
                      <svg className={`w-5 h-5 text-${plan.cor}-600 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">Números únicos e validados</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <svg className={`w-5 h-5 text-${plan.cor}-600 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">Entrega imediata via WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <svg className={`w-5 h-5 text-${plan.cor}-600 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">Suporte durante o evento</span>
                    </li>
                    {plan.cartelas >= 3 && (
                      <li className="flex items-center gap-3 text-gray-700">
                        <svg className={`w-5 h-5 text-${plan.cor}-600 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">+ Chances de ganhar prêmios</span>
                      </li>
                    )}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleWhatsAppClick(plan)}
                    className={`w-full bg-${plan.cor}-600 hover:bg-${plan.cor}-700 text-white font-medium py-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Comprar via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 md:py-20 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="mb-6">
            <svg className="w-12 h-12 md:w-16 md:h-16 mx-auto text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
            ⚡ Últimas Cartelas Disponíveis!
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Não deixe para última hora. As cartelas estão acabando rápido e você não vai querer ficar de fora dessa celebração inesquecível.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2 text-red-700 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Evento em breve</span>
            </div>
            <div className="flex items-center gap-2 text-red-700 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span>+ de 200 famílias participando</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Dúvidas Frequentes
            </h3>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Como recebo minhas cartelas?
              </h4>
              <p className="text-gray-600 ml-9">
                Após a confirmação do pagamento, suas cartelas serão enviadas imediatamente via WhatsApp em formato digital, prontas para uso no evento.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Posso comprar mais cartelas depois?
              </h4>
              <p className="text-gray-600 ml-9">
                Sim! Você pode comprar cartelas adicionais a qualquer momento, mas recomendamos garantir as suas o quanto antes devido à demanda alta.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                As promoções são válidas até quando?
              </h4>
              <p className="text-gray-600 ml-9">
                As promoções são válidas enquanto durarem os estoques. Garanta seu desconto o quanto antes!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
