import { useState, type FormEvent } from 'react';
import { Lock, Mail, Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/auth/AuthContext';

export function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) {
      setError(signInError);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian-900 px-5">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-offwhite"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </a>

        <div className="relative overflow-hidden rounded-sm border border-accent/25 bg-obsidian-800/60 p-10 backdrop-blur-md">
          <div className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-accent/40" />
          <div className="pointer-events-none absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-accent/40" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-accent/40" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-accent/40" />

          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-obsidian-900">
              <Sparkles className="h-6 w-6 text-accent-light" fill="currentColor" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-[0.15em] text-offwhite">ZORVEX</h1>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.3em] text-accent-light/80">
              Admin Panel
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-accent/20 bg-obsidian-900/60 py-3 pl-10 pr-4 text-sm text-offwhite placeholder-muted/60 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                  placeholder="admin@zorvex.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-sm border border-accent/20 bg-obsidian-900/60 py-3 pl-10 pr-4 text-sm text-offwhite placeholder-muted/60 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-gradient-to-r from-accent to-accent2 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
