import { memories, type Memory, type InsertMemory } from "@shared/schema";

export interface IStorage {
  getMemories(): Promise<Memory[]>;
}

export class MemStorage implements IStorage {
  private memoriesMap: Map<number, Memory>;
  private currentId: number;

  constructor() {
    this.memoriesMap = new Map();
    this.currentId = 1;
    // Seed memories from user request
    this.addMemory({
      year: "Noviembre de 2024",
      title: "Viaje a Madrid",
      description: "Nuestra aventura por la Gran Vía, recorriendo tiendas, monumentos y hartándonos a churros.",
      images: [
        "/fotos/momentos/viajeamadrid/20241123_101915.jpg",
        "/fotos/momentos/viajeamadrid/IMG-20241121-WA0021.jpg",
        "/fotos/momentos/viajeamadrid/IMG-20241121-WA0024.jpg",
        "/fotos/momentos/viajeamadrid/IMG-20241121-WA0031.jpg",
        "/fotos/momentos/viajeamadrid/IMG-20241122-WA0006.jpg"
      ]
    });
    this.addMemory({
      year: "Abril de 2025",
      title: "Viaje a Las Palmas",
      description: "Disfrutando de la capital y sus playas, y golisniando en los centros comerciales. Un tiempo de desconexión y felicidad.",
      images: [
        "/fotos/momentos/viajealaspalmas/IMG-20250416-WA0002.jpg",
        "/fotos/momentos/viajealaspalmas/IMG-20250416-WA0039.jpg",
        "/fotos/momentos/viajealaspalmas/IMG-20250417-WA0009.jpg"
      ]
    });
    this.addMemory({
      year: "Julio de 2025",
      title: "Viaje a Madeira",
      description: "Explorando la naturaleza salvaje, los paisajes increíbles de la isla y pasando nervios en el avión.",
      images: [
        "/fotos/momentos/viajeamadeira/20250701_112356.jpg",
        "/fotos/momentos/viajeamadeira/20250701_152947.jpg",
        "/fotos/momentos/viajeamadeira/IMG-20250704-WA0007.jpg",
        "/fotos/momentos/viajeamadeira/IMG-20251130-WA0011.jpg",
        "/fotos/momentos/viajeamadeira/IMG-20251130-WA0014.jpg"
      ]
    });
    this.addMemory({
      year: "Agosto de 2024",
      title: "Viaje a Lanzarote",
      description: "Disfrutando del sol, sus playas de arena blanca y retozando en la arena en Playa Blanca.",
      images: [
        "/fotos/momentos/viajealanzarote/20240803_102122.jpg",
        "/fotos/momentos/viajealanzarote/20240805_101332.jpg",
        "/fotos/momentos/viajealanzarote/20240805_101610.jpg",
        "/fotos/momentos/viajealanzarote/20240805_105219.jpg"
      ]
    });
    this.addMemory({
      year: "Siempre",
      title: "Otras aventuras",
      description: "Tanto en Jama como en Arona, no tenemos que ir lejos para brillar. Cada momento juntos es una vuelta al mundo.",
      images: [
        "/fotos/momentos/otrasaventuras/IMG-20240930-WA0017.jpg",
        "/fotos/momentos/otrasaventuras/IMG-20250912-WA0002.jpg",
        "/fotos/momentos/otrasaventuras/IMG-20251018-WA0006.jpg"
      ]
    });
    this.addMemory({
      year: "Futuro",
      title: "Nuestra próxima aventura",
      description: "Espero recorrer contigo el mundo entero, porque cualquier lugar es especial si es a tu lado.",
      images: []
    });
  }

  private addMemory(insertMemory: InsertMemory): Memory {
    const memory: Memory = { ...insertMemory, id: this.currentId++, images: insertMemory.images || [] };
    this.memoriesMap.set(memory.id, memory);
    return memory;
  }

  async getMemories(): Promise<Memory[]> {
    return Array.from(this.memoriesMap.values());
  }
}

export const storage = new MemStorage();
