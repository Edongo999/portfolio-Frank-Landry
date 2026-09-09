import React from 'react';
import { Download, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/Modal';

interface CVRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMessage: () => void;
}

const CVRequestModal: React.FC<CVRequestModalProps> = ({
  isOpen,
  onClose,
  onMessage,
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={isOpen} onClose={onClose} title={t('cvModal.title')}>
      <div className="w-full p-5 sm:p-7">
        {/* Icône */}
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[#f3f009]/15
            text-[#8f8b00]
            ring-1
            ring-[#f3f009]/30
            sm:h-12
            sm:w-12
          "
        >
          <Download size={20} />
        </div>

        {/* Texte */}
        <div className="mt-4">
          <h3
            className="
              text-lg
              font-bold
              leading-snug
              text-gray-900
              sm:text-2xl
            "
          >
            {t('cvModal.heading')}
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {t('cvModal.intro')}{' '}
            <span className="font-semibold text-gray-900">
              {t('cvModal.name')}
            </span>
            .
          </p>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {t('cvModal.instructions')}
          </p>
        </div>

        {/* Actions */}
        <div
          className="
            mt-6
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >
          <button
            type="button"
            onClick={onMessage}
            className="
              inline-flex
              min-h-12
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-green-600
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-green-500
            "
          >
            <MessageCircle size={17} />
            {t('cvModal.btnMessage')}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              min-h-12
              rounded-xl
              border
              border-gray-200
              px-5
              py-3
              text-sm
              font-medium
              text-gray-600
              transition-all
              duration-300
              hover:bg-gray-100
              hover:text-gray-900
              sm:min-w-[110px]
            "
          >
            {t('cvModal.btnCancel')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CVRequestModal;
