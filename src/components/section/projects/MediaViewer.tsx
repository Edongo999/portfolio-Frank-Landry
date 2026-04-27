// src/components/section/projects/MediaViewer.tsx
import React, { useEffect, useRef, useState } from "react";
import NavArrow from "./NavArrow";
import { useTranslation } from "react-i18next";

type Media = { type: "video" | "image"; src: string };
type Project = { title: string; medias: Media[] };

export default function MediaViewer({
  project,
  index,
  onPrev,
  onNext,
  startMuted = true,
}: {
  project: Project;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  startMuted?: boolean;
}) {
  const { t } = useTranslation();

  const media = project.medias[index];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(startMuted);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;

    try {
      v.currentTime = 0;
    } catch (err) {
      console.debug("MediaViewer: unable to reset currentTime", err);
    }

    v.play().catch((err) => {
      console.debug("MediaViewer: autoplay blocked or failed", err);
    });
  }, [index, isMuted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;

    v.play().catch((err) => {
      console.debug("MediaViewer: initial autoplay blocked", err);
    });
  }, []);

  const toggleMute = () => {
    setIsMuted((m) => {
      const next = !m;

      if (videoRef.current) {
        videoRef.current.muted = next;

        if (!next) {
          videoRef.current.play().catch((err) => {
            console.debug("MediaViewer: play after unmute blocked", err);
          });
        }
      }

      return next;
    });
  };

  return (
    <div className="relative w-full max-w-[1200px] max-h-[85vh] flex items-center justify-center p-4">
      {/* Flèche gauche */}
      {project.medias.length > 1 && (
        <NavArrow side="left" onClick={onPrev} ariaLabel={t("media.prev")} />
      )}

      {/* Flèche droite */}
      {project.medias.length > 1 && (
        <NavArrow side="right" onClick={onNext} ariaLabel={t("media.next")} />
      )}

      <div className="w-full flex justify-center items-center relative">
        {media.type === "video" ? (
          <>
            <video
              ref={videoRef}
              src={media.src}
              controls
              playsInline
              className="w-full h-auto max-h-[80vh] rounded-lg bg-black"
            />

            {/* Bouton mute/unmute */}
            <button
              onClick={toggleMute}
              aria-pressed={!isMuted}
              className="absolute right-4 top-4 bg-black/60 text-white px-3 py-2 rounded-full border border-white/10 backdrop-blur-sm hover:bg-black/80 transition"
            >
              {isMuted ? t("media.unmute") : t("media.mute")}
            </button>
          </>
        ) : (
          <img
            src={media.src}
            alt={project.title}
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
          />
        )}

        {/* Compteur */}
        <div className="absolute right-4 bottom-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs border border-white/10 backdrop-blur-sm">
          {index + 1} / {project.medias.length}
        </div>
      </div>
    </div>
  );
}
