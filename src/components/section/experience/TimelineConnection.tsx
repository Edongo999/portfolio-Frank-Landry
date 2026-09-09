import { motion } from 'framer-motion';

type TimelineConnectionProps = {
  side: 'left' | 'right';
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const TimelineConnection = ({ side }: TimelineConnectionProps) => {
  const isLeft = side === 'left';

  return (
    <motion.div
      initial={{
        width: 0,
        opacity: 0,
      }}
      whileInView={{
        width: '2rem',
        opacity: 1,
      }}
      transition={{
        delay: 0.75,
        duration: 1,
        ease: smoothEase,
      }}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      className={`
        absolute
        ${isLeft ? '-right-8' : '-left-8'}
        top-1/2
        hidden
        h-px
        bg-[#f3f009]
        md:block
      `}
    >
      <motion.span
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 1.55,
          duration: 0.8,
          ease: smoothEase,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        className={`
          absolute
          top-1/2
          h-1.5
          w-1.5
          -translate-y-1/2
          rounded-full
          bg-[#f3f009]
          shadow-[0_0_8px_rgba(243,240,9,0.7)]
          ${isLeft ? 'right-0' : 'left-0'}
        `}
      />
    </motion.div>
  );
};

export default TimelineConnection;
