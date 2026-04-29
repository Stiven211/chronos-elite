# 🚀 Cómo Instalar y Ver la Demo

## Para el Cliente (NO técnico):

**NO hagas esto tú solo. Lo hago yo por ti.**

---

## Para ti (desarrollador):

### 1. INSTALAR (solo la primera vez)

```bash
# Abre terminal en la carpeta del proyecto
cd "web relojes"

# Instala dependencias
npm install

# Inicia servidor de desarrollo
npm run dev
```

### 2. VER LA DEMO

Abre tu navegador en:
```
http://localhost:3000
```

### 3. NAVEGAR

- **Home**: `http://localhost:3000/`
- **Catálogo**: `http://localhost:3000/productos`
- **Detalle producto**: Haz clic en cualquier tarjeta → `/productos/1`

### 4. PROBAR WHATSAPP

Haz clic en "Pedir por WhatsApp" → Abre conversación con número de ejemplo.

---

## 📱 En Móvil

Si el cliente quiere verlo en su celular:

1. En tu computador, en la terminal dondeRunning `npm run dev`
2. Verás una URL como: `Local: http://localhost:3000`
3. Cambia `localhost` por tu **IP local**:
   - Windows: `ipconfig` → busca "IPv4 Address"
   - Ejemplo: `http://192.168.1.100:3000`
4. Comparte esa URL con el cliente (deben estar en misma red WiFi)

---

## 🎨 Personalizar Rápido (si el cliente pide cambios)

### Cambiar NÚMERO de WhatsApp:

Busca en estos archivos `573001234567` y reemplaza por el número real:

```
components/Header.tsx
components/Footer.tsx
components/WhatsAppButton.tsx
components/ProductDetailClient.tsx
components/ProductCard.tsx
```

### Cambiar COLores:

Abre `tailwind.config.ts` y modifica:

```typescript
colors: {
  gold: {
    DEFAULT: "#d4af37",      // Cambia este dorado
    light: "#e6c675",
    dark: "#b8962e",
  },
}
```

### Agregar PRODUCTOS del cliente:

Abre `data/products.ts` y reemplaza los 12 productos con los reales.

Estructura:
```typescript
{
  id: "1",
  name: "Royal Chronograph",
  price: 15990000,
  image: "https://tu-imagen.com/reloj.jpg",
  description: "Descripción...",
  color: "dorado",
  badge: "más-vendido", // opcional
}
```

---

## ❓ PROBLEMAS COMUNES

### "No arranca el servidor"
```bash
# Borra node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Las imágenes no cargan"
- Verifica conexión a internet (son de Unsplash)
- O reemplaza las URLs en `data/products.ts` por imágenes locales en `/public`

### "Se ve mal en mi celular"
- Limpia caché del navegador
- Asegúrate de usar Chrome/Safari actualizados

---

## 📦 Entregable Final al Cliente

Cuando apruebe, empaquetas:

```
📦 royal-time-catalog/
├── 📄 README.md           (instrucciones)
├── 📄 package.json        (dependencias)
├── 📁 app/                (código fuente)
├── 📁 components/
├── 📁 data/              (productos editables)
└── 📁 public/            (imágenes del cliente)
```

Y le dices: "Aquí tienes el código completo. Para subirlo a internet, necesitas hosting (Vercel/Netlify) que cuesta ~$0/mes inicial".

---

¿Listo para la demo? 🚀
