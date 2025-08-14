"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    if (!isPlaying) {
      try {
        await audioRef.current.play();
        audioRef.current.volume = 0.5;
        setIsPlaying(true);
      } catch (err) {
        console.error("Autoplay blocked:", err);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/aud2.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 bg-pink-500 hover:bg-pink-600 p-4 rounded-full shadow-lg text-white z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
