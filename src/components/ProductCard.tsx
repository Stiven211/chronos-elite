"use client";

import { motion } from "framer-motion";
import type { Product } from "../types/product";
import { formatPrice, generateWhatsAppLink } from "../lib/utils";
import { BadgeInfo, Sparkles, Percent, Flame, MessageCircle, Share } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
  onClick?: (id: string) => void;
  displayPrice?: number;
}

export default function ProductCard({ product, index, onClick, displayPrice }: ProductCardProps) {
  const badgeConfig = {
    "más-vendido": { icon: Flame, label: "Más Vendido", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    nuevo: { icon: Sparkles, label: "Nuevo", className: "bg-gold/20 text-gold border-gold/30" },
    oferta: { icon: Percent, label: "Oferta", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    limitado: { icon: BadgeInfo, label: "Edición Limitada", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  };

  const badge = product.badge ? badgeConfig[product.badge] : undefined;
  const imageUrl = typeof window !== "undefined"
    ? new URL(product.image, window.location.origin).href
    : product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-dark-100 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 cursor-pointer"
      onClick={() => onClick?.(product.id)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-dark-200">
        <img
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          decoding="async"
          loading="lazy"
          fetchPriority="low"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {product.badge && badge && (
          <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${badge.className}`}>
            <badge.icon className="w-3.5 h-3.5" />
            {badge.label}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="px-6 py-3 bg-gold text-dark font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            Ver Detalles
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="inline-block px-2 py-0.5 text-xs uppercase tracking-wider text-white/80 bg-white/5 rounded">
            {product.brand}
          </span>
          <span className="inline-block px-2 py-0.5 text-xs uppercase tracking-wider text-gold/70 bg-gold/5 rounded">
            {product.color}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-white/50 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-white">
            {formatPrice(displayPrice ?? product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'text-gold fill-gold' : 'text-white/20'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-white/50 text-sm">
            {product.rating?.toFixed(1) || "5.0"} · {product.reviews || 0} reseñas
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={generateWhatsAppLink(product.name, displayPrice ?? product.price, imageUrl)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl hover:from-gold-light hover:shadow-lg shadow-gold/20 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <MessageCircle className="w-5 h-5" />
            Pedir
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: share functionality
            }}
            className="p-3 bg-dark/20 hover:bg-dark/40 rounded-lg transition-colors text-white/70 hover:text-white border border-white/10"
            aria-label="Compartir"
          >
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
