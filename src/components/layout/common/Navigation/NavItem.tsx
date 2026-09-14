// src/components/Navigation/NavItem.tsx

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import SmartLink from '@/components/layout/common/Navigation/SmartLink';
import { NavLink } from '@/components/layout/common/Navigation/navLinks.data';
import { itemVariants } from '@/components/animations/menuAnimations';

type NavItemProps = {
  link: NavLink;
  active: boolean;
  setActiveSection: (key: string) => void;
  onClick?: () => void;
  scrolled?: boolean;
};

export default function NavItem({
  link,
  active,
  setActiveSection,
  onClick,
  scrolled = false,
}: NavItemProps) {
  const { t } = useTranslation();

  return (
    <motion.li variants={itemVariants} className="relative">
      <SmartLink
        path={link.path}
        onClick={onClick}
        setActiveSection={setActiveSection}
      >
        <span
          className={`
            relative
            px-2
            py-1
            transition-colors
            duration-500

            ${
              active
                ? 'text-[#f3f009]'
                : scrolled
                  ? 'text-white/95 hover:text-white'
                  : 'text-gray-300 hover:text-white'
            }
          `}
        >
          {t(link.label)}

          <span
            className={`
              absolute
              left-0
              -bottom-1
              h-[2px]
              transition-all
              duration-300

              ${active ? 'w-full bg-[#f3f009]' : 'w-0 bg-white'}
            `}
          />
        </span>
      </SmartLink>
    </motion.li>
  );
}
