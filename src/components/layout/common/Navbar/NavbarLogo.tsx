import { motion } from 'framer-motion';

type NavbarLogoProps = {
  lightSection: boolean;
  scrolled: boolean;
};

export default function NavbarLogo({
  lightSection,
  scrolled,
}: NavbarLogoProps) {
  const textColor = lightSection && scrolled ? 'text-slate-900' : 'text-white';

  return (
    <div
      className={`
        relative
        flex items-center
        text-xl sm:text-2xl md:text-3xl
        font-bold
        transition-colors
        duration-500
        ${textColor}
      `}
    >
      <motion.div
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 0.8, scale: 1.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="
          absolute
          -inset-3
          rounded-full
          bg-gradient-to-r
          from-purple-500
          to-pink-500
          blur-xl
        "
      />

      {/* Logo principal + point */}
      <span className="relative z-10 flex items-center">
        LandryDEV
        <span className="ml-1 text-[#f3f009] hover:text-yellow-400 transition-colors duration-300">
          .
        </span>
      </span>
    </div>
  );
}
