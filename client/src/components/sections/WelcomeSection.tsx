import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface WelcomeSectionProps {
  onNext: () => void;
}

export function WelcomeSection({ onNext }: WelcomeSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-6 flex gap-4 justify-center"
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
          <img src="/fotos/fotoconmimadre/IMG-20250201-WA0007.jpg" alt="Mamá 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
          <img src="/fotos/fotoconmimadre/IMG-20250124-WA0001.jpg" alt="Mamá 2" className="w-full h-full object-cover" />
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-5xl md:text-7xl font-serif italic text-foreground mb-6"
      >
        Feliz cumpleaños,<br />
        <span className="text-primary">mamá</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-lg md:text-xl text-muted-foreground mb-16 font-light tracking-wide"
      >
        Hecho con todo mi cariño para ti
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <GlassButton onClick={onNext} icon={<Heart className="w-4 h-4" />}>
          Entrar
        </GlassButton>
      </motion.div>
    </motion.div>
  );
}
