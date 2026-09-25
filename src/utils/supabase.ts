// utils/supabase.ts
export const getPublicUrl = (path: string) => {
  const SUPABASE_URL =
    'https://pndvshlhovmciipvzbup.supabase.co/storage/v1/object/public';
  return `${SUPABASE_URL}/${path}`;
};
