import { Variants } from "framer-motion";

// Animation réutilisable pour la barre orange
export const orangeBarVariants: Variants = {
  hidden: { width: 0 },
  visible: { 
    width: "100%", 
    transition: { duration: 2, ease: ["easeInOut"], delay: 0.3 } 
  },
};