"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Countdown({ onComplete }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // When reaches 0 → small delay before going to Celebration
      const doneTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(doneTimer);
    }
  }, [count, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white font-bold text-9xl"
        >
          {count}
        </motion.div>
      </AnimatePresence>
      <p className="mt-6 text-lg text-purple-300">
        Get ready for the surprise 🎉
      </p>
    </div>
  );
}
