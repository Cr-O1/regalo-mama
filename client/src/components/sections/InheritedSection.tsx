import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Shield, Sparkles, HandHeart, Star } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface InheritedSectionProps {
  onNext: () => void;
  onBack: () => void;
}

const INHERITED_QUALITIES = [
  {
    id: "strength",
    icon: <Shield className="w-8 h-8" />,
    title: "Tu fortaleza",
    description: "Aprendí de ti a levantarme incluso en los días más difíciles, sin rendirme nunca.",
    color: "text-blue-500"
  },
  {
    id: "kindness",
    icon: <HandHeart className="w-8 h-8" />,
    title: "Tu bondad",
    description: "Tu forma de cuidar y ayudar a los demás me enseñó a tener siempre el corazón abierto.",
    color: "text-rose-500"
  },
  {
    id: "love",
    icon: <Heart className="w-8 h-8" />,
    title: "Tu manera de amar",
    description: "De ti heredé que el amor de verdad está en los detalles y en estar siempre presentes.",
    color: "text-red-500"
  },
  {
    id: "beauty",
    icon: <Star className="w-8 h-8" />,
    title: "Tu belleza",
    description: "Me miro al espejo y entiendo de dónde viene lo mejor de mí: tu sonrisa, tu mirada y esa luz que llevas dentro… al final, me parezco a ti. Somos como dos gotas de agua.",
    color: "text-amber-500"
  }
];

export function InheritedSection({ onNext, onBack }: InheritedSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(INHERITED_QUALITIES[0].id);

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
        Lo que heredé de ti
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-center mb-12"
      >
        Todo lo mejor de mí tiene un poquito de ti
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full mb-10">
        {INHERITED_QUALITIES.map((quality) => (
          <motion.button
            key={quality.id}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedId(quality.id)}
            className={`glass-panel p-6 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
              selectedId === quality.id ? "ring-2 ring-primary bg-white/60" : "hover:bg-white/50"
            }`}
          >
            <div className={`${quality.color} opacity-80`}>{quality.icon}</div>
            <span className="text-lg font-semibold text-foreground/90 text-center">
              {quality.title}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="min-h-[150px] w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedId && (
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 1.05 }}
              className="glass-panel p-8 rounded-[2.5rem] w-full text-center shadow-xl"
            >
              <Sparkles className="w-5 h-5 text-primary/40 mx-auto mb-3" />
              <p className="text-xl md:text-2xl text-foreground font-serif italic leading-relaxed">
                {INHERITED_QUALITIES.find((item) => item.id === selectedId)?.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex items-center gap-4"
      >
        <GlassButton variant="secondary" onClick={onBack} icon={<ArrowLeft className="w-4 h-4" />}>
          Atrás
        </GlassButton>
        <GlassButton onClick={onNext} icon={<ArrowRight className="w-4 h-4" />}>
          Siguiente
        </GlassButton>
      </motion.div>
    </motion.div>
  );
}