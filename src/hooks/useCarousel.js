import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom Hook para el control de carruseles en React.
 * Respeta la regla estricta de CERO manipulación global del DOM (sin document.querySelector/getElementById).
 * Todo control se realiza a través de React Refs y estado declarativo.
 *
 * @param {Object} [options={}]
 * @param {boolean} [options.autoPlay=true] - Habilitar auto-play automático
 * @param {number} [options.interval=4000] - Intervalo en milisegundos (4000ms por defecto)
 * @param {number} [options.gap=24] - Margen/gap estimado entre tarjetas en píxeles
 * @returns {{
 *   carouselRef: React.MutableRefObject<any>,
 *   next: () => void,
 *   prev: () => void,
 *   pause: () => void,
 *   resume: () => void,
 *   isPaused: boolean,
 *   handlers: {
 *     onMouseEnter: () => void,
 *     onMouseLeave: () => void,
 *     onTouchStart: () => void,
 *     onTouchEnd: () => void
 *   }
 * }}
 */
export const useCarousel = ({
  autoPlay = true,
  interval = 4000,
  gap = 24,
} = {}) => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Obtiene el paso de scroll a partir de la primera tarjeta hijo o del ancho del contenedor
  const getScrollStep = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return 300;

    const firstCard = el.firstElementChild;
    if (firstCard && firstCard.clientWidth > 0) {
      return firstCard.clientWidth + gap;
    }
    return el.clientWidth || 300;
  }, [gap]);

  // Desplazamiento hacia la derecha o reinicio suave al inicio
  const next = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const step = getScrollStep();
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

    if (isAtEnd) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' });
    }
  }, [getScrollStep]);

  // Desplazamiento hacia la izquierda o al final si está al inicio
  const prev = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const step = getScrollStep();
    const isAtStart = el.scrollLeft <= 10;

    if (isAtStart) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -step, behavior: 'smooth' });
    }
  }, [getScrollStep]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  // Motor de Auto-Play con Pausa Inteligente
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, next]);

  // Pausa automática cuando la pestaña pierde visibilidad
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Handlers para eventos de interacción en el contenedor
  const handlers = {
    onMouseEnter: pause,
    onMouseLeave: resume,
    onTouchStart: pause,
    onTouchEnd: resume,
  };

  return {
    carouselRef,
    next,
    prev,
    pause,
    resume,
    isPaused,
    handlers,
  };
};

export default useCarousel;
