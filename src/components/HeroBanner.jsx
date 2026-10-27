import React from 'react';
import { cn } from '../utils/cn';

/**
 * HeroBanner Component
 * Sección principal de impacto visual con degradado corporativo profundo,
 * tipografía audaz y CTA con resplandor coloreado de alta conversión.
 *
 * @param {Object} props
 * @param {string} [props.badge] Texto de la píldora superior.
 * @param {string} props.title Título principal impactante.
 * @param {string} props.description Texto descriptivo de soporte.
 * @param {string} [props.ctaText] Texto del botón de acción.
 * @param {string} [props.ctaHref] Destino del botón de acción.
 * @param {() => void} [props.onCtaClick] Callback al hacer clic en el CTA.
 * @param {string} [props.bgImage] Imagen de fondo del hero.
 * @param {string} [props.className] Clases adicionales.
 */
export const HeroBanner = ({
  badge = 'Tecnología y Bienestar',
  title = 'Potencia tu bienestar y recuperación diaria con GL Hazlo Tuyo',
  description = 'Encuentra masajeadores ergonómicos, termos inteligentes y accesorios de alto rendimiento diseñados para cuidar tu cuerpo y potenciar tu estilo de vida.',
  ctaText = 'Ver Catálogo',
  ctaHref = '#catalogo',
  onCtaClick,
  bgImage = '/assets/Hero.jpg',
  className = '',
}) => {
  return (
    <section
      id="hero"
      aria-label="Presentación principal"
      className={cn(
        'relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center bg-marca-negro overflow-hidden',
        className
      )}
    >
      {/* Contenedor de Imagen de Fondo con Overlay Gradiente Corporativo Profundo */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <picture className="w-full h-full absolute inset-0">
          <img
            src={bgImage}
            alt="Banner principal GL Hazlo Tuyo"
            width={1600}
            height={700}
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover opacity-45"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-indigo-950/60 to-slate-950/90" />
      </div>

      {/* Contenido Central Mobile First */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center justify-center w-full gap-5 sm:gap-6 py-20 sm:py-24 lg:py-32">
        {badge && (
          <span className="text-xs sm:text-sm font-bold text-marca-primario bg-white/95 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            {badge}
          </span>
        )}

        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-corporativa font-black leading-tight max-w-4xl drop-shadow-md">
          {title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-marca-crema/90 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
          {description}
        </p>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
          <a
            href={ctaHref}
            onClick={onCtaClick}
            className={cn(
              'inline-flex items-center justify-center min-h-[48px] min-w-[48px] px-8 py-4',
              'bg-marca-primario hover:bg-indigo-600 text-white rounded-xl',
              'shadow-[0_4px_20px_rgba(46,47,220,0.4)] hover:shadow-[0_6px_25px_rgba(46,47,220,0.6)] hover:scale-105 active:scale-95',
              'transition-all duration-200 font-bold text-base uppercase tracking-wider',
              'w-full sm:w-auto focus:outline-none focus:ring-4 focus:ring-marca-primario/50'
            )}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
