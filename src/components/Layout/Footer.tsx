export const Footer = () => {
  return (

    <footer className="border-t border-border/70 bg-background/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>Decide con más información. Aplica con más confianza.</p>
        <p>© {new Date().getFullYear()} OfferCheck</p>
      </div>
    </footer>

  )
}
