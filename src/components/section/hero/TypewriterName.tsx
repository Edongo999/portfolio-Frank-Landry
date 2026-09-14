import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  names: string[];
}

const TypewriterName: React.FC<Props> = ({ names }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % names.length);
    }, 6000); // passe à 6 secondes au lieu de 4
    return () => clearInterval(interval);
  }, [names.length]);

  const letters = names[index].split('');

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={names[index]}
        className="text-[#f3f009] whitespace-nowrap inline-block"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              scale: 3,
              rotateY: 180,
              filter: 'blur(12px)',
              y: -40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: 0,
              filter: 'blur(0px)',
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 30,
              filter: 'blur(8px)',
            }}
            transition={{
              duration: 1.2, //  animation plus longue (0.7 → 1.2)
              delay: i * 0.18, // délai plus espacé entre lettres (0.12 → 0.18)
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${letter === ' ' ? 'w-3' : ''}`}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};

export default React.memo(TypewriterName);
