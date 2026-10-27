import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/mockData';

export default function ProductDetailPage({ productSlug = 'producto-ay1688', onAddToCart }) {
  const product = PRODUCTS_DATA.find((p) => p.slug === productSlug || p.id === productSlug) || PRODUCTS_DATA[0];
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || 'Estándar');
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
    <main id="main-content" className="flex-1 container mx-auto px-4 py-8 lg:py-16">
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
            <h1 className="text-3xl sm:text-4xl font-black text-marca-negro tracking-tight">
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
              <div className="flex gap-3">
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

          {/* Botón de compra */}
          <div className="flex gap-4 pt-4">
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
    </main>
  );
}
