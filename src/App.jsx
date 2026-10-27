import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Navbar,
  Footer,
  CartDrawer,
  WhatsAppButton,
} from './components';
import {
  Home,
  CategoryPage,
  ProductDetailPage,
  LegalPage,
  AdminProducts,
} from './pages';
import { ScrollToTop } from './utils';
import {
  NAV_LINKS,
  HERO_DATA,
  FOOTER_DATA,
} from './data/mockData';

const LOCAL_STORAGE_KEY = 'gl_hazlo_tuyo_cart_state';

/**
 * App Component
 * Orquestador principal SPA de GL Hazlo Tuyo con React Router v6.
 * Sincroniza el enrutamiento declarativo, la persistencia del carrito y el desplazamiento superior automático.
 */
export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistir cambios del carrito en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [cartItems]);

  // Manejador para añadir un producto al carrito
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          variant: product.variant || 'Estándar',
          price: product.price,
          quantity: product.quantity || 1,
          image: product.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  // Manejador para actualizar cantidad
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Manejador para eliminar un producto
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Manejador para checkout
  const handleCheckout = () => {
    alert('¡Redirigiendo a pasarela de pagos seguros!');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      {/* Utilidad de auto-scroll al inicio en cada cambio de ruta */}
      <ScrollToTop />

      <div className="bg-marca-crema text-marca-negro font-corporativa antialiased selection:bg-marca-primario selection:text-white flex flex-col min-h-screen">
        {/* 1. Navbar Atómico */}
        <Navbar
          announcementText={HERO_DATA.announcementText}
          links={NAV_LINKS}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 2. Contenido Principal con Rutas de la SPA */}
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/categoria/:categorySlug" element={<CategoryPage onAddToCart={handleAddToCart} />} />
            <Route path="/categoria-:categorySlug" element={<CategoryPage onAddToCart={handleAddToCart} />} />
            <Route path="/producto/:productSlug" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
            <Route path="/producto-:productSlug" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
            <Route path="/soporte-rastreo" element={<LegalPage title="Rastrea tu Pedido" />} />
            <Route path="/politica-garantia" element={<LegalPage title="Términos de Garantía" />} />
            <Route path="/politica-devoluciones" element={<LegalPage title="Políticas de Devolución" />} />
            <Route path="/politica-privacidad" element={<LegalPage title="Política de Privacidad" />} />
            <Route path="/admin" element={<AdminProducts />} />
          </Routes>
        </main>

        {/* 3. Footer Atómico */}
        <Footer
          aboutText={FOOTER_DATA.aboutText}
          categories={FOOTER_DATA.categories}
          support={FOOTER_DATA.support}
          socialLinks={FOOTER_DATA.socialLinks}
          copyrightText={FOOTER_DATA.copyrightText}
          paymentMethodsText={FOOTER_DATA.paymentMethodsText}
          onNewsletterSubmit={(email) => {
            console.log('Newsletter subscripción:', email);
          }}
        />

        {/* 4. Drawer de Carrito Interactivo */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        {/* 5. Botón Flotante WhatsApp */}
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}
