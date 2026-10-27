/**
 * Formatea un valor numérico a formato de moneda colombiana (COP)
 * @param {number} value
 * @returns {string} Ejemplo: "$89.900"
 */
export const formatCurrency = (value) => {
  if (typeof value !== 'number') return '$0';
  return `$${value.toLocaleString('es-CO')}`;
};
