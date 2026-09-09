import { X } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* ✅ Overlay qui recouvre tout l’écran */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ✅ Contenu centré */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto p-8 transform transition-all duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition transform hover:rotate-90"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* ✅ Contenu spécifique */}
        {children}
      </div>
    </div>,
    document.body // ✅ rendu directement dans <body>
  );
};

export default Modal;
