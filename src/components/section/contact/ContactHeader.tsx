import React from 'react';

import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

import {
  mobileItemVariants,
  badgeVariants,
  lineVariants,
  descriptionVariants,
} from './contactAnimations';

interface ContactHeaderProps {
  isMobile: boolean;
}

const ContactHeader = ({ isMobile }: ContactHeaderProps) => {
  const { t } = useTranslation();

  const mobileAnimation = (index: number) =>
    isMobile
      ? {
          variants: mobileItemVariants,
          custom: index,
          initial: 'hidden' as const,
          whileInView: 'visible' as const,

          viewport: {
            once: true,
            amount: 0.25,
          },
        }
      : {};

  return (
    <div className="text-center">
      {/* BADGE */}

      <motion.div
        {...(isMobile
          ? mobileAnimation(0)
          : {
              variants: badgeVariants,
              initial: 'hidden',
              whileInView: 'visible',
              exit: 'exit',

              viewport: {
                once: false,
                amount: 0.3,
              },
            })}
        className="mb-5"
      >
        <span
          className="
            inline-flex
            items-center
            gap-2
            md:mt-0
            mt-10
            rounded-full
            border
            border-[#f3f009]/20
            bg-[#f3f009]/10
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#f3f009]
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#f3f009]
              shadow-[0_0_8px_rgba(243,240,9,0.7)]
            "
          />

          {t('contact.badge')}
        </span>
      </motion.div>

      {/* TITRE */}

      <motion.h2
        {...(isMobile
          ? mobileAnimation(1)
          : {
              initial: {
                opacity: 0,
                y: 20,
              },

              whileInView: {
                opacity: 1,
                y: 0,
              },

              exit: {
                opacity: 0,
                y: 20,
              },

              viewport: {
                once: false,
                amount: 0.3,
              },

              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            })}
        className="
          mt-0
          mb-2
          text-center
          text-4xl
          font-bold
        "
      >
        {t('contact.title')}{' '}
        <span className="text-[#f3f009]">{t('contact.me')}</span>
      </motion.h2>

      {/* TRAIT */}

      <motion.div
        {...(isMobile
          ? mobileAnimation(2)
          : {
              variants: lineVariants,
              initial: 'hidden',
              whileInView: 'visible',
              exit: 'exit',

              viewport: {
                once: false,
                amount: 0.5,
              },
            })}
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
        {...(isMobile
          ? mobileAnimation(3)
          : {
              variants: descriptionVariants,
              initial: 'hidden',
              whileInView: 'visible',
              exit: 'exit',

              viewport: {
                once: false,
                amount: 0.3,
              },
            })}
        className="
          mx-auto
          mt-4
          max-w-[95%]
          text-justify
          text-base
          leading-relaxed
          text-gray-100
          hyphens-auto
          [overflow-wrap:break-word]

          sm:max-w-5xl
          sm:text-lg
          sm:leading-8

          md:max-w-10xl
          md:text-xl
          md:leading-9
        "
      >
        {t('contact.description')}
      </motion.p>
    </div>
  );
};

export default ContactHeader;
