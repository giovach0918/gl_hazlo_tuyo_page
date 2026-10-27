import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/mockData';

export default function ProductDetailPage({ productSlug: propProductSlug, onAddToCart }) {
  const { productSlug: paramProductSlug } = useParams();
  const slug = propProductSlug || paramProductSlug;

  const product =
    PRODUCTS_DATA.find(
      (p) =>
        p.slug === slug ||
        p.id === slug ||
        p.detailsUrl === `/producto/${slug}` ||
        p.detailsUrl === `/producto-${slug}` ||
        (slug && p.id?.includes(slug)) ||
        (slug && p.detailsUrl?.includes(slug))
    ) || PRODUCTS_DATA[0];

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || product.variant || 'Estándar'
  );
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        variant: selectedVariant,
        quantity,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
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
          <div className="border-b border-zinc-200 pb-6">
            <span className="text-xs font-bold text-marca-primario uppercase tracking-wider bg-marca-primario/10 px-3 py-1 rounded-md w-fit">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-marca-negro tracking-tight mt-3">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3">
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
                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
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
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-white w-fit">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-marca-gris hover:bg-zinc-50 font-bold"
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="px-4 py-3 font-bold text-marca-negro text-sm">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3 text-marca-gris hover:bg-zinc-50 font-bold"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 bg-marca-primario hover:opacity-90 text-white font-black py-4 px-8 rounded-xl shadow-lg transition-transform active:scale-[0.98] uppercase tracking-wide min-h-[48px]"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
