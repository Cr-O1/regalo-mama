import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Download, Heart, Music, Music2 } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface FinalSectionProps {
  audioInstance?: HTMLAudioElement | null;
}

export function FinalSection({ audioInstance }: FinalSectionProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCreatingCollage, setIsCreatingCollage] = useState(false);

  const COUPLE_PHOTOS = [
    "/fotos/fotoconmimadre/IMG-20251213-WA0002.jpg",
    "/fotos/fotoconmimadre/IMG-20250124-WA0001.jpg",
    "/fotos/fotoconmimadre/IMG-20250201-WA0007.jpg"
  ];

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


  const createCollage = async () => {
    try {
      setIsCreatingCollage(true);

      const loadImage = (src: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`No se pudo cargar la imagen: ${src}`));
          img.src = src;
        });

      const images = await Promise.all(COUPLE_PHOTOS.map(loadImage));

      const canvas = document.createElement("canvas");
      const cols = 2;
      const rows = Math.ceil(images.length / cols);
      const cellSize = 900;
      canvas.width = cols * cellSize;
      canvas.height = rows * cellSize;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      images.forEach((img, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * cellSize;
        const y = row * cellSize;

        const scale = Math.max(cellSize / img.width, cellSize / img.height);
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const dx = x + (cellSize - drawWidth) / 2;
        const dy = y + (cellSize - drawHeight) / 2;

        ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "collage-mama-e-hijo.png";
        link.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.warn("Collage creation failed:", error);
    } finally {
      setIsCreatingCollage(false);
    }
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

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <GlassButton 
            variant="secondary" 
            onClick={toggleMusic} 
            icon={isPlaying ? <Music className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
            className="opacity-80 hover:opacity-100"
          >
            {isPlaying ? "Pausar Música" : "Reproducir Música"}
          </GlassButton>

          <GlassButton
            variant="secondary"
            onClick={createCollage}
            icon={<Download className="w-4 h-4" />}
            className="opacity-80 hover:opacity-100"
          >
            {isCreatingCollage ? "Creando collage..." : "Crear collage"}
          </GlassButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
