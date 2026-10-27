/**
 * Servicio para el consumo de Categorías (/api/categories)
 * Conecta con el backend Node.js / MySQL y provee fallbacks controlados.
 */

import { apiClient } from './apiClient';
import { CATEGORIES_DATA } from '../data/mockData';

export const categoryService = {
  /**
   * Obtiene la lista completa de categorías disponibles.
   *
   * @param {boolean} [useFallback=true] - Si falla el backend, usar mockData
   * @returns {Promise<Array<Object>>}
   */
  async getCategories(useFallback = true) {
    try {
      const data = await apiClient('/categories');
      return Array.isArray(data) ? data : data.categories || [];
    } catch (error) {
      if (useFallback) {
        console.warn('[categoryService.getCategories] Backend no disponible, usando CATEGORIES_DATA:', error.message);
        return CATEGORIES_DATA;
      }
      throw error;
    }
  },

  /**
   * Obtiene el detalle de una categoría por su ID.
   *
   * @param {string|number} id
   * @param {boolean} [useFallback=true]
   * @returns {Promise<Object>}
   */
  async getCategoryById(id, useFallback = true) {
    try {
      return await apiClient(`/categories/${id}`);
    } catch (error) {
      if (useFallback) {
        console.warn(`[categoryService.getCategoryById] Backend no disponible para id: ${id}`);
        const found = CATEGORIES_DATA.find((c) => c.id === id || c.href?.includes(id));
        if (found) return found;
      }
      throw error;
    }
  },
};

export default categoryService;
