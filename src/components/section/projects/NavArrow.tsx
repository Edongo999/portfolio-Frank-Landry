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
      className={`absolute top-1/2 -translate-y-1/2 
        ${left ? "left-3" : "right-3"} 
        flex items-center justify-center 
        rounded-full cursor-pointer z-40
        px-[14px] py-[12px] text-white text-[22px] leading-none
        shadow-[0_8px_24px_rgba(0,0,0,0.6),0_2px_6px_rgba(0,0,0,0.5)]
        backdrop-blur-md
        bg-gradient-to-b from-white/10 to-white/5
        transition duration-200 ease-in-out
        hover:scale-105 hover:bg-orange-500 hover:text-white
        active:bg-orange-600 active:text-white active:animate-pulse
        focus:ring-2 focus:ring-orange-400`}
    >
      {left ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="stroke-current"
        >
          <path
            d="M15 18l-6-6 6-6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="stroke-current"
        >
          <path
            d="M9 6l6 6-6 6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
