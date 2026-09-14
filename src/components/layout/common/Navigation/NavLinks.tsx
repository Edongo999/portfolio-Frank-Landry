import NavItem from '@/components/layout/common/Navigation/NavItem';
import { navLinks } from '@/components/layout/common/Navigation/navLinks.data';
import { useActiveSection } from '@/components/layout/common/Navigation/useActiveSection';

type NavLinksProps = {
  vertical?: boolean;
  onClick?: () => void;
  scrolled?: boolean;
};

export default function NavLinks({
  vertical = false,
  onClick,
  scrolled = false,
}: NavLinksProps) {
  const { activeSection, setActiveSection } = useActiveSection();

  return (
    <ul
      className={`
        flex
        items-center
        justify-center
        ${vertical ? 'flex-col gap-6' : 'gap-7'}
        text-sm
        md:text-base
        font-medium
      `}
    >
      {navLinks.map((link) => (
        <NavItem
          key={link.key}
          link={link}
          active={activeSection === link.key}
          setActiveSection={setActiveSection}
          onClick={onClick}
          scrolled={scrolled}
        />
      ))}
    </ul>
  );
}
