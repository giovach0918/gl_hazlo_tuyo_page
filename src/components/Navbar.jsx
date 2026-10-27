import React, { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

/**
 * Navbar Component
 * Encabezado de navegación responsive con barra de anuncios, menú móvil fluido y disparador de carrito.
 *
 * @param {Object} props
 * @param {string} [props.announcementText] Texto de la barra superior de anuncios.
 * @param {string} [props.logoSrc] Ruta de la imagen del logotipo.
 * @param {Array<{ id: string, label: string, href: string }>} [props.links] Enlaces principales de navegación.
 * @param {number} [props.cartCount=0] Cantidad de productos en el carrito.
 * @param {() => void} [props.onOpenCart] Manejador para abrir el drawer del carrito.
 */
export const Navbar = ({
  announcementText = '🇨🇴 Envío gratis a todo Colombia - Pago Contra Entrega 🇨🇴',
  logoSrc = 'https://placehold.co/180x50?text=GL+Hazlo+Tuyo',
  links = [],
  cartCount = 0,
  onOpenCart = () => {},
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevenir scroll en el fondo y capturar tecla Escape cuando el menú móvil esté abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Barra de Anuncios Superior */}
      {announcementText && (
        <div className="bg-marca-primario text-white text-xs sm:text-sm font-bold py-2.5 px-4 text-center tracking-wide min-h-[40px] flex items-center justify-center shadow-inner">
          <p className="line-clamp-1">{announcementText}</p>
        </div>
      )}

      {/* Encabezado Principal Sticky */}
      <header className="sticky top-0 z-40 bg-marca-crema/95 backdrop-blur-md border-b border-marca-gris/20 shadow-sm transition-all duration-200">
        <nav
          aria-label="Navegación principal"
          className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Botón Hamburger Móvil */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className={cn(
                'lg:hidden p-2.5 -ml-2 text-marca-gris hover:text-marca-negro focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-xl',
                'min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors active:scale-95 hover:bg-marca-negro/5'
              )}
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Logotipo */}
            <a
              href="/"
              aria-label="Ir al inicio de GL Hazlo Tuyo"
              className="group focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-xl min-h-[48px] flex items-center py-1 transition-transform group-hover:scale-[1.02]"
            >
              <img
                src={logoSrc}
                alt="GL Hazlo Tuyo Logo"
                width={180}
                height={50}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </a>
          </div>

          {/* Menú Desktop */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {links.map((link) => (
              <li key={link.id || link.label}>
                <a
                  href={link.href}
                  className={cn(
                    'text-sm font-bold text-marca-gris hover:text-marca-primario hover:bg-marca-primario/5',
                    'transition-all duration-200 py-2.5 px-4 rounded-xl min-h-[48px] flex items-center',
                    'focus:outline-none focus:ring-2 focus:ring-marca-primario'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Botón del Carrito */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Ver carrito de compras con ${cartCount} productos`}
            className={cn(
              'relative p-2.5 text-marca-gris hover:text-marca-negro focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-xl',
              'min-h-[48px] min-w-[48px] flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-marca-negro/5'
            )}
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

            {/* Contador Dinámico */}
            <span
              className={cn(
                'absolute top-1.5 right-1.5 bg-marca-primario text-white text-[10px] font-black h-4 min-w-[16px] px-1 rounded-full',
                'flex items-center justify-center shadow-md transition-transform duration-300',
                cartCount > 0 ? 'scale-100' : 'scale-90 opacity-90'
              )}
            >
              {cartCount}
            </span>
          </button>
        </nav>
      </header>

      {/* Menú Lateral Móvil con Backdrop y Transición Fluida */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        )}
      >
        {/* Backdrop con desenfoque */}
        <div
          className={cn(
            'fixed inset-0 bg-marca-negro/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer Lateral Deslizable */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-marca-crema shadow-2xl p-6 h-full border-r border-marca-gris/20 z-10 flex flex-col justify-between',
            'transform transition-transform duration-300 ease-in-out',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div>
            {/* Cabecera del Menú Móvil con Botón Cerrar */}
            <div className="flex items-center justify-between pb-4 border-b border-marca-gris/10">
              <span className="font-corporativa font-black text-marca-negro text-lg tracking-tight">
                Menú
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú móvil"
                className={cn(
                  'p-2.5 text-marca-gris hover:text-marca-negro focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-xl',
                  'min-h-[48px] min-w-[48px] flex items-center justify-center bg-white border border-marca-gris/15 shadow-sm',
                  'transition-all duration-200 hover:bg-marca-negro/5 active:scale-95'
                )}
              >
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
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

            {/* Lista de Enlaces Móviles */}
            <nav className="mt-6">
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.id || link.label}>
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'py-3.5 px-4 text-base font-bold text-marca-negro rounded-xl',
                        'hover:bg-marca-primario/10 hover:text-marca-primario transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-marca-primario min-h-[48px] flex items-center'
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="my-2 border-t border-marca-gris/10" role="separator" />
                <li>
                  <a
                    href="#catalogo"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'py-3.5 px-4 text-sm font-semibold text-marca-gris rounded-xl',
                      'hover:bg-marca-negro/5 hover:text-marca-negro transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-marca-primario min-h-[48px] flex items-center'
                    )}
                  >
                    Ver Catálogo Completo
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-xs text-marca-gris/70 text-center pt-4 border-t border-marca-gris/10">
            GL Hazlo Tuyo &copy; 2026
          </div>
        </aside>
      </div>
    </>
  );
};
