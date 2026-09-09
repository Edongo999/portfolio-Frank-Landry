import React from 'react';

import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

import {
  leftVariants,
  mobileItemVariants,
  mobileImageVariants,
  mobileLineVariants,
} from './contactAnimations';

interface ContactInfoProps {
  isMobile: boolean;
}

const ContactInfo = ({ isMobile }: ContactInfoProps) => {
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
            amount: 0.2,
          },
        }
      : {};

  return (
    <motion.div
      {...(!isMobile
        ? {
            variants: leftVariants,
            initial: 'hidden',
            whileInView: 'visible',
            exit: 'exit',

            viewport: {
              once: false,
              amount: 0.2,
            },
          }
        : {})}
      className="
        flex
        flex-col
        items-center
        gap-10
        md:mt-5
        -mt-22
      "
    >
      {/* IMAGE */}

      <motion.div
        {...(isMobile
          ? {
              variants: mobileImageVariants,
              initial: 'hidden',
              whileInView: 'visible',

              viewport: {
                once: true,
                amount: 0.2,
              },
            }
          : {
              variants: leftVariants,
              initial: 'hidden',
              whileInView: 'visible',
              exit: 'exit',

              viewport: {
                once: false,
                amount: 0.2,
              },
            })}
        className="
          relative
          flex
          items-center
          justify-center
        "
      >
        <img
          src="/images/contact2.png"
          alt={t('contact.imageAlt')}
          className="
            mx-auto
            h-[600px]
            w-full
            max-w-2xl
            -translate-y-10
            rounded-lg
            object-contain
            shadow-lg

            max-md:h-[800px]
            max-md:-translate-y-26
            max-md:w-[115%]
            max-md:max-w-none
          "
        />

        {/* TRAIT GAUCHE */}

        <motion.div
          {...(isMobile
            ? {
                variants: mobileLineVariants,
                custom: 0,
                initial: 'hidden',
                whileInView: 'visible',

                viewport: {
                  once: true,
                  amount: 0.2,
                },
              }
            : {
                variants: leftVariants,
                initial: 'hidden',
                whileInView: 'visible',
                exit: 'exit',

                viewport: {
                  once: false,
                  amount: 0.2,
                },
              })}
          className="
            absolute
            bottom-0
            left-1/4
            h-20
            w-0.5
            -translate-y-10
            max-md:-translate-y-68
            bg-orange-400
          "
        />

        {/* TRAIT DROIT */}

        <motion.div
          {...(isMobile
            ? {
                variants: mobileLineVariants,
                custom: 1,
                initial: 'hidden',
                whileInView: 'visible',

                viewport: {
                  once: true,
                  amount: 0.2,
                },
              }
            : {
                variants: leftVariants,
                initial: 'hidden',
                whileInView: 'visible',
                exit: 'exit',

                viewport: {
                  once: false,
                  amount: 0.2,
                },
              })}
          className="
            absolute
            bottom-0
            right-1/4
            h-20
            w-0.5
            -translate-y-10
            max-md:-translate-y-68
            bg-orange-400
          "
        />
      </motion.div>

      {/* INFORMATIONS */}

      <motion.div
        {...(isMobile
          ? mobileAnimation(6)
          : {
              variants: leftVariants,
              initial: 'hidden',
              whileInView: 'visible',
              exit: 'exit',

              viewport: {
                once: false,
                amount: 0.2,
              },
            })}
        className="
          w-full
          max-w-2xl
          -translate-y-25
          max-md:-translate-y-78
          space-y-4
          rounded-lg
          bg-white
          p-5
          shadow-lg
        "
      >
        {/* TELEPHONE 1 */}

        <motion.div
          {...(isMobile ? mobileAnimation(7) : {})}
          className="
            flex
            min-w-0
            items-center
            justify-start
            gap-3
          "
        >
          <FaPhoneAlt
            className="
              h-6
              w-6
              shrink-0
              text-orange-400
            "
          />

          <a
            href="https://wa.me/237652491246"
            target="_blank"
            rel="noopener noreferrer"
            className="
              min-w-0
              break-words
              text-base
              text-gray-900
              transition-colors
              hover:text-orange-600
            "
          >
            {t('contact.phone')}
          </a>
        </motion.div>

        {/* TELEPHONE 2 */}

        <motion.div
          {...(isMobile ? mobileAnimation(8) : {})}
          className="
            flex
            min-w-0
            items-center
            justify-start
            gap-3
          "
        >
          <FaPhoneAlt
            className="
              h-6
              w-6
              shrink-0
              text-orange-400
            "
          />

          <a
            href="https://wa.me/237689363034"
            target="_blank"
            rel="noopener noreferrer"
            className="
              min-w-0
              break-words
              text-base
              text-gray-900
              transition-colors
              hover:text-orange-600
            "
          >
            {t('contact.phone1')}
          </a>
        </motion.div>

        {/* EMAIL */}

        <motion.div
          {...(isMobile ? mobileAnimation(9) : {})}
          className="
            flex
            min-w-0
            items-center
            justify-start
            gap-3
          "
        >
          <FaEnvelope
            className="
              h-6
              w-6
              shrink-0
              text-orange-400
            "
          />

          <a
            href={`mailto:${t('contact.email')}`}
            className="
              min-w-0
              break-words
              text-base
              text-gray-900
              transition-colors
              hover:text-orange-600
            "
          >
            {t('contact.email')}
          </a>
        </motion.div>

        {/* LOCALISATION */}

        <motion.div
          {...(isMobile ? mobileAnimation(10) : {})}
          className="
            flex
            min-w-0
            items-center
            justify-start
            gap-3
          "
        >
          <FaMapMarkerAlt
            className="
              h-6
              w-6
              shrink-0
              text-orange-400
            "
          />

          <span
            className="
              min-w-0
              break-words
              text-base
              text-gray-900
            "
          >
            {t('contact.location')}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
