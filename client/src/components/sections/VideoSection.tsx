import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/GlassButton";
import { ArrowRight } from "lucide-react";

interface VideoSectionProps {
  onNext: () => void;
}

export function VideoSection({ onNext }: VideoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-5xl font-serif text-center mb-8 text-foreground"
      >
        ¡Mira quién también te desea feliz cumpleaños!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-2xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black mb-12"
      >
        <video 
          src="/fotos/videoperrasaltando/20260220_132553.mp4" 
          controls 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <GlassButton onClick={onNext} icon={<ArrowRight className="w-4 h-4" />}>
          Continuar
        </GlassButton>
      </motion.div>
    </motion.div>
  );
}
