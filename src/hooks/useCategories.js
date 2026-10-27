import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../services/categoryService';

/**
 * Custom Hook para consultar y sincronizar categorías desde la API.
 *
 * @param {Object} [options={}]
 * @param {boolean} [options.autoFetch=true] - Ejecutar la consulta automáticamente al montar
 * @returns {{
 *   categories: Array<Object>,
 *   loading: boolean,
 *   error: string|null,
 *   refetch: () => Promise<void>
 * }}
 */
export const useCategories = ({ autoFetch = true } = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('[useCategories] Error al cargar categorías:', err);
      setError(err.message || 'Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchCategories();
    }
  }, [fetchCategories, autoFetch]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};

export default useCategories;
