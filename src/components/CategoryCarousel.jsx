import React, { useRef } from 'react';
import { cn } from '../utils/cn';

/**
 * CategoryCarousel Component
 * Carrusel responsive con scroll snap horizontal y controles de navegación interactivos.
 *
 * @param {Object} props
 * @param {string} [props.title] Título de la sección.
 * @param {string} [props.subtitle] Subtítulo descriptivo.
 * @param {Array<{ id: string, title: string, description: string, image: string, href: string, ctaText: string }>} props.categories Lista de categorías.
 * @param {string} [props.className] Clases adicionales.
 */
export const CategoryCarousel = ({
  title = 'Explora por Categorías',
  subtitle = 'Soluciones diseñadas para tu descanso, tonificación e hidratación activa.',
  categories = [],
  className = '',
}) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-labelledby="categorias-title"
      className={cn('container mx-auto px-4 py-12 sm:py-16 lg:py-20', className)}
    >
      {/* Título de Sección */}
      <div className="text-center mb-8 sm:mb-12">
        <h2
          id="categorias-title"
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

      {/* Contenedor Carrusel con Flechas */}
      <div className="relative group">
        {/* Flecha Anterior */}
        <button
          type="button"
          onClick={() => scroll('prev')}
          aria-label="Anterior categoría"
          className={cn(
            'absolute top-1/2 -translate-y-1/2 z-10 bg-white/95 shadow-xl rounded-full p-3',
            'hover:bg-marca-primario hover:text-white transition-all hidden md:flex',
            'min-h-[48px] min-w-[48px] items-center justify-center -left-4',
            'focus:outline-none focus:ring-2 focus:ring-marca-primario active:scale-95 border border-marca-gris/15'
          )}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flecha Siguiente */}
        <button
          type="button"
          onClick={() => scroll('next')}
          aria-label="Siguiente categoría"
          className={cn(
            'absolute top-1/2 -translate-y-1/2 z-10 bg-white/95 shadow-xl rounded-full p-3',
            'hover:bg-marca-primario hover:text-white transition-all hidden md:flex',
            'min-h-[48px] min-w-[48px] items-center justify-center -right-4',
            'focus:outline-none focus:ring-2 focus:ring-marca-primario active:scale-95 border border-marca-gris/15'
          )}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Lista Deslizable Mobile First */}
        <ul
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 sm:gap-6 pb-6 px-1 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <li
              key={category.id || category.title}
              className={cn(
                'flex-none w-[85%] sm:w-[46%] lg:w-[31%] snap-center',
                'bg-white border border-marca-gris/15 rounded-3xl shadow-sm hover:shadow-xl',
                'transition-all duration-300 flex flex-col overflow-hidden group'
              )}
            >
              <div className="flex flex-col h-full">
                <div className="relative w-full aspect-[4/3] sm:h-72 overflow-hidden bg-marca-crema">
                  <img
                    src={category.image}
                    alt={category.title}
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-3 flex-1 bg-white">
                  <h3 className="text-xl sm:text-2xl font-corporativa font-black text-marca-negro">
                    {category.title}
                  </h3>
                  <p className="text-marca-gris text-xs sm:text-sm flex-1 leading-relaxed">
                    {category.description}
                  </p>
                  <a
                    href={category.href}
                    className={cn(
                      'inline-flex items-center justify-center min-h-[48px] min-w-[48px] mt-3 px-6 py-3',
                      'bg-marca-primario/10 text-marca-primario hover:bg-marca-primario hover:text-white',
                      'font-bold rounded-xl transition-all duration-200 w-full uppercase text-xs sm:text-sm tracking-wide',
                      'focus:outline-none focus:ring-2 focus:ring-marca-primario active:scale-[0.98]'
                    )}
                  >
                    {category.ctaText || 'Explorar'}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
