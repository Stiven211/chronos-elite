const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'public', 'catalogo');
const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|svg)$/i.test(f)).sort();
const brandMap = [
  ['cso-edfc', 'Casio Edifice'],
  ['cso-edifice', 'Casio Edifice'],
  ['cso', 'Casio'],
  ['gcci', 'Gucci'],
  ['gss', 'G-Shock'],
  ['hblt', 'Hublot'],
  ['tchmrn', 'Technomarine'],
  ['admrs', 'Admiral'],
  ['crtr', 'Cartier'],
  ['ptk-phlpp', 'Philippe Patek'],
  ['ptk-phlppe', 'Philippe Patek'],
  ['ptk', 'Patek'],
  ['rlx', 'Rolex'],
  ['rlc', 'Rolex'],
  ['okl', 'OKL'],
  ['ivct', 'Invicta'],
  ['invct', 'Invicta'],
  ['invcta', 'Invicta'],
  ['ornt', 'Orient'],
  ['qyq', 'Q&Q'],
  ['tsst', 'Tissot'],
  ['tssot', 'Tissot'],
  ['rchrd-mll', 'Richard Mille'],
  ['rchrd', 'Richard Mille'],
  ['ptk', 'Patek'],
];
const colorKeywords = {
  negro: ['negro', 'black', 'noche', 'negra'],
  dorado: ['dorado', 'oro', 'gold'],
  plateado: ['plateado', 'plateada'],
  azul: ['azul', 'blue'],
  rojo: ['rojo', 'red'],
  blanco: ['blanco', 'white'],
};
function titleCase(str) {
  return str
    .split(' ')
    .map((word) => word ? word[0].toUpperCase() + word.slice(1) : '')
    .join(' ');
}
function getBrand(name) {
  const slug = name.toLowerCase();
  for (const [key, value] of brandMap) {
    if (slug.startsWith(key)) return value;
  }
  const first = slug.split('-')[0];
  if (first === 'combo') return 'Combo';
  if (first === 'relojera') return 'Relojera';
  return titleCase(first);
}
function getColor(name) {
  const slug = name.toLowerCase();
  for (const [color, words] of Object.entries(colorKeywords)) {
    if (words.some((word) => slug.includes(word))) return color;
  }
  if (slug.includes('verde') || slug.includes('cafe') || slug.includes('marron')) return 'negro';
  return 'negro';
}
function getCategory(name) {
  const slug = name.toLowerCase();
  if (/\b(mujer|dama|women|femenino|lady)\b/.test(slug)) return 'dama';
  if (/\b(combo|relojera|pack|set|completo)\b/.test(slug)) return 'combo';
  return 'caballero';
}
function normalizeName(name) {
  const withoutPrice = name.replace(/_(\d+)(?:\.jpe?g|\.png|\.svg)$/i, '');
  const parts = withoutPrice.split('-');
  const brand = getBrand(withoutPrice);
  const slugParts = parts.slice();
  const prefix = slugParts[0];
  if (brand.toLowerCase() !== prefix) {
    if (prefix === 'cso' || prefix === 'rlx' || prefix === 'ptk' || prefix === 'invct' || prefix === 'ornt' || prefix === 'qyq' || prefix === 'tsst' || prefix === 'hblt' || prefix === 'tchmrn' || prefix === 'admrs' || prefix === 'crtr' || prefix === 'okl') {
      slugParts.shift();
    }
    if (prefix === 'cso' && slugParts[1] === 'edfc') slugParts.shift();
  }
  const productName = slugParts.join(' ');
  return titleCase(`${brand} ${productName}`.replace(/  +/g, ' ').trim());
}
const products = files.map((file, index) => {
  const id = path.basename(file, path.extname(file));
  const priceMatch = file.match(/_(\d+)(?:\.jpe?g|\.png|\.svg)$/i);
  const price = priceMatch ? Number(priceMatch[1]) : 0;
  const rawName = file.replace(/\.(jpe?g|png|svg)$/i, '');
  const brand = getBrand(rawName);
  const name = normalizeName(rawName);
  const category = getCategory(rawName);
  const color = getColor(rawName);
  const rating = Number((4.2 + (index % 6) * 0.1).toFixed(1));
  const reviews = 18 + ((index * 5) % 80);
  const badge = rawName.includes('nuevo') || rawName.includes('new') || rawName.includes('mujer')
    ? 'nuevo'
    : ['Rolex', 'Patek', 'Cartier', 'Hublot'].includes(brand)
    ? 'limitado'
    : index % 18 === 0
    ? 'más-vendido'
    : index % 20 === 0
    ? 'oferta'
    : undefined;
  const description = category === 'combo'
    ? `Combo de productos reales de la marca ${brand}, con precio ${price.toLocaleString('es-CO')} COP.`
    : `Reloj ${brand} ${category === 'dama' ? 'de dama' : 'de caballero'} con acabado ${color} y diseño moderno.`;
  return {
    id,
    name,
    price,
    image: `/catalogo/${file}`,
    description,
    color,
    brand,
    category,
    badge,
    rating,
    reviews,
    inStock: true,
  };
});
const testimonials = [
  {
    id: '1',
    name: 'Carolina Méndez',
    role: 'Empresaria',
    content: 'La calidad de los relojes es excepcional. Compré un Royal Chronograph y es una obra de arte en mi muñeca. El servicio fue impecable.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Javier Restrepo',
    role: 'Coleccionista',
    content: 'Como coleccionista exigente, puedo decir que esta tienda ofrece relojes originales con certificados de autenticidad. Muy recomendado.',
    rating: 5,
  },
  {
    id: '3',
    name: 'María Elena Vásquez',
    role: 'Abogada',
    content: 'Elegí el Midnight Gold para mi graduación y fue la mejor decisión. Diseño elegante y atención personalizada.',
    rating: 5,
  },
];
const aboutFeatures = [
  {
    id: '1',
    icon: 'shield-check',
    title: 'Autenticidad Garantizada',
    description: 'Todos nuestros relojes vienen con certificado de autenticidad y garantía oficial del fabricante.',
  },
  {
    id: '2',
    icon: 'truck',
    title: 'Envío Seguro',
    description: 'Entrega a cualquier ciudad de Colombia con empaque premium y seguimiento en tiempo real.',
  },
  {
    id: '3',
    icon: 'award',
    title: 'Calidad Premium',
    description: 'Solo trabajamos con marcas reconocidas y movimientos verificados por expertos relojeros.',
  },
  {
    id: '4',
    icon: 'headphones',
    title: 'Atención Personalizada',
    description: 'Asesoría directa por WhatsApp para ayudarte a elegir el reloj perfecto para ti.',
  },
];
const fileContent = `import type { Product, Testimonial, AboutFeature } from "../types/product";

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const testimonials: Testimonial[] = ${JSON.stringify(testimonials, null, 2)};

export const aboutFeatures: AboutFeature[] = ${JSON.stringify(aboutFeatures, null, 2)};
`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'products.ts'), fileContent, 'utf8');
console.log('Generated', products.length, 'products');
