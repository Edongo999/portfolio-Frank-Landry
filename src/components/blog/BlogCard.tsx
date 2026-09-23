import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, ArrowUpRight, Shapes } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import ShareMenu from '../icones/ShareMenu';

import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onRead: () => void;
  onImageClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  index,
  onRead,
  onImageClick,
}) => {
  const { t, i18n } = useTranslation();

  /* =====================================================
     ICÔNE DE LA CATÉGORIE
  ===================================================== */

  const getCategoryIcon = () => {
    switch (post.category) {
      case 'Design':
        return <Shapes size={15} />;

      case 'Astuce':
        return <Lightbulb size={15} />;

      case 'Web':
        return <Code size={15} />;

      default:
        return <Code size={15} />;
    }
  };

  /* =====================================================
     DATE DYNAMIQUE FR / EN
  ===================================================== */

  const formattedDate = new Date(post.created_at).toLocaleDateString(
    i18n.language === 'en' ? 'en-US' : 'fr-FR',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
      }}
      className="
        group
        relative
        grid
        overflow-hidden
        rounded-2xl
        border
        border-gray-700/70
        bg-gray-900/95
        shadow-[0_12px_40px_rgba(0,0,0,0.25)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#f3f009]/30
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]
        md:grid-cols-2
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className={`
          group/image
          relative
          min-h-[220px]
          cursor-pointer
          overflow-hidden
          md:min-h-[270px]
          ${index % 2 !== 0 ? 'md:order-2' : ''}
        `}
        onClick={onImageClick}
        role="button"
        tabIndex={0}
        aria-label={t('blog.card.viewImageArticle', {
          title: post.title,
        })}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onImageClick();
          }
        }}
      >
        {/* IMAGE */}

        <img
          src={
            post.image
              ? `https://laravel-backend-portfolio.onrender.com/storage/${post.image}`
              : '/images/fallback.jpg'
          }
          alt={post.title}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-gray-950/70
            via-gray-950/5
            to-transparent
          "
        />

        {/* =================================================
            BADGE CATÉGORIE
        ================================================= */}

        <span
          className="
            absolute
            left-4
            top-4
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-gray-950/75
            px-3
            py-1.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#f3f009]
            shadow-lg
            backdrop-blur-md
          "
        >
          {getCategoryIcon()}

          {/* {post.category} */}
          {t(`blog.category.${post.category}`, post.category)}
        </span>

        {/* =================================================
            INDICATEUR IMAGE
        ================================================= */}

        <div
          className="
            absolute
            bottom-4
            right-4
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-gray-950/75
            px-3
            py-2
            text-xs
            font-semibold
            text-white
            opacity-90
            shadow-lg
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:border-[#f3f009]
            group-hover:bg-[#f3f009]
            group-hover:text-gray-950
          "
        >
          <span>{t('blog.card.viewImage')}</span>

          <ArrowUpRight
            size={14}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>
      </div>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <div
        className={`
          flex
          flex-col
          justify-between
          p-5
          sm:p-6
          md:p-7
          ${index % 2 !== 0 ? 'md:order-1' : ''}
        `}
      >
        <div>
          {/* =================================================
              DATE
          ================================================= */}

          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-7 bg-[#f3f009]/60" />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-gray-500
              "
            >
              {formattedDate}
            </span>
          </div>

          {/* =================================================
              TITRE
          ================================================= */}

          <h3
            className="
              max-w-xl
              text-xl
              font-bold
              leading-tight
              text-white
              transition-colors
              duration-300
              group-hover:text-[#f3f009]
              sm:text-2xl
            "
          >
            {post.title}
          </h3>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mt-3
              line-clamp-3
              max-w-xl
              overflow-hidden
              break-words
              text-sm
              leading-6
              text-gray-400
            "
          >
            {post.content}
          </p>
        </div>

        {/* =====================================================
            FOOTER CARTE
        ===================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-gray-800
            pt-4
          "
        >
          {/* =================================================
              LIRE LA SUITE
          ================================================= */}

          <button
            type="button"
            onClick={onRead}
            className="
              group/read
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#f3f009]
              transition-colors
              duration-300
              hover:text-white
            "
          >
            <span>{t('blog.card.readMore')}</span>

            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover/read:translate-x-0.5
                group-hover/read:-translate-y-0.5
              "
            />
          </button>

          {/* =================================================
              PARTAGE
          ================================================= */}

          <div className="relative">
            <ShareMenu url={`${window.location.origin}/blog/${post.id}`} />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
