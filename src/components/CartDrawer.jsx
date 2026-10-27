import React, { useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { cn } from '../utils/cn';

/**
 * CartDrawer Component
 * Panel lateral deslizable para gestión del carrito de compras con animaciones fluidas y accesibilidad táctil.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen Estado de visibilidad del drawer.
 * @param {() => void} props.onClose Callback para cerrar el drawer.
 * @param {Array<{ id: string, name: string, variant: string, price: number, quantity: number, image: string }>} props.items Lista de artículos en el carrito.
 * @param {(id: string, newQty: number) => void} [props.onUpdateQuantity] Callback al incrementar/reducir cantidad.
 * @param {(id: string) => void} [props.onRemoveItem] Callback al eliminar un producto.
 * @param {() => void} [props.onCheckout] Callback al pulsar "Pagar Seguro".
 */
export const CartDrawer = ({
  isOpen = false,
  onClose = () => {},
  items = [],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onCheckout = () => {},
}) => {
  // Prevenir scroll en el body y escuchar tecla Escape
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
      className={cn(
        'fixed inset-0 z-50 flex justify-end transition-all duration-300 ease-in-out',
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      )}
    >
      {/* Backdrop con desenfoque y animación de opacidad */}
      <div
        className={cn(
          'fixed inset-0 bg-marca-negro/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel Deslizable Lateral */}
      <aside
        className={cn(
          'relative w-full sm:w-[420px] max-w-full bg-marca-crema shadow-2xl h-full max-h-screen border-l border-marca-gris/20 z-10 flex flex-col justify-between',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Cabecera del Carrito */}
        <header className="p-4 sm:p-6 border-b border-marca-gris/20 flex items-center justify-between bg-marca-crema shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-corporativa font-black text-marca-negro">Tu Carrito</h2>
            <span className="text-xs font-bold text-marca-primario bg-marca-primario/10 px-2.5 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
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
        </header>

        {/* Lista de Productos o Estado Vacío */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white divide-y divide-marca-gris/10">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-5">
              <div className="w-20 h-20 rounded-full bg-marca-primario/10 flex items-center justify-center text-marca-primario">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-9 h-9"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-marca-negro">Tu carrito está vacío</p>
                <p className="text-sm text-marca-gris max-w-xs leading-relaxed">
                  Explora nuestros masajeadores, termos y accesorios diseñados para potenciar tu recuperación.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-marca-primario text-white font-bold text-sm rounded-xl hover:bg-indigo-600 transition-colors shadow-md active:scale-95"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <ul aria-live="polite" className="flex flex-col gap-5 pt-1">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 pb-5 items-center last:pb-0"
                >
                  {/* Imagen de Producto */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-marca-crema border border-marca-gris/15 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Detalles y Acciones */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-marca-negro line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className="text-xs text-marca-gris mt-0.5">
                          Variante: <span className="font-medium text-marca-negro/80">{item.variant}</span>
                        </p>
                      )}
                      <p className="text-base font-black text-marca-primario mt-1.5">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    {/* Controles de Cantidad y Eliminación */}
                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-marca-gris/5">
                      <div className="flex items-center border border-marca-gris/25 rounded-xl bg-marca-crema/40 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label={`Reducir cantidad de ${item.name}`}
                          className={cn(
                            'p-2 min-h-[38px] min-w-[38px] flex items-center justify-center text-marca-negro font-bold transition-colors',
                            'hover:bg-marca-primario/10 active:bg-marca-primario/20 disabled:opacity-25 disabled:cursor-not-allowed'
                          )}
                        >
                          -
                        </button>
                        <span className="px-3 min-w-[28px] text-center text-xs font-bold text-marca-negro">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center text-marca-negro font-bold transition-colors hover:bg-marca-primario/10 active:bg-marca-primario/20"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Eliminar ${item.name} del carrito`}
                        className="text-xs font-bold text-red-500 hover:text-red-700 min-h-[40px] px-2 flex items-center transition-colors underline decoration-red-300 underline-offset-4"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer del Carrito con Subtotal y Checkout */}
        <footer className="p-4 sm:p-6 border-t border-marca-gris/20 bg-marca-crema flex flex-col gap-4 shrink-0 shadow-lg">
          <div className="flex items-center justify-between text-lg font-bold text-marca-negro">
            <span className="text-marca-gris text-base font-semibold">Subtotal estimado:</span>
            <span className="text-xl font-black text-marca-primario">{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-marca-gris -mt-1">
            <span>Envío a toda Colombia:</span>
            <span className="text-emerald-600 font-bold uppercase tracking-wide">¡Gratis Hoy!</span>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={items.length === 0}
            className={cn(
              'w-full bg-marca-primario hover:bg-indigo-600 text-white font-black py-4 px-4 rounded-xl shadow-lg',
              'hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marca-primario',
              'transition-all duration-200 transform active:scale-[0.98] min-h-[48px] flex items-center justify-center uppercase tracking-wide text-sm sm:text-base',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none'
            )}
          >
            Pagar Seguro (Contra Entrega)
          </button>
        </footer>
      </aside>
    </div>
  );
};
