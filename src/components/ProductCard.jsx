import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { cn } from '../utils/cn';

/**
 * ProductCard Component
 * Tarjeta de producto atómica, accesible y mobile-first para catálogos y carruseles.
 *
 * @param {Object} props
 * @param {Object} props.product Datos del producto.
 * @param {string} props.product.id
 * @param {string} props.product.name
 * @param {string} [props.product.category]
 * @param {string} [props.product.description]
 * @param {number} props.product.price
 * @param {number} [props.product.originalPrice]
 * @param {string} props.product.image
 * @param {string} [props.product.variant]
 * @param {string} [props.product.detailsUrl]
 * @param {(product: Object) => void} [props.onAddToCart] Callback disparado al hacer clic en "Añadir al Carrito".
 * @param {string} [props.className] Clases adicionales para el contenedor exterior.
 */
export const ProductCard = ({
  product,
  onAddToCart = () => {},
  className = '',
}) => {
  if (!product) return null;

  const {
    name,
    category,
    description,
    price,
    originalPrice,
    image,
    detailsUrl = '#',
  } = product;

  return (
    <article
      className={cn(
        'bg-white border border-marca-gris/15 rounded-3xl shadow-sm hover:shadow-xl',
        'transition-all duration-300 flex flex-col h-full p-5 sm:p-6 gap-4 sm:gap-5 overflow-hidden group',
        className
      )}
    >
      {/* Contenedor de Imagen con ratio fijo para prevenir CLS */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-marca-crema">
        <img
          src={image}
          alt={name}
          width={400}
          height={400}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {category && (
          <span className="absolute top-3 left-3 text-[11px] font-bold text-marca-primario uppercase tracking-wider bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
            {category}
          </span>
        )}
      </div>

      {/* Información del Producto */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-base sm:text-lg font-corporativa font-bold text-marca-negro leading-snug line-clamp-2 group-hover:text-marca-primario transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-marca-gris leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Precios y Acciones */}
      <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-marca-gris/10">
        <div className="flex items-baseline gap-2.5">
          <span className="text-marca-primario font-black text-xl sm:text-2xl tracking-tight">
            {formatCurrency(price)}
          </span>
          {originalPrice && (
            <span className="text-xs sm:text-sm text-marca-gris/80 line-through font-medium">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <a
            href={detailsUrl}
            className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] text-sm font-bold text-marca-negro hover:text-marca-primario underline decoration-marca-gris/30 underline-offset-4 hover:decoration-marca-primario transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-marca-primario"
          >
            Ver detalles
          </a>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className={cn(
              'bg-marca-primario hover:bg-indigo-600 text-white w-full rounded-xl',
              'min-h-[48px] min-w-[48px] font-bold shadow-md hover:shadow-lg',
              'transition-all duration-200 active:scale-[0.98] uppercase text-xs sm:text-sm tracking-wide',
              'flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marca-primario'
            )}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </article>
  );
};
