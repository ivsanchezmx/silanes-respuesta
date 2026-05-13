---
name: build-react-landing-page
description: Construye una landing page React + Vite + TypeScript app-like con sidebar persistente y tabs animadas — el patrón premium para piezas profesionales densas (respuesta a vacante, portafolio senior, CV interactivo). Úsalo cuando el usuario pida "una landing en React", "tipo Linear / Stripe", "con tabs", "que no sea solo scroll", "que se vea ordenada", "más app-like", o cuando una landing previa de scroll plano no haya funcionado. NO usar para landings simples de una sección (usar build-landing-page con HTML estático), apps multi-página con routing, o cuando ya hay una app React y solo se quiere añadir motion (usar landing-page-polish).
---

# Construir una landing React app-like con tabs + sidebar

## Filosofía

Una landing app-like no es un sitio scrolleable — es **una mini-app que el lector navega**. La sidebar siempre muestra quién eres (foto, nombre, rol, contacto, CV); el área principal cambia a la sección que el lector elija. Se siente "producto", no "página".

Esto resuelve un problema concreto del scroll plano: cuando una pieza tiene 6+ secciones densas, el lector pierde dirección a los 30 segundos. Con tabs, decide qué leer y cuánto profundizar — y la identidad (foto + contacto + CV) siempre está visible, lo que es excelente para piezas profesionales.

## Stack

- Vite 5+ · React 18.3+ · TypeScript 5.6+ estricto
- Framer Motion 11+ para transiciones entre tabs y `layoutId`
- CSS Modules · tokens en `src/styles/tokens.css`
- Sin React Router, sin Tailwind, sin UI library

## Proceso

### Paso 1 — Brief

Antes de tocar código, asegura que tienes (pregunta lo que falte):

- **Audiencia única** y CTA real.
- **Foto profesional** (cuadrada o portrait, fondo neutro).
- **CV en PDF** y enlaces de evidencia (cada uno verificado).
- **Datos directos**: email, teléfono, LinkedIn, residencia.
- **Voz**: español/inglés, tono.
- **Sections planeadas**: típicamente 6–8 (inicio, carta, validación, experiencia, evidencia, encaje, contacto). Más de 9 es overload — consolida.

### Paso 2 — Sistema visual

Invoca [[landing-page-designer]] con el brief y la preferencia de layout B (app-like). Devuelve: paleta, parejas tipográficas, tokens CSS, recetas para los componentes no obvios.

### Paso 3 — Estructura React

Invoca [[react-app-architect]] con el set de secciones. Devuelve: estructura de carpetas, `sections.ts`, `App.tsx` shell con state + keyboard nav, plantilla de section component, tsconfig + vite.config + package.json.

**Estructura canónica:**

```
project-root/
├── public/
│   ├── img/<foto>.jpg
│   └── docs/<cv>.pdf
├── src/
│   ├── components/
│   │   ├── Topbar.tsx
│   │   ├── Topbar.module.css
│   │   ├── IdentityPanel.tsx
│   │   └── IdentityPanel.module.css
│   ├── sections/
│   │   ├── Welcome.tsx + .module.css
│   │   ├── Letter.tsx + .module.css
│   │   ├── Validation.tsx + .module.css
│   │   ├── Experience.tsx + .module.css
│   │   ├── Evidence.tsx + .module.css
│   │   ├── Fit.tsx + .module.css
│   │   └── Contact.tsx + .module.css
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   ├── sections.ts
│   ├── App.tsx + App.module.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Paso 4 — Coreografía de motion

Invoca [[motion-choreographer]] con la lista de transiciones esperadas: tab switch, hover de cards, layoutId del pill activo, stagger en grids. Devuelve recetas afinadas (duración, easing).

**Motion crítico mínimo:**

1. `AnimatePresence mode="wait"` en el content area al cambiar tab.
2. `layoutId="active-pill"` en la sidebar para que el highlight se desplace.
3. Hover de cards de evidencia: CSS transition (no Framer).
4. Stagger en grids: `staggerChildren: 0.06, delayChildren: 0.1`.

### Paso 5 — Copy por sección

Invoca [[landing-page-copywriter]] con la lista de secciones y los datos crudos. Cada sección es un panel **autocontenido** (el lector puede aterrizar en cualquiera). El §00 Welcome debe explicar la estructura y guiar la navegación.

### Paso 6 — Implementación

Trabaja archivo por archivo, en este orden:

1. `package.json` + `vite.config.ts` + `tsconfig.json`.
2. `index.html` (Vite entry — fuentes preconnect, theme-color, favicon SVG inline).
3. `src/styles/tokens.css` + `src/styles/global.css` con `body { overflow: hidden }` y `:root { overflow }` solo en el shell de la app (mobile sí scroll global).
4. `src/main.tsx`.
5. `src/sections.ts` (SectionMeta array — single source of truth).
6. `src/App.tsx` + `App.module.css` (shell: topbar + grid 340px/1fr + content area + pager footer).
7. `src/components/Topbar.tsx` + `.module.css`.
8. `src/components/IdentityPanel.tsx` + `.module.css` (foto, nombre con italic accent, rol, nav con `layoutId`, contacto, CV button, footHint).
9. Las 7 secciones, una por una, con su CSS module.

### Paso 7 — Accesibilidad

Invoca [[a11y-reviewer]] sobre la implementación. Verifica:

- Sidebar como `<nav>` (no `role="tablist"` — son secciones, no tabs verdaderos).
- Sub-tabs dentro de §03 Experiencia SÍ como `role="tablist"` (son pestañas de detalle).
- `aria-current="page"` en sidebar.
- Focus management al cambiar sección.
- `prefers-reduced-motion` desactiva animaciones.
- Contraste sobre fondo invertido.
- Imágenes con `alt`.

### Paso 8 — Build + verify

```bash
npm install
npm run build
npm run preview
```

Visita `http://localhost:4173` (o el puerto que muestre vite preview). Verifica en navegador real:

- [ ] Sidebar muestra foto, nombre, rol, nav, contacto, CV button.
- [ ] Click en cada sección cambia el contenido con animación.
- [ ] El pill activo se desplaza entre items (no aparece/desaparece).
- [ ] Topbar dot pulsa.
- [ ] Tags en welcome se ven.
- [ ] §02 grid 2x3 con hover tint azul.
- [ ] §03 sub-tabs cambian entre las 3 preguntas con underline animado.
- [ ] §04 cards con hover invertido (fondo navy + texto bone).
- [ ] §05 sección invertida con stats grid.
- [ ] §06 botones funcionales (mailto: abre cliente, CV descarga, LinkedIn abre).
- [ ] Mobile width 360–420px: sidebar colapsa arriba como horizontal scroll-strip.
- [ ] Keyboard ← → cambia sección.
- [ ] `prefers-reduced-motion` (DevTools) desactiva animaciones.
- [ ] Print preview (Ctrl+P): topbar/sidebar/pager ocultos, contenido limpio.
- [ ] Console limpia (sin errors, sin warnings de StrictMode).

### Paso 9 — Deploy

Output es `dist/`. Sube a:
- **Vercel/Netlify**: arrastra la carpeta o conecta el repo. Domain gratis.
- **Static host con SSL**: cualquiera.
- **Compartir como ZIP**: solo si el receptor sabe abrir un static site. Mejor un link.

## Anti-patrones específicos a este patrón

- **Sidebar enorme con cada sección como árbol expandible** — esto es para docs, no para landings.
- **Tabs horizontales arriba en vez de sidebar** — más SaaS, menos editorial premium. Solo si la pieza es muy ancha y angosta (1 fila de contenido).
- **Sidebar que también scrollea con el contenido** — pierde el feel app-like.
- **Routing entre tabs** (React Router con `/seccion`) — innecesario, complica navegación, peor SEO no aplica en pieza privada con `noindex`.
- **Headers gigantes en cada sección que repiten el nombre del candidato** — la sidebar ya tiene la identidad, no la repitas en cada panel.
- **Botones de "siguiente" gigantes al final de cada sección** que fuerzan flujo lineal — usa pager sutil (← →) que sugiere pero no obliga.

## Cuándo NO seguir este skill

- **Pieza de 1 sola sección** (un manifesto, una tarjeta de presentación): React es overkill. HTML estático.
- **CV plano sin enlaces vivos ni evidencia interactiva**: lo que el lector necesita es el PDF, no una landing.
- **Sitio con +10 páginas reales**: necesitas routing y eso ya es app, no landing. Usa Next.js o similar.
- **Cliente que va a editar el copy él mismo sin tocar JSX**: considera un CMS (Sanity, Contentful) o markdown statics. Esta pieza asume que el JSX es el storage del contenido.

## Salida esperada

Un proyecto Vite que:
1. Corre con `npm run dev` en localhost:5173.
2. Builda con `npm run build` a `dist/`.
3. Se ve excelente desktop (≥1100px) y aceptable mobile (≥360px).
4. Funciona con teclado solo (Tab, ← →, 1–7).
5. Respeta `prefers-reduced-motion`.
6. No tiene warnings en consola.
7. Se puede modificar (cambiar copy, agregar sección) sin tocar más de 3 archivos.
