import i18n from 'i18next';
import { BlogPost } from '@/types/blog';
import axiosInstance from '@/utils/axiosInstance';

export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const language = i18n.language === 'en' ? 'en' : 'fr';

    const res = await axiosInstance.get(`/articles/public?lang=${language}`);
    console.log('Réponse API articles :', res.data); // 👀 debug

    // ✅ ton backend renvoie { data: [...] }
    return Array.isArray(res.data.data) ? res.data.data : [];
  } catch (error) {
    console.error('Erreur lors du fetch des articles :', error);
    return [];
  }
}
