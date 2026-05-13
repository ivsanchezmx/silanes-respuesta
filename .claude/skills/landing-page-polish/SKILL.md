---
name: landing-page-polish
description: Audita y refina una landing page que ya existe. Úsalo cuando el usuario pida "hazla más bonita", "cambia los colores a X", "arregla los links", "no se ve bien en móvil", "reescribe esta sección", o cualquier ajuste a una landing existente. NO usar para construir desde cero (usar build-landing-page) ni para apps con múltiples vistas.
---

# Refinar una landing page existente

## Filosofía

El daño que más se hace en este momento es **reescribir cuando solo había que retocar**. La pieza existente probablemente tiene meses de iteración del usuario detrás. Tu trabajo es identificar qué falla concretamente, arreglar eso, y dejar el resto intacto.

Antes de tocar nada, lee la página completa al menos una vez. Identifica:
- Qué funciona y debe preservarse (voz, estructura, copy específico, decisiones de marca).
- Qué falla concretamente (paths rotos, colores que el usuario pidió cambiar, una sección que no respira, mobile roto).

## Auditoría rápida — pasa por estas 7 dimensiones

### 1. Wire-up — son los enlaces reales

- Cada `<img src>`: ¿el archivo existe en ese path?
- Cada `<a href>` interno: ¿el anchor existe en la página?
- Cada link externo: ¿abre con `target="_blank" rel="noopener"`?
- Cada `mailto:` / `tel:` / `download`: ¿valor correcto?
- CV / PDFs: ¿path real al archivo en `docs/` o donde sea?

Esto es lo primero que se rompe y lo más vergonzoso si llega así al destinatario. Arréglalo siempre antes que estética.

### 2. Paleta — coherencia y accesibilidad

- Tokens en `:root` definidos y usados consistentemente (sin colores hardcodeados en mitad del archivo).
- Contraste WCAG AA mínimo (4.5:1 para cuerpo, 3:1 para grandes).
- Solo un acento dominante. Si hay dos acentos, uno debe ser claramente secundario.
- Hover states con cambio de color o fondo, no solo opacidad.

Si el usuario pide cambio de paleta, **cambia solo los tokens en `:root`**, no busques-y-reemplaces en todo el archivo. Si el sistema está bien construido, eso basta.

### 3. Tipografía

- Tamaños fluidos con `clamp()` para titulares. Si hay px fijos en titulares, conviértelos.
- Cuerpo no menor a 16px.
- Line-height: 1.5–1.65 cuerpo, 0.95–1.15 titulares grandes.
- Solo dos familias + monoespacio. Si hay tres, una sobra.
- Si la fuente tiene axes variables (Fraunces, Inter, etc.), úsalos en `font-variation-settings`.

### 4. Retícula y respiración

- Sección vertical: `clamp(3.5rem, 9vw, 7rem)` arriba y abajo. Menos se ve apretado, más se ve hinchado.
- `max-width` en la envoltura: 1200–1280px.
- Gutter lateral: `clamp(1.25rem, 4vw, 3rem)`.
- Si una sección "no respira" agrega padding vertical antes de cambiar otra cosa.

### 5. Mobile (≤720px)

- Sin scroll horizontal. Si lo hay, busca elementos con `width:` fijo en píxeles o `min-width` grande.
- Grids de 2-3 columnas que se apilan a 1 columna correctamente.
- Side-nav y topbar-right ocultos en `@media (max-width: 720px)`.
- Tamaños de tap: botones y links min 44x44px.
- Test real en ancho 360px y 414px.

### 6. Micro-interacciones

- `.reveal` con IntersectionObserver bien implementado.
- Scrollspy en side-nav actualiza la sección activa.
- Hover states presentes en cards, links, botones.
- `@media (prefers-reduced-motion: reduce)` desactiva animaciones y grano.

### 7. Print

- `@media print`: topbar, sidenav, body::before grano ocultos.
- `break-inside: avoid` en cards y capítulos.
- `background: white` en body.
- Útil para guardar como PDF si el destinatario quiere archivarlo.

## Cómo aplicar cambios

### Para cambio de paleta (caso común)

1. Identifica los tokens actuales (`--terracotta`, `--ink`, etc.).
2. Define los nuevos tokens del color que el usuario pidió.
3. **Reemplaza solo en `:root`**. Si el resto del archivo usa `var(--xxx)`, no necesitas tocarlo.
4. Verifica también: `mix-blend-mode`, hover-tints (`rgba(...)` que codifican el color en RGB), `::selection`, `theme-color` meta tag.
5. Verifica contraste del nuevo color sobre los fondos existentes.

### Para reescribir copy

1. Identifica las 1-3 secciones que el usuario nombró explícitamente.
2. Si el resto está bien, no lo toques.
3. Invoca `landing-page-copywriter` solo si la voz cambia o el usuario no tiene texto listo.

### Para arreglar mobile

1. Reproduce el problema: ¿cuál ancho? ¿qué elemento desborda?
2. Inspecciona: `overflow-x` en body, `min-width` no flexibles, imágenes sin `max-width: 100%`.
3. Arregla puntual, no rediseñes responsive completo.

### Para añadir / quitar secciones

1. Verifica el orden lógico: validación antes de evidencia, evidencia antes de cierre.
2. Si añades, replica el patrón de `chapter-head` con `chapter-num` + `chapter-title` para mantener ritmo.
3. Si quitas, actualiza el `sidenav` y la numeración §01, §02… si tiene sentido.

## Anti-patrones a evitar al "embellecer"

- Añadir más colores. "Para alegrar".
- Añadir gradientes saturados como fondos de sección.
- Añadir más animaciones, parallax, scroll-driven art.
- Añadir un "modo oscuro" cuando nadie lo pidió.
- Añadir emojis decorativos.
- Reemplazar fuentes editoriales por display fonts trendy del momento.
- Inflar el copy con sinónimos.

**Embellecer significa quitar fricción visual, no agregar capas.** Si dudas entre dos versiones, elige la más calma.

## Verifica antes de cerrar

- [ ] El archivo abre sin errores en consola.
- [ ] El cambio que pidió el usuario está aplicado y visible.
- [ ] Nada que funcionaba antes está roto ahora (regresión).
- [ ] Mobile sigue OK.
- [ ] Print sigue OK.

Si el usuario pidió tres cambios, devuélvelos los tres en una sola pasada de edición, no en tres mensajes.
