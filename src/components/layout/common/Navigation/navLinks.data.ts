// src/components/Navigation/navLinks.data.ts

export type NavLink = {
  key: string;
  label: string;
  path: string;
};

export const navLinks: NavLink[] = [
  {
    key: 'hero',
    label: 'nav.hero',
    path: '#hero',
  },
  {
    key: 'about',
    label: 'nav.about',
    path: '#about',
  },
  {
    key: 'skills',
    label: 'nav.skills',
    path: '#skills',
  },
  {
    key: 'projects',
    label: 'nav.projects',
    path: '#projects',
  },
  {
    key: 'experience',
    label: 'nav.experience',
    path: '#experience',
  },
  {
    key: 'contact',
    label: 'nav.contact',
    path: '#contact',
  },
  {
    key: 'bloc',
    label: 'nav.bloc',
    path: '/blog',
  },
];
