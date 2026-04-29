export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  color: "negro" | "dorado" | "plateado" | "azul" | "rojo" | "blanco";
  badge?: "más-vendido" | "nuevo" | "oferta" | "limitado" | null;
  featured?: boolean;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  brand: string;
  category: string;
  images?: string[]; // Para galería adicional
}

export interface FilterState {
  search: string;
  color: string;
  category: string;
  brand: string;
  sortBy: "price-asc" | "price-desc" | "name-asc" | "name-desc";
  priceMin?: number;
  priceMax?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export interface AboutFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}