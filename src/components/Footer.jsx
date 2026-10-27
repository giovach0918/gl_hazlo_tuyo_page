import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

/**
 * Footer Component
 * Pie de página nocturno corporativo GL (#0A0B26) con acentos luminosos de neón,
 * efecto glassmorphism en el newsletter, enlaces fluidos y alta legibilidad.
 *
 * @param {Object} props
 * @param {string} [props.logoSrc] Logotipo del footer.
 * @param {string} [props.aboutText] Breve descripción de la marca.
 * @param {Array<{ label: string, href: string }>} [props.categories] Enlaces de categorías.
 * @param {Array<{ label: string, href: string }>} [props.support] Enlaces legales y de soporte.
 * @param {Array<{ platform: string, href: string }>} [props.socialLinks] Redes sociales.
 * @param {(email: string) => void} [props.onNewsletterSubmit] Callback al enviar formulario de suscripción.
 * @param {string} [props.copyrightText] Mensaje de derechos reservados.
 * @param {string} [props.paymentMethodsText] Medios de pago aceptados.
 * @param {string} [props.className] Clases adicionales.
 */
export const Footer = ({
  logoSrc = 'https://placehold.co/180x50?text=GL+Hazlo+Tuyo',
  aboutText = 'Tu bienestar y rendimiento físico al siguiente nivel con tecnología y calidad garantizada.',
  categories = [],
  support = [],
  socialLinks = [],
  onNewsletterSubmit,
  copyrightText = '© 2026 GL Hazlo Tuyo. Todos los derechos reservados.',
  paymentMethodsText = 'Medios de pago seguros: PSE, Tarjetas de Crédito, Efecty, Contra Entrega',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    if (onNewsletterSubmit) {
      onNewsletterSubmit(email);
    }
    setSubscribed(true);
    setEmail('');
  };

  /**
   * Renderiza enlaces con micro-interacciones hover fluidas y soporte táctil
   */
  const renderNavList = (items) => (
    <ul className="flex flex-col gap-1 sm:gap-1.5">
      {items.map((item, idx) => {
        const isExternal = item.href?.startsWith('http') || item.href?.startsWith('//');
        const linkClasses = cn(
          'text-marca-crema/75 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-sm font-medium',
          'py-2 px-1 min-h-[48px] sm:min-h-0 sm:py-1 flex items-center',
          'focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-lg'
        );

        const innerContent = (
          <>
            <span>{item.label}</span>
            <span
              aria-hidden="true"
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 inline-block ml-1.5 text-indigo-400 group-hover:text-marca-primario font-bold"
            >
              →
            </span>
          </>
        );

        return (
          <li key={item.label || idx} className="group">
            {isExternal ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                {innerContent}
              </a>
            ) : (
              <Link to={item.href} className={linkClasses}>
                {innerContent}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <footer
      id="main-footer"
      className={cn(
        'bg-gradient-to-b from-[#0F113D] via-[#0A0B26] to-[#050614] text-marca-crema/70 pt-16 pb-8 relative overflow-hidden border-t border-indigo-950/60',
        className
      )}
    >
      {/* Línea Superior Decorativa: Destello brillante de neón corporativo */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-marca-primario to-transparent shadow-[0_0_15px_rgba(46,47,220,0.5)]" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
          {/* Columna 1: Marca y descripción */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <Link
              to="/"
              aria-label="Ir al inicio de GL Hazlo Tuyo"
              className="focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-xl block w-max min-h-[48px] min-w-[48px] flex items-center"
            >
              <img
                src={logoSrc}
                alt="GL Hazlo Tuyo Logo"
                width={180}
                height={50}
                loading="lazy"
                className="h-8 sm:h-9 w-auto object-contain invert opacity-95 hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-marca-crema/70 max-w-sm">
              {aboutText}
            </p>
          </div>

          {/* Columna 2: Categorías */}
          <nav aria-label="Categorías" className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-white font-black tracking-wider uppercase text-xs sm:text-sm drop-shadow-sm font-corporativa">
              Categorías
            </h3>
            {renderNavList(categories)}
          </nav>

          {/* Columna 3: Soporte y Políticas */}
          <nav aria-label="Soporte y Políticas" className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-white font-black tracking-wider uppercase text-xs sm:text-sm drop-shadow-sm font-corporativa">
              Soporte y Políticas
            </h3>
            {renderNavList(support)}
          </nav>

          {/* Columna 4: Newsletter y Redes */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-white font-black tracking-wider uppercase text-xs sm:text-sm drop-shadow-sm font-corporativa">
              Síguenos y Noticias
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-marca-crema/70">
              Suscríbete para recibir ofertas exclusivas y consejos de recuperación.
            </p>

            {subscribed ? (
              <div className="p-4 bg-marca-primario/20 border border-marca-primario/40 rounded-xl text-white text-xs sm:text-sm font-semibold text-center backdrop-blur-sm shadow-[0_0_15px_rgba(46,47,220,0.2)]">
                ¡Gracias por suscribirte! Revisa tu correo pronto.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  required
                  className={cn(
                    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-marca-crema/40',
                    'focus:outline-none focus:ring-2 focus:ring-marca-primario focus:border-transparent text-sm backdrop-blur-sm',
                    'transition-colors duration-200 min-h-[48px]'
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    'w-full bg-marca-primario hover:bg-indigo-600 text-white font-bold px-5 py-3 rounded-xl',
                    'shadow-[0_4px_15px_rgba(46,47,220,0.4)] hover:shadow-[0_6px_20px_rgba(46,47,220,0.6)] transition-all text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0B26] focus:ring-marca-primario',
                    'min-h-[48px] uppercase tracking-wider active:scale-95'
                  )}
                >
                  Suscribirme
                </button>
              </form>
            )}

            {/* Redes Sociales con efecto de resplandor */}
            <div className="flex items-center gap-3 mt-1 sm:mt-2">
              {socialLinks.map((social) => {
                const isInstagram = social.platform.toLowerCase().includes('instagram');
                const isFacebook = social.platform.toLowerCase().includes('facebook');
                const isTikTok = social.platform.toLowerCase().includes('tiktok');

                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className={cn(
                      'text-marca-crema/80 hover:text-white hover:-translate-y-1 hover:scale-110',
                      'hover:shadow-[0_0_15px_rgba(46,47,220,0.5)] transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-marca-primario rounded-full p-2.5',
                      'min-h-[48px] min-w-[48px] flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/25 backdrop-blur-sm'
                    )}
                  >
                    {isInstagram && (
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    )}
                    {isFacebook && (
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    )}
                    {isTikTok && (
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                      </svg>
                    )}
                    {!isInstagram && !isFacebook && !isTikTok && (
                      <span className="text-xs font-bold">{social.platform.slice(0, 2)}</span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Barra Inferior Copyright y Medios de Pago */}
        <div className="pt-8 border-t border-white/10 text-marca-crema/40 text-xs flex flex-col md:flex-row justify-between items-center gap-4 font-medium text-center md:text-left">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-2">
            <span>{paymentMethodsText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
