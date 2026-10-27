import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

/**
 * Custom Hook para consultar y sincronizar productos desde la API.
 *
 * @param {Object} [options={}]
 * @param {string} [options.category] - Filtrar por categoría
 * @param {boolean} [options.featured] - Filtrar solo productos destacados
 * @param {string} [options.search] - Filtrar por texto de búsqueda
 * @param {boolean} [options.autoFetch=true] - Ejecutar la consulta automáticamente al montar
 * @returns {{
 *   products: Array<Object>,
 *   loading: boolean,
 *   error: string|null,
 *   refetch: () => Promise<void>
 * }}
 */
export const useProducts = ({
  category,
  featured,
  search,
  autoFetch = true,
} = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts({ category, featured, search });
      setProducts(data);
    } catch (err) {
      console.error('[useProducts] Error al cargar productos:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  }, [category, featured, search]);

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [fetchProducts, autoFetch]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};

export default useProducts;
