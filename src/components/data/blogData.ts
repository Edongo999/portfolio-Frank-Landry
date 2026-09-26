import { BlogPost } from '@/types/blog';
import axiosInstance from '@/utils/axiosInstance';

interface ArticlesResponse {
  data: BlogPost[];
}

export async function fetchPosts(language: string): Promise<BlogPost[]> {
  try {
    const currentLanguage = language.startsWith('en') ? 'en' : 'fr';

    const response = await axiosInstance.get<ArticlesResponse>(
      `/articles/public?lang=${currentLanguage}`
    );

    console.log(
      `Articles reçus pour la langue ${currentLanguage} :`,
      response.data
    );

    if (!Array.isArray(response.data.data)) {
      console.warn('La réponse API ne contient pas un tableau data.');
      return [];
    }

    return response.data.data;
  } catch (error) {
    console.error('Erreur lors du chargement des articles :', error);

    return [];
  }
}
