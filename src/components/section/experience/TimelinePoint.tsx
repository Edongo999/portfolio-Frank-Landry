import { motion } from 'framer-motion';

type TimelinePointProps = {
  index: number;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const TimelinePoint = ({ index }: TimelinePointProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.4 + index * 0.1,
        duration: 1.2,
        ease: smoothEase,
      }}
      viewport={{ once: true, amount: 0.5 }}
      className="
        absolute
        left-1/2
        top-1/2
        z-30
        hidden
        h-5
        w-5
        -translate-x-1/2
        -translate-y-1/2
        md:flex
      "
    >
      {/* Cercle qui se dessine */}
      <motion.span
        initial={{ scale: 0, borderWidth: 0 }}
        whileInView={{ scale: 1, borderWidth: 4 }}
        transition={{
          delay: 0.6 + index * 0.1,
          duration: 1.4,
          ease: smoothEase,
        }}
        viewport={{ once: true, amount: 0.5 }}
        className="
          h-full
          w-full
          rounded-full
          border-gray-900
          bg-[#f3f009]
        "
      />

      {/* Effet lumineux pulsé */}
      <motion.span
        animate={{
          boxShadow: [
            '0 0 0 rgba(243,240,9,0)',
            '0 0 8px rgba(243,240,9,0.35)',
            '0 0 18px rgba(243,240,9,0.8)',
            '0 0 8px rgba(243,240,9,0.35)',
            '0 0 0 rgba(243,240,9,0)',
          ],
        }}
        transition={{
          delay: 1.6 + index * 0.1,
          duration: 2.8,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 2.5,
        }}
        className="
          absolute
          h-full
          w-full
          rounded-full
          bg-transparent
        "
      />
    </motion.div>
  );
};

export default TimelinePoint;
