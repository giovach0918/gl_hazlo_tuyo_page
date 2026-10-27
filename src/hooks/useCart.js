import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Custom Hook para interactuar con el estado global del carrito.
 *
 * @returns {{
 *   items: Array<Object>,
 *   isOpen: boolean,
 *   totalCount: number,
 *   subtotal: number,
 *   addItem: (product: Object, quantity?: number, autoOpen?: boolean) => void,
 *   removeItem: (id: string) => void,
 *   updateQuantity: (id: string, quantity: number) => void,
 *   incrementQuantity: (id: string) => void,
 *   decrementQuantity: (id: string) => void,
 *   clearCart: () => void,
 *   openCart: () => void,
 *   closeCart: () => void,
 *   toggleCart: () => void
 * }}
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un <CartProvider>');
  }

  return context;
};

export default useCart;
