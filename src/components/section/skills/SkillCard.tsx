import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Skill {
  name: string;
  category: string;
  icon: string;
  level: number;
  desc: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      className="
        skills-card
        group
        relative
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-700/70
        bg-gray-900
        p-5
        shadow-lg
        transition-all
        duration-300
        hover:border-blue-500/50
        hover:shadow-blue-500/10
      "
    >
      {/* LUEUR */}

      <div
        className="
          skills-card-glow
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          bg-blue-500/10
          blur-3xl
          transition-all
          duration-300
          group-hover:bg-blue-500/20
        "
      />

      <div className="relative z-10 flex flex-col">
        {/* ICÔNE */}

        <div className="mb-4 flex justify-center">
          <div
            className="
              skills-card-icon
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-xl
              border
              border-gray-700
              bg-gray-800
              p-2.5
              shadow-md
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="h-9 w-9 object-contain"
            />
          </div>
        </div>

        {/* NOM */}

        <h3
          className="
            mb-4
            text-center
            text-lg
            font-bold
            tracking-wide
            text-white
          "
        >
          {skill.name}
        </h3>

        {/* NIVEAU */}

        <div className="mb-2 flex items-center justify-between">
          <span
            className="
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            {t('skills.mastery')}
          </span>

          <span className="text-sm font-bold text-blue-400">
            {skill.level}%
          </span>
        </div>

        {/* BARRE */}

        <div
          className="
            skills-progress-bg
            h-1.5
            w-full
            overflow-hidden
            rounded-full
            bg-gray-700
          "
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: index * 0.06,
              ease: 'easeOut',
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-cyan-400
            "
          />
        </div>

        {/* DESCRIPTION */}

        <div
          className="
            skills-card-description
            mt-4
            rounded-xl
            border
            border-gray-700/70
            bg-gray-800/60
            px-3
            py-3
          "
        >
          <p
            className="
              text-center
              text-xs
              font-medium
              leading-5
              text-gray-300
            "
          >
            {t(skill.desc)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
