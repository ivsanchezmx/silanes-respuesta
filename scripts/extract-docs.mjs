#!/usr/bin/env node
/**
 * Extrae texto de los documentos en public/docs/ y genera
 * src/lib/docs.generated.ts. Soporta .pdf, .md, .txt.
 *
 * Se ejecuta automáticamente antes de `npm run dev` y `npm run build`.
 */

import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { resolve, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const DOCS_DIR = resolve(ROOT, "public", "docs");
const OUT_FILE = resolve(ROOT, "src", "lib", "docs.generated.ts");

const SUPPORTED = /\.(pdf|md|markdown|txt)$/i;

async function extractPdf(buffer) {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const result = await parser.getText();
    return result.text ?? "";
  } finally {
    await parser.destroy();
  }
}

async function extractFile(filePath) {
  const buf = await readFile(filePath);
  const ext = extname(filePath).toLowerCase();
  if (ext === ".pdf") {
    return await extractPdf(buf);
  }
  return buf.toString("utf-8");
}

async function main() {
  let entries;
  try {
    entries = await readdir(DOCS_DIR);
  } catch (e) {
    if (e.code === "ENOENT") {
      console.warn(`[extract-docs] ${DOCS_DIR} no existe — generando vacío.`);
      entries = [];
    } else {
      throw e;
    }
  }

  const supported = entries.filter((f) => SUPPORTED.test(f)).sort();

  const sections = [];
  for (const file of supported) {
    const fullPath = resolve(DOCS_DIR, file);
    const s = await stat(fullPath);
    if (!s.isFile()) continue;
    process.stdout.write(`  · ${file} … `);
    try {
      const text = await extractFile(fullPath);
      const cleaned = text
        .replace(/\r/g, "")
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      sections.push(
        `===== ARCHIVO: ${file} =====\n\n${cleaned}\n\n===== FIN: ${file} =====`
      );
      process.stdout.write(`${cleaned.length} chars\n`);
    } catch (err) {
      process.stdout.write(`ERROR\n`);
      console.error(`    ${err.message}`);
    }
  }

  const joined =
    sections.length > 0
      ? sections.join("\n\n")
      : "(Sin documentos en public/docs/)";

  await mkdir(dirname(OUT_FILE), { recursive: true });
  const out = `// AUTO-GENERADO por scripts/extract-docs.mjs — no editar a mano.
// Para regenerar: npm run extract-docs
// Fuente: public/docs/*.{pdf,md,txt}
// Última actualización: ${new Date().toISOString()}

export const DOCS_SOURCES: string[] = ${JSON.stringify(supported)};

export const DOCS_CONTEXT: string = ${JSON.stringify(joined)};
`;
  await writeFile(OUT_FILE, out, "utf-8");

  console.log(
    `\n✓ ${supported.length} doc(s) → src/lib/docs.generated.ts (${joined.length} chars)`
  );
  // basename available if needed for future logging
  void basename;
}

main().catch((e) => {
  console.error("[extract-docs] falló:", e);
  process.exit(1);
});
