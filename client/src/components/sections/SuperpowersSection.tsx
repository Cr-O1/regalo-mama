import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Utensils, 
  HeartHandshake, 
  Zap, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface SuperpowersSectionProps {
  onNext: () => void;
}

const SUPERPOWERS = [
  {
    id: "patience",
    icon: <HeartHandshake className="w-8 h-8" />,
    title: "Paciencia Infinita",
    description: "Por aguantar mis tonterías y mis días malos con la mejor de tus sonrisas.",
    color: "text-blue-500"
  },
  {
    id: "chef",
    icon: <Utensils className="w-8 h-8" />,
    title: "Chef 5 Estrellas",
    description: "Porque nadie cocina como tú. Tus platos son el ingrediente secreto de mi felicidad.",
    color: "text-orange-500"
  },
  {
    id: "radar",
    icon: <Zap className="w-8 h-8" />,
    title: "Amor Incondicional Infinito",
    description: "Por sacrificar hasta el último céntimo por mí, por quererme con todas tus fuerzas sin importar lo que haga, y por derramar cada gota de sudor para que no me haga falta nada",
    color: "text-yellow-500"
  },
  {
    id: "protection",
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Escudo Protector",
    description: "Gracias por ser mi refugio seguro y cuidarme de todo lo malo del mundo.",
    color: "text-green-500"
  }
];

export function SuperpowersSection({ onNext }: SuperpowersSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto px-6"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-serif text-center mb-4 text-foreground"
      >
        Tus Superpoderes
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-center mb-12"
      >
        Pulsa en cada icono para descubrir por qué eres una superheroína para mí
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-12">
        {SUPERPOWERS.map((power) => (
          <motion.button
            key={power.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedId(power.id)}
            className={`glass-panel p-6 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
              selectedId === power.id ? "ring-2 ring-primary bg-white/60" : "hover:bg-white/50"
            }`}
          >
            <div className={`${power.color} opacity-80`}>
              {power.icon}
            </div>
            <span className="text-sm font-semibold text-foreground/80 text-center">
              {power.title}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="min-h-[160px] w-full flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {selectedId ? (
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 1.05 }}
              className="glass-panel p-8 rounded-[2.5rem] w-full text-center shadow-xl"
            >
              <Sparkles className="w-5 h-5 text-primary/40 mx-auto mb-3" />
              <p className="text-xl md:text-2xl text-foreground font-serif italic leading-relaxed">
                {SUPERPOWERS.find(p => p.id === selectedId)?.description}
              </p>
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground italic"
            >
              Selecciona un superpoder arriba...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <GlassButton onClick={onNext} icon={<ArrowRight className="w-4 h-4" />}>
          Continuar
        </GlassButton>
      </motion.div>
    </motion.div>
  );
}
