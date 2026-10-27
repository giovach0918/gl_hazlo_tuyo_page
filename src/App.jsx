import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Footer,
  CartDrawer,
  WhatsAppButton,
} from './components';
import { Home } from './pages';
import {
  NAV_LINKS,
  HERO_DATA,
  FOOTER_DATA,
} from './data/mockData';

const LOCAL_STORAGE_KEY = 'gl_hazlo_tuyo_cart_state';

/**
 * App Component
 * Orquestador principal de la aplicación React de GL Hazlo Tuyo.
 * Gestiona el estado reactivo del carrito y distribuye datos por props hacia los componentes atómicos.
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
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          variant: product.variant || 'Estándar',
          price: product.price,
          quantity: 1,
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
    <div className="bg-marca-crema text-marca-negro font-corporativa antialiased selection:bg-marca-primario selection:text-white flex flex-col min-h-screen">
      {/* 1. Navbar Atómico */}
      <Navbar
        announcementText={HERO_DATA.announcementText}
        links={NAV_LINKS}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Vista Principal (Home) */}
      <Home onAddToCart={handleAddToCart} />

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
  );
}
