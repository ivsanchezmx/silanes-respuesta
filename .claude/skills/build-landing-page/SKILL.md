---
name: build-landing-page
description: Construye una landing page profesional/personal de una sola página (CV web, respuesta a vacante, portafolio, lanzamiento). Úsalo cuando el usuario quiera "una landing", "una página de presentación", "una web personal", "respuesta visual a una vacante", o pida construir desde cero un site estático single-page. NO usar para apps multi-vista, dashboards, e-commerce, ni cuando ya exista una landing y solo se pida un ajuste menor (en ese caso usar landing-page-polish).
---

# Construir una landing page editorial

## Filosofía

Una landing personal/profesional no es un sitio web — es **una pieza editorial larga, hojeable en 90 segundos, que recompensa la lectura completa con evidencia verificable**. La gente que la abre ya tiene contexto (te buscó, te recomendaron, recibieron un correo tuyo); no hay que venderles, hay que respetar su tiempo y dejarles una impresión nítida.

Apunta a tres lecturas posibles en la misma página:
1. **Vistazo (10s):** hero + topbar + side-nav. Saben quién eres y qué propones.
2. **Hojeo (60s):** scroll a velocidad media, leyendo titulares de sección, tarjetas, números destacados.
3. **Lectura profunda (5–10 min):** alguien decidido. Encuentra la sustancia.

## Proceso

### Paso 1 — Descubre

Antes de tocar HTML, asegura que tienes (pregunta al usuario lo que falte, no asumas):

- **Audiencia única**: ¿a quién específicamente le llegará? (un reclutador con nombre, un inversor, un cliente potencial concreto, una cohorte).
- **Llamado a la acción real**: ¿qué quieres que esta persona haga al terminar? (responder un correo, agendar, descargar CV, comprar). Uno solo, máximo dos.
- **Materiales que ya existen**: foto, CV, links a trabajo público, números/cifras verificables, testimonios.
- **Voz**: ¿formal, cálida, técnica? ¿español, inglés, bilingüe?
- **Plazo y restricciones**: ¿deadline? ¿anti-tracking? ¿dominio existente o subdirectorio?

Si esto ya está claro en la conversación o en memoria, no lo preguntes de nuevo. Avanza.

### Paso 2 — Decide el sistema visual

Invoca el agente `landing-page-designer` con un brief que incluya:
- Audiencia y voz.
- Color preferido (si lo hay).
- Si la pieza es una respuesta a algo (carta, brief, vacante) o una presentación abierta.

El agente devuelve: 3 referentes, paleta tokenizada, parejas tipográficas, retícula, wireframe y micro-interacciones. **Aplica eso. No improvises un sistema paralelo.**

Si el usuario tiene una preferencia fuerte (ej. "azul", "minimalista", "tipo Stripe"), pásalo como hard constraint al agente.

### Paso 3 — Escribe el copy

Si el copy no está listo, invoca `landing-page-copywriter` con:
- Estructura de secciones decidida en paso 2.
- Datos crudos del usuario (bullets, cifras, nombres) sin formatear.
- Voz objetivo.

El copywriter devuelve texto pegable por sección, con marcadores `[FALTA: …]` donde necesite un dato real.

Si el copy existente ya está bien (lo dice el usuario o lo evalúas tú), no lo reescribas por reescribir.

### Paso 4 — Construye en un solo archivo

**Default: `index.html` con `<style>` y `<script>` inline**. Una landing de una sola página no necesita build, ni framework, ni componentes en archivos separados. Esto:

- Hace que el usuario pueda abrirla con doble-click.
- Hace trivial desplegarla (cualquier static host, GitHub Pages, Netlify drop).
- Hace trivial enviarla por correo como adjunto si hace falta.
- Permite que el usuario haga cambios pequeños sin tocar pipeline.

Si la pieza crece a múltiples páginas o necesita CMS, eso es otra pieza — no esta.

**Estructura HTML estándar:**

```html
<!DOCTYPE html>
<html lang="es-MX"> <!-- o el lang correcto -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,nofollow" /> <!-- si es privada -->
  <title>...</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta name="theme-color" content="#..." /> <!-- color de fondo principal -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">
  <style> /* tokens + estilos */ </style>
</head>
<body>
  <header class="topbar">...</header>
  <nav class="sidenav" aria-label="Navegación de secciones">...</nav>
  <section class="hero">...</section>
  <section class="chapter" id="s01">...</section>
  <!-- ... más capítulos ... -->
  <footer>...</footer>
  <script> /* reveal + scrollspy */ </script>
</body>
</html>
```

**Secciones recomendadas (ajustar al tipo de pieza):**

1. Topbar sticky con metadato + dot pulsante.
2. Hero: meta-info, título, sub, tags, foto.
3. §01 Carta / intro.
4. §02 Validación (si responde a brief) o Manifiesto (si es portafolio).
5. §03 Experiencia / casos.
6. §04 Evidencia (cards con enlaces vivos).
7. §05 Sección invertida (fondo tinta, texto bone) destacando la pieza más importante.
8. §06 CTA + contacto.
9. Footer mínimo.

### Paso 5 — Wire-up real (no decorativo)

- **Foto**: del path correcto (`img/<nombre>.jpg`). Atributo `alt` con el nombre. Fallback con iniciales si falla.
- **CV**: link al PDF real (`docs/<archivo>.pdf`) con `download` attribute.
- **Enlaces de evidencia**: `target="_blank" rel="noopener"`. Cada uno verificado que abre.
- **Correo**: `mailto:` con subject pre-llenado relevante a la pieza (URL-encoded).
- **Teléfono**: `tel:` formato internacional `+52...`.
- **LinkedIn / redes**: links absolutos completos.

No dejes `href="#"` ni `src="placeholder.jpg"` en la entrega final. Cada link debe llevar a algo real.

### Paso 6 — Micro-interacciones (mínimas)

Solo dos comportamientos en JS:

```js
// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Scrollspy para side-nav
const sections = document.querySelectorAll('section.chapter');
const navLinks = document.querySelectorAll('.sidenav a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((s) => spy.observe(s));
```

CSS para `.reveal` y `.reveal.in` ya viene en el sistema del designer. Respeta `prefers-reduced-motion: reduce`.

### Paso 7 — Verifica antes de entregar

Checklist obligatoria:

- [ ] Abre en navegador (no solo en preview).
- [ ] Mobile width: 360–414px se ve sin scroll horizontal y todas las cards se apilan.
- [ ] Foto carga (no fallback). CV descarga. Cada link de evidencia abre.
- [ ] `mailto:` abre cliente de correo con subject precargado.
- [ ] Side-nav scrollspy se actualiza al hacer scroll.
- [ ] Modo print (`Ctrl+P` preview): topbar/sidenav ocultos, secciones no se cortan a mitad.
- [ ] Lighthouse o eyeball: contraste cumple, sin layout shift, sin console errors.

Si algo falla, arréglalo antes de cerrar la tarea. No marques completo lo incompleto.

## Cuándo NO seguir este skill

- Cuando ya existe una landing y el usuario solo quiere cambiar color/copy específico: usa `landing-page-polish` directamente sobre el archivo existente.
- Cuando la pieza necesita backend (formularios que envíen, login, datos dinámicos): este skill no aplica.
- Cuando hay más de una página real: es un sitio, no una landing. Otro skill / framework.

## Salida esperada

Un solo archivo `index.html` que el usuario puede:
1. Abrir con doble-click y ver funcionando.
2. Subir a cualquier static host sin cambios.
3. Enviar por correo como adjunto (con la advertencia de que las fuentes de Google requieren conexión).
4. Modificar él mismo sin tocar build tools.

Si la pieza requiere recursos adicionales (imagen, PDF, video), todos deben estar en carpetas hermanas (`img/`, `docs/`, `video/`) referenciadas con paths relativos.
