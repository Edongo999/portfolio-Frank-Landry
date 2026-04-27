import React from "react";

export default function NavArrow({
  side = "left",
  onClick,
  ariaLabel,
}: {
  side?: "left" | "right";
  onClick: () => void;
  ariaLabel?: string;
}) {
  const left = side === "left";
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        position: "absolute",
        [left ? "left" : "right"]: 12,
        top: "50%",
        transform: "translateY(-50%)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        color: "#fff",
        padding: "12px 14px",
        borderRadius: 9999,
        border: "none",
        cursor: "pointer",
        zIndex: 40,
        boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.5)",
        transition: "transform 160ms cubic-bezier(.2,.8,.2,1), box-shadow 160ms cubic-bezier(.2,.8,.2,1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(6px)",
        fontSize: 22,
        lineHeight: 1,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
    >
      {left ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
