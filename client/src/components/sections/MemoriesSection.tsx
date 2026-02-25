import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { useMemories } from "@/hooks/use-memories";
import { useCallback, useEffect, useState } from "react";

interface MemoriesSectionProps {
  onNext: () => void;
}

export function MemoriesSection({ onNext }: MemoriesSectionProps) {
  const { data: memories, isLoading } = useMemories();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (isLoading || !memories) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto px-4 py-12"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-5xl font-serif text-center mb-4 text-foreground"
      >
        Nuestras aventuras juntos
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground text-center mb-12"
      >
        Haz clic en cada viaje para ver nuestras fotos
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="w-full relative px-8 md:px-16"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {memories.map((memory, index) => (
              <div key={memory.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  onClick={() => memory.images && memory.images.length > 0 && setSelectedGallery(memory.images)}
                  className={`glass-panel p-6 md:p-8 rounded-[2rem] h-full flex flex-col cursor-pointer transition-colors ${memory.images && memory.images.length > 0 ? 'hover:bg-white/40' : 'cursor-default'}`}
                >
                  <span className="text-sm font-medium text-primary uppercase tracking-wider mb-3 block">
                    {memory.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-4">
                    {memory.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed flex-grow">
                    {memory.description}
                  </p>
                  {memory.images && memory.images.length > 0 && (
                    <div className="mt-4 text-xs font-semibold text-primary/70 italic">
                      Ver fotos ({memory.images.length})
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full glass-button flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed z-10"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full glass-button flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed z-10"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </motion.div>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedGallery(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full glass-panel p-4 md:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedGallery(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {selectedGallery.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden bg-muted"
                  >
                    <img 
                      src={img} 
                      alt={`Foto ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-16"
      >
        <GlassButton onClick={onNext} icon={<ArrowRight className="w-4 h-4" />}>
          Continuar
        </GlassButton>
      </motion.div>
    </motion.div>
  );
}
