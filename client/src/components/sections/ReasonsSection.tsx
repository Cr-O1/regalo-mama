import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface ReasonsSectionProps {
  onNext: () => void;
  onBack: () => void;
}

const REASONS = [
  "Porque me diste la vida.",
  "Porque has estado conmigo desde el primer momento.",
  "Porque me cuidas incluso cuando nadie más lo hace.",
  "Porque te preocupas por mí aunque a veces no lo note.",
  "Porque celebras mis logros como si fueran tuyos.",
  "Porque sufres cuando yo sufro.",
  "Porque quieres lo mejor para mi futuro.",
  "Porque me enseñas valores importantes.",
  "Porque me perdonas incluso cuando me equivoco.",
  "Porque haces sacrificios que muchas veces ni veo.",
  "Porque me escuchas cuando necesito hablar.",
  "Porque intentas entenderme, incluso cuando no estás de acuerdo conmigo.",
  "Porque me apoyas en mis metas y sueños.",
  "Porque me proteges.",
  "Porque me conoces mejor que casi nadie.",
  "Porque me animas cuando estoy desmotivado.",
  "Porque me ayudas a levantarme cuando fallo.",
  "Porque siempre quieres verme feliz.",
  "Porque tu amor es el más sincero y fuerte que conozco."
];

export function ReasonsSection({ onNext, onBack }: ReasonsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [hasClicked, setHasClicked] = useState(false);

  const showNextReason = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev + 1) % REASONS.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto px-6 text-center"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-serif text-center mb-8 text-foreground"
      >
        Razones por las que te quiero
      </motion.h2>

      <div className="glass-panel p-10 md:p-16 rounded-[3rem] w-full min-h-[300px] flex flex-col items-center justify-center mb-16 relative overflow-hidden shadow-2xl">
        {!hasClicked ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-muted-foreground italic font-serif"
          >
            Descubre por qué eres tan especial...
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="text-3xl md:text-5xl leading-tight text-primary font-serif font-medium tracking-tight"
            >
              "{REASONS[currentIndex]}"
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <GlassButton onClick={showNextReason} icon={<Sparkles className="w-4 h-4" />}>
          {hasClicked ? "Otra razón más" : "Pulsa aquí"}
        </GlassButton>

        <AnimatePresence>
          {hasClicked && currentIndex >= 2 && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="flex items-center gap-4"
            >
              <GlassButton variant="secondary" onClick={onBack} icon={<ArrowLeft className="w-4 h-4" />}>
                Atrás
              </GlassButton>
              <GlassButton variant="secondary" onClick={onNext} icon={<ArrowRight className="w-4 h-4" />}>
                Siguiente
              </GlassButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
