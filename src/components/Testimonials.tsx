"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/products";
import { CONTACT_WHATSAPP, WHATSAPP_MESSAGE } from "../lib/config";

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-20 md:py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm uppercase tracking-widest mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="relative p-8 bg-dark-100 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gold/20" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-gold fill-gold"
                  />
                ))}
              </div>

              <p className="text-white/80 leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-dark font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl border border-gold/20 text-center"
        >
          <p className="text-xl md:text-2xl text-white font-medium mb-4">
            &ldquo;La calidad habla por sí sola. Más de 500 clientes satisfechos en
            toda Colombia.&rdquo;
          </p>
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.044-.36-.096-.554-.139-.198-.559-.614-.774-.818-.217-.203-.43-.227-.59-.172.12.197.245.422.336.525.15.17.319.164.494.099.176-.065.414-.49.527-.592.113-.104.227-.13.42-.078.193.05.627.296.73.554.104.259.104.481-.028.625-.133.144-.313.372-.554.497-.242.125-.483.277-.208.547.274.27.611.98.778 1.315.167.335.335.289.565.172.23-.116.978-.457 1.22-.857.243-.4.243-.745-.052-.857-.297-.113-1.231-.056-2.29.27-1.057.327-1.75 1.222-1.903 2.27-.153 1.048-.768 1.315-.768 1.315-.174.297-.292.645-.056.97.237.326.522.674.785.899.264.226.535.207.82-.066.285-.273.615-.716.615-1.447 0-.731-.153-1.45-.326-2.077z"/>
            </svg>
            Únete a nuestra comunidad →
          </a>
        </motion.div>
      </div>
    </section>
  );
}