"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onHomeClick: () => void;
  onProductsClick: () => void;
}

export default function Header({ onHomeClick, onProductsClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Inicio", onClick: onHomeClick },
    { label: "Colección", onClick: onProductsClick },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={onHomeClick} className="flex items-center gap-2 group">
            <img src="/logo.svg" alt="Chronos elite" className="h-10 w-10 object-contain" />
            <span className="hidden sm:block font-bold text-lg tracking-wider text-white">
              Chronos<span className="text-gold"> elite</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="text-sm text-white/70 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-dark-100 border-t border-white/5"
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="block text-white/70 hover:text-gold transition-colors duration-300 py-2 uppercase tracking-wide w-full text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
