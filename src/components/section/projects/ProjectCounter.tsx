import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ProjectCounterProps {
  count: number;
}

const ProjectCounter: React.FC<ProjectCounterProps> = ({ count }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mb-7 flex items-center"
    >
      {/* COMPTEUR */}
      <div
        className="
          group inline-flex items-center gap-3
          rounded-xl border border-gray-700/70
          bg-gray-900/80 px-4 py-2.5
          shadow-sm backdrop-blur-md
          transition-all duration-300
          hover:border-green-500/40 hover:bg-gray-800
        "
      >
        {/* CHIFFRE */}
        <div
          className="
            relative flex h-8 min-w-8 items-center justify-center
            overflow-hidden rounded-lg bg-green-500/10 px-2
            ring-1 ring-green-500/20
          "
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.85 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-sm font-bold text-green-400"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* TEXTE */}
        <AnimatePresence mode="wait">
          <motion.span
            key={count > 1 ? 'multiple' : 'single'}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium tracking-wide text-gray-400"
          >
            {count > 1
              ? t('projects.counter.multiple')
              : t('projects.counter.single')}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* LIGNE */}
      <div className="ml-4 h-px flex-1 bg-gray-800" />
    </motion.div>
  );
};

export default ProjectCounter;
