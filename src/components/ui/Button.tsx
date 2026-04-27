

import React from "react";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ text, variant = "primary" }) => {
  // 🔹 largeur responsive ajoutée
  const baseStyle = "w-full md:w-auto px-6 py-2 rounded-lg font-semibold transition";
  
  const styles =
    variant === "primary"
      ? "bg-purple-900 text-white hover:bg-purple-600"
      : "bg-transparent border border-purple-900 text-purple-400 hover:bg-purple-900 hover:text-white";

  return <button className={`${baseStyle} ${styles}`}>{text}</button>;
};

export default Button;
