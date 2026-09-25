import React, { useEffect, useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import ModalPortal from '@/components/section/projects/ModalPortal';
import { getPublicUrl } from '@/utils/supabase';

interface BlogImageViewerProps {
  image: string;
  onClose: () => void;
}

const BlogImageViewer: React.FC<BlogImageViewerProps> = ({
  image,
  onClose,
}) => {
  const { t } = useTranslation();

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    setZoom((currentZoom) =>
      event.deltaY < 0
        ? Math.min(currentZoom + 0.15, 4)
        : Math.max(currentZoom - 0.15, 1)
    );
  };

  const handleDoubleClick = () => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      resetViewer();
    }
  };

  const resetViewer = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!isDragging || zoom <= 1) return;
    setPosition({
      x: event.clientX - dragStart.current.x,
      y: event.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
    if (zoom <= 1) return;
    const touch = event.touches[0];
    setIsDragging(true);
    dragStart.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLImageElement>) => {
    if (!isDragging || zoom <= 1) return;
    const touch = event.touches[0];
    setPosition({
      x: touch.clientX - dragStart.current.x,
      y: touch.clientY - dragStart.current.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // ✅ Fallback et gestion via getPublicUrl
  const imageUrl = image ? getPublicUrl(image) : '/images/fallback.jpg';

  return (
    <ModalPortal onClose={onClose}>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
        onClick={onClose}
      >
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label={t('blog.imageViewer.close')}
          className="absolute right-4 top-4 z-[10001] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white border border-white/10 backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-white/20 hover:rotate-90 hover:scale-110"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        {/* Image */}
        <div
          className="flex h-full w-full items-center justify-center overflow-hidden"
          onClick={(event) => event.stopPropagation()}
          onWheel={handleWheel}
        >
          <img
            src={imageUrl}
            alt={t('blog.imageViewer.preview')}
            draggable={false}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
              transition: isDragging ? 'none' : 'transform 0.2s ease',
            }}
            className="max-h-full max-w-full select-none object-contain"
          />
        </div>

        {/* Contrôles */}
        <div
          className="absolute bottom-5 left-1/2 z-[10001] flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/60 p-2 backdrop-blur-md"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={resetViewer}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <ZoomIn size={16} />
            {t('blog.imageViewer.reset')}
          </button>
          <span className="px-2 text-sm text-white/70">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>
    </ModalPortal>
  );
};

export default BlogImageViewer;
