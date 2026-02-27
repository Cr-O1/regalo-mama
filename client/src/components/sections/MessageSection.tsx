import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { TypewriterText } from "@/components/ui/TypewriterText";

interface MessageSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function MessageSection({ onNext, onBack }: MessageSectionProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const message = "Mamá, en este día tan especial quería regalarte algo diferente. Algo que pudieras guardar y mirar cada vez que quieras recordar lo muchísimo que te quiero. Gracias por darme la vida, por sacrificar todo por mí y por ser un ejemplo a seguir. Eres la mujer más fuerte, valiente y buena que conozco.";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] max-w-2xl mx-auto px-6 text-center"
    >
      <div className="glass-panel p-10 md:p-16 rounded-[3rem] w-full min-h-[350px] flex flex-col justify-center relative shadow-2xl">
        <div className="absolute top-8 left-8 text-6xl text-primary/10 font-serif opacity-50">"</div>
        <div className="absolute bottom-8 right-8 text-6xl text-primary/10 font-serif rotate-180 opacity-50">"</div>
        
        <div className="text-2xl md:text-4xl leading-relaxed text-foreground/90 font-serif tracking-tight">
          <TypewriterText 
            text={message} 
            speed={45} 
            delay={500}
            onComplete={() => setIsTypingComplete(true)} 
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTypingComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="mt-12 h-16"
      >
        {isTypingComplete && (
          <div className="flex items-center gap-4">
            <GlassButton variant="secondary" onClick={onBack} icon={<ArrowLeft className="w-4 h-4" />}>
              Atrás
            </GlassButton>
            <GlassButton onClick={onNext} icon={<ArrowRight className="w-4 h-4" />}>
              Siguiente
            </GlassButton>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
