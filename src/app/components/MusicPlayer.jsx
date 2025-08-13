"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5; // Adjust volume
        audioRef.current.play().catch(() => {
          console.warn("Autoplay blocked — user must interact first.");
        });
      }
    };

    // Try autoplay immediately
    playMusic();

    // Also play on first user click/tap (if autoplay was blocked)
    const handleInteraction = () => {
      playMusic();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/aud.mp3" type="audio/mpeg" />
    </audio>
  );
}
