import React, { useState } from 'react';

export interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);

    onClick?.();

    // Retour à l'état normal après l'animation
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

  // =====================================================
  // STYLE DE BASE
  // =====================================================

  const base = `
    inline-flex
    items-center
    justify-center
    rounded-lg
    px-6
    py-3
    font-semibold
    shadow-md
    transition-all
    duration-300
  `;

  // =====================================================
  // ÉTAT ACTIF
  // =====================================================

  const activeStyle = `
    !bg-green-500
    !border-green-500
    !text-white
    shadow-[0_0_20px_rgba(34,197,94,0.35)]
  `;

  // =====================================================
  // VARIANTES
  // =====================================================

  const variants: Record<string, string> = {
    primary: `
      border
      border-[#f3f009]
      bg-[#f3f009]
      text-black

      hover:bg-transparent
      hover:text-[#f3f009]
      hover:border-[#f3f009]
      hover:shadow-[0_0_20px_rgba(243,240,9,0.25)]
    `,

    secondary: `
      border
      border-[#f3f009]
      bg-transparent
      text-[#f3f009]

      hover:bg-[#f3f009]
      hover:text-black
      hover:shadow-[0_0_20px_rgba(243,240,9,0.25)]
    `,
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`
        ${base}
        ${variants[variant] ?? variants.primary}
        ${isActive ? activeStyle : ''}
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
