import React from 'react';
import {
  HeroBanner,
  CategoryCarousel,
  ProductCarousel,
  VideoSection,
  TestimonialsSection,
} from '../components';
import {
  HERO_DATA,
  CATEGORIES_DATA,
  PRODUCTS_DATA,
  TESTIMONIALS_DATA,
} from '../data/mockData';

export default function Home({ onAddToCart }) {
  return (
    <main id="main-content" className="flex-1">
      {/* Banner Hero Principal */}
      <HeroBanner
        badge={HERO_DATA.badge}
        title={HERO_DATA.title}
        description={HERO_DATA.description}
        ctaText={HERO_DATA.ctaText}
        ctaHref={HERO_DATA.ctaHref}
        bgImage={HERO_DATA.bgImage}
      />

      {/* Carrusel de Categorías */}
      <CategoryCarousel
        title="Explora por Categorías"
        subtitle="Soluciones diseñadas para tu descanso, tonificación e hidratación activa."
        categories={CATEGORIES_DATA}
      />

      {/* Carrusel de Productos Destacados */}
      <ProductCarousel
        title="Productos Destacados"
        subtitle="Los artículos favoritos de nuestros clientes con garantía oficial y pago contra entrega."
        products={PRODUCTS_DATA}
        onAddToCart={onAddToCart}
      />

      {/* Video Demostrativo */}
      <VideoSection />

      {/* Testimonios de Clientes */}
      <TestimonialsSection
        title="Lo que dicen nuestros clientes"
        subtitle="Únete a miles de colombianos que ya mejoraron su bienestar."
        testimonials={TESTIMONIALS_DATA}
      />
    </main>
  );
}
