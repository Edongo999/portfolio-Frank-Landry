// src/components/section/projects/types.ts
export interface Media {
  type: 'video' | 'image';
  src: string;
  alt?: string;
}

export interface Project {
  cardId: string;
  title: string;
  description: string;
  results?: string;
  link?: string;
  medias?: Media[];
  category?: 'Développement Web' | 'Design' | 'desktop';
  tools?: string[];
}
