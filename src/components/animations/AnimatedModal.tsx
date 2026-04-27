import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  children: React.ReactNode;
};

export default function AnimatedModal({ isOpen, onClose, onKeyDown, children }: Props) {
  const [visible, setVisible] = useState(false);
  const isClient = typeof document !== "undefined";

  // Effet uniquement pour l'animation d'entrée (ne met pas setVisible(false) ici)
  useEffect(() => {
    if (!isClient) return;
    if (!isOpen) return;

    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, [isOpen, isClient]);

  // Gestion clavier et fermeture (Escape déclenche la fermeture animée)
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Démarrer l'animation de sortie puis appeler onClose après la durée
        setVisible(false);
        setTimeout(onClose, 220);
      }
      if (onKeyDown) onKeyDown(e);
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose, onKeyDown]);

  if (!isClient || !isOpen) return null;
  const modalRoot = document.body;

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={() => {
        setVisible(false);
        setTimeout(onClose, 220);
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className={`modal-backdrop__bg ${visible ? "" : "hide"}`} />
      <div className={`modal-content ${visible ? "" : "hide"}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
