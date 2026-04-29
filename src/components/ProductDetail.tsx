"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Truck,
  RefreshCw,
  Heart,
  Share2,
  MessageCircle,
  ChevronLeft,
  ZoomIn,
  ArrowLeft,
  Star,
} from "lucide-react";
import type { Product } from "../types/product";
import { formatPrice, generateWhatsAppLink, getEffectivePrice } from "../lib/utils";

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onProductClick: (id: string) => void;
}

export default function ProductDetail({
  product,
  allProducts,
  onBack,
  onProductClick,
}: ProductDetailProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [liked, setLiked] = useState(false);
  const imageUrl = typeof window !== "undefined"
    ? new URL(product.image, window.location.origin).href
    : product.image;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.color === product.color)
    .slice(0, 4);

  const features = [
    { icon: Shield, text: "Autenticidad garantizada" },
    { icon: Truck, text: "Envío seguro a todo Colombia" },
    { icon: RefreshCw, text: "Garantía de 2 años" },
  ];

  const displayPrice = getEffectivePrice(product);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Breadcrumb */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        aria-label="Breadcrumb"
      >
        <div className="flex items-center gap-2 text-sm">
          <button onClick={onBack} className="text-white/60 hover:text-gold transition-colors">
            Inicio
          </button>
          <ChevronLeft className="w-4 h-4 text-white/30" />
          <span className="text-white/90" aria-current="page">
            {product.name}
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Product Detail */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20"
        >
          {/* Images */}
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-dark-200 cursor-zoom-in group"
              onClick={() => setIsZoomed(true)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700"
                loading="eager"
              />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold border border-gold/30 bg-gold/10 text-gold backdrop-blur-sm">
                    {product.badge === "más-vendido"
                      ? "Más Vendido"
                      : product.badge === "nuevo"
                      ? "Nuevo"
                      : product.badge === "limitado"
                      ? "Edición Limitada"
                      : "Oferta"}
                  </span>
                </div>
              )}

              {/* Like button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className={`absolute top-6 left-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  liked
                    ? "bg-red-500 text-white"
                    : "bg-dark/60 text-white/70 hover:text-white backdrop-blur"
                }`}
                aria-label="Agregar a favoritos"
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              </button>

              {/* Zoom indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-dark/60 backdrop-blur rounded-lg text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4" />
                <span>Clic para ampliar</span>
              </div>

              {/* Out of stock overlay */}
              {product.inStock === false && (
                <div className="absolute inset-0 bg-dark/80 flex items-center justify-center z-20">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-2">Agotado</p>
                    <p className="text-white/60">Contáctanos para más información</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < (product.rating || 5) ? "text-gold fill-gold" : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white/60 text-sm">
                {product.rating?.toFixed(1) || "5.0"} · {product.reviews || 0} reseñas
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              {product.name}
            </motion.h1>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-baseline gap-3"
            >
              <span className="text-3xl md:text-4xl font-bold text-gold">
                {formatPrice(displayPrice)}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 text-lg leading-relaxed"
            >
              {product.description}
            </motion.p>

            {/* Color */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="text-sm font-medium text-white/60 mb-3 block">
                Color principal
              </label>
              <div className="flex gap-3">
                {["negro", "dorado", "plateado", "azul", "rojo", "blanco"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => {}}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark focus:ring-gold ${
                        product.color === color
                          ? "border-gold scale-110 ring-2 ring-gold"
                          : "border-dark-200 hover:border-gold/50"
                      }`}
                      style={{
                        backgroundColor:
                          color === "negro"
                            ? "#000"
                            : color === "dorado"
                            ? "#d4af37"
                            : color === "plateado"
                            ? "#c0c0c0"
                            : color === "azul"
                            ? "#1e40af"
                            : color === "rojo"
                            ? "#dc2626"
                            : "#f3f4f6",
                      }}
                      aria-label={`Color ${color}`}
                    />
                  )
                )}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <feat.icon className="w-4 h-4 text-gold" />
                  <span>{feat.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-4 pt-6 border-t border-white/5"
            >
              <button
                onClick={() =>
                  window.open(
                    generateWhatsAppLink(product.name, getEffectivePrice(product), imageUrl),
                    "_blank"
                  )
                }
                disabled={!product.inStock}
                className={`w-full py-4 flex items-center justify-center gap-3 font-bold rounded-xl transition-all duration-300 ${
                  product.inStock
                    ? "bg-gradient-to-r from-gold to-gold-dark text-dark hover:from-gold-light hover:shadow-lg shadow-gold/25 cursor-pointer"
                    : "bg-dark-200 text-white/40 cursor-not-allowed"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                {product.inStock
                  ? "Pedir por WhatsApp"
                  : "Producto agotado - Consultar disponibilidad"}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 bg-transparent"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Zoom Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center p-4"
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-200 text-white hover:bg-dark-300 flex items-center justify-center"
                aria-label="Cerrar"
              >
                <ArrowLeft className="w-5 h-5 rotate-45" />
              </button>
              <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              También podría interesarte
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  onClick={() => onProductClick(related.id)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-dark-200 border border-white/5"
                  >
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-gold/20 border border-gold/30 rounded text-gold mb-2 line-clamp-1">
                        {related.name}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">
                          {formatPrice(related.price)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
