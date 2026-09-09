import React from 'react';

import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { rightVariants, mobileItemVariants } from './contactAnimations';

interface ContactFormProps {
  form: React.RefObject<HTMLFormElement | null>;
  sendEmail: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  status: 'idle' | 'success' | 'error';
  isMobile: boolean;
}

const ContactForm = ({
  form,
  sendEmail,
  loading,
  status,
  isMobile,
}: ContactFormProps) => {
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

      {/* TELEPHONE */}

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

      {/* DETAILS */}

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

      {/* BOUTON */}

      <motion.button
        {...(isMobile ? mobileAnimation(12) : {})}
        type="submit"
        disabled={loading}
        className={`
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-md
          py-3
          font-semibold
          transition-all
          duration-500
          ease-in-out

          ${
            loading
              ? 'cursor-not-allowed bg-indigo-400'
              : 'bg-indigo-500 hover:bg-indigo-600'
          }

          ${status === 'success' ? 'bg-green-500' : ''}

          ${status === 'error' ? 'bg-red-500' : ''}
        `}
      >
        {loading && (
          <span
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

        {status === 'idle' && <span>{t('contact.form.send')}</span>}

        {status === 'success' && (
          <span className="flex items-center gap-2">
            <CheckCircleIcon className="h-6 w-6 text-white" />

            {t('contact.form.success')}
          </span>
        )}

        {status === 'error' && (
          <span className="flex items-center gap-2">
            <XCircleIcon className="h-6 w-6 text-white" />

            {t('contact.form.error')}
          </span>
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
