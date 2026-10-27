import React from 'react';
import { ProductCard } from '../components';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/mockData';

export default function CategoryPage({ categorySlug = 'masajeadores', onAddToCart }) {
  const currentCategory = CATEGORIES_DATA.find((c) => c.slug === categorySlug) || {
    name: 'Categoría',
    description: 'Explora nuestra colección especializada.',
  };

  const filteredProducts = PRODUCTS_DATA.filter(
    (p) => p.categorySlug === categorySlug || p.category?.toLowerCase().includes(categorySlug)
  );

  return (
    <main id="main-content" className="flex-1 container mx-auto px-4 py-8 lg:py-16">
      <header className="mb-8 lg:mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marca-negro tracking-tight">
          {currentCategory.name}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-marca-gris font-medium">
          {currentCategory.description || 'Tecnología y bienestar con envío gratis a todo Colombia.'}
        </p>
      </header>

      <section aria-label="Catálogo de productos de la categoría">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart && onAddToCart(product)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
