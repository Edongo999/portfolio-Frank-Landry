// src/components/section/projects/Projects.tsx
import React, { useEffect, useRef, useState } from "react";
import MediaViewer from "@/components/section/projects/MediaViewer";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import useReveal from "@/components/hooks/useReveal";
import ModalPortal from "@/components/section/projects/ModalPortal";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const mainTitleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const revealRef = useReveal({ stagger: 120, mode: "smooth" });

  const cardVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // LISTE DES PROJETS — TOUT TRADUIT VIA i18n
  const projects: Project[] = [
    {
      title: t("projects.items.africanada.title"),
      description: t("projects.items.africanada.description"),
      descriptionLong: t("projects.items.africanada.descriptionLong"),
      role: t("projects.items.africanada.role"),
      results: t("projects.items.africanada.results"),
      impact: t("projects.items.africanada.impact"),
      tools: t("projects.items.africanada.tools"),
      link: "https://www.facebook.com/AFRICANADA",
      medias: [
        { type: "video", src: "/videos/AFRICANA_VIDEO1.mp4" },
        { type: "image", src: "/images/AFRICANA.jpg" },
        { type: "image", src: "/images/AFRICANA4.jpg" },
        { type: "image", src: "/images/AFRICANA6.jpg" },
        { type: "video", src: "/videos/AFRICANA_VIDEO.mp4" },
        { type: "image", src: "/images/AFRICANA1.jpg" },
        { type: "image", src: "/images/AFRICANA5.jpg" },
        { type: "image", src: "/images/AFRICANA7.jpg" },
        { type: "video", src: "/videos/AFRICANA_VIDEO2.mp4" },
        { type: "image", src: "/images/AFRICANA2.jpg" },
        { type: "image", src: "/images/AFRICANA8.jpg" },
        { type: "image", src: "/images/AFRICANA9.jpg" },
        { type: "image", src: "/images/AFRICANA10.jpg" },
        { type: "image", src: "/images/AFRICANA11.jpg" },
        { type: "image", src: "/images/AFRICANA3.jpg" }
      ],
      category: "Entreprise"
    },

    {
      title: t("projects.items.wonder.title"),
      description: t("projects.items.wonder.description"),
      descriptionLong: t("projects.items.wonder.descriptionLong"),
      role: t("projects.items.wonder.role"),
      results: t("projects.items.wonder.results"),
      impact: t("projects.items.wonder.impact"),
      tools: t("projects.items.wonder.tools"),
      link: "https://www.facebook.com/Bekalaind",
      medias: [{ type: "image", src: "/images/WONDER.jpg" }],
      category: "Entreprise"
    },

    {
      title: t("projects.items.horizon.title"),
      description: t("projects.items.horizon.description"),
      descriptionLong: t("projects.items.horizon.descriptionLong"),
      role: t("projects.items.horizon.role"),
      results: t("projects.items.horizon.results"),
      impact: t("projects.items.horizon.impact"),
      tools: t("projects.items.horizon.tools"),
      medias: [
        { type: "image", src: "/images/logo0.jpg" },
        { type: "image", src: "/images/logo1.jpg" },
        { type: "image", src: "/images/logo2.jpg" },
        { type: "image", src: "/images/logo3.jpg" },
        { type: "image", src: "/images/logo4.jpg" },
        { type: "image", src: "/images/logo6.jpg" },
        { type: "image", src: "/images/logo4.jpg" }
      ],
      category: "Client"
    },

    {
      title: t("projects.items.onglerie.title"),
      description: t("projects.items.onglerie.description"),
      descriptionLong: t("projects.items.onglerie.descriptionLong"),
      role: t("projects.items.onglerie.role"),
      results: t("projects.items.onglerie.results"),
      impact: t("projects.items.onglerie.impact"),
      tools: t("projects.items.onglerie.tools"),
      medias: [{ type: "image", src: "/images/cliente1.jpg" }],
      category: "Client"
    },

    {
      title: t("projects.items.import.title"),
      description: t("projects.items.import.description"),
      descriptionLong: t("projects.items.import.descriptionLong"),
      role: t("projects.items.import.role"),
      results: t("projects.items.import.results"),
      impact: t("projects.items.import.impact"),
      tools: t("projects.items.import.tools"),
      medias: [{ type: "image", src: "/images/cliente2.jpg" }],
      category: "Client"
    },

    {
      title: t("projects.items.gems.title"),
      description: t("projects.items.gems.description"),
      descriptionLong: t("projects.items.gems.descriptionLong"),
      role: t("projects.items.gems.role"),
      results: t("projects.items.gems.results"),
      impact: t("projects.items.gems.impact"),
      tools: t("projects.items.gems.tools"),
      medias: [{ type: "image", src: "/images/clientEntreprise.jpg" }],
      category: "Client"
    },

    {
      title: t("projects.items.multiservices.title"),
      description: t("projects.items.multiservices.description"),
      descriptionLong: t("projects.items.multiservices.descriptionLong"),
      role: t("projects.items.multiservices.role"),
      results: t("projects.items.multiservices.results"),
      impact: t("projects.items.multiservices.impact"),
      tools: t("projects.items.multiservices.tools"),
      medias: [{ type: "image", src: "/images/cliente3.jpg" }],
      category: "Client"
    },

    {
      title: t("projects.items.concours.title"),
      description: t("projects.items.concours.description"),
      descriptionLong: t("projects.items.concours.descriptionLong"),
      role: t("projects.items.concours.role"),
      results: t("projects.items.concours.results"),
      impact: t("projects.items.concours.impact"),
      tools: t("projects.items.concours.tools"),
      medias: [
        { type: "image", src: "/images/candidate0.jpg" },
        { type: "image", src: "/images/candidate1.jpg" }
      ],
      category: "Client"
    },

    {
      title: t("projects.items.beaute.title"),
      description: t("projects.items.beaute.description"),
      descriptionLong: t("projects.items.beaute.descriptionLong"),
      role: t("projects.items.beaute.role"),
      results: t("projects.items.beaute.results"),
      impact: t("projects.items.beaute.impact"),
      tools: t("projects.items.beaute.tools"),
      medias: [{ type: "video", src: "/videos/clientvideo0.mp4" }],
      category: "Client"
    },

    {
      title: t("projects.items.carte.title"),
      description: t("projects.items.carte.description"),
      descriptionLong: t("projects.items.carte.descriptionLong"),
      role: t("projects.items.carte.role"),
      results: t("projects.items.carte.results"),
      impact: t("projects.items.carte.impact"),
      tools: t("projects.items.carte.tools"),
      medias: [{ type: "image", src: "/images/carte_de_visite.jpg" }],
      category: "Client"
    },
      {
    title: t("projects.items.transit.title"),
    description: t("projects.items.transit.description"),
    descriptionLong: t("projects.items.transit.descriptionLong"),
    role: t("projects.items.transit.role"),
    results: t("projects.items.transit.results"),
    impact: t("projects.items.transit.impact"),
    tools: t("projects.items.transit.tools"),
    medias: [{ type: "image", src: "/images/client4.jpg" }],
    category: "Client"
  }

  ];

  const validProjects = projects.filter((p) => p && typeof p === "object");
  const firstTwo = validProjects.slice(0, 2);
  const rest = validProjects.slice(2);

  // VIDEO PREVIEW
  const registerCardVideo = (el: HTMLVideoElement | null, idx: number) => {
    cardVideoRefs.current[idx] = el;
    if (el) {
      try {
        el.muted = true;
        el.loop = true;
        el.playsInline = true;
        el.play().catch((err) => {
          console.debug("Preview autoplay blocked", err);
        });
      } catch (err) {
        console.debug("Error configuring preview video", err);
      }
    }
  };

  const openProject = (project: Project, startIndex = 0) => {
    cardVideoRefs.current.forEach((v) => {
      try {
        v?.pause();
      } catch (err) {
        console.debug("Error pausing preview", err);
      }
    });

    setSelectedProject(project);
    setCurrentIndex(startIndex);
  };

  const closeModal = () => {
    cardVideoRefs.current.forEach((v) => {
      try {
        v?.play().catch((err) => {
          console.debug("Preview replay blocked", err);
        });
      } catch (err) {
        console.debug("Error resuming preview", err);
      }
    });

    setSelectedProject(null);
    setCurrentIndex(0);
  };

  const goNext = () => {
    if (!selectedProject) return;
    setCurrentIndex((i) => (i + 1) % selectedProject.medias.length);
  };

  const goPrev = () => {
    if (!selectedProject) return;
    setCurrentIndex((i) => (i - 1 + selectedProject.medias.length) % selectedProject.medias.length);
  };

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedProject]);

  // BLOCK SCROLL WHEN MODAL OPEN
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section className="relative min-h-screen bg-gray-800 text-white px-6 sm:px-8 pt-12 pb-16">
      <div className="max-w-6xl mx-auto space-y-12" ref={revealRef as React.RefObject<HTMLDivElement>}>

        {/* TITLE */}
        <div className="text-center">
          <motion.h2
            variants={mainTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="text-2xl sm:text-4xl font-bold inline-block px-6 py-2 rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x"
          >
            {t("projects.title")}
          </motion.h2>
        </div>

        {/* INTRO */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-gray-100 text-lg md:text-xl leading-relaxed text-left md:text-justify"
        >
          {t("projects.intro")}
        </motion.p>

        {/* ENTREPRISE → cartes horizontales */}
<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
  {firstTwo.map((project, idx) => (
    <div key={`enterprise-${idx}`} className="relative reveal" data-reveal-index={idx}>
      <ProjectCard
        project={project}
        isVertical={false} // 👉 forcé en horizontal
        onSelectMedia={(media) => {
          const start = project.medias.findIndex((m) => m.src === media.src);
          openProject(project, start >= 0 ? start : 0);
        }}
        registerVideo={(el) => registerCardVideo(el, idx)}
      />
    </div>
  ))}
</div>

{/* CLIENTS → cartes verticales */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {rest.map((project, idx) => {
    const globalIndex = firstTwo.length + idx;
    return (
      <div key={`client-${idx}`} className="relative reveal" data-reveal-index={globalIndex}>
        <ProjectCard
          project={project}
          isVertical={true} //  forcé en vertical
          onSelectMedia={(media) => {
            const start = project.medias.findIndex((m) => m.src === media.src);
            openProject(project, start >= 0 ? start : 0);
          }}
          registerVideo={(el) => registerCardVideo(el, globalIndex)}
        />
      </div>
    );
  })}
</div>


      
      </div>

      {/* MODAL */}
      {selectedProject && (
        <ModalPortal onClose={closeModal}>
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <MediaViewer
              project={selectedProject}
              index={currentIndex}
              onPrev={goPrev}
              onNext={goNext}
              startMuted={true}
            />
          </div>
        </ModalPortal>
      )}
    </section>
  );
};

export default Projects;
