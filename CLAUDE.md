# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page React + Vite + TypeScript piece — Iván Sánchez Martínez's response to Laboratorios Silanes' talent filter for the "Gerente de Habilitación IA" role. **Not a generic landing**: it is structured as a 7-tab interactive app with persistent sidebar, not as scroll. The shipped artifact is the dist bundle deployed somewhere private (`robots: noindex,nofollow`).

There is a `index.legacy.html` at the repo root — an older standalone HTML version. The live piece is the React app under `src/`.

## Commands

```bash
npm run dev        # vite dev (port 5173) — predev re-extracts docs
npm run build      # tsc -b && vite build — prebuild re-extracts docs
npm run preview    # serve dist locally
npm run extract-docs  # re-run PDF/MD extraction manually
```

There is no test runner, linter, or formatter configured. Type-checking happens via `tsc -b` inside `npm run build`.

## Architecture

### Tab-based navigation, not scroll

[src/App.tsx](src/App.tsx) renders a fixed shell (`AmbientOrb` + `Topbar` + sidebar `IdentityPanel` + content `<main>`). Only one section is mounted at a time, switched by an `active: SectionId` state. The 7 sections are declared in [src/sections.ts](src/sections.ts) (`SECTIONS` array — order matters, it drives both the sidebar and the prev/next pager).

Three nav surfaces all call `setActive`:
- Sidebar buttons in [src/components/IdentityPanel.tsx](src/components/IdentityPanel.tsx)
- Prev/next pager at the bottom of `<main>` in `App.tsx`
- Keyboard: `←` / `→` step, `1`–`7` jump (handler in [App.tsx:33-57](src/App.tsx#L33-L57) — skips when focus is in an input/textarea/contenteditable so the chat in §07 keeps working)

Cross-section jumps (e.g. an Evidence card opening §07 Assistant) go through `SectionNavContext` — see [src/lib/sectionNav.ts](src/lib/sectionNav.ts). Sections call `useGoToSection()`.

The content body is wrapped in `<div key={active}>` ([App.tsx:88](src/App.tsx#L88)) — this remount-on-tab-change is intentional, it was the fix for a blank-after-switch bug (commit `7269437`). Don't remove the key.

### LLM assistant (§07) and its context

[src/sections/Assistant.tsx](src/sections/Assistant.tsx) hosts a Gemini-powered chat ([src/components/Chat.tsx](src/components/Chat.tsx)) that streams via SSE directly from the browser ([src/lib/gemini.ts](src/lib/gemini.ts) — fetch only, no SDK). The model can only answer from two declared sources:

- **Fuente A · official docs**: PDFs in `public/docs/` (CV + LinkedIn export) get extracted at build time by [scripts/extract-docs.mjs](scripts/extract-docs.mjs) (uses `pdf-parse`) into `src/lib/docs.generated.ts`. This file is **gitignored and auto-regenerated** by the `predev` / `prebuild` npm scripts — never edit it by hand and don't commit it.
- **Fuente B · landing copy**: hand-maintained in [src/lib/site-content.ts](src/lib/site-content.ts). Edit this when you change copy in a section so the assistant stays in sync.

Both are concatenated in [src/lib/context.ts](src/lib/context.ts) into `SYSTEM_PROMPT`, along with hard rules (Spanish, third person, refuse out-of-source questions with the canonical contact-Iván line, etc.). When changing assistant behavior, edit the rules in `context.ts`, not the chat component.

**Gemini API key is bundled into client JS** (Vite exposes all `VITE_*` env vars). [.env.example](.env.example) documents the deploy hygiene: restrict the key by HTTP referrer + low quota cap before publishing, and rotate when the process closes.

### Styling system

Global design tokens live in [src/styles/tokens.css](src/styles/tokens.css) (imported once via [src/styles/global.css](src/styles/global.css)). Per-component styles use CSS Modules (`*.module.css`). Palette is intentionally narrow: tech-dark navy/charcoal surfaces with **sky blue (`--accent: #60a5fa`) as the only saturated color** — don't introduce additional hues. Layout dims like `--sidebar-w`, `--topbar-h`, `--max-content` are tokens too; reuse them.

Motion uses `framer-motion`. Keep it subtle — see existing tab-switch and stagger patterns in `IdentityPanel`, `Chat`, sections.

## Conventions worth knowing

- Spanish (es-MX) copy throughout — UI labels, comments in code, commit messages. Match this when editing.
- File paths in this app's content (Evidence section URLs, contact info) are real — don't invent or alter URLs/emails/phone numbers; they're cited in the system prompt and must match the docs.
- `noUnusedLocals` and `noUnusedParameters` are on in [tsconfig.json](tsconfig.json) — strict mode. The build will fail on unused symbols.
- The `dist/` folder is gitignored but the `dist/` outdir is what gets deployed. `public/media/` is also gitignored (large media is served via Drive in production per `.gitignore` comment).

## Repo-specific Claude assets

`.claude/agents/` and `.claude/skills/` contain project-scoped agents (landing-page-designer, motion-choreographer, react-app-architect, a11y-reviewer, landing-page-copywriter) and skills (build-landing-page, build-react-landing-page, landing-page-polish). They're tuned for this kind of editorial single-page piece and will be picked up automatically by their descriptions.
