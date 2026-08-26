import { ShieldCheck } from 'lucide-react'

export const Header = () => {
  return (
    // <header className="bg-slate-900 text-slate-100 py-8 px-4">
    //   <div className="max-w-4xl mx-auto text-center">
    //     <h1 className="text-4xl font-bold mb-3">OfferCheck</h1>
    //     <p className="text-slate-400 text-lg">
    //       Analiza ofertas de trabajo en IT con nuestro motor de análisis local.
    //       Detecta Green Flags (aspectos positivos) y Red Flags (riesgos) para
    //       que tomes decisiones informadas.
    //     </p>
    //   </div>
    // </header>

    <header className="border-b border-border/70 bg-background/90">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-5 lg:px-8">
          <a className="flex items-center gap-3" aria-label="Offercheck, inicio">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" strokeWidth={2.2} />
            </span>
            <span className="font-sans text-lg font-bold tracking-tight">OfferCheck</span>
          </a>
        </div>
      </header>
  )
}
