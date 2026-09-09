import React, { useRef, useState } from 'react';

import Confetti from 'react-confetti';

import { motion } from 'framer-motion';

import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

import { containerVariants } from './contactAnimations';

import useIsMobile from './useIsMobile';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const contactRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [showConfetti, setShowConfetti] = useState(false);

  const isMobile = useIsMobile();

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setStatus('idle');

    if (!form.current) return;

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form.current),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setLoading(false);
        setStatus('success');
        setShowConfetti(true);

        form.current.reset();

        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);

        setTimeout(() => {
          setStatus('idle');
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Formspree error:', error);

      setLoading(false);
      setStatus('error');

      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }
  };

  return (
    <section
      id="contact"
      className="
        relative
        bg-gray-900
        px-6
        pt-0
        pb-0
        text-white
        sm:px-8
        sm:pt-10
        sm:pb-0
      "
    >
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={600}
          gravity={0.2}
          wind={0.01}
        />
      )}

      <div
        ref={contactRef}
        className="
          mx-auto
          w-full
          max-w-6xl
        "
      >
        {/* =================================================
            DESKTOP
        ================================================= */}

        {!isMobile && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{
              once: false,
              amount: 0.15,
            }}
          >
            <ContactHeader isMobile={false} />

            <motion.div
              className="
                grid
                grid-cols-1
                items-center
                gap-12
                md:grid-cols-2
              "
            >
              <ContactInfo isMobile={false} />

              <ContactForm
                form={form}
                sendEmail={sendEmail}
                loading={loading}
                status={status}
                isMobile={false}
              />
            </motion.div>
          </motion.div>
        )}

        {/* =================================================
            MOBILE
        ================================================= */}

        {isMobile && (
          <div>
            <ContactHeader isMobile />

            <div
              className="
                grid
                grid-cols-1
                items-center
                gap-12
              "
            >
              <ContactInfo isMobile />

              <ContactForm
                form={form}
                sendEmail={sendEmail}
                loading={loading}
                status={status}
                isMobile
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
