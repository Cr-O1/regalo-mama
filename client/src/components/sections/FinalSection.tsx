import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Heart, Music, Music2 } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface FinalSectionProps {
  audioInstance?: HTMLAudioElement | null;
}

export function FinalSection({ audioInstance }: FinalSectionProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Set window size for confetti
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    
    // Check initial playing state if instance provided
    if (audioInstance) {
      setIsPlaying(!audioInstance.paused);
    }

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [audioInstance]);

  const toggleMusic = () => {
    if (!audioInstance) return;
    
    if (isPlaying) {
      audioInstance.pause();
    } else {
      audioInstance.play().catch(e => console.warn("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center px-4 relative"
    >
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        colors={['#ffb3c6', '#ffc2d1', '#ffe5ec', '#fb6f92', '#ff8fab']}
        recycle={false}
        numberOfPieces={400}
        gravity={0.15}
      />

      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="mb-8"
      >
        <Heart className="w-16 h-16 text-primary fill-primary/20" strokeWidth={1.5} />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-5xl md:text-7xl font-serif text-foreground mb-6"
      >
        ¡Feliz Cumpleaños!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl mb-8 relative"
      >
        <img 
          src="/fotos/fotoconmimadre/IMG-20251213-WA0002.jpg" 
          alt="Nosotros" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="text-3xl md:text-5xl text-primary font-serif italic mb-20 tracking-tight"
      >
        Te quiero muchísimo.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="flex flex-col items-center gap-10"
      >
        <p className="text-muted-foreground font-semibold tracking-[0.2em] uppercase text-xs opacity-70">
          Con amor, Carlos
        </p>

        <GlassButton 
          variant="secondary" 
          onClick={toggleMusic} 
          icon={isPlaying ? <Music className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
          className="mt-8 opacity-80 hover:opacity-100"
        >
          {isPlaying ? "Pausar Música" : "Reproducir Música"}
        </GlassButton>
      </motion.div>
    </motion.div>
  );
}
