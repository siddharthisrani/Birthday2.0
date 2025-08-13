"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Loader from "./components/Loader";
import Countdown from "./components/Countdown";
import Celebration from "./components/Celebration";
import HappyBirthday from "./components/HappyBirthday";
import PhotoGallery from "./components/PhotoGallery";
import Letter from "./components/Letter";
import { motion } from "motion/react";
import MusicPlayer from "./components/MusicPlayer";

export default function BirthdayApp() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loader for 3s
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const screens = [
    <Countdown key="countdown" onComplete={() => setCurrentScreen(1)} />,
    <Celebration key="celebration" onNext={() => setCurrentScreen(2)} />,
    <HappyBirthday key="happy" onNext={() => setCurrentScreen(3)} />,
    <PhotoGallery key="gallery" onNext={() => setCurrentScreen(4)} />,
    <Letter key="letter" />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30 overflow-hidden relative">
      {/* Music plays from the start */}
      <MusicPlayer />

      {/* Radial gradient background effects */}
      <div
        className="fixed inset-0 z-0 blur-[120px] opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(255, 99, 165, 0.6), transparent 40%)",
        }}
      />
      <div
        className="fixed inset-0 z-0 blur-[120px] opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.6), transparent 40%)",
        }}
      />
      <div
        className="fixed inset-0 z-0 blur-[160px] opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(228, 193, 255, 0.4), transparent 40%)",
        }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? <Loader key="loader" /> : screens[currentScreen]}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light"
      >
        {/* Optional watermark text */}
      </motion.div>
    </div>
  );
}
