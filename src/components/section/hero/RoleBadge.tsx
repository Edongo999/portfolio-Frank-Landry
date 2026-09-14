import React from 'react';
import { motion } from 'framer-motion';

interface RoleBadgeProps {
  role: string;
  color: string;
  active: boolean;
  visible: boolean;
  position: 'top' | 'middle' | 'bottom';
  direction: 'left' | 'right';
  onMobile?: boolean;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  color,
  active,
  visible,
  position,
  direction,
}) => {
  const positionClass = {
    top: `
      right-[-30px]
      top-[-8px]
      max-md:-right-[8px]
      max-md:top-[25px]
    `,
    middle: `
      -left-3
      top-1/2
      -translate-y-1/2
      max-md:-left-[30px]
      max-md:top-45
    `,
    bottom: `
      bottom-[-10px]
      right-[-25px]
      max-md:-right-[22px]
      max-md:bottom-[20px]
    `,
  }[position];

  const lineClass =
    direction === 'left'
      ? `
        right-full mr-3 origin-right
        max-md:mr-2 max-md:w-5
      `
      : `
        left-full ml-3 origin-left
        max-md:ml-2 max-md:w-5
      `;

  return (
    <motion.div
      className={`
        absolute
        ${positionClass}
        z-30 flex
        md:h-10 h-8
        min-w-[185px]
        items-center justify-center
        rounded-full border
        bg-gray-900/90 px-4
        text-x font-semibold text-white
        shadow-lg backdrop-blur-md
        max-md:min-w-[145px]
        max-md:px-3
        max-md:text-[10px]
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.9,
        borderColor: active ? color : 'rgba(255,255,255,0.1)',
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        borderColor: { duration: 0.7 },
      }}
    >
      {/* POINT COLORÉ */}
      <motion.span
        className="mr-2 h-2 w-2 rounded-full"
        animate={{
          backgroundColor: active ? color : '#6b7280',
          scale: active ? [1, 1.35, 1] : 1,
        }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
      />

      {role}

      {/* TRAIT */}
      <motion.span
        className={`
          absolute top-1/2 h-px w-10
          -translate-y-1/2 bg-white/40
          ${lineClass}
        `}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: visible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
      />
    </motion.div>
  );
};

export default RoleBadge;
