/**
 * API Service Client para GL Hazlo Tuyo
 * Conecta el frontend React con el backend de Node.js y MySQL
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  // 1. Obtener todos los productos (con filtros opcionales)
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/products${query ? `?${query}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener productos');
    return response.json();
  },

  // 2. Obtener un producto por su slug
  async getProductBySlug(slug) {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`);
    if (!response.ok) throw new Error(`Producto ${slug} no encontrado`);
    return response.json();
  },

  // 3. Obtener todas las categorías
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Error al obtener categorías');
    return response.json();
  }
};

export default api;
