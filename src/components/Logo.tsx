import { Sparkles } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export function Logo({ onClick, size = 'md' }: LogoProps) {
  const titleSize = size === 'sm' ? 'text-lg' : 'text-xl';
  const taglineSize = size === 'sm' ? 'text-[8px]' : 'text-[9px]';

  return (
    <button onClick={onClick} className="group flex items-center gap-2.5 text-left" aria-label="ZORVEX home">
      <div className="relative">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-obsidian-800/80 transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <Sparkles className="h-4 w-4 text-accent-light" fill="currentColor" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-display font-bold tracking-[0.18em] text-offwhite ${titleSize}`}>
          ZORVEX
        </span>
        <span className={`font-sans font-medium uppercase tracking-[0.3em] text-accent-light/80 ${taglineSize}`}>
          Shop More. Live Better.
        </span>
      </div>
    </button>
  );
}
