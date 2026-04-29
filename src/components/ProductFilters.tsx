"use client";

import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import type { FilterState } from "../types/product";
import { cn } from "../lib/utils";

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableCategories: string[];
  availableBrands: string[];
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  availableCategories,
  availableBrands,
}: ProductFiltersProps) {
  const colors = [
    { value: "", label: "Todos" },
    { value: "negro", label: "Negro" },
    { value: "dorado", label: "Dorado" },
    { value: "plateado", label: "Plateado" },
    { value: "azul", label: "Azul" },
    { value: "rojo", label: "Rojo" },
    { value: "blanco", label: "Blanco" },
  ];

  const categories = [
    { value: "", label: "Todas" },
    ...availableCategories.map((category) => ({
      value: category,
      label: category === "dama" ? "Dama" : category === "caballero" ? "Caballero" : category,
    })),
  ];

  const brands = [
    { value: "", label: "Todas las marcas" },
    ...availableBrands.map((brand) => ({ value: brand, label: brand })),
  ];

  const sortOptions = [
    { value: "price-asc", label: "Precio: Menor a Mayor" },
    { value: "price-desc", label: "Precio: Mayor a Menor" },
    { value: "name-asc", label: "Nombre: A-Z" },
    { value: "name-desc", label: "Nombre: Z-A" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-10 p-6 bg-dark-100 rounded-2xl border border-white/5 backdrop-blur-sm bg-dark/30"
    >
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1.7fr_1.3fr]">
        <div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Buscar relojes..."
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 bg-dark-200 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors duration-300"
              aria-label="Buscar relojes"
            />
            {filters.search && (
              <button
                onClick={() => onFiltersChange({ ...filters, search: "" })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-white/60">Categoría</span>
              <select
                value={filters.category}
                onChange={(e) =>
                  onFiltersChange({ ...filters, category: e.target.value })
                }
                className="mt-2 w-full px-4 py-3 bg-dark-200 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50 transition-colors duration-300"
              >
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-white/60">Marca</span>
              <select
                value={filters.brand}
                onChange={(e) =>
                  onFiltersChange({ ...filters, brand: e.target.value })
                }
                className="mt-2 w-full px-4 py-3 bg-dark-200 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50 transition-colors duration-300"
              >
                {brands.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-gold" />
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onFiltersChange({ ...filters, color: color.value })}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg transition-all duration-300",
                    filters.color === color.value
                      ? "bg-gold text-dark font-semibold"
                      : "bg-dark-200 text-white/70 hover:text-white hover:bg-dark-300"
                  )}
                  aria-label={`Filtrar por ${color.label}`}
                >
                  {color.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-white/60">Precio mínimo</span>
              <input
                type="number"
                min={0}
                placeholder="0"
                value={filters.priceMin ?? ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceMin: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="mt-2 w-full px-4 py-3 bg-dark-200 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                aria-label="Precio mínimo"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white/60">Precio máximo</span>
              <input
                type="number"
                min={0}
                placeholder="999999"
                value={filters.priceMax ?? ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceMax: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="mt-2 w-full px-4 py-3 bg-dark-200 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                aria-label="Precio máximo"
              />
            </label>
          </div>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                sortBy: e.target.value as FilterState["sortBy"],
              })
            }
            className="w-full px-4 py-3 bg-dark-200 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50 transition-colors duration-300 cursor-pointer"
            aria-label="Ordenar por"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}
