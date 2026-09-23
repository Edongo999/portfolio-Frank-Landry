import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import BlogHeader from '@/components/blog/BlogHeader';
import BlogCard from '@/components/blog/BlogCard';
import BlogFooter from '@/components/blog/BlogFooter';
import BlogImageViewer from '@/components/blog/BlogImageViewer';
import Modal from '@/components/Modal';

import { BlogPost } from '@/types/blog';
import { fetchPosts } from '@/components/data/blogData'; // ✅ utilise axiosInstance

const BlogSection: React.FC = () => {
  /* =========================
     LANGUE ACTUELLE
  ========================= */
  const { i18n } = useTranslation();

  /* =========================
     ARTICLES DU BACKEND
  ========================= */
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ✅ spinner
  const [openPost, setOpenPost] = useState<number | null>(null);
  const [openImage, setOpenImage] = useState<string | null>(null);

  /* =========================
     FETCH DES ARTICLES
     Se relance quand la langue change
  ========================= */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetchPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, [i18n.language]);

  /* =========================
     ARTICLE ACTUEL
  ========================= */
  const selectedPost = posts.find((post) => post.id === openPost);

  /* =========================
     OUVRIR / FERMER IMAGE
  ========================= */
  const handleOpenImage = (image: string) => {
    if (!image) return;

    const imageUrl =
      image.startsWith('http://') || image.startsWith('https://')
        ? image
        : `https://laravel-backend-portfolio.onrender.com/storage/${image}`; // ✅ correction Render

    setOpenImage(imageUrl);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  return (
    <section
      id="blog"
      className="
        relative
        overflow-hidden
        bg-gray-950
        py-35
        text-white
        sm:py-24
        md:py-29
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[360px]
            w-[360px]
            -translate-x-1/2
            rounded-full
            bg-[#f3f009]/5
            blur-[130px]
          "
        />
        <div
          className="
            absolute
            bottom-0
            right-0
            h-[300px]
            w-[300px]
            rounded-full
            bg-green-500/5
            blur-[120px]
          "
        />
      </div>

      {/* =====================================================
          CONTENU
      ===================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        <BlogHeader />

        {/* =================================================
            PUBLICATIONS
        ================================================= */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-400"></div>
              <span className="ml-3 text-green-400">
                Chargement des articles...
              </span>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                onRead={() => setOpenPost(post.id)}
                onImageClick={() => handleOpenImage(post.image ?? '')}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">
              Aucun article disponible.
            </p>
          )}
        </div>

        <BlogFooter />
      </div>

      {/* =====================================================
          MODAL ARTICLE
      ===================================================== */}
      {selectedPost && (
        <Modal
          open={true}
          onClose={() => setOpenPost(null)}
          title={selectedPost.title}
        >
          <p
            className="
              whitespace-pre-line
              break-words
              [overflow-wrap:anywhere]
              text-base
              leading-7
              text-gray-700
            "
          >
            {selectedPost.content}
          </p>
        </Modal>
      )}

      {/* =====================================================
          IMAGE VIEWER
      ===================================================== */}
      {openImage && (
        <BlogImageViewer image={openImage} onClose={handleCloseImage} />
      )}
    </section>
  );
};

export default BlogSection;
