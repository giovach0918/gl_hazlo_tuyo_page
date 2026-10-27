import React from 'react';
import { cn } from '../utils/cn';

/**
 * WhatsAppButton Component
 * Botón flotante de contacto directo a WhatsApp con micro-interacción expandible.
 *
 * @param {Object} props
 * @param {string} [props.phoneNumber] Número de WhatsApp (código de país incluido).
 * @param {string} [props.defaultMessage] Mensaje predeterminado de bienvenida.
 * @param {string} [props.className] Clases adicionales.
 */
export const WhatsAppButton = ({
  phoneNumber = '573000000000',
  defaultMessage = 'Hola GL Hazlo Tuyo, quiero más información sobre sus productos',
  className = '',
}) => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Atención al cliente por WhatsApp"
      className={cn(
        'fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] text-white rounded-full p-3.5 sm:p-4',
        'shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 sm:gap-3',
        'min-h-[48px] min-w-[48px] group focus:outline-none focus:ring-4 focus:ring-[#25D366]/50',
        className
      )}
    >
      <svg
        aria-hidden="true"
        width={26}
        height={26}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8"
      >
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.45 0 .09 5.36.09 11.96c0 2.11.55 4.17 1.6 6L0 24l6.23-1.63a11.9 11.9 0 0 0 5.83 1.51h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.44zm-8.46 18.39h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.75.98 1-3.66-.23-.38a9.92 9.92 0 0 1-1.52-5.24C2.14 6.49 6.58 2.05 12.06 2.05c2.65 0 5.14 1.03 7.01 2.9 1.87 1.88 2.9 4.37 2.9 7.01 0 5.48-4.44 9.91-9.91 9.91zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52-.18-.01-.38-.01-.58-.01-.2 0-.53.07-.8.37-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      </svg>
      <span className="hidden md:block font-bold text-sm sm:text-base max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
        Contactar por WhatsApp
      </span>
    </a>
  );
};
