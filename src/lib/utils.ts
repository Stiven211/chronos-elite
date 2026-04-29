import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product } from "../types/product";
import { CONTACT_WHATSAPP } from "./config";

const WATCH_PRICE_INCREMENT = 70000;
const COMBO_PRICE_INCREMENT = 400000;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
}

export function generateWhatsAppLink(
  productName: string,
  price?: number,
  imageUrl?: string,
  phone: string = CONTACT_WHATSAPP
): string {
  const priceText = price ? `Precio: ${formatPrice(price)}.` : "";
  const imageText = imageUrl ? `Imagen: ${imageUrl}` : "";
  const message = encodeURIComponent(
    `Hola, me gustaría obtener información sobre el ${productName}. ${priceText} ${imageText}`.trim()
  );
  return `https://wa.me/${phone}?text=${message}`;
}

export function getEffectivePrice(product: Product): number {
  return product.price + (product.category === "combo" ? COMBO_PRICE_INCREMENT : WATCH_PRICE_INCREMENT);
}

export function getProductPriceRange(products: any[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}