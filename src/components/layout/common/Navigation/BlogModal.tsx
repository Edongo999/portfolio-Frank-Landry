import { motion } from 'framer-motion';
import Modal from '@/components/Modal';
import { ArrowRightCircle, BookOpen } from 'lucide-react';
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
            mx-auto
            flex
            w-full
            max-w-md
            flex-col
            items-center
            justify-center
            gap-5
            px-4
            text-center
          "
        >
          {/* Icône du blog */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.1,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-600
              to-purple-600
              text-white
              shadow-lg
              shadow-indigo-500/20
            "
          >
            <BookOpen size={30} strokeWidth={1.8} />
          </motion.div>

          {/* Petit label */}
          <motion.span
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.35,
            }}
            className="
              text-center
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-indigo-600
            "
          >
            Blog
          </motion.span>

          {/* Message */}
          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
            className="
              mx-auto
              w-full
              max-w-sm
              text-center
              text-base
              font-medium
              leading-7
              text-gray-700
            "
          >
            {t('blogModal.message')}
          </motion.p>

          {/* Séparateur */}
          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              delay: 0.25,
              duration: 0.45,
            }}
            className="
              mx-auto
              h-px
              w-full
              max-w-xs
              origin-center
              bg-gradient-to-r
              from-transparent
              via-gray-200
              to-transparent
            "
          />

          {/* Bouton */}
          <motion.button
            type="button"
            onClick={onContinue}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              group
              mx-auto
              flex
              items-center
              justify-center
              gap-2.5
              rounded-xl
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-indigo-500/20
              transition-all
              duration-300
              hover:from-indigo-700
              hover:to-purple-700
              hover:shadow-xl
              hover:shadow-indigo-500/25
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500/40
              focus:ring-offset-2
            "
          >
            {t('blogModal.continue')}

            <ArrowRightCircle
              size={20}
              strokeWidth={2.4}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </motion.button>

          {/* Petit texte secondaire */}
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.35,
              duration: 0.4,
            }}
            className="
              mx-auto
              -mt-1
              text-center
              text-xs
              text-gray-400
            "
          >
            {t('blogModal.subtitle')}
          </motion.p>
        </motion.div>
      </Modal>
    </motion.div>
  );
}
