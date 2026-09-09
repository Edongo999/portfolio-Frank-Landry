export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'desktop'; // ajout de "desktop"
  icon: string;
  level: number;
  desc: string;
}
export const skills: Skill[] = [
  {
    name: 'HTML5',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    level: 95,
    desc: 'skills.items.html',
  },
  {
    name: 'CSS3',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    level: 90,
    desc: 'skills.items.css',
  },
  {
    name: 'React.js',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    level: 90,
    desc: 'skills.items.react',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    level: 85,
    desc: 'skills.items.typescript',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
    level: 85,
    desc: 'skills.items.tailwind',
  },
  {
    name: 'PHP',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    level: 75,
    desc: 'skills.items.php',
  },
  {
    name: 'Laravel',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
    level: 75,
    desc: 'skills.items.laravel',
  },
  {
    name: 'MySQL',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    level: 70,
    desc: 'skills.items.mysql',
  },
  {
    name: 'Supabase',
    category: 'backend',
    icon: 'https://avatars.githubusercontent.com/u/54469796?s=200&v=4', // logo Supabase
    level: 65,
    desc: 'skills.items.supabase',
  },
  {
    name: 'Git',
    category: 'tools',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    level: 85,
    desc: 'skills.items.git',
  },
  {
    name: 'Postman',
    category: 'tools',
    icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
    level: 80,
    desc: 'skills.items.postman',
  },
  {
    name: 'Adobe XD',
    category: 'tools',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg',
    level: 80,
    desc: 'skills.items.adobeXd',
  },
  {
    name: 'Photoshop',
    category: 'tools',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
    level: 75,
    desc: 'skills.items.photoshop',
  },
  {
    name: 'Illustrator',
    category: 'tools',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
    level: 70,
    desc: 'skills.items.illustrator',
  },
  {
    name: 'Vercel',
    category: 'tools',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    level: 80,
    desc: 'skills.items.vercel',
  },
  {
    name: 'Render',
    category: 'tools',
    icon: 'https://avatars.githubusercontent.com/u/36424661?s=200&v=4', // logo Render
    level: 75,
    desc: 'skills.items.render',
  },
  {
    name: 'Java',
    category: 'desktop',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    level: 75,
    desc: 'skills.items.java',
  },
  {
    name: 'Python',
    category: 'desktop',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    level: 75,
    desc: 'skills.items.python',
  },
];
