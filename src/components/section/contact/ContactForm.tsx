import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { rightVariants, mobileItemVariants } from './contactAnimations';

import SuccessConfetti from './SuccessConfetti';

interface ContactFormProps {
  form: React.RefObject<HTMLFormElement | null>;
  sendEmail: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  status: 'idle' | 'success' | 'error';
  isMobile: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  form,
  sendEmail,
  loading,
  status,
  isMobile,
}) => {
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
    <motion.form
      ref={form}
      onSubmit={sendEmail}
      {...(isMobile
        ? mobileAnimation(6)
        : {
            variants: rightVariants,
            initial: 'hidden',
            whileInView: 'visible',
            exit: 'exit',
            viewport: {
              once: false,
              amount: 0.2,
            },
          })}
      className="
        space-y-8
        rounded-lg
        bg-gray-800
        p-8
        shadow-lg
        -translate-y-10
        max-md:-translate-y-75
        max-md:-mb-65
      "
    >
      {/* NOM */}
      <motion.input
        {...(isMobile ? mobileAnimation(7) : {})}
        type="text"
        name="name"
        placeholder={t('contact.form.name')}
        required
        className="
          w-full
          rounded-md
          bg-gray-900
          px-4
          py-3
          text-white
          outline-none
          transition-all
          focus:ring-2
          focus:ring-[#f3f009]/50
        "
      />

      {/* EMAIL */}
      <motion.input
        {...(isMobile ? mobileAnimation(8) : {})}
        type="email"
        name="email"
        placeholder={t('contact.form.email')}
        required
        className="
          w-full
          rounded-md
          bg-gray-900
          px-4
          py-3
          text-white
          outline-none
          transition-all
          focus:ring-2
          focus:ring-[#f3f009]/50
        "
      />

      {/* TÉLÉPHONE */}
      <motion.input
        {...(isMobile ? mobileAnimation(9) : {})}
        type="text"
        name="phone"
        placeholder={t('contact.form.phone')}
        className="
          w-full
          rounded-md
          bg-gray-900
          px-4
          py-3
          text-white
          outline-none
          transition-all
          focus:ring-2
          focus:ring-[#f3f009]/50
        "
      />

      {/* SERVICE */}
      <motion.input
        {...(isMobile ? mobileAnimation(10) : {})}
        type="text"
        name="service"
        placeholder={t('contact.form.service')}
        required
        className="
          w-full
          rounded-md
          bg-gray-900
          px-4
          py-3
          text-white
          outline-none
          transition-all
          focus:ring-2
          focus:ring-[#f3f009]/50
        "
      />

      {/* DÉTAILS */}
      <motion.textarea
        {...(isMobile ? mobileAnimation(11) : {})}
        name="details"
        rows={5}
        placeholder={t('contact.form.details')}
        required
        className="
          w-full
          resize-none
          rounded-md
          bg-gray-900
          px-4
          py-3
          text-white
          outline-none
          transition-all
          focus:ring-2
          focus:ring-[#f3f009]/50
        "
      />

      {/* BOUTON D'ENVOI */}
      <div className="relative w-full">
        {status === 'success' && <SuccessConfetti />}

        <motion.button
          {...(isMobile ? mobileAnimation(12) : {})}
          type="submit"
          disabled={loading}
          whileTap={!loading ? { scale: 0.98 } : undefined}
          className={`
            relative
            z-10
            flex
            w-full
            items-center
            justify-center
            gap-2
            overflow-hidden
            rounded-md
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            ${
              loading
                ? 'cursor-not-allowed bg-indigo-400'
                : status === 'success'
                  ? 'bg-green-500'
                  : status === 'error'
                    ? 'bg-red-500'
                    : 'bg-indigo-500 hover:bg-indigo-600'
            }
          `}
        >
          {/* CHARGEMENT */}
          {loading && (
            <motion.span
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-white
                border-t-transparent
              "
            />
          )}

          {/* ÉTAT NORMAL */}
          {!loading && status === 'idle' && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {t('contact.form.send')}
            </motion.span>
          )}

          {/* SUCCÈS */}
          {!loading && status === 'success' && (
            <motion.span
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <motion.span
                initial={{
                  scale: 0,
                  rotate: -45,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CheckCircleIcon className="h-6 w-6" />
              </motion.span>

              <span>{t('contact.form.success')}</span>
            </motion.span>
          )}

          {/* ERREUR */}
          {!loading && status === 'error' && (
            <motion.span
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                flex
                items-center
                justify-center                                                                                                                                               
              "
            >
              <XCircleIcon className="h-6 w-6" />

              <span>{t('contact.form.error')}</span>
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
