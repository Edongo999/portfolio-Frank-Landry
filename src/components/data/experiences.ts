import {
  FaGraduationCap,
  FaBriefcase,
  FaRocket,
  FaChalkboardTeacher,
  FaLaptopCode,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

export type Experience = {
  type: 'experience' | 'projet' | 'stage' | 'formation';
  titleKey: string;
  placeKey: string;
  dateKey: string;
  descKey: string;
  icon: IconType;
  tech: string[];
};

export const experiences: Experience[] = [
  {
    type: 'experience',
    titleKey: 'experience.items.trainer.title',
    placeKey: 'experience.items.trainer.place',
    dateKey: 'experience.items.trainer.date',
    descKey: 'experience.items.trainer.description',
    icon: FaChalkboardTeacher,
    tech: ['Pack Office', 'Photoshop', 'Maintenance PC'],
  },
  {
    type: 'formation', // ou 'projet' si ton composant ne gère pas 'experience'
    titleKey: 'experience.items.studio111.title',
    placeKey: 'experience.items.studio111.place',
    dateKey: 'experience.items.studio111.date',
    descKey: 'experience.items.studio111.description',
    icon: FaLaptopCode,
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
  },
  {
    type: 'projet', // ou 'experience' si tu veux le mettre comme étape clé
    titleKey: 'experience.items.portfolioRefonte.title',
    placeKey: 'experience.items.portfolioRefonte.place',
    dateKey: 'experience.items.portfolioRefonte.date',
    descKey: 'experience.items.portfolioRefonte.description',
    icon: FaLaptopCode,
    tech: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Laravel',
      'Supabase',
      'Vercel',
    ],
  },

  {
    type: 'projet',
    titleKey: 'experience.items.etechnology.title',
    placeKey: 'experience.items.etechnology.place',
    dateKey: 'experience.items.etechnology.date',
    descKey: 'experience.items.etechnology.description',
    icon: FaRocket,
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Vercel'],
  },

  {
    type: 'projet',
    titleKey: 'experience.items.companyWebsite.title',
    placeKey: 'experience.items.companyWebsite.place',
    dateKey: 'experience.items.companyWebsite.date',
    descKey: 'experience.items.companyWebsite.description',
    icon: FaRocket,
    tech: ['React.js', 'Tailwind CSS', 'Supabase', 'Vercel', 'Adobe XD'],
  },

  {
    type: 'projet',
    titleKey: 'experience.items.photographerPortfolio.title',
    placeKey: 'experience.items.photographerPortfolio.place',
    dateKey: 'experience.items.photographerPortfolio.date',
    descKey: 'experience.items.photographerPortfolio.description',
    icon: FaRocket,
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
  },

  {
    type: 'projet',
    titleKey: 'experience.items.digitalMarketing.title',
    placeKey: 'experience.items.digitalMarketing.place',
    dateKey: 'experience.items.digitalMarketing.date',
    descKey: 'experience.items.digitalMarketing.description',
    icon: FaRocket,
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
  },

  {
    type: 'projet',
    titleKey: 'experience.items.imageCompressor.title',
    placeKey: 'experience.items.imageCompressor.place',
    dateKey: 'experience.items.imageCompressor.date',
    descKey: 'experience.items.imageCompressor.description',
    icon: FaRocket,
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
  },

  {
    type: 'stage',
    titleKey: 'experience.items.fecacfop.title',
    placeKey: 'experience.items.fecacfop.place',
    dateKey: 'experience.items.fecacfop.date',
    descKey: 'experience.items.fecacfop.description',
    icon: FaBriefcase,
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },

  {
    type: 'formation',
    titleKey: 'experience.items.licence.title',
    placeKey: 'experience.items.licence.place',
    dateKey: 'experience.items.licence.date',
    descKey: 'experience.items.licence.description',
    icon: FaGraduationCap,
    tech: [],
  },

  {
    type: 'stage',
    titleKey: 'experience.items.hgoped.title',
    placeKey: 'experience.items.hgoped.place',
    dateKey: 'experience.items.hgoped.date',
    descKey: 'experience.items.hgoped.description',
    icon: FaBriefcase,
    tech: ['Java', 'NetBeans'],
  },

  {
    type: 'formation',
    titleKey: 'experience.items.dut.title',
    placeKey: 'experience.items.dut.place',
    dateKey: 'experience.items.dut.date',
    descKey: 'experience.items.dut.description',
    icon: FaGraduationCap,
    tech: [],
  },
];
