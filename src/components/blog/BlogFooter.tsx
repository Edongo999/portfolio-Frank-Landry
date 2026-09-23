import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const BlogFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        mt-8
        border-t
        border-white/10
        pt-5
        text-center
      "
    >
      <p className="text-sm translate-y-15 text-gray-400">
        {t('blog.footer.latestPosts')}
      </p>
    </motion.div>
  );
};

export default BlogFooter;
