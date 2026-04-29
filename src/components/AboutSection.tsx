"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Award, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { aboutFeatures } from "../data/products";
import { CONTACT_WHATSAPP, WHATSAPP_MESSAGE } from "../lib/config";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  truck: Truck,
  award: Award,
  headphones: Headphones,
};

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20 md:py-32 bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm uppercase tracking-widest mb-4">
            Por Qué Elegirnos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Excelencia en Cada Detalle
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Más de 15 años ofreciendo relojes de lujo con la garantía de
            autenticidad que nuestros clientes merecen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Award;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 bg-dark-200 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-dark font-bold rounded-full shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.044-.36-.096-.554-.139-.198-.559-.614-.774-.818-.217-.203-.43-.227-.59-.172.12.197.245.422.336.525.15.17.319.164.494.099.176-.065.414-.49.527-.592.113-.104.227-.13.42-.078.193.05.627.296.73.554.104.259.104.481-.028.625-.133.144-.313.372-.554.497-.242.125-.483.277-.208.547.274.27.611.98.778 1.315.167.335.335.289.565.172.23-.116.978-.457 1.22-.857.243-.4.243-.745-.052-.857-.297-.113-1.231-.056-2.29.27-1.057.327-1.75 1.222-1.903 2.27-.153 1.048-.768 1.315-.768 1.315-.174.297-.292.645-.056.97.237.326.522.674.785.899.264.226.535.207.82-.066.285-.273.615-.716.615-1.447 0-.731-.153-1.45-.326-2.077z"/>
            </svg>
            Habla con un Asesor
          </a>
        </motion.div>
      </div>
    </section>
  );
}