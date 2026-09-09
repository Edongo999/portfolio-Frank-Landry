import { Project } from '@/components/ui/ProjectCard';

export const useProjectsData = (): Project[] => {
  return [
    // =====================================================
    // DÉVELOPPEMENT WEB
    // =====================================================

    {
      title: 'projects.items.siteVirtuel.title',
      description: 'projects.items.siteVirtuel.description',
      results: 'projects.items.siteVirtuel.results',
      tools: ['Adobe XD', 'React.js', 'Tailwind CSS', 'Supabase'],
      medias: [
        { type: 'image', src: '/images/maquette/maquette0.webp' },
        { type: 'image', src: '/images/maquette/maquette1.webp' },
        { type: 'image', src: '/images/maquette/maquette2.webp' },
        { type: 'image', src: '/images/maquette/maquette3.webp' },
        { type: 'image', src: '/images/maquette/maquette4.webp' },
        { type: 'image', src: '/images/maquette/maquette5.webp' },
        { type: 'image', src: '/images/maquette/maquette6.webp' },
        { type: 'image', src: '/images/maquette/maquette7.webp' },
        { type: 'image', src: '/images/maquette/maquette8.webp' },
      ],
      link: 'https://ton-site-web.com',
      category: 'Développement Web',
      cardId: 'site-virtuel',
    },

    {
      title: 'projects.items.portfolioMarketing.title',
      description: 'projects.items.portfolioMarketing.description',
      results: 'projects.items.portfolioMarketing.results',
      tools: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      category: 'Développement Web',
      cardId: 'portfolio-1',
      link: 'https://miranda-portfolio-three.vercel.app',
      medias: [
        {
          type: 'video',
          src: '/videos/miranda_video.mp4',
        },
      ],
    },
    {
      title: 'projects.items.111Studio.title',
      description: 'projects.items.111Studio.description',
      results: 'projects.items.111Studio.results',
      tools: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      category: 'Développement Web',
      cardId: 'app-2',
      link: 'https://111studio-five.vercel.app',
      medias: [
        {
          type: 'video',
          src: '/videos/111Studio.mp4',
        },
      ],
    },

    {
      title: 'projects.items.imageCompression.title',
      description: 'projects.items.imageCompression.description',
      results: 'projects.items.imageCompression.results',
      tools: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      category: 'Développement Web',
      cardId: 'app-1',
      link: 'https://image-compression.vercel.app',
      medias: [
        {
          type: 'video',
          src: '/images/Conversion/demo.mp4',
        },
      ],
    },

    {
      title: 'projects.items.photographerPortfolio.title',
      description: 'projects.items.photographerPortfolio.description',
      results: 'projects.items.photographerPortfolio.results',
      tools: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      category: 'Développement Web',
      cardId: 'photo-1',
      link: 'https://camfocus-photographe.vercel.app',
      medias: [
        {
          type: 'video',
          src: '/videos/Porfolio-JORDAN.mp4',
        },
      ],
    },

    {
      title: 'projects.items.adminDashboard.title',
      description: 'projects.items.adminDashboard.description',
      results: 'projects.items.adminDashboard.results',
      tools: [
        'React.js',
        'Tailwind CSS',
        'Recharts & Lucide React',
        'Lucide React',
      ],
      medias: [
        {
          type: 'image',
          src: '/images/Dashbord/dashboard.webp',
        },
      ],
      category: 'Développement Web',
      cardId: 'dev-5',
      link: 'https://ton-lien-de-demo.vercel.app',
    },

    {
      title: 'projects.items.fecacfop.title',
      description: 'projects.items.fecacfop.description',
      results: 'projects.items.fecacfop.results',
      tools: ['PHP', 'MySQL', 'HTML', 'CSS'],
      category: 'Développement Web',
      cardId: 'stage-1',
      link: '',
      medias: [
        { type: 'image', src: '/images/FECACFOP/feca0.webp' },
        { type: 'image', src: '/images/FECACFOP/feca1.webp' },
        { type: 'image', src: '/images/FECACFOP/feca2.webp' },
        { type: 'image', src: '/images/FECACFOP/feca3.webp' },
        { type: 'image', src: '/images/FECACFOP/feca4.webp' },
        { type: 'image', src: '/images/FECACFOP/feca5.webp' },
        { type: 'image', src: '/images/FECACFOP/feca6.webp' },
        { type: 'image', src: '/images/FECACFOP/feca7.webp' },
      ],
    },

    // IMPORTANT :
    // Ici on utilise javaDesktop et non javaInternship
    // car c'est le nom présent dans ton fichier i18n.

    {
      title: 'projects.items.javaDesktop.title',
      description: 'projects.items.javaDesktop.description',
      results: 'projects.items.javaDesktop.results',
      tools: ['Java', 'NetBeans', 'MySQL'],
      category: 'desktop',
      cardId: 'stage-2',
      link: '',
      medias: [
        {
          type: 'image',
          src: '/images/Gestion_Stagiaire/application0.webp',
        },
        {
          type: 'image',
          src: '/images/Gestion_Stagiaire/application1.webp',
        },
        {
          type: 'image',
          src: '/images/Gestion_Stagiaire/application2.webp',
        },
        {
          type: 'image',
          src: '/images/Gestion_Stagiaire/application3.webp',
        },
        {
          type: 'image',
          src: '/images/Gestion_Stagiaire/application4.webp',
        },
        {
          type: 'image',
          src: '/images/Gestion_Stagiaire/application5.webp',
        },
      ],
    },

    // =====================================================
    // DESIGN
    // =====================================================

    // IMPORTANT :
    // salonCampaigns -> salons

    {
      title: 'projects.items.salons.title',
      description: 'projects.items.salons.description',
      results: 'projects.items.salons.results',
      tools: ['Photoshop', 'Illustrator'],
      medias: [
        {
          type: 'image',
          src: '/images/Salon/salon0.webp',
        },
        {
          type: 'image',
          src: '/images/Salon/salon2.webp',
        },
        {
          type: 'image',
          src: '/images/Salon/salon3.webp',
        },
        {
          type: 'image',
          src: '/images/Salon/salon4.webp',
        },
      ],
      category: 'Design',
      cardId: 'flyer-salons',
    },

    // IMPORTANT :
    // visualIdentity -> visualEtechnology

    {
      title: 'projects.items.visualEtechnology.title',
      description: 'projects.items.visualEtechnology.description',
      results: 'projects.items.visualEtechnology.results',
      tools: ['Illustrator', 'Photoshop'],
      medias: [
        { type: 'image', src: '/images/Technology/tech1.webp' },
        { type: 'image', src: '/images/Technology/tech2.webp' },
        { type: 'image', src: '/images/Technology/tech3.webp' },
        { type: 'image', src: '/images/Technology/tech4.webp' },
        { type: 'image', src: '/images/Technology/tech5.webp' },
        { type: 'image', src: '/images/Technology/tech6.webp' },
        { type: 'image', src: '/images/Technology/tech7.webp' },
        { type: 'image', src: '/images/Technology/tech8.webp' },
        { type: 'image', src: '/images/Technology/tech9.webp' },
        { type: 'image', src: '/images/Technology/tech10.webp' },
        { type: 'image', src: '/images/Technology/tech11.webp' },
        { type: 'image', src: '/images/Technology/tech12.webp' },
        { type: 'image', src: '/images/Technology/tech13.webp' },
        { type: 'image', src: '/images/Technology/tech14.webp' },
        { type: 'image', src: '/images/Technology/tech15.webp' },
        { type: 'image', src: '/images/Technology/tech16.webp' },
        { type: 'image', src: '/images/Technology/tech17.webp' },
        { type: 'image', src: '/images/Technology/tech18.webp' },
      ],
      category: 'Design',
      cardId: 'visual-etech',
    },

    {
      title: 'projects.items.wedding.title',
      description: 'projects.items.wedding.description',
      results: 'projects.items.wedding.results',
      tools: ['Photoshop'],
      medias: [
        { type: 'image', src: '/images/Mariage/mariage0.webp' },
        { type: 'image', src: '/images/Mariage/mariage1.webp' },
        { type: 'image', src: '/images/Mariage/mariage2.webp' },
        { type: 'image', src: '/images/Mariage/mariage3.webp' },
        { type: 'image', src: '/images/Mariage/mariage4.webp' },
        { type: 'image', src: '/images/Mariage/mariage5.webp' },
        { type: 'image', src: '/images/Mariage/mariage6.webp' },
        { type: 'image', src: '/images/Mariage/mariage7.webp' },
        { type: 'image', src: '/images/Mariage/mariage8.webp' },
      ],
      category: 'Design',
      cardId: 'flyer-3',
    },

    // IMPORTANT :
    // motorcycleRental -> motorcycle

    {
      title: 'projects.items.motorcycle.title',
      description: 'projects.items.motorcycle.description',
      results: 'projects.items.motorcycle.results',
      tools: ['Illustrator', 'Photoshop'],
      medias: [
        {
          type: 'image',
          src: '/images/client/client0.webp',
        },
        {
          type: 'image',
          src: '/images/client/client1.webp',
        },
        {
          type: 'image',
          src: '/images/client/client2.webp',
        },
      ],
      category: 'Design',
      cardId: 'flyer-4',
    },

    {
      title: 'projects.items.trainingCenters.title',
      description: 'projects.items.trainingCenters.description',
      results: 'projects.items.trainingCenters.results',
      tools: ['Photoshop', 'Illustrator'],
      medias: [
        { type: 'image', src: '/images/centres/centre1.webp' },
        { type: 'image', src: '/images/centres/centre2.webp' },
        { type: 'image', src: '/images/centres/centre3.webp' },
        { type: 'image', src: '/images/centres/centre4.webp' },
        { type: 'image', src: '/images/centres/centre5.webp' },
        { type: 'image', src: '/images/centres/centre6.webp' },
        { type: 'image', src: '/images/centres/centre7.webp' },
        { type: 'image', src: '/images/centres/centre8.webp' },
        { type: 'image', src: '/images/centres/centre9.webp' },
        { type: 'image', src: '/images/centres/centre10.webp' },
      ],
      category: 'Design',
      cardId: 'flyer-5',
    },

    {
      title: 'projects.items.businessCards.title',
      description: 'projects.items.businessCards.description',
      results: 'projects.items.businessCards.results',
      tools: ['Photoshop', 'Illustrator'],
      medias: [
        { type: 'image', src: '/images/cartes/carte1.webp' },
        { type: 'image', src: '/images/cartes/carte2.webp' },
        { type: 'image', src: '/images/cartes/carte3.webp' },
        { type: 'image', src: '/images/cartes/carte4.webp' },
      ],
      category: 'Design',
      cardId: 'flyer-6',
    },

    // IMPORTANT :
    // 2jm -> twoJM

    {
      title: 'projects.items.twoJM.title',
      description: 'projects.items.twoJM.description',
      results: 'projects.items.twoJM.results',
      tools: ['Photoshop'],
      medias: [
        {
          type: 'image',
          src: '/images/sofiana/2jm0.webp',
        },
        {
          type: 'image',
          src: '/images/sofiana/2jm1.webp',
        },
        {
          type: 'image',
          src: '/images/sofiana/2jm2.webp',
        },
      ],
      category: 'Design',
      cardId: 'flyer-7',
    },

    // IMPORTANT :
    // churchFlyers -> churches

    {
      title: 'projects.items.churches.title',
      description: 'projects.items.churches.description',
      results: 'projects.items.churches.results',
      tools: ['Photoshop'],
      medias: [
        {
          type: 'image',
          src: '/images/paroisse/eglise0.webp',
        },
        {
          type: 'image',
          src: '/images/paroisse/eglise1.webp',
        },
        {
          type: 'image',
          src: '/images/paroisse/eglise2.webp',
        },
        {
          type: 'image',
          src: '/images/paroisse/eglise3.webp',
        },
        {
          type: 'image',
          src: '/images/paroisse/eglise4.webp',
        },
      ],
      category: 'Design',
      cardId: 'flyer-8',
    },
  ];
};
