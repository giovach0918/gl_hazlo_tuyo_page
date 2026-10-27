/**
 * Servicio para el consumo de la entidad Productos (/api/products)
 * Conecta con el backend Node.js / MySQL y provee fallbacks controlados.
 */

import { apiClient, ApiError } from './apiClient';
import { PRODUCTS_DATA } from '../data/mockData';

export const productService = {
  /**
   * Obtiene la lista de productos con filtros opcionales.
   *
   * @param {Object} [filters={}]
   * @param {string} [filters.category] - Filtrar por categoría
   * @param {boolean} [filters.featured] - Solo destacados
   * @param {string} [filters.search] - Búsqueda por término
   * @param {boolean} [filters.useFallback=true] - Si falla el backend, usar mockData
   * @returns {Promise<Array<Object>>}
   */
  async getProducts({ category, featured, search, useFallback = true } = {}) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (featured !== undefined) params.append('featured', String(featured));
    if (search) params.append('search', search);

    const queryString = params.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';

    try {
      const data = await apiClient(endpoint);
      return Array.isArray(data) ? data : data.products || [];
    } catch (error) {
      if (useFallback) {
        console.warn('[productService.getProducts] Fallo la llamada al backend, usando mockData:', error.message);
        let fallback = [...PRODUCTS_DATA];
        if (category) {
          fallback = fallback.filter((p) => p.category.toLowerCase() === category.toLowerCase());
        }
        if (search) {
          const s = search.toLowerCase();
          fallback = fallback.filter((p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
        }
        return fallback;
      }
      throw error;
    }
  },

  /**
   * Obtiene un producto por su ID o slug.
   *
   * @param {string|number} id - Identificador del producto
   * @param {boolean} [useFallback=true]
   * @returns {Promise<Object>}
   */
  async getProductById(id, useFallback = true) {
    try {
      return await apiClient(`/products/${id}`);
    } catch (error) {
      if (useFallback) {
        console.warn(`[productService.getProductById] Backend no disponible para id: ${id}, usando mockData.`);
        const found = PRODUCTS_DATA.find((p) => p.id === id || p.detailsUrl?.includes(id));
        if (found) return found;
      }
      throw error;
    }
  },
};

export default productService;
