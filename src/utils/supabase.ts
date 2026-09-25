// utils/supabase.ts
export const getPublicUrl = (path: string) => {
  const SUPABASE_URL =
    'https://pndvshlhovmciipvzbup.supabase.co/storage/v1/object/public';

  if (!path) {
    return '/images/fallback.jpg'; // Fallback si aucune image
  }

  // Si c’est déjà une URL complète (http...), on la retourne telle quelle
  if (path.startsWith('http')) {
    return path;
  }

  // Sinon, on reconstruit avec le bucket "articles"
  return `${SUPABASE_URL}/articles/${path}`;
};
