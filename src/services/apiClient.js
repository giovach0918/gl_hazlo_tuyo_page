/**
 * Cliente HTTP base para el consumo de APIs en GL Hazlo Tuyo.
 * Construido sobre Fetch API con manejo centralizado de errores y encabezados JSON.
 */

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) ||
  '/api';

/**
 * Clase para tipar errores personalizados de API.
 */
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Petición centralizada con Fetch.
 *
 * @param {string} endpoint - Ruta relativa (ej: '/products')
 * @param {RequestInit} [options={}] - Opciones de fetch (method, body, headers, etc.)
 * @returns {Promise<any>}
 */
export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    // Si la respuesta no es 2xx, parsear error
    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch {
        // En caso de que el servidor no responda con JSON
      }

      const errorMessage =
        (errorData && (errorData.message || errorData.error)) ||
        `Error HTTP ${response.status}: ${response.statusText}`;

      throw new ApiError(errorMessage, response.status, errorData);
    }

    // Si no hay contenido (204 No Content)
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    // Errores de red o de parseo
    throw new ApiError(err.message || 'Error de conexión con el servidor', 0);
  }
}

export default apiClient;
