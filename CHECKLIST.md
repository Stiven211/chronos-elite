# ✅ CHECKLIST: LISTO PARA MOSTRAR AL CLIENTE

## 🔧 ANTES DE LA DEMO (5 minutos)

### 1. Servidor funcionando
- [ ] Abres terminal en la carpeta del proyecto
- [ ] Ejecutas `npm run dev`
- [ ] Ves `▲ Next.js ... ✓ Ready in X.Xs`
- [ ] Abres http://localhost:3000 en tu navegador
- [ ] La página carga sin errores (solo warnings está bien)

### 2. Funcionalidad básica
- [ ] Hero se ve con imagen de reloj
- [ ] Botón "Explorar Colección" scrollea a productos
- [ ] Secciones de productos cargan (12 relojes)
- [ ] Filtros funcionan (click en color negro → solo muestra negros)
- [ ] Búsqueda funciona (escribes "gold" → muestra dorados)
- [ ] Botón "Cargar Más" aparece y carga 4 más
- [ ] Click en un producto → entra a `/productos/1`
- [ ] En detalle, botón WhatsApp abre conversación
- [ ] Botón flotante WhatsApp (esquina inferior derecha) funciona

### 3. Responsive
- [ ] Abre DevTools (F12) → modo móvil
- [ ] Grid se adapta a 1 columna
- [ ] Header hamburguesa aparece (en móvil)
- [ ] Botones son tocables (tamaño adecuado)

### 4. Animaciones
- [ ] Al hacer scroll, productos aparecen suavemente
- [ ] Hover en tarjeta: se elevan (scale up)
- [ ] Hero: al scrollear, fondo se mueve lento (parallax)

---

## 🎬 GRABAR VIDEO DE DEMO (60 seg)

**Usa OBS o Win+Alt+R (Windows)**

**Script:**
```
0:00 - "Este es un catálogo de lujo para relojerías"
0:10 - Scroll por Hero → "Diseño elegante y moderno"
0:20 - Filtros → "El cliente puede buscar por color"
0:30 - Click producto → "Detalle completo"
0:40 - Botón WhatsApp → "Contacto directo"
0:50 - Vista móvil → "Funciona en celular"
1:00 - "¿Te gustaría tener esto en tu negocio?"
```

**Guarda como `demo.mp4` y envíalo a clientes.**

---

## 📱 ENVIAR A CLIENTES (WhatsApp/Instagram)

**Mensaje inicial:**
> Hola [Nombre], te comparto una demo de un catálogo digital para relojerías. Es solo 1 minuto de video. ¿Te interesa? 👇

**(Adjuntas `demo.mp4`)**

---

## 💼 CERRAR VENTA (llamada 15 min)

**Paso 1:** Muestra la demo en vivo (comparte pantalla)
**Paso 2:** Pregunta: "¿Qué le cambiarías para que sea de tu marca?"
**Paso 3:** Ofrece precio según su respuesta:
- "Solo código → $250,000"
- "Te lo personalizo → $400,000"
- "Todo incluido → $600,000"

**Paso 4:** Pide 50% adelanto por transferencia.

---

## 🚨 SI ALGO FALLA

### "No carga la página"
```bash
# Borra caché
Remove-Item -Recurse -Force .next
npm cache clean --force
npm install
npm run dev
```

### "Las imágenes no se ven"
- Revisa que tengas internet (son de Unsplash)
- O cambia URLs en `data/products.ts` por imágenes locales

### "Error de compilación"
```bash
# Revisa errores específicos
npx tsc --noEmit 2>&1 | Select-String -Pattern "error"
```

---

## 📦 ENTREGAR CUANDO PAGUEN

```
📁 entrega-final/
├── 📄 README.md              (instrucciones)
├── 📄 DEMO_GUIDE.md          (manual)
├── 📄 package.json
├── 📁 app/
├── 📁 components/
├── 📁 data/                  (productos editables)
└── 📁 public/               (opcional: imágenes cliente)
```

**Comprime todo en ZIP** y envías por WhatsApp/email.

---

## 🎓 TÚ PUEDES HACERLO

Eres estudiante de SENA, tienes conocimiento técnico, y ahora tienes un prototipo **que funciona y se ve profesional**.

**No subestimes tu trabajo:** Esto vale dinero.

**Primer cliente** → gana experiencia + dinero + referencia.

---

**¿Listo? Corre `npm run dev` ahora y verifica todo.**

Si hay errores, copia y pega aquí. Si funciona, graba el video y empieza a vender. 🚀
