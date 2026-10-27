/**
 * Utilidad ligera y robusta para combinar y condicionar clases de Tailwind CSS limpiamente.
 * Admite cadenas, objetos condicionales ({ 'clase': condicion }), arreglos y valores falsy.
 *
 * @param  {...any} inputs
 * @returns {string} Cadena de clases concatenadas y sanitizadas.
 */
export function cn(...inputs) {
  const classes = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

export const clsx = cn;
export default cn;
