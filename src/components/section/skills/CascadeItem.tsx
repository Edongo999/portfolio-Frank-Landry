import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CascadeItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'bottom';
}

const variants: Record<string, Variants> = {
  left: {
    hidden: {
      opacity: 0,
      x: -6,
      filter: 'blur(1px)',
    },

    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },

  right: {
    hidden: {
      opacity: 0,
      x: 6,
      filter: 'blur(1px)',
    },

    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },

  bottom: {
    hidden: {
      opacity: 0,
      y: 6,
      filter: 'blur(1px)',
    },

    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
};

const CascadeItem: React.FC<CascadeItemProps> = ({
  children,
  className = '',
  direction = 'bottom',
}) => {
  return (
    <motion.div
      variants={variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
        margin: '0px 0px -8% 0px',
      }}
      className={className}
      style={{
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </motion.div>
  );
};

export default CascadeItem;
