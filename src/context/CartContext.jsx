import React, { createContext, useReducer, useEffect, useMemo, useCallback } from 'react';

/**
 * Clave de persistencia en localStorage
 */
const STORAGE_KEY = 'gl_hazlo_tuyo_cart_state';

/**
 * Acciones soportadas por el Reducer del Carrito
 */
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  OPEN_CART: 'OPEN_CART',
  CLOSE_CART: 'CLOSE_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  SYNC_FROM_STORAGE: 'SYNC_FROM_STORAGE',
};

/**
 * Estado inicial por defecto
 */
const initialState = {
  items: [],
  isOpen: false,
};

/**
 * Carga inicial perezosa y segura desde localStorage
 * @param {Object} defaultState
 * @returns {Object}
 */
const initializeState = (defaultState) => {
  if (typeof window === 'undefined') return defaultState;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    const parsed = JSON.parse(stored);
    return {
      ...defaultState,
      items: Array.isArray(parsed) ? parsed : [],
    };
  } catch (err) {
    console.error('[CartContext] Error al leer el carrito de localStorage:', err);
    return defaultState;
  }
};

/**
 * Reducer puro del Carrito (Sin manipulación de DOM)
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, autoOpen = true } = action.payload;
      const parsedQty = Math.max(1, Number(quantity) || 1);

      // Clave única basada en ID o ID + variante
      const itemId = product.variant && !product.id.includes(product.variant)
        ? `${product.id}-${product.variant.toLowerCase().replace(/\s+/g, '-')}`
        : product.id;

      const existingIndex = state.items.findIndex((item) => item.id === itemId);

      let nextItems;
      if (existingIndex > -1) {
        nextItems = state.items.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + parsedQty }
            : item
        );
      } else {
        const newItem = {
          id: itemId,
          name: product.name || 'Producto GL',
          variant: product.variant || 'Estándar',
          price: Number(product.price) || 0,
          quantity: parsedQty,
          image: product.image || '',
        };
        nextItems = [...state.items, newItem];
      }

      return {
        ...state,
        items: nextItems,
        isOpen: autoOpen ? true : state.isOpen,
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const targetQty = Number(quantity);

      if (targetQty <= 0) {
        // Si la cantidad es 0 o menor, se remueve el producto
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: targetQty } : item
        ),
      };
    }

    case CART_ACTIONS.INCREMENT_QUANTITY: {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    case CART_ACTIONS.DECREMENT_QUANTITY: {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id === id) {
              const nextQty = item.quantity - 1;
              return nextQty > 0 ? { ...item, quantity: nextQty } : null;
            }
            return item;
          })
          .filter(Boolean),
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
    }

    case CART_ACTIONS.OPEN_CART: {
      return {
        ...state,
        isOpen: true,
      };
    }

    case CART_ACTIONS.CLOSE_CART: {
      return {
        ...state,
        isOpen: false,
      };
    }

    case CART_ACTIONS.TOGGLE_CART: {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }

    case CART_ACTIONS.SYNC_FROM_STORAGE: {
      return {
        ...state,
        items: Array.isArray(action.payload) ? action.payload : [],
      };
    }

    default:
      return state;
  }
};

/**
 * Contexto de React para el Carrito
 */
export const CartContext = createContext(null);

/**
 * CartProvider Component
 * Envoltorio global que provee el estado reactivo del carrito a toda la aplicación.
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, initializeState);

  // Persistencia reactiva en localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (err) {
      console.error('[CartContext] Error al guardar en localStorage:', err);
    }
  }, [state.items]);

  // Sincronización entre pestañas (evento storage)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          dispatch({
            type: CART_ACTIONS.SYNC_FROM_STORAGE,
            payload: Array.isArray(parsed) ? parsed : [],
          });
        } catch {
          // Ignorar si el JSON recibido es inválido
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Métodos de despacho memoizados para evitar renders innecesarios
  const addItem = useCallback((product, quantity = 1, autoOpen = true) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, autoOpen },
    });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id },
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity },
    });
  }, []);

  const incrementQuantity = useCallback((id) => {
    dispatch({
      type: CART_ACTIONS.INCREMENT_QUANTITY,
      payload: { id },
    });
  }, []);

  const decrementQuantity = useCallback((id) => {
    dispatch({
      type: CART_ACTIONS.DECREMENT_QUANTITY,
      payload: { id },
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.OPEN_CART });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLOSE_CART });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  }, []);

  // Cálculos derivados memoizados (totalCount y subtotal)
  const totalCount = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const subtotal = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      totalCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      state.items,
      state.isOpen,
      totalCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
