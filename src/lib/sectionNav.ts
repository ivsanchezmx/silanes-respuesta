/**
 * Contexto mínimo para que cualquier sección pueda saltar a otra
 * (ej. una card de §04 Evidencia que abre §07 Asistente).
 *
 * App.tsx envuelve el shell con SectionNavContext.Provider value={setActive}.
 * Las secciones llaman useGoToSection() para obtener la función.
 */

import { createContext, useContext } from "react";
import type { SectionId } from "../sections";

export const SectionNavContext = createContext<(id: SectionId) => void>(() => {
  if (typeof console !== "undefined") {
    console.warn("SectionNavContext: provider no montado");
  }
});

export function useGoToSection(): (id: SectionId) => void {
  return useContext(SectionNavContext);
}
