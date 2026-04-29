"use client";

import { Watch, MapPin, Phone, Mail, Camera, ExternalLink, MessageCircle } from "lucide-react";
import {
  CONTACT_WHATSAPP,
  WHATSAPP_MESSAGE,
  CONTACT_EMAIL,
  CONTACT_ADDRESS,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "../lib/config";

interface FooterProps {
  onHomeClick: () => void;
  onProductsClick: () => void;
}

export default function Footer({ onHomeClick, onProductsClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <button onClick={onHomeClick} className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Watch className="w-5 h-5 text-dark" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-wider text-white">
                Chronos<span className="text-gold"> elite</span>
              </span>
            </button>
            <p className="text-white/60 mb-6">
              Tu destino de confianza para relojes de lujo. Autenticidad garantizada y servicio premium.
            </p>
            <div className="flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center text-white/60 hover:text-gold hover:bg-dark-300 transition-all duration-300"
                aria-label="Instagram Chronos elite"
              >
                <Camera className="w-5 h-5" />
              </a>
              <a
                href={FACEBOOK_URL || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center text-white/60 hover:text-gold hover:bg-dark-300 transition-all duration-300"
                aria-label={FACEBOOK_URL ? "Facebook Chronos elite" : "Facebook próximamente"}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center text-white/60 hover:text-gold hover:bg-dark-300 transition-all duration-300"
                aria-label="WhatsApp Chronos elite"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Navegación</h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", onClick: onHomeClick },
                { label: "Colección", onClick: onProductsClick },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.onClick}
                    className="text-white/60 hover:text-gold transition-colors duration-300 bg-transparent border-none p-0"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Colecciones</h4>
            <ul className="space-y-3">
              {[
                "Cronógrafos",
                "Relojes de Vestir",
                "Relojes Deportivos",
                "Ediciones Limitadas",
                "Relojes de Dama",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={onProductsClick}
                    className="text-white/60 hover:text-gold transition-colors duration-300 bg-transparent border-none p-0"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5" />
                <span className="text-white/60">{CONTACT_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <a
                  href={`tel:+${CONTACT_WHATSAPP}`}
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  +57 300 373 0313
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>

            <a
              href={`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-dark font-semibold rounded-full text-sm transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Chatear Ahora
            </a>
          </div>
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {currentYear} Chronos elite. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-white/40 hover:text-gold transition-colors duration-300 cursor-pointer">
              Términos y Condiciones
            </span>
            <span className="text-sm text-white/40 hover:text-gold transition-colors duration-300 cursor-pointer">
              Política de Privacidad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
