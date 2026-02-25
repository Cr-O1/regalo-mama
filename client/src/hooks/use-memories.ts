import { useQuery } from "@tanstack/react-query";
import { api, type MemoryResponse } from "@shared/routes";

// Beautiful fallback data in case the API is empty or offline
// Ensures the mother's experience is always perfect.
const FALLBACK_MEMORIES: MemoryResponse = [
  {
    id: 1,
    year: "Siempre",
    title: "Tus Abrazos Infinitos",
    description: "El lugar más seguro del mundo siempre ha sido entre tus brazos. Gracias por consolarme siempre que lo necesité.",
  },
  {
    id: 2,
    year: "Mi Infancia",
    title: "Tus Cuidados y Desvelos",
    description: "Recuerdo cómo velabas mis sueños y me cuidabas con una paciencia que solo una madre puede tener.",
  },
  {
    id: 3,
    year: "Adolescencia",
    title: "Tus Sabios Consejos",
    description: "Incluso cuando no quería escuchar, tus palabras me guiaban. Hoy sé que siempre tuviste la razón.",
  },
  {
    id: 4,
    year: "Hoy",
    title: "Tu Apoyo Incondicional",
    description: "Ver cómo celebras mis logros y me levantas en mis caídas es el mayor regalo de mi vida.",
  },
];

export function useMemories() {
  return useQuery({
    queryKey: [api.memories.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.memories.list.path, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch memories");
        const data = await res.json();
        const parsed = api.memories.list.responses[200].parse(data);
        
        // Use fallback if API returns empty array so the UI never looks broken
        return parsed.length > 0 ? parsed : FALLBACK_MEMORIES;
      } catch (error) {
        console.warn("Failed to load memories from API, using curated fallback data", error);
        return FALLBACK_MEMORIES;
      }
    },
    // We want this to resolve quickly or show fallback immediately
    retry: 1,
    staleTime: Infinity,
  });
}
