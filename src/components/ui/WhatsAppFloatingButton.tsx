import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloatingButton = () => {
  return (
    <motion.a
      href="https://wa.me/237652491246" // 👉 remplace par le numéro WhatsApp du propriétaire
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 
                 w-14 h-14 flex items-center justify-center 
                 rounded-full bg-gradient-to-r from-green-500 via-green-400 to-green-600 
                 text-white shadow-lg z-50"
    >
      {/* Halo pulsant */}
      <motion.div
        className="absolute w-14 h-14 rounded-full bg-green-500/40 blur-md"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <FaWhatsapp className="text-3xl relative z-10" />
    </motion.a>
  );
};

export default WhatsAppFloatingButton;
