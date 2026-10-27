import React from 'react';
import { cn } from '../utils/cn';

/**
 * VideoSection Component
 * Muestra el video de demostración de productos de manera responsive y fluida.
 *
 * @param {Object} props
 * @param {string} [props.title] Título del bloque de video.
 * @param {string} [props.subtitle] Subtítulo descriptivo.
 * @param {string} [props.videoUrl] URL del iframe de YouTube.
 * @param {string} [props.className] Clases adicionales.
 */
export const VideoSection = ({
  title = 'Mira cómo funcionan nuestros productos',
  subtitle = 'Descubre la tecnología detrás de tu recuperación y bienestar.',
  videoUrl = 'https://www.youtube.com/embed/87nwc4wOlzM?si=jSp1rz00StNvMddp',
  className = '',
}) => {
  return (
    <section
      aria-labelledby="video-title"
      className={cn('container mx-auto px-4 py-8 sm:py-12 lg:py-16', className)}
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2
          id="video-title"
          className="text-2xl sm:text-3xl md:text-4xl font-corporativa font-black text-marca-negro mb-3"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-marca-gris text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-marca-gris/15 bg-marca-negro">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={videoUrl}
          title="Demostración de productos GL Hazlo Tuyo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
};
