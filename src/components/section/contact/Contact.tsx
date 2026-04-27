import React, { useRef, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import emailjs from "@emailjs/browser";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [showConfetti, setShowConfetti] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    if (form.current) {
      emailjs
        .sendForm(
          "service_c8xlkze",
          "template_nwa3j7u",
          form.current,
          "xFXuA8DNI-Hv9vgtF"
        )
        .then(
          () => {
            setLoading(false);
            setStatus("success");
            setShowConfetti(true);
            form.current?.reset();

            setTimeout(() => setShowConfetti(false), 5000);
            setTimeout(() => setStatus("idle"), 4000); // ✅ retour automatique à "Envoyer"
          },
          () => {
            setLoading(false);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000); // ✅ retour automatique à "Envoyer"
          }
        );
    }
  };

  // 🔹 Variants cascade
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gray-800 text-white px-6 sm:px-8 pt-12 pb-16 relative"
    >
      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={600} gravity={0.2} wind={0.01} />
      )}
      <div className="w-full max-w-6xl mx-auto space-y-12">
        <div className="flex justify-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" as const }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-400"
          >
            {t("contact.title")}
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* 🔹 Infos de contact */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-900 rounded-lg shadow-lg p-8 space-y-6"
          >
            <p className="text-gray-300 text-xl leading-relaxed font-medium">
              {t("contact.intro")}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaEnvelope className="w-7 h-7 text-indigo-400" />
                <a
                  href={`mailto:${t("contact.email")}`}
                  className="text-gray-200 text-lg hover:text-indigo-300 transition-colors"
                >
                  {t("contact.email")}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <FaLinkedin className="w-7 h-7 text-blue-500" />
                <a
                href="https://www.linkedin.com/in/ton-identifiant-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 text-lg hover:text-blue-400 transition-colors"
              >
                {t("contact.linkedin")}
              </a>
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="w-7 h-7 text-indigo-400" />
              <a
                href="https://wa.me/237652491246"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 text-lg hover:text-green-400 transition-colors"
              >
                {t("contact.phone")}
              </a>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="w-7 h-7 text-indigo-400" />
              <a
                href="https://wa.me/237652491246"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 text-lg hover:text-green-400 transition-colors"
              >
                {t("contact.phone1")}
              </a>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="w-7 h-7 text-indigo-400" />
                <span className="text-gray-200 text-lg">{t("contact.location")}</span>
              </div>
            </div>
          </motion.div>

          {/* 🔹 Formulaire */}
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            variants={itemVariants}
            className="bg-gray-900 rounded-lg shadow-lg p-8 space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder={t("contact.form.name")}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact.form.email")}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              name="phone"
              placeholder={t("contact.form.phone")}
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              name="service"
              placeholder={t("contact.form.service")}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white"
            />
            <textarea
              name="details"
              rows={5}
              placeholder={t("contact.form.details")}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white"
            ></textarea>

            {/* 🔹 Bouton avec rendu conditionnel */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md font-semibold flex items-center justify-center gap-2 
                transition-all duration-500 ease-in-out
                ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"} 
                ${status === "success" ? "bg-green-500" : ""} 
                ${status === "error" ? "bg-red-500" : ""}`}
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}

              {status === "idle" && <span>{t("contact.form.send")}</span>}

              {status === "success" && (
                <span className="flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                  {t("contact.form.success")}
                </span>
              )}

              {status === "error" && (
                <span className="flex items-center gap-2">
                  <XCircleIcon className="w-6 h-6 text-white" />
                  {t("contact.form.error")}
                </span>
              )}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
