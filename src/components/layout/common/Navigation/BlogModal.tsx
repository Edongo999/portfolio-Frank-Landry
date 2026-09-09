import { motion } from 'framer-motion';
import Modal from '@/components/Modal';
import { ArrowRightCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type BlogModalProps = {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
};

export default function BlogModal({
  open,
  onClose,
  onContinue,
}: BlogModalProps) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
    >
      <Modal open={true} onClose={onClose} title="">
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -8,
            scale: 0.98,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            flex-col
            items-center
            gap-6
          "
        >
          {/* Message */}
          <p
            className="
              text-center
              text-lg
              font-medium
              text-gray-700
            "
          >
            {t('blogModal.message')}
          </p>

          {/* Bouton */}
          <motion.button
            type="button"
            onClick={onContinue}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              px-5
              py-2.5
              text-white
              shadow-lg
              transition-colors
              duration-300
              hover:from-indigo-700
              hover:to-purple-700
            "
          >
            {t('blogModal.continue')}

            <ArrowRightCircle size={20} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      </Modal>
    </motion.div>
  );
}
