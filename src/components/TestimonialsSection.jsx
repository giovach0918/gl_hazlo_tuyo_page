import React from 'react';
import { cn } from '../utils/cn';

/**
 * TestimonialsSection Component
 * Cuadrícula de testimonios y prueba social de clientes verificados.
 *
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {Array<{ id: number, rating: number, comment: string, author: string, verified: boolean, avatar: string, productImage?: string }>} props.testimonials
 * @param {string} [props.className]
 */
export const TestimonialsSection = ({
  title = 'Lo que dicen nuestros clientes',
  subtitle = 'Únete a miles de colombianos que ya mejoraron su bienestar diario.',
  testimonials = [],
  className = '',
}) => {
  return (
    <section
      aria-labelledby="testimonios-title"
      className={cn(
        'container mx-auto px-4 py-12 sm:py-16 mb-12 sm:mb-16 bg-marca-primario/[0.03] rounded-3xl border border-marca-primario/10',
        className
      )}
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2
          id="testimonios-title"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((testi) => (
          <article
            key={testi.id || testi.author}
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-marca-gris/10 flex flex-col h-full hover:shadow-lg transition-all duration-300"
          >
            {/* Estrellas */}
            <div className="flex items-center gap-1 mb-4 text-amber-400" aria-label={`Calificación ${testi.rating || 5} de 5 estrellas`}>
              {Array.from({ length: testi.rating || 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Comentario */}
            <p className="text-marca-gris text-sm sm:text-base italic mb-6 flex-1 leading-relaxed">
              "{testi.comment}"
            </p>

            {/* Perfil del Autor */}
            <div className="flex items-center gap-3 sm:gap-4 mt-auto justify-between pt-4 border-t border-marca-gris/10">
              <div className="flex items-center gap-3">
                <img
                  src={testi.avatar}
                  alt={testi.author}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-marca-crema shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="font-corporativa font-bold text-marca-negro text-sm">
                    {testi.author}
                  </span>
                  {testi.verified && (
                    <span className="text-[11px] font-semibold text-[#25D366] flex items-center gap-1">
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Comprador Verificado
                    </span>
                  )}
                </div>
              </div>

              {testi.productImage && (
                <img
                  src={testi.productImage}
                  alt="Producto recibido"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-marca-gris/20 shadow-sm hidden sm:block"
                />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
