import i18n from 'i18next';
import { BlogPost } from '@/types/blog';
import axiosInstance from '@/utils/axiosInstance'; // ✅ utilise axiosInstance

export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const language = i18n.language === 'en' ? 'en' : 'fr';

    const res = await axiosInstance.get(`/articles/public?lang=${language}`);

    // ⚠️ Si tu utilises paginate() côté backend, les données sont dans res.data.data
    return Array.isArray(res.data.data) ? res.data.data : res.data;
  } catch (error) {
    console.error('Erreur lors du fetch des articles :', error);
    return [];
  }
}
