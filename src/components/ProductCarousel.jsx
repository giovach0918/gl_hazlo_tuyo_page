import React, { useRef } from 'react';
import { ProductCard } from './ProductCard';
import { cn } from '../utils/cn';

/**
 * ProductCarousel Component
 * Carrusel interactivo y responsive de productos destacados.
 *
 * @param {Object} props
 * @param {string} [props.title] Título de la sección de productos.
 * @param {string} [props.subtitle] Subtítulo descriptivo.
 * @param {Array<Object>} props.products Lista de productos.
 * @param {(product: Object) => void} [props.onAddToCart] Callback al añadir al carrito.
 * @param {string} [props.className] Clases adicionales.
 */
export const ProductCarousel = ({
  title = 'Productos Destacados',
  subtitle = 'Los artículos favoritos de nuestros clientes con garantía oficial y pago contra entrega.',
  products = [],
  onAddToCart = () => {},
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
      id="catalogo"
      aria-labelledby="catalogo-title"
      className={cn('container mx-auto px-4 py-8 sm:py-12 lg:py-16 mb-12 sm:mb-16', className)}
    >
      {/* Encabezado */}
      <div className="text-center mb-8 sm:mb-12">
        <h2
          id="catalogo-title"
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

      {/* Contenedor Carrusel */}
      <div className="relative group">
        {/* Flecha Anterior */}
        <button
          type="button"
          onClick={() => scroll('prev')}
          aria-label="Anterior producto"
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
          aria-label="Siguiente producto"
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

        {/* Lista de Tarjetas */}
        <ul
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 sm:gap-6 pb-6 px-1 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="flex-none w-[85%] sm:w-[46%] lg:w-[31%] snap-center"
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
