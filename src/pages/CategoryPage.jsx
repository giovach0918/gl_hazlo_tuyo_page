import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/mockData';

export default function CategoryPage({ categorySlug: propCategorySlug, onAddToCart }) {
  const { categorySlug: paramCategorySlug } = useParams();
  const slug = propCategorySlug || paramCategorySlug || 'masajeadores';

  const currentCategory =
    CATEGORIES_DATA.find(
      (c) => c.slug === slug || c.id === slug || c.href?.endsWith(slug)
    ) || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      title: slug.charAt(0).toUpperCase() + slug.slice(1),
      description: 'Explora nuestra colección especializada.',
    };

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const cat = p.category?.toLowerCase() || '';
    const catSlug = p.categorySlug?.toLowerCase() || '';
    const cleanSlug = slug.toLowerCase();
    return catSlug === cleanSlug || cat.includes(cleanSlug) || cleanSlug.includes(catSlug);
  });

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <header className="mb-8 lg:mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marca-negro tracking-tight">
          {currentCategory.name || currentCategory.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-marca-gris font-medium">
          {currentCategory.description || 'Tecnología y bienestar con envío gratis a todo Colombia.'}
        </p>
      </header>

      <section aria-label="Catálogo de productos de la categoría">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-marca-gris">
            <p className="text-lg font-bold">No se encontraron productos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => onAddToCart && onAddToCart(product)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
