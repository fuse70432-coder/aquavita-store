import { ChevronRight, ChevronDown, Sparkles, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-obsidian-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(99,102,241,0.18),transparent_32%),radial-gradient(circle_at_25%_70%,rgba(168,85,247,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute right-0 top-24 h-px w-2/5 bg-gradient-to-l from-accent/50 to-transparent" />
      <div className="pointer-events-none absolute bottom-24 left-0 h-px w-1/3 bg-gradient-to-r from-accent2/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-accent to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Curated for modern living</span>
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-offwhite sm:text-6xl lg:text-7xl">
              SHOP MORE.<br /><span className="text-gradient-brand">LIVE BETTER.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Discover thoughtfully selected products across every category, delivered with the quality and care you expect from ZORVEX.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => scrollTo('#categories')} className="group flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-accent to-accent2 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                Explore Collection <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => scrollTo('#why')} className="group flex items-center justify-center gap-2 rounded-sm border border-accent/40 px-8 py-4 text-sm font-bold text-accent-light transition-all duration-300 hover:border-accent hover:bg-accent/10">
                Why ZORVEX <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-accent/15 pt-6">
              {[{ icon: ShieldCheck, label: 'Trusted quality' }, { icon: Truck, label: 'Fast dispatch' }, { icon: BadgeCheck, label: 'Curated picks' }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-muted"><Icon className="h-4 w-4 text-accent-light" />{label}</div>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-8 rounded-full bg-accent/10 blur-[100px]" />
            <div className="relative mx-auto flex h-[480px] w-[420px] items-center justify-center rounded-sm border border-accent/20 bg-gradient-to-br from-obsidian-800/90 to-obsidian-950/90 shadow-[0_0_80px_rgba(99,102,241,0.15)]">
              <Sparkles className="h-24 w-24 text-accent-light/70" strokeWidth={1} />
              <div className="absolute left-8 top-8 h-16 w-16 border-l border-t border-accent/50" />
              <div className="absolute bottom-8 right-8 h-16 w-16 border-b border-r border-accent2/50" />
              <div className="absolute bottom-12 text-center"><span className="block text-xs uppercase tracking-[0.35em] text-accent-light">ZORVEX</span><span className="mt-2 block text-[10px] uppercase tracking-[0.2em] text-muted">Shop More. Live Better.</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-obsidian-900 to-transparent" />
    </section>
  );
}
