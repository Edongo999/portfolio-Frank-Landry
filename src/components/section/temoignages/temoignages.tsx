/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { temoignages } from '@/components/section/temoignages/temoignagesData';
import { lineVariants } from '../contact/contactAnimations';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: 'easeOut' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
  },
  exit: { opacity: 0, scale: 0.9, y: -30, transition: { duration: 0.4 } },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Temoignages: React.FC = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAutoPlay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % temoignages.length);
      }, 6000);
    }
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % temoignages.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + temoignages.length) % temoignages.length);

  return (
    <section className="py-12 bg-gray-800" id="temoignages">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* BADGE */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
            {t('temoignages.badge')}
          </span>
        </motion.div>

        {/* TITRE */}
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="
    mt-0
    mb-2
    text-center
    text-4xl
    font-bold
  "
        >
          {t('temoignages.title')}{' '}
          <span className="text-[#f3f009]">{t('temoignages.highlight')}</span>
        </motion.h2>

        {/* TRAIT */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.5 }}
          className="
    mx-auto
    h-1
    w-24
    rounded-full
    bg-gradient-to-r
    from-[#f3f009]
    to-yellow-300
  "
        />

        {/* DESCRIPTION */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-6 max-w-[95%] text-justify text-base leading-relaxed text-gray-100
                     hyphens-auto [overflow-wrap:break-word] md:text-center
                     sm:max-w-5xl sm:text-lg sm:leading-8
                     md:max-w-10xl md:text-xl md:leading-9"
        >
          {t('temoignages.description')}
        </motion.p>

        {/* CAROUSEL */}
        <div
          className="relative flex items-center justify-center"
          onTouchStart={() => {
            stopAutoPlay();
            setShowArrows(true);
            setShowHint(false);
          }}
          onTouchEnd={() => {
            setTimeout(() => setShowArrows(false), 3000);
            startAutoPlay();
          }}
          onMouseEnter={() => {
            stopAutoPlay();
            setShowArrows(true);
          }}
          onMouseLeave={() => {
            setTimeout(() => setShowArrows(false), 3000);
            startAutoPlay();
          }}
        >
          {/* Flèche gauche */}
          <AnimatePresence>
            {(showArrows || window.innerWidth >= 768) && (
              <motion.button
                onClick={prev}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute left-2 sm:left-[-70px] z-10 p-3 rounded-full text-white shadow-lg 
                           bg-green-500 hover:bg-green-600 
                           focus:ring-2 focus:ring-green-400 
                           transition shadow-[0_0_15px_#22c55e]"
              >
                <ArrowLeft size={28} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Carte témoignage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={temoignages[index].id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gray-900 backdrop-blur-md shadow-2xl rounded-xl p-8 flex flex-col items-center border border-gray-700 max-w-lg"
            >
              <motion.div variants={cardItemVariants} className="relative mb-6">
                <div className="absolute inset-0 w-42 h-42 rounded-full bg-gradient-to-r from-green-500 via-green-400 to-green-600 blur-xl animate-pulse"></div>
                <div className="relative w-42 h-42 rounded-full border-4 border-green-500 overflow-hidden shadow-lg">
                  <img
                    src={temoignages[index].image}
                    alt={t(`temoignages.items.${temoignages[index].id}.nom`)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.p
                variants={cardItemVariants}
                className="italic text-gray-200 mb-6 text-lg leading-relaxed"
              >
                “{t(`temoignages.items.${temoignages[index].id}.texte`)}”
              </motion.p>

              <motion.h3
                variants={cardItemVariants}
                className="font-semibold text-xl text-white"
              >
                {t(`temoignages.items.${temoignages[index].id}.nom`)}
              </motion.h3>

              <motion.span
                variants={cardItemVariants}
                className="text-sm text-gray-400"
              >
                {t(`temoignages.items.${temoignages[index].id}.type`)}
              </motion.span>
            </motion.div>
          </AnimatePresence>

          {/* Flèche droite */}
          <AnimatePresence>
            {(showArrows || window.innerWidth >= 768) && (
              <motion.button
                onClick={next}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute right-2 sm:right-[-70px] z-10 p-3 rounded-full text-white shadow-lg 
                           bg-green-500 hover:bg-green-600 
                           focus:ring-2 focus:ring-green-400 
                           transition shadow-[0_0_15px_#22c55e]"
              >
                <ArrowRight size={28} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Indicateurs + Hint */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center mt-6 space-y-2"
        >
          <div className="flex justify-center space-x-3">
            {temoignages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === index
                    ? 'bg-green-500 scale-110 shadow-[0_0_10px_#22c55e]'
                    : 'bg-gray-500 hover:bg-green-400'
                }`}
              />
            ))}
          </div>

          {showHint && window.innerWidth < 768 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-sm text-gray-400 italic mt-2"
            >
              {t('temoignages.hint')}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Temoignages;
