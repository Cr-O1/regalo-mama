import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { MessageSection } from "@/components/sections/MessageSection";
import { MemoriesSection } from "@/components/sections/MemoriesSection";
import { ReasonsSection } from "@/components/sections/ReasonsSection";
import { SuperpowersSection } from "@/components/sections/SuperpowersSection";
import { InheritedSection } from "@/components/sections/InheritedSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { FinalSection } from "@/components/sections/FinalSection";

export default function Home() {
  const [step, setStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Global audio setup
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.warn("Music play failed:", e));
    }
  };

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col justify-center py-12">
      {/* Soft animated background elements */}
      <div className="bg-blobs">
        <div className="bg-blob-3" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && <WelcomeSection key="step-0" onNext={() => { setStep(1); startMusic(); }} />}
          {step === 1 && <MessageSection key="step-1" onNext={() => setStep(2)} />}
          {step === 2 && <MemoriesSection key="step-2" onNext={() => setStep(3)} />}
          {step === 3 && <ReasonsSection key="step-3" onNext={() => setStep(4)} />}
          {step === 4 && <InheritedSection key="step-inherited" onNext={() => setStep(5)} />}
          {step === 5 && <SuperpowersSection key="step-superpowers" onNext={() => setStep(6)} />}
          {step === 6 && <VideoSection key="step-video" onNext={() => setStep(7)} />}
          {step === 7 && <FinalSection key="step-4" audioInstance={audioRef.current} />}
        </AnimatePresence>
      </div>
    </main>
  );
}
