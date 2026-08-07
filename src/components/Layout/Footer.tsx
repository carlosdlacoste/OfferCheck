export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-6 px-4 border-t border-slate-700">
      <div className="max-w-4xl mx-auto text-center">
        <p className="mb-2">
          <span className="text-slate-100 font-semibold">OfferCheck</span> -
          Análisis de ofertas de trabajo en IT
        </p>
        <p className="text-sm">
          Herramienta de análisis local para detectar Green Flags y Red Flags
          en ofertas laborales del sector tecnológico.
        </p>
        <div className="mt-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} OfferCheck. Proyecto de código abierto.</p>
        </div>
      </div>
    </footer>
  )
}
