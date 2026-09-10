import { Layers, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useCategories } from '@/store/CategoriesContext';

interface CategoryCardsProps {
  onSelectCategory: (category: string) => void;
}

export function CategoryCards({ onSelectCategory }: CategoryCardsProps) {
  const { categories, loading } = useCategories();

  return (
    <section id="categories" className="relative border-t border-accent/10 bg-obsidian-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Browse the collection</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent" />
          </div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
            SHOP BY <span className="text-gradient-gold">CATEGORY</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Explore a considered selection of products made for every part of your lifestyle.
          </p>
        </Reveal>

        {loading ? (
          <div className="py-16 text-center text-muted">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center text-muted">Categories will appear here soon.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                <button
                  onClick={() => onSelectCategory(category.slug)}
                  className="group flex h-full w-full flex-col rounded-sm border border-accent/15 bg-obsidian-800/60 p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-obsidian-800 hover:shadow-[0_15px_40px_rgba(200,164,92,0.12)]"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 transition-all group-hover:border-accent group-hover:bg-accent/20">
                    <Layers className="h-5 w-5 text-accent-light" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent-light">
                    Category {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-offwhite">{category.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {category.description || `Explore our ${category.name.toLowerCase()} collection.`}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-accent-light transition-all group-hover:gap-3">
                    Browse products <ChevronRight className="h-4 w-4" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
