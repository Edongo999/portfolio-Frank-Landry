import i18n from 'i18next';
import { BlogPost } from '@/types/blog';
import axiosInstance from '@/utils/axiosInstance'; // ✅ celui que tu viens de montrer

interface ArticlesResponse {
  data: BlogPost[];
}

export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const language = i18n.language === 'en' ? 'en' : 'fr';

    const response = await axiosInstance.get<ArticlesResponse>(
      `/publicIndex?lang=${language}` // ✅ route publique correcte
    );

    console.log('📚 Articles reçus :', response.data);

    if (!Array.isArray(response.data.data)) {
      console.warn('⚠️ La réponse API ne contient pas un tableau data.');
      return [];
    }

    return response.data.data;
  } catch (error) {
    console.error('❌ Erreur lors du chargement des articles :', error);
    return [];
  }
}
