// src/components/ModalPortal.tsx
import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const ANIM_DURATION = 260;

export default function ModalPortal({
  children,
  onClose,
  onKeyDown,
}: {
  children: React.ReactNode;
  onClose: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
}) {
  const isClient = typeof document !== "undefined";
  const contentRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const visibleTimeout = useRef<number | null>(null);

  const focusFirst = useCallback(() => {
    const root = contentRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    } else {
      closeBtnRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    visibleTimeout.current = window.setTimeout(() => {
      focusFirst();
    }, ANIM_DURATION);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (onKeyDown) onKeyDown(e);
    };

    document.addEventListener("keydown", handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (visibleTimeout.current) {
        clearTimeout(visibleTimeout.current);
        visibleTimeout.current = null;
      }
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onKeyDown, focusFirst]);

  if (!isClient) return null;
  const modalRoot = document.body;

  const handleKeyDownInside = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !contentRef.current) return;
    const focusable = Array.from(
      contentRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
    >
      {/* Backdrop noir semi-transparent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/85 transition-opacity duration-[260ms]"
      />

      {/* Contenu sans fond gris */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownInside}
        className="relative z-[1210] w-full max-w-[1100px] mx-4 transform opacity-100 transition duration-[260ms]"
      >
        {/* Bouton fermer */}
        <button
          ref={closeBtnRef}
          onClick={() => onClose()}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-[1220] bg-black/60 border border-white/10 text-white px-3 py-2 rounded-lg cursor-pointer backdrop-blur-sm hover:bg-black/80 transition"
        >
          ✕
        </button>

        {children}
      </div>
    </div>,
    modalRoot
  );
}
