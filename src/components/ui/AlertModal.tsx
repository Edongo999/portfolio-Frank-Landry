import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone } from "lucide-react"; //  Icône téléphone premium

type Props = {
  show: boolean;
};

const AlertModal: React.FC<Props> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="alert-title"
          aria-describedby="alert-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Fond semi-transparent */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Contenu du modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-xs sm:max-w-md text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icône premium */}
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{
                  opacity: [1, 0.2, 1],
                  x: [0, -4, 4, -4, 4, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
              </motion.div>
            </div>

            <motion.h2
              id="alert-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-red-600 mb-2"
            >
              Portfolio verrouillé
            </motion.h2>

            <motion.p
              id="alert-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 mb-4"
            >
              Ce portfolio est temporairement bloqué.  
              Veuillez contacter l’entreprise <strong>E-Technology</strong> pour finaliser le paiement et obtenir l’accès complet.
            </motion.p>

            {/* Bouton WhatsApp avec icône téléphone */}
            <motion.a
              href="https://wa.me/237676471601" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Phone className="w-5 h-5" /> {/* Icône téléphone */}
              Contacter E-Technology
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
