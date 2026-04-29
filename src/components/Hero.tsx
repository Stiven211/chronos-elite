"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT_WHATSAPP, WHATSAPP_MESSAGE } from "../lib/config";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax effect
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: isMounted ? y : 0 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />
        </div>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity: isMounted ? opacity : 1 }}
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm uppercase tracking-widest backdrop-blur-sm">
            Relojes de Lujo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Elegancia en tu{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
            Muñeca
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto"
        >
          Descubre nuestra selección exclusiva de relojes premium que combinan
          artesanía suíza con diseño atemporal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onExploreClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold text-lg rounded-full shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300"
          >
            Explorar Colección
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </motion.button>

          <motion.a
            href={`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            Contactar Asesor
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <motion.button
            onClick={onExploreClick}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50 hover:text-gold transition-colors duration-300"
            aria-label="Scroll a la colección"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}
