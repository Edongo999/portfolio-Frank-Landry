import { Variants } from 'framer-motion';

/* =========================================================
   DESKTOP — CONTENEUR
========================================================= */

export const containerVariants: Variants = {
  hidden: {
    opacity: 1,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.15,
    },
  },

  exit: {
    opacity: 1,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   DESKTOP — BLOC GAUCHE
========================================================= */

export const leftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: -25,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   DESKTOP — BLOC DROIT
========================================================= */

export const rightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: 25,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   MOBILE — CASCADE
   NE PAS MODIFIER
========================================================= */

export const mobileItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -28,
    y: 8,
  },

  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,

    transition: {
      duration: 0.85,
      delay: Math.min(index * 0.13, 1.2),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* =========================================================
   MOBILE — IMAGE
   NE PAS MODIFIER
========================================================= */

export const mobileImageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,

    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   MOBILE — TRAITS ORANGE
   NE PAS MODIFIER
========================================================= */

export const mobileLineVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: 'bottom',
  },

  visible: (index: number) => ({
    opacity: 1,
    scaleY: 1,

    transition: {
      duration: 0.9,
      delay: 0.4 + index * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* =========================================================
   BADGE — DESKTOP
========================================================= */

export const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -15,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: -15,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   TRAIT — DESKTOP
========================================================= */

export const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
  },

  visible: {
    opacity: 1,
    scaleX: 1,

    transition: {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.25,
    },
  },

  exit: {
    opacity: 0,
    scaleX: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   DESCRIPTION — DESKTOP
========================================================= */

export const descriptionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.25,
    },
  },

  exit: {
    opacity: 0,
    y: 10,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
