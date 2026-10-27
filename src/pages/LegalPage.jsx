import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function LegalPage({ title, content }) {
  const location = useLocation();
  const path = location.pathname.toLowerCase().replace(/\/$/, '');

  // Detectar la vista legal activa según la URL o el título recibido
  const isTracking =
    path.includes('soporte-rastreo') ||
    path.includes('rastreo') ||
    title?.toLowerCase().includes('rastrea');

  const isWarranty =
    path.includes('politica-garantia') ||
    path.includes('garantia') ||
    title?.toLowerCase().includes('garantía');

  const isReturns =
    path.includes('politica-devoluciones') ||
    path.includes('devoluciones') ||
    title?.toLowerCase().includes('devolución');

  const isPrivacy =
    path.includes('politica-privacidad') ||
    path.includes('privacidad') ||
    title?.toLowerCase().includes('privacidad');

  // Estado del simulador de rastreo
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsSearching(true);
    setTrackingResult(null);

    // Simular búsqueda realista de 1.2 segundos
    setTimeout(() => {
      setIsSearching(false);
      setTrackingResult({
        orderId: trackingNumber.trim().toUpperCase(),
        status: 'En Camino (Despachado)',
        courier: 'Coordinadora / Servientrega',
        location: 'Centro Logístico Principal - Bogotá D.C.',
        estimatedDelivery: '24 a 48 Horas Hábiles',
        history: [
          {
            title: 'Orden Confirmada y Facturada',
            location: 'Bodega GL Hazlo Tuyo',
            time: 'Ayer, 09:30 AM',
            done: true,
          },
          {
            title: 'En Camino (Despachado)',
            location: 'Centro Logístico Coordinadora / Servientrega',
            time: 'Hoy, 06:15 AM',
            done: true,
            current: true,
          },
          {
            title: 'Entregado al Cliente',
            location: 'Dirección de destino',
            time: 'Pendiente de entrega',
            done: false,
          },
        ],
      });
    }, 1200);
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Migas de Pan */}
        <nav
          aria-label="Migas de pan"
          className="mb-8 flex items-center flex-wrap gap-2 text-sm text-zinc-500 font-medium"
        >
          <Link to="/" className="hover:text-marca-primario transition-colors">
            Inicio
          </Link>
          <span className="text-zinc-400">/</span>
          <span className="text-zinc-900 font-bold">
            {isTracking
              ? 'Rastreo de Pedidos'
              : isWarranty
              ? 'Términos de Garantía'
              : isReturns
              ? 'Políticas de Devolución'
              : isPrivacy
              ? 'Política de Privacidad'
              : title || 'Políticas'}
          </span>
        </nav>

        {/* Tarjeta Contenedora Principal */}
        <article className="w-full bg-white shadow-xl shadow-marca-negro/5 rounded-3xl border border-zinc-100 p-6 sm:p-10 md:p-14">
          {/* =========================================================================
              VISTA 1: RASTREADOR DE PEDIDOS (/soporte-rastreo)
             ========================================================================= */}
          {isTracking && (
            <div>
              <header className="mb-8 text-center border-b border-zinc-100 pb-8">
                <span className="inline-flex items-center gap-2 bg-marca-primario/10 text-marca-primario border border-marca-primario/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                  Soporte Logístico Oficial
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                  Rastrea tu Pedido
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-marca-primario to-indigo-400 rounded-full mx-auto mt-4"></div>
                <p className="text-zinc-600 text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
                  Ingresa tu número de guía o el código de tu pedido para conocer en tiempo real el
                  estado de tu despacho.
                </p>
              </header>

              {/* Formulario de Rastreo */}
              <div className="max-w-xl mx-auto">
                <form
                  onSubmit={handleTrackSubmit}
                  className="flex flex-col gap-4 bg-zinc-50 p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-inner"
                >
                  <label
                    htmlFor="tracking-input"
                    className="text-left font-bold text-zinc-900 text-sm"
                  >
                    Número de Guía o Pedido
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      id="tracking-input"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Ej: GL-123456"
                      required
                      className="flex-1 bg-white border border-zinc-300 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:border-marca-primario focus:ring-2 focus:ring-marca-primario/30 min-h-[48px] text-base"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="bg-marca-primario hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marca-primario min-h-[48px] whitespace-nowrap shadow-md flex items-center justify-center gap-2"
                    >
                      {isSearching ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Buscando...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            aria-hidden="true"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          <span>Buscar</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Estado de Carga */}
                {isSearching && (
                  <div className="mt-8 bg-white rounded-3xl border border-zinc-200 p-8 shadow-md flex flex-col items-center justify-center text-center gap-4 animate-pulse">
                    <div className="w-12 h-12 border-4 border-marca-primario border-t-transparent rounded-full animate-spin"></div>
                    <div>
                      <p className="text-lg font-bold text-marca-negro">
                        Consultando con la transportadora...
                      </p>
                      <p className="text-sm text-marca-gris mt-1">
                        Verificando el estado de la guía en el sistema nacional.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tarjeta de Resultado */}
                {trackingResult && !isSearching && (
                  <div className="mt-8 bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden transition-all duration-300">
                    {/* Encabezado del Estado */}
                    <div className="bg-gradient-to-r from-marca-primario to-indigo-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 backdrop-blur-sm">
                          Guía Oficial Registrada
                        </span>
                        <h3 className="text-2xl font-black tracking-tight">
                          Pedido #{trackingResult.orderId}
                        </h3>
                        <p className="text-xs text-white/80 mt-1">
                          Servicio con Pago Contra Entrega activo
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 px-4 py-2 rounded-xl backdrop-blur-md w-fit">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-black tracking-wide uppercase text-white">
                          Estado: {trackingResult.status}
                        </span>
                      </div>
                    </div>

                    {/* Datos Clave */}
                    <div className="p-6 sm:p-8 border-b border-zinc-100 bg-zinc-50/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          Transportadora
                        </span>
                        <span className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
                          <svg
                            aria-hidden="true"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-marca-primario shrink-0"
                          >
                            <rect x="1" y="3" width="15" height="13" />
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                          </svg>
                          {trackingResult.courier}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          Última Ubicación
                        </span>
                        <span className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
                          <svg
                            aria-hidden="true"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-marca-primario shrink-0"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {trackingResult.location}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          Entrega Estimada
                        </span>
                        <span className="text-sm sm:text-base font-bold text-marca-primario flex items-center gap-2">
                          <svg
                            aria-hidden="true"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="shrink-0"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {trackingResult.estimatedDelivery}
                        </span>
                      </div>
                    </div>

                    {/* Línea de Tiempo Visual: 1. Confirmado -> 2. En Tránsito -> 3. Entregado */}
                    <div className="p-6 sm:p-8 text-left">
                      <h4 className="text-sm font-bold text-zinc-700 uppercase tracking-wider mb-6">
                        Línea de Tiempo del Envío
                      </h4>

                      <div className="relative border-l-2 border-marca-primario/30 ml-4 space-y-8">
                        {/* 1. Confirmado */}
                        <div className="pl-6 relative">
                          <span className="absolute -left-[11px] top-0.5 bg-emerald-500 rounded-full h-5 w-5 border-2 border-white shadow-sm flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className="text-sm font-bold text-zinc-900">1. Confirmado</h5>
                            <span className="text-xs text-zinc-400">Bodega GL Hazlo Tuyo</span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Pedido preparado, embalado y entregado a la transportadora.
                          </p>
                        </div>

                        {/* 2. En Tránsito (Paso actual) */}
                        <div className="pl-6 relative">
                          <span className="absolute -left-[11px] top-0.5 bg-marca-primario rounded-full h-5 w-5 border-2 border-white shadow-sm flex items-center justify-center text-white animate-pulse">
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                          </span>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className="text-sm font-bold text-marca-primario">
                              2. En Tránsito (Despachado)
                            </h5>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              En Movimiento
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 mt-0.5">
                            El paquete viaja hacia la ciudad de destino con Coordinadora / Servientrega.
                          </p>
                        </div>

                        {/* 3. Entregado */}
                        <div className="pl-6 relative">
                          <span className="absolute -left-[11px] top-0.5 bg-zinc-300 rounded-full h-5 w-5 border-2 border-white shadow-sm flex items-center justify-center text-white">
                            <span className="h-2 w-2 rounded-full bg-zinc-100"></span>
                          </span>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className="text-sm font-bold text-zinc-400">3. Entregado</h5>
                            <span className="text-xs text-zinc-400">Dirección de Entrega</span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            El mensajero entregará el paquete y recaudará el valor Contra Entrega.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              VISTA 2: TÉRMINOS DE GARANTÍA (/politica-garantia)
             ========================================================================= */}
          {isWarranty && (
            <div className="text-left space-y-8">
              <header className="text-center border-b border-zinc-100 pb-8">
                <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                  Garantía Oficial Directa
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                  Términos de Garantía
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-marca-primario to-indigo-400 rounded-full mx-auto mt-4"></div>
                <p className="text-zinc-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                  Todos nuestros productos cuentan con respaldo oficial y garantía por defectos de
                  fabricación.
                </p>
              </header>

              {/* Tabla Oficial de Garantías */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3 border-l-4 border-marca-primario pl-4">
                  1. Tabla Oficial de Cobertura
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/80 text-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-wider border-b border-zinc-200">
                        <th className="py-4 px-6">Línea de Producto</th>
                        <th className="py-4 px-6">Garantía Oficial</th>
                        <th className="py-4 px-6">Cobertura Detallada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-sm text-zinc-700">
                      <tr className="hover:bg-zinc-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-zinc-900 flex items-center gap-2">
                          <span>💆‍♂️</span> Masajeadores y Dispositivos Electrónicos
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block bg-indigo-50 text-indigo-700 font-black px-3 py-1 rounded-full border border-indigo-200 text-xs sm:text-sm">
                            6 Meses
                          </span>
                        </td>
                        <td className="py-4 px-6 text-zinc-600">
                          Fallas en motor, batería interna, pantalla digital o circuitos electrónicos.
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-zinc-900 flex items-center gap-2">
                          <span>🌡️</span> Termos Inteligentes
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block bg-indigo-50 text-indigo-700 font-black px-3 py-1 rounded-full border border-indigo-200 text-xs sm:text-sm">
                            3 Meses
                          </span>
                        </td>
                        <td className="py-4 px-6 text-zinc-600">
                          Fallas en la pantalla táctil LED de temperatura, sellado hermético o vacío.
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-zinc-900 flex items-center gap-2">
                          <span>🧘</span> Bandas Elásticas y Accesorios
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block bg-indigo-50 text-indigo-700 font-black px-3 py-1 rounded-full border border-indigo-200 text-xs sm:text-sm">
                            1 Mes
                          </span>
                        </td>
                        <td className="py-4 px-6 text-zinc-600">
                          Defectos de fábrica en el material elástico, costuras o acabados estructurales.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Condiciones de Cobertura */}
              <div className="space-y-4 pt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3 border-l-4 border-marca-primario pl-4">
                  2. Condiciones para Hacer Efectiva la Garantía
                </h2>
                <ul className="space-y-3 pl-4 text-zinc-600 text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
                    <span>
                      El daño debe ser comprobable como un defecto de fábrica y no por golpes, inmersión no autorizada, sobrevoltaje o mal uso.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
                    <span>
                      Presentar el comprobante de compra digital, número de guía o número de pedido.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
                    <span>
                      Conservar los accesorios y la caja original del producto para el proceso de inspección técnica.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Botón directo a WhatsApp para reclamos */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
                <div>
                  <h3 className="text-lg font-bold text-emerald-950">
                    ¿Necesitas radicar una solicitud de garantía?
                  </h3>
                  <p className="text-sm text-emerald-800 mt-1 max-w-lg">
                    Nuestro equipo de soporte técnico resolverá tu solicitud en un plazo máximo de 2 a 5 días hábiles.
                  </p>
                </div>
                <a
                  href="https://wa.me/573000000000?text=Hola%20GL%20Hazlo%20Tuyo,%20quiero%20radicar%20una%20solicitud%20de%20garant%C3%ADa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-3 min-h-[48px] whitespace-nowrap text-sm sm:text-base active:scale-95"
                >
                  <svg
                    aria-hidden="true"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.45 0 .09 5.36.09 11.96c0 2.11.55 4.17 1.6 6L0 24l6.23-1.63a11.9 11.9 0 0 0 5.83 1.51h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.44zm-8.46 18.39h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.75.98 1-3.66-.23-.38a9.92 9.92 0 0 1-1.52-5.24C2.14 6.49 6.58 2.05 12.06 2.05c2.65 0 5.14 1.03 7.01 2.9 1.87 1.88 2.9 4.37 2.9 7.01 0 5.48-4.44 9.91-9.91 9.91zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52-.18-.01-.38-.01-.58-.01-.2 0-.53.07-.8.37-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                  </svg>
                  <span>Reclamar por WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* =========================================================================
              VISTA 3: POLÍTICAS DE DEVOLUCIÓN (/politica-devoluciones)
             ========================================================================= */}
          {isReturns && (
            <div className="text-left space-y-8">
              <header className="text-center border-b border-zinc-100 pb-8">
                <span className="inline-flex items-center gap-2 bg-indigo-500/10 text-marca-primario border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                  Estatuto del Consumidor
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                  Políticas de Devolución y Retracto
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-marca-primario to-indigo-400 rounded-full mx-auto mt-4"></div>
                <p className="text-zinc-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                  Conoce tus derechos como consumidor y los pasos para solicitar un cambio o reembolso.
                </p>
              </header>

              {/* 1. Derecho de Retracto (5 días hábiles) */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3 border-l-4 border-marca-primario pl-4">
                  1. Derecho de Retracto (5 Días Hábiles)
                </h2>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 leading-relaxed text-sm sm:text-base">
                  <p>
                    De acuerdo con el <strong>artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor de Colombia)</strong>,
                    el cliente tiene derecho a ejercer el derecho de retracto dentro de los{' '}
                    <strong>5 (cinco) días hábiles</strong> siguientes a la entrega física del producto.
                  </p>
                </div>
              </div>

              {/* 2. Requisitos de Empaque y Conservación */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3 border-l-4 border-marca-primario pl-4">
                  2. Requisitos Estrictos de Empaque
                </h2>
                <ul className="space-y-3 pl-4 text-zinc-600 text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-marca-primario font-bold text-lg leading-none">●</span>
                    <span>
                      <strong>Producto sin uso:</strong> El artículo debe encontrarse completamente nuevo, sin marcas de uso ni manchas.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-marca-primario font-bold text-lg leading-none">●</span>
                    <span>
                      <strong>Empaque y accesorios intactos:</strong> Debe incluir su caja original, sellos de seguridad, manuales, cables y todos los componentes incluidos en el envío.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-marca-primario font-bold text-lg leading-none">●</span>
                    <span>
                      <strong>Excepción de Higiene y Cuidado Personal:</strong> Por razones sanitarias y de bioseguridad, los masajeadores faciales o de contacto directo no admiten retracto si sus precintos higiénicos fueron retirados o el dispositivo fue encendido.
                    </span>
                  </li>
                </ul>
              </div>

              {/* 3. Reembolsos */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3 border-l-4 border-marca-primario pl-4">
                  3. Plazo y Reembolsos de Dinero
                </h2>
                <p className="text-zinc-600 leading-relaxed text-base">
                  Una vez recibido el producto en nuestra central y comprobado su estado original,
                  GL Hazlo Tuyo procederá a reintegrar la totalidad del dinero sin deducciones en un
                  plazo máximo de <strong>10 a 15 días hábiles</strong> a través de transferencia bancaria
                  o reverso a la pasarela de pago.
                </p>
              </div>
            </div>
          )}

          {/* =========================================================================
              VISTA 4: POLÍTICA DE PRIVACIDAD (/politica-privacidad)
             ========================================================================= */}
          {isPrivacy && (
            <div className="text-left space-y-8">
              <header className="text-center border-b border-zinc-100 pb-8">
                <span className="inline-flex items-center gap-2 bg-indigo-500/10 text-marca-primario border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                  Protección de Datos Personales
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                  Política de Privacidad y Tratamiento de Datos
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-marca-primario to-indigo-400 rounded-full mx-auto mt-4"></div>
                <p className="text-zinc-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                  Tratamiento de datos personales regulado bajo la legislación colombiana vigente.
                </p>
              </header>

              {/* Marco Legal: Ley 1581 de 2012 */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3 border-l-4 border-marca-primario pl-4">
                  1. Marco Legal: Ley 1581 de 2012
                </h2>
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 text-indigo-950 leading-relaxed text-sm sm:text-base">
                  <p>
                    En cumplimiento de la <strong>Ley Estatutaria 1581 de 2012</strong> y su Decreto Reglamentario
                    1377 de 2013 de la República de Colombia, <strong>GL Hazlo Tuyo</strong> actúa como responsable
                    del tratamiento de los datos personales suministrados por sus clientes, garantizando los
                    principios de confidencialidad, seguridad y libertad.
                  </p>
                </div>
              </div>

              {/* Finalidades del Tratamiento */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3 border-l-4 border-marca-primario pl-4">
                  2. Finalidades del Tratamiento de Datos
                </h2>
                <ul className="space-y-3 pl-4 text-zinc-600 text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-marca-primario font-bold text-lg leading-none">●</span>
                    <span>
                      Gestionar, despachar y cobrar los pedidos adquiridos bajo la modalidad de <strong>Pago Contra Entrega</strong> a través de nuestras empresas de transporte aliadas (Coordinadora, Servientrega, Envia).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-marca-primario font-bold text-lg leading-none">●</span>
                    <span>
                      Notificar al usuario el número de guía, estado del envío y actualizaciones de entrega por WhatsApp, SMS y correo electrónico.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-marca-primario font-bold text-lg leading-none">●</span>
                    <span>
                      Atender solicitudes de soporte, reclamaciones de garantía y derecho de retracto.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Derechos del Titular (Habeas Data) */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3 border-l-4 border-marca-primario pl-4">
                  3. Derechos del Titular (Habeas Data)
                </h2>
                <p className="text-zinc-600 leading-relaxed text-base">
                  Como titular de sus datos personales, usted tiene derecho a conocer, actualizar, rectificar y
                  solicitar la supresión de su información de nuestras bases de datos en cualquier momento.
                  Para ejercer sus derechos de Habeas Data, puede escribirnos a{' '}
                  <strong className="text-zinc-900 font-semibold">privacidad@glhazlotuyo.com</strong> o contactar a
                  nuestro canal de atención oficial.
                </p>
              </div>
            </div>
          )}

          {/* =========================================================================
              CONTENIDO GENÉRICO / FALLBACK (Si ninguna ruta legal coincide)
             ========================================================================= */}
          {!isTracking && !isWarranty && !isReturns && !isPrivacy && (
            <div className="text-left space-y-6">
              <h1 className="text-3xl sm:text-4xl font-black text-marca-negro tracking-tight mb-6">
                {title || 'Políticas y Soporte'}
              </h1>
              <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-4 font-medium">
                {content || (
                  <>
                    <p>
                      En <strong>GL Hazlo Tuyo</strong> garantizamos la calidad y originalidad de cada
                      uno de nuestros productos. Ofrecemos cobertura de garantía directa por defectos
                      de fábrica y soporte continuo.
                    </p>
                    <p>
                      Para cualquier consulta o solicitud de cambio, nuestro canal de atención al
                      cliente en WhatsApp está disponible de lunes a sábado con cobertura a nivel
                      nacional y servicio de Pago Contra Entrega.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
