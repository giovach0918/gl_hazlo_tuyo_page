import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/mockData';

export default function ProductDetailPage({ productSlug: propProductSlug, onAddToCart }) {
  const { productSlug: paramProductSlug } = useParams();
  const rawParam = propProductSlug || paramProductSlug || '';
  const searchKey = rawParam.replace(/^producto-/, '').toLowerCase();

  // Búsqueda flexible por slug, id (ej: ay1688 o gl-facial-ay1688) y URLs
  const product =
    PRODUCTS_DATA.find((p) => {
      const pSlug = (p.slug || '').toLowerCase();
      const pId = (p.id || '').toLowerCase();
      const detailsUrl = (p.detailsUrl || '').toLowerCase();

      return (
        pSlug === searchKey ||
        pId === searchKey ||
        detailsUrl === `/producto/${searchKey}` ||
        detailsUrl === `/producto-${searchKey}` ||
        pId.replace(/^gl-/, '') === searchKey ||
        pId.includes(searchKey) ||
        searchKey.includes(pSlug) ||
        searchKey.includes(pId)
      );
    }) || PRODUCTS_DATA[0];

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || product.variant || 'Estándar'
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sincronizar estado al cambiar de producto
  useEffect(() => {
    setSelectedVariant(product.variants?.[0] || product.variant || 'Estándar');
    setQuantity(1);
    setAdded(false);
  }, [product.id, product.slug]);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        variant: selectedVariant,
        quantity,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      {/* Migas de Pan (Breadcrumbs) */}
      <nav
        aria-label="Migas de pan"
        className="mb-6 lg:mb-8 flex items-center flex-wrap gap-2 text-sm text-zinc-500 font-medium"
      >
        <Link to="/" className="hover:text-marca-primario transition-colors">
          Inicio
        </Link>
        <span className="text-zinc-400">/</span>
        <Link
          to={`/categoria/${product.categorySlug}`}
          className="hover:text-marca-primario transition-colors"
        >
          {product.category}
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="text-zinc-900 font-bold truncate max-w-[200px] sm:max-w-md">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Imagen Principal */}
        <div className="aspect-square bg-zinc-100 rounded-3xl overflow-hidden border border-zinc-200 shadow-sm relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 bg-marca-primario text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md">
            Envío Gratis
          </div>
        </div>

        {/* Información y Compra */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-zinc-200 pb-6 flex flex-col gap-3">
            <span className="text-xs font-bold text-marca-primario uppercase tracking-wider bg-marca-primario/10 px-3 py-1 rounded-md w-fit">
              {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-marca-negro tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Calificación 5 Estrellas */}
            <div className="flex items-center gap-3 mt-1">
              <div
                className="flex items-center gap-1 text-amber-400"
                aria-label="Calificación de 5 estrellas"
              >
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 text-amber-400"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-zinc-600 underline decoration-zinc-300 underline-offset-4">
                4.9 (128 reseñas)
              </span>
            </div>

            {/* Precio */}
            <div className="mt-2 flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black text-marca-primario">
                ${product.price?.toLocaleString('es-CO')} COP
              </span>
              {product.originalPrice && (
                <span className="text-lg text-zinc-400 line-through">
                  ${product.originalPrice?.toLocaleString('es-CO')}
                </span>
              )}
            </div>
          </div>

          <p className="text-marca-gris leading-relaxed font-medium">
            {product.description || 'Producto original con garantía oficial de GL Hazlo Tuyo.'}
          </p>

          {/* Selector de Variantes */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold uppercase tracking-wide text-marca-negro">
                Variante / Color:
              </span>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                      selectedVariant === v
                        ? 'border-marca-primario text-marca-primario bg-marca-primario/10'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de Cantidad y Botón de compra */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex items-center border-2 border-zinc-200 rounded-xl bg-white overflow-hidden sm:w-1/3 shadow-sm h-14">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:bg-zinc-200 transition-colors h-full min-h-[48px] min-w-[48px] flex-1 text-2xl font-medium leading-none flex items-center justify-center"
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="w-16 text-center font-bold text-zinc-900 text-lg">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:bg-zinc-200 transition-colors h-full min-h-[48px] min-w-[48px] flex-1 text-2xl font-medium leading-none flex items-center justify-center"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 bg-marca-primario hover:opacity-90 text-white font-black py-3 px-8 rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-wide min-h-[48px] text-base sm:text-lg h-14 flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  ¡Añadido!
                </>
              ) : (
                <>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Añadir al Carrito
                </>
              )}
            </button>
          </div>

          {/* Sellos de garantía y confianza */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-y-4 gap-x-6 pt-4 border-t border-zinc-100 text-sm font-semibold text-zinc-600 justify-between">
            <div className="flex items-center gap-2.5">
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-600 shrink-0 w-5 h-5"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Envío Gratis a todo Colombia</span>
            </div>

            <div className="flex items-center gap-2.5">
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-marca-primario shrink-0 w-5 h-5"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <span>Pago Contra Entrega disponible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
