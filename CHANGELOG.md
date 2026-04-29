# Changelog

## [0.2.0] - 2025-04-22

### Añadido
- Página de detalle de producto individual con metadata SEO dinámica
  - Ruta dinámica `/productos/[id]`
  - Página 404 para productos no encontrados
  - Breadcrumb navigation
  - Galería de imágenes con zoom modal
  - Información completa: descripción, color, rating, reseñas, disponibilidad
  - Botón "Pedir por WhatsApp" con mensaje pre-llenado
  - Productos relacionados por color
- Sistema de filtros avanzado
  - Filtrado por rango de precios (min/max)
  - Presets de rango rápido (Bajo, Medio, Alto, Premium)
  - Búsqueda por nombre y descripción
  - Filtrado por color (6 opciones)
  - Ordenamiento por precio o nombre (ASC/DESC)
  - Botón "Limpiar todos los filtros"
- Componente `PriceRangeFilter` integrado en `ProductFilters`
- Componentes de carga (Skeleton) para ProductCard y ProductGrid
- Glassmorphism effects en ProductFilters y Header
- Parallax mejorado en Hero Section con `useScroll` + `useTransform`
- Extensión de tipos TypeScript
  - `Product.rating?: number`
  - `Product.reviews?: number`
  - `Product.inStock?: boolean`
  - `Product.images?: string[]` (galería futura)
  - `FilterState.priceMin?: number`
  - `FilterState.priceMax?: number`
- Datos de productos extendidos con ratings y reviews
- Enlace completo de tarjeta de producto a página de detalle
- Badge de "Agotado" en tarjetas y detalle
- Animación de like (corazón) en detalle de producto
- Opción de compartir producto (Web Share API + fallback)
- Icono de zoom en imagen principal con modal
- Mejora de UX: hover effects suaves en botones y cards
- `getProductPriceRange` utilidad en utils (para futuros usos)
- `truncateText` utilidad en utils
- Estructura de carpetas reorganizada:
  - `app/productos/` con layout y page independientes
  - Componentes separados por responsabilidad

### Cambiado
- `ProductGrid` ahora maneja filtros de precio internamente (estado)
- `ProductCard`: la imagen completa es clickeable hacia detalle
- `Hero`: fondo con parallax más suave y mejor overlay
- `Header`: enlace "Colección" ahora va a `/productos` (ruta nueva)
- `Footer`: enlaces actualizados a rutas nuevas
- `utils.ts`: `generateWhatsAppLink` ahora acepta `productName` opcional

### Corregido
- Errores de compilación TypeScript en múltiples archivos
- Duplicación de código en ProductGrid.tsx (eliminado)
- Nombres inconsistentes de campos de filtro de precio (priceMin vs minPrice)
- Falta de tipos opcionales en Product interface
- Imports no utilizados en ProductCard

### Eliminado
- Componente `PriceRangeFilter.tsx` redundante (integrado en ProductFilters)
- Código duplicado en ProductGrid.tsx

## [0.1.0] - 2025-04-10

### Añadido
- Estructura inicial Next.js 15 + TypeScript + Tailwind CSS v4
- Hero section con imagen de fondo y CTA
- Grid de productos con 12 productos de ejemplo
- Filtros básicos (búsqueda, color, orden)
- Sistema de badges (más-vendido, nuevo, oferta, limitado)
- SecciónAbout con 4 features
- Sección Testimonios con 3 testimonios
- Footer con información de contacto
- Botón flotante de WhatsApp
- Animaciones con Framer Motion
- Configuración de colores gold/dark
- Meta tags básicos
