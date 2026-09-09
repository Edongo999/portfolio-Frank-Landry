import i18n from 'i18next';
import { BlogPost } from '@/types/blog';

export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const language = i18n.language === 'en' ? 'en' : 'fr';

    const res = await fetch(
      `http://localhost:8000/api/articles/public?lang=${language}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status}`);
    }

    const data = await res.json();

    // L'API renvoie { data: [...] }
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error('Erreur lors du fetch des articles :', error);

    return [];
  }
}
