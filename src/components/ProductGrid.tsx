"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, FilterState } from "../types/product";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { getEffectivePrice } from "../lib/utils";

const brandPriority = [
  "Rolex",
  "Patek",
  "Cartier",
  "Hublot",
  "Tissot",
  "Casio",
  "Gucci",
  "Invicta",
  "Orient",
  "Q&Q",
  "Admiral",
];

function getBrandScore(brand: string) {
  const index = brandPriority.findIndex((item) => item.toLowerCase() === brand.toLowerCase());
  return index >= 0 ? index : brandPriority.length;
}

interface ProductGridProps {
  products: Product[];
  onProductClick: (id: string) => void;
}

export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    color: "",
    category: "",
    brand: "",
    sortBy: "price-asc",
    priceMin: undefined,
    priceMax: undefined,
  });

  const [visibleCount, setVisibleCount] = useState(8);

  const availableCategories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products]
  );

  const availableBrands = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.brand))).sort((a, b) => {
        const scoreA = getBrandScore(a);
        const scoreB = getBrandScore(b);
        if (scoreA !== scoreB) return scoreA - scoreB;
        return a.localeCompare(b);
      }),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower)
      );
    }

    if (filters.color) {
      result = result.filter((p) => p.color === filters.color);
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }

    if (filters.priceMin !== undefined) {
      result = result.filter((p) => getEffectivePrice(p) >= filters.priceMin!);
    }

    if (filters.priceMax !== undefined) {
      result = result.filter((p) => getEffectivePrice(p) <= filters.priceMax!);
    }

    result.sort((a, b) => {
      if (!filters.category) {
        const brandDiff = getBrandScore(a.brand) - getBrandScore(b.brand);
        if (brandDiff !== 0) return brandDiff;
      }

      switch (filters.sortBy) {
        case "price-asc":
          return getEffectivePrice(a) - getEffectivePrice(b);
        case "price-desc":
          return getEffectivePrice(b) - getEffectivePrice(a);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [products, filters]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleClearFilters = () => {
    setFilters({
      search: "",
      color: "",
      category: "",
      brand: "",
      sortBy: "price-asc",
      priceMin: undefined,
      priceMax: undefined,
    });
    setVisibleCount(8);
  };

  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.color) ||
    Boolean(filters.category) ||
    Boolean(filters.brand) ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined;

  return (
    <section id="productos" className="py-16 md:py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm uppercase tracking-widest mb-4">
            Catálogo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestra Colección
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explora nuestra selección de relojes de lujo, cada uno con certificado
            de autenticidad y garantía oficial.
          </p>
        </motion.div>

        <ProductFilters
          filters={filters}
          onFiltersChange={setFilters}
          availableCategories={availableCategories}
          availableBrands={availableBrands}
        />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            Mostrando {visibleProducts.length} de {filteredProducts.length} relojes
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-gold hover:text-gold-light transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {visibleProducts.length > 0 ? (
          <>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onClick={onProductClick}
                    displayPrice={getEffectivePrice(product)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <motion.button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border-2 border-gold/50 text-gold font-semibold rounded-full hover:bg-gold/10 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>Cargar Más Relojes</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No se encontraron relojes
              </h3>
              <p className="text-white/60 mb-6">
                Intenta ajustar tus filtros o buscar con otros términos.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-gold hover:bg-gold-light text-dark font-semibold rounded-full transition-all duration-300"
              >
                Ver todos los relojes
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
