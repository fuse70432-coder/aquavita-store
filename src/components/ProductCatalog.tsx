import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductGridCard } from '@/components/ProductGridCard';
import { ProductDetail } from '@/components/ProductDetail';
import { supabase } from '@/lib/supabase';
import { productRowToProduct, type ProductRow, type Product, type ProductCategory } from '@/types';
import { useCategories } from '@/store/CategoriesContext';

export type CategoryFilter = 'all' | ProductCategory;

interface ProductCatalogProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}

export function ProductCatalog({ activeCategory, onCategoryChange }: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { categories } = useCategories();

  useEffect(() => {
    async function loadProducts() {
      const { data, error: fetchError } = await supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: true });
      if (fetchError || !data) { setError(true); setLoading(false); return; }
      setProducts((data as ProductRow[]).map(productRowToProduct));
      setLoading(false);
    }
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatches = activeCategory === 'all' || product.category === activeCategory;
      const searchMatches = !query || product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
      return categoryMatches && searchMatches;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="products" className="relative border-t border-accent/10 bg-obsidian-900 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-10 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3"><div className="h-px w-10 bg-gradient-to-r from-transparent to-accent" /><span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">The ZORVEX edit</span><div className="h-px w-10 bg-gradient-to-l from-transparent to-accent" /></div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">EXPLORE <span className="text-gradient-brand">OUR COLLECTION</span></h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mb-8 max-w-xl"><div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" /><input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by product name or description..." className="w-full rounded-sm border border-accent/20 bg-obsidian-800/70 py-3.5 pl-11 pr-4 text-sm text-offwhite placeholder-muted/60 outline-none transition-colors focus:border-accent/60" /></div></div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => onCategoryChange('all')} className={`rounded-sm border px-5 py-2.5 text-sm font-semibold transition-all ${activeCategory === 'all' ? 'border-accent bg-accent/15 text-accent-light' : 'border-accent/20 text-muted hover:border-accent/40 hover:text-offwhite'}`}>All Products</button>
            {categories.map((category) => <button key={category.id} onClick={() => onCategoryChange(category.slug)} className={`rounded-sm border px-5 py-2.5 text-sm font-semibold transition-all ${activeCategory === category.slug ? 'border-accent bg-accent/15 text-accent-light' : 'border-accent/20 text-muted hover:border-accent/40 hover:text-offwhite'}`}>{category.name}</button>)}
          </div>
        </Reveal>

        {loading ? <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" /></div> : error ? <div className="flex flex-col items-center justify-center py-20 text-center"><p className="text-muted">Unable to load products right now.</p><button onClick={() => window.location.reload()} className="mt-4 rounded-sm border border-accent/50 px-5 py-2.5 text-sm font-semibold text-accent-light">Try Again</button></div> : filteredProducts.length === 0 ? <div className="flex items-center justify-center py-20 text-center"><p className="text-muted">No products match your search.</p></div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredProducts.map((product, i) => <Reveal key={product.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}><ProductGridCard product={product} onCardClick={setSelectedProduct} /></Reveal>)}</div>}
      </div>
      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
