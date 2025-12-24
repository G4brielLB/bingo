export default function Footer() {
  return (
    <footer className="bg-red-700 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <div>
            <h3 className="text-2xl font-light mb-2 tracking-wide">Bingo dos Nietenses 2025</h3>
            <p className="text-red-100 font-light">
              Celebrando o Natal com alegria e união
            </p>
          </div>
          <div className="border-t border-red-600 pt-8 space-y-3">
            <p className="text-red-100 text-sm font-light">
              © {new Date().getFullYear()} <strong className="text-white font-medium">Actua</strong>. Todos os direitos reservados.
            </p>
            <p className="text-red-200 text-xs font-light">
              Desenvolvido para a comunidade nietense
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
