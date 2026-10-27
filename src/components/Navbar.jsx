import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

/**
 * Navbar Component
 * Encabezado de navegación responsive con barra de anuncios, menú móvil y disparador de carrito.
 * Conectado reactivamente con CartContext y react-router-dom (Link / NavLink).
 *
 * @param {Object} [props]
 * @param {string} [props.announcementText] Texto de la barra superior de anuncios.
 * @param {string} [props.logoSrc] Ruta de la imagen del logotipo.
 * @param {Array<{ id: string, label: string, href: string }>} [props.links] Enlaces principales de navegación.
 * @param {number} [props.cartCount] Cantidad de productos en el carrito.
 * @param {() => void} [props.onOpenCart] Manejador para abrir el drawer.
 */
export const Navbar = ({
  announcementText = '🇨🇴 Envío gratis a todo Colombia - Pago Contra Entrega 🇨🇴',
  logoSrc = 'https://placehold.co/180x50?text=GL+Hazlo+Tuyo',
  links = [],
  cartCount: propCartCount,
  onOpenCart: propOnOpenCart,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Conectar defensivamente con CartContext
  let cart = null;
  try {
    cart = useCart();
  } catch {
    // Si se utiliza aislado sin Provider
  }

  const cartCount = propCartCount !== undefined ? propCartCount : cart?.totalCount ?? 0;
  const onOpenCart = propOnOpenCart || cart?.openCart || (() => {});

  return (
    <>
      {/* Barra de Anuncios Superior */}
      {announcementText && (
        <div className="bg-marca-primario text-white text-xs sm:text-sm font-bold py-2 text-center tracking-wide min-h-[40px] flex items-center justify-center">
          <p>{announcementText}</p>
        </div>
      )}

      {/* Encabezado Principal Sticky */}
      <header className="sticky top-0 z-40 bg-marca-crema/95 backdrop-blur-md border-b border-marca-gris/20 shadow-sm">
        <nav aria-label="Navegación principal" className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Botón Hamburger Móvil */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              className="lg:hidden p-2 -ml-2 text-marca-gris hover:text-marca-negro focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-md min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Logotipo enlazado con <Link to="/"> */}
            <Link
              to="/"
              aria-label="Ir al inicio"
              className="block focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-md min-h-[48px] flex items-center"
            >
              <img
                src={logoSrc}
                alt="GL Hazlo Tuyo Logo"
                width={180}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Menú Desktop con <NavLink> */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.id || link.label}>
                <NavLink
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-colors py-2 px-3 focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-md min-h-[48px] flex items-center ${
                      isActive
                        ? 'text-marca-primario border-b-2 border-marca-primario'
                        : 'text-marca-gris hover:text-marca-primario'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Botón del Carrito */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Ver carrito de compras"
            className="relative p-2 text-marca-gris hover:text-marca-negro focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-md min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors"
          >
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute top-1 right-1 bg-marca-primario text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          </button>
        </nav>
      </header>

      {/* Menú Lateral Móvil con Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop con desenfoque */}
          <div
            className="fixed inset-0 bg-marca-negro/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Lateral */}
          <aside
            aria-label="Menú de navegación móvil"
            className="fixed inset-y-0 left-0 w-72 bg-marca-crema shadow-2xl p-6 h-full border-r border-marca-gris/20 z-10 flex flex-col justify-between"
          >
            <div>
              {/* Botón Cerrar */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="p-2 text-marca-gris hover:text-marca-negro focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-md min-h-[48px] min-w-[48px] flex items-center justify-center bg-marca-negro/5 hover:bg-marca-negro/10 transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Lista de Enlaces Móviles con <NavLink> y cierre automático */}
              <nav className="mt-8">
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.id || link.label}>
                      <NavLink
                        to={link.href}
                        end={link.href === '/'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block py-3 px-4 text-base font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-marca-primario transition-colors min-h-[48px] flex items-center ${
                            isActive
                              ? 'text-marca-primario bg-marca-primario/10 font-black'
                              : 'text-marca-negro hover:bg-marca-primario/10 hover:text-marca-primario'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                  <li className="my-2 border-t border-marca-gris/10" role="separator" />
                  <li>
                    <Link
                      to="/#catalogo"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-sm font-semibold text-marca-gris hover:bg-marca-negro/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-marca-primario transition-colors min-h-[48px] flex items-center"
                    >
                      Productos Destacados
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="text-xs text-marca-gris/60 text-center pt-4 border-t border-marca-gris/10">
              GL Hazlo Tuyo &copy; 2026
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
