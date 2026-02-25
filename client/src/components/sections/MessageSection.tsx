import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { TypewriterText } from "@/components/ui/TypewriterText";

interface MessageSectionProps {
  onNext: () => void;
}

export function MessageSection({ onNext }: MessageSectionProps) {
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
      <div className="glass-panel p-8 md:p-12 rounded-[2rem] w-full min-h-[300px] flex flex-col justify-center relative">
        <div className="absolute top-6 left-6 text-4xl text-primary/20 font-serif">"</div>
        <div className="absolute bottom-6 right-6 text-4xl text-primary/20 font-serif rotate-180">"</div>
        
        <p className="text-xl md:text-3xl leading-relaxed text-foreground/90 font-serif">
          <TypewriterText 
            text={message} 
            speed={45} 
            delay={500}
            onComplete={() => setIsTypingComplete(true)} 
          />
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTypingComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="mt-12 h-16"
      >
        {isTypingComplete && (
          <GlassButton onClick={onNext} icon={<ArrowRight className="w-4 h-4" />}>
            Siguiente
          </GlassButton>
        )}
      </motion.div>
    </motion.div>
  );
}
