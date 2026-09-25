export type SectionId =
  | "letter"
  | "validation"
  | "experience"
  | "evidence"
  | "fit"
  | "contact"
  | "assistant";

export interface SectionMeta {
  id: SectionId;
  num: string;
  label: string;
  title: string;
  subtitle: string;
}

export const SECTIONS: SectionMeta[] = [
  {
    id: "letter",
    num: "§01",
    label: "Bienvenida",
    title: "Bienvenida",
    subtitle: "Gracias por revisar mi perfil",
  },
  {
    id: "validation",
    num: "§02",
    label: "Datos clave",
    title: "Datos clave",
    subtitle: "Residencia, modalidad y disponibilidad",
  },
  {
    id: "experience",
    num: "§03",
    label: "Experiencia",
    title: "Experiencia profesional",
    subtitle: "Tres preguntas frecuentes, respondidas con sustancia",
  },
  {
    id: "evidence",
    num: "§04",
    label: "Evidencia",
    title: "Evidencia en vivo",
    subtitle: "Custom GPTs, agentes y plataformas que puedes abrir hoy",
  },
  {
    id: "fit",
    num: "§05",
    label: "Aporte",
    title: "Qué puedo aportar",
    subtitle: "Tres ángulos que traigo a un rol de habilitación en IA",
  },
  {
    id: "contact",
    num: "§06",
    label: "Contacto",
    title: "Siguiente paso",
    subtitle: "Video, disponibilidad y datos directos",
  },
  {
    id: "assistant",
    num: "§07",
    label: "Asistente",
    title: "Asistente IA",
    subtitle: "Pregúntale al modelo cualquier cosa sobre Iván",
  },
];
