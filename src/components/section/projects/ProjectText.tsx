import React from 'react';
import { Project } from '@/components/section/projects/types';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const textContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

type Props = {
  project: Project;
  isVertical?: boolean;
};

const ProjectText: React.FC<Props> = ({ project, isVertical = false }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={textContainer}
      className={`
        flex
        flex-1
        flex-col
        bg-gray-800
        ${isVertical ? 'p-4 sm:p-5' : 'p-5 sm:w-3/5 sm:p-7'}
      `}
    >
      <motion.h3
        variants={textItem}
        className="mb-2 text-lg font-bold leading-tight text-green-500 sm:text-xl"
      >
        {t(project.title)}
      </motion.h3>

      <motion.p
        variants={textItem}
        lang="fr"
        className="text-sm leading-6 text-gray-300"
      >
        {t(project.description)}
      </motion.p>

      {project.results && (
        <motion.p
          variants={textItem}
          lang="fr"
          className="mt-3 border-l-2 border-green-500 pl-3 text-sm leading-6 text-green-400"
        >
          <span className="font-semibold">{t('projects.results')} :</span>{' '}
          {t(project.results)}
        </motion.p>
      )}

      {project.tools && project.tools.length > 0 && (
        <motion.div variants={textItem} className="mt-5 flex flex-wrap gap-2">
          {project.tools.map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="flex items-center gap-1.5 rounded-md border border-gray-600 bg-gray-700 px-2 py-1 text-[11px] font-medium text-gray-200 transition-colors duration-200 hover:border-gray-500 hover:bg-gray-600"
            >
              {tool === 'React.js' && (
                <i className="devicon-react-original colored text-base" />
              )}
              {tool === 'Tailwind CSS' && (
                <i className="devicon-tailwindcss-plain colored text-base" />
              )}
              {tool === 'Supabase' && (
                <img
                  src="https://avatars.githubusercontent.com/u/54469796?s=200&v=4"
                  alt="Supabase"
                  className="h-4 w-4 rounded"
                />
              )}
              {tool === 'Vercel' && (
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
                  alt="Vercel"
                  className="h-4 w-4"
                />
              )}
              {tool === 'Framer Motion' && (
                <img
                  src="https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png"
                  alt="Framer Motion"
                  className="h-4 w-4 object-contain"
                />
              )}
              {tool === 'Java' && (
                <i className="devicon-java-plain colored text-base" />
              )}
              {tool === 'NetBeans' && (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Apache_NetBeans_Logo.svg"
                  alt="NetBeans"
                  className="h-4 w-4"
                />
              )}
              {tool === 'Photoshop' && (
                <i className="devicon-photoshop-plain text-sky-400 text-base" />
              )}
              {tool === 'Illustrator' && (
                <i className="devicon-illustrator-plain text-orange-400 text-base" />
              )}
              {tool === 'Adobe XD' && (
                <i className="devicon-xd-plain text-pink-400 text-base" />
              )}
              {tool === 'Figma' && (
                <i className="devicon-figma-plain colored text-base" />
              )}
              {tool === 'HTML' && (
                <i className="devicon-html5-plain colored text-base" />
              )}
              {tool === 'CSS' && (
                <i className="devicon-css3-plain colored text-base" />
              )}
              {tool === 'JavaScript' && (
                <i className="devicon-javascript-plain colored text-base" />
              )}
              {tool === 'PHP' && (
                <i className="devicon-php-plain colored text-base" />
              )}
              {tool === 'MySQL' && (
                <i className="devicon-mysql-plain colored text-base" />
              )}
              <span>{tool}</span>
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectText;
