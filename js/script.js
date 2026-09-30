/**
 * GL HAZLO TUYO - E-COMMERCE CORE JAVASCRIPT
 * Metodología: WebArchitect-AI
 * Rol: Agente JS (Lógica de Negocio e Interactividad Global)
 *
 * ARQUITECTURA MULTI-PÁGINA Y PROGRAMACIÓN DEFENSIVA:
 * - Diseñado para ejecutarse sin errores en cualquier página (Home, Categorías, Detalle, Soporte/Rastreo, 404).
 * - Todas las selecciones del DOM y listeners están protegidos con condicionales defensivos (if (!elemento) return;).
 * - Delegación de eventos (Event Delegation) en catálogo y controles del carrito.
 * - Simulador de Rastreo de Envíos en tiempo real con estado asíncrono y feedback realista.
 * - Motor de Carruseles con Auto-Play dinámico (4s), control por flechas y Pausa Inteligente (UX).
 *
 * REGLA DE ORO ARQUITECTÓNICA INQUEBRANTABLE:
 * Estrictamente prohibido usar clases CSS (Tailwind) en selectores DOM.
 * Enganche exclusivo mediante atributos data-js="..." o atributos id semánticos.
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. CONSTANTES, CONFIGURACIÓN Y SELECTORES DOM (SOLO data-js e ID)
     ========================================================================== */
  const STORAGE_KEY = 'gl_hazlo_tuyo_cart_state';

  const SELECTORS = {
    // Carrito y Popovers
    cartTrigger: '[data-js="cart-trigger"]',
    cartContainer: '[data-js="cart-container"]',
    cartItemsList: '[data-js="cart-items-list"]',
    cartSubtotal: '[data-js="cart-subtotal"]',
    cartBadgeCount: '[data-js="cart-badge-count"]',
    checkoutButton: '[data-js="checkout-button"]',
    cartItemRemove: '[data-js="cart-item-remove"]',
    cartItemQtyMinus: '[data-js="cart-item-qty-minus"]',
    cartItemQtyPlus: '[data-js="cart-item-qty-plus"]',

    // Botones de Añadir al Carrito (Catálogo y Detalle)
    addToCartBtn: '[data-js="add-to-cart-btn"]',

    // Galería de Producto (Páginas de Detalle)
    galleryThumbnails: '[data-js="gallery-thumbnails"]',
    thumbBtn: '[data-js="thumb-btn"]',
    mainProductImage: '#main-product-image',

    // Formulario de Compra y Selección (Páginas de Detalle)
    addToCartForm: '[data-js="add-to-cart-form"]',
    variantSelector: '[data-js="variant-selector"]',
    qtyMinus: '[data-js="qty-minus"]',
    qtyPlus: '[data-js="qty-plus"]',
    qtyInput: '#qty-input',
    productPrice: '[data-js="product-price"]',
    productName: '[itemprop="name"]',

    // Rastreador de Pedidos (soporte-rastreo.html)
    trackingForm: '[data-js="tracking-form"], #tracking-form',
    trackingResult: '#tracking-result, [data-js="tracking-result"]',
    trackingInput: '#tracking-input, [data-js="tracking-input"], input[name="order-id"], input[name="tracking-number"]',

    // Carruseles y Controles
    carouselContainers: '[data-carousel], [data-js="carousel"], [id^="carousel-"]',
    carouselNext: '[data-carousel-next]',
    carouselPrev: '[data-carousel-prev]',
  };

  /* ==========================================================================
     2. ESTADO GLOBAL DE LA APLICACIÓN (STATE MANAGEMENT)
     ========================================================================== */
  /**
   * Representación en memoria del carrito de compras.
   * Estructura de cada item:
   * {
   *   id: string,          // Identificador compuesto único
   *   name: string,        // Nombre del producto
   *   variant: string,     // Variante elegida (ej. "Negro Mate" o "Estándar")
   *   price: number,       // Valor numérico en COP
   *   quantity: number,    // Cantidad agregada
   *   image: string        // URL de la imagen del producto
   * }
   */
  let cartState = [];

  /**
   * Carga el estado del carrito desde localStorage de manera segura y defensiva.
   * @returns {Array} Colección de productos en el carrito.
   */
  const loadCartFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('[Cart State] Error al leer desde localStorage:', error);
      return [];
    }
  };

  /**
   * Guarda el estado del carrito en localStorage y dispara la reactividad visual.
   * @param {Array} nextState - Nuevo array de productos.
   */
  const saveCartToStorage = (nextState) => {
    cartState = nextState;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
    } catch (error) {
      console.error('[Cart State] Error al guardar en localStorage:', error);
    }
    renderCart();
  };

  /* ==========================================================================
     3. HELPERS Y UTILIDADES DE FORMATEO
     ========================================================================== */
  /**
   * Formatea un número al estándar monetario de Pesos Colombianos (COP).
   * @param {number} amount
   * @returns {string} Texto formateado (ej. "$ 149.900")
   */
  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  /**
   * Extrae el valor numérico entero a partir de un texto monetario (ej. "$149.900" -> 149900).
   * @param {string} text
   * @returns {number}
   */
  const parseCurrencyText = (text) => {
    if (!text) return 0;
    const digitsOnly = text.replace(/[^\d]/g, '');
    return parseInt(digitsOnly, 10) || 0;
  };

  /* ==========================================================================
     4. RENDERIZADO REACTIVO DEL CARRITO (PERSISTENCIA VISUAL GLOBAL)
     ========================================================================== */
  /**
   * Renderiza el estado del carrito en el DOM: lista de productos,
   * subtotal calculado y contador del badge.
   * Se ejecuta en cualquier página sin lanzar errores si algún componente no existe.
   */
  const renderCart = () => {
    const cartListEl = document.querySelector(SELECTORS.cartItemsList);
    const cartSubtotalEl = document.querySelector(SELECTORS.cartSubtotal);
    const cartBadgeEl = document.querySelector(SELECTORS.cartBadgeCount);
    const checkoutBtnEl = document.querySelector(SELECTORS.checkoutButton);

    const totalQuantity = cartState.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartState.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 1. Actualizar Badge de Contador (persistencia visual en el header de toda la tienda)
    if (cartBadgeEl) {
      cartBadgeEl.textContent = String(totalQuantity);
      cartBadgeEl.setAttribute('aria-label', `${totalQuantity} productos en el carrito`);
    }

    // 2. Actualizar Subtotal monetario
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = formatCOP(subtotal);
    }

    // 3. Habilitar/Deshabilitar botón de checkout según existencia de items
    if (checkoutBtnEl) {
      checkoutBtnEl.disabled = cartState.length === 0;
    }

    // 4. Renderizar Lista de Ítems en el Drawer del Carrito
    if (!cartListEl) return;

    if (cartState.length === 0) {
      cartListEl.innerHTML = `
        <li data-js="cart-empty" style="text-align: center; padding: 2.5rem 1rem; color: #64748b; list-style: none;">
          <svg style="margin: 0 auto 0.75rem auto; display: block; opacity: 0.6;" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p style="margin: 0; font-weight: 500;">Tu carrito está vacío</p>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem;">¡Añade productos a tu carrito y hazlo tuyo!</p>
        </li>
      `;
      return;
    }

    cartListEl.innerHTML = cartState
      .map(
        (item) => `
        <li data-js="cart-item" data-id="${item.id}" style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #e2e8f0; list-style: none; align-items: center;">
          <img src="${item.image}" alt="${item.name}" width="64" height="64" style="object-fit: cover; border-radius: 0.5rem; flex-shrink: 0;" />
          
          <div style="flex: 1; min-width: 0;">
            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; line-height: 1.3;">${item.name}</h4>
            <p style="margin: 0.15rem 0 0.5rem 0; font-size: 0.8rem; color: #64748b;">Variante: <strong>${item.variant}</strong></p>
            
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
              <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">${formatCOP(item.price * item.quantity)}</span>
              
              <div style="display: inline-flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 0.375rem; overflow: hidden;">
                <button type="button" data-js="cart-item-qty-minus" data-id="${item.id}" aria-label="Restar una unidad" style="min-width: 44px; min-height: 44px; background: #f8fafc; border: none; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;">-</button>
                <span style="padding: 0 0.5rem; font-size: 0.85rem; font-weight: 600;">${item.quantity}</span>
                <button type="button" data-js="cart-item-qty-plus" data-id="${item.id}" aria-label="Sumar una unidad" style="min-width: 44px; min-height: 44px; background: #f8fafc; border: none; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;">+</button>
              </div>
            </div>
          </div>

          <button type="button" data-js="cart-item-remove" data-id="${item.id}" aria-label="Eliminar producto" style="min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center; background: none; border: none; color: #94a3b8; cursor: pointer; margin-left: 0.25rem; flex-shrink: 0;" title="Eliminar del carrito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </li>
      `
      )
      .join('');
  };

  /* ==========================================================================
     5. LÓGICA DE NEGOCIO: SELECTOR DE CANTIDAD (PROGRAMACIÓN DEFENSIVA)
     ========================================================================== */
  const initQuantitySelector = () => {
    const minusBtn = document.querySelector(SELECTORS.qtyMinus);
    const plusBtn = document.querySelector(SELECTORS.qtyPlus);
    const qtyInput = document.querySelector(SELECTORS.qtyInput);

    // Si la página actual no tiene selector de cantidad (ej. Home o Categoría), salir limpiamente
    if (!qtyInput) return;

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        const currentVal = parseInt(qtyInput.value, 10) || 1;
        if (currentVal > 1) {
          qtyInput.value = currentVal - 1;
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        const currentVal = parseInt(qtyInput.value, 10) || 1;
        qtyInput.value = currentVal + 1;
      });
    }

    qtyInput.addEventListener('change', () => {
      const currentVal = parseInt(qtyInput.value, 10);
      if (isNaN(currentVal) || currentVal < 1) {
        qtyInput.value = 1;
      }
    });
  };

  /* ==========================================================================
     6. LÓGICA DE NEGOCIO: AÑADIR AL CARRITO (CATÁLOGO + PÁGINA DE DETALLE)
     ========================================================================== */
  const initAddToCart = () => {
    const form = document.querySelector(SELECTORS.addToCartForm);

    // 1. Manejo de formulario de Página de Detalle de Producto (PDP) con chequeo defensivo
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const checkedRadio = form.querySelector('input[name="variant"]:checked');
        const selectedVariant = checkedRadio ? checkedRadio.value : 'Estándar';

        const qtyInput = form.querySelector(SELECTORS.qtyInput);
        const quantity = Math.max(1, parseInt(qtyInput ? qtyInput.value : '1', 10) || 1);

        const nameEl = document.querySelector(SELECTORS.productName);
        const productName = nameEl ? nameEl.textContent.trim() : 'Pistola de Masaje Muscular Profundo Pro';

        const priceEl = document.querySelector(SELECTORS.productPrice);
        const unitPrice = parseCurrencyText(priceEl ? priceEl.textContent : '149900');

        const mainImgEl = document.querySelector(SELECTORS.mainProductImage);
        const imageUrl = mainImgEl ? (mainImgEl.getAttribute('src') || '') : '';

        const itemId = `gl-pdp-${selectedVariant.toLowerCase().replace(/\s+/g, '-')}`;

        addProductToCart({
          id: itemId,
          name: productName,
          variant: selectedVariant,
          price: unitPrice,
          quantity: quantity,
          image: imageUrl
        });

        if (qtyInput) {
          qtyInput.value = 1;
        }
      });
    }

    // 2. Delegación de eventos (Event Delegation) para botones del catálogo en el Home y categorías
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest(SELECTORS.addToCartBtn);
      if (!addBtn) return;

      // Si el botón está dentro de un formulario PDP, dejamos que el listener de submit lo procese
      if (addBtn.closest(SELECTORS.addToCartForm)) return;

      e.preventDefault();

      // Encontrar la tarjeta contenedora padre (.closest('li'))
      const card = addBtn.closest('li');

      // Capturar dinámicamente el título del producto (h3)
      const titleEl = card ? card.querySelector('h3') : null;
      const productName = titleEl
        ? titleEl.textContent.trim()
        : (addBtn.getAttribute('data-product-name') || 'Producto GL');

      // Capturar dinámicamente la imagen (img src)
      const imgEl = card ? card.querySelector('img') : null;
      const productImg = imgEl
        ? (imgEl.getAttribute('src') || '')
        : (addBtn.getAttribute('data-product-img') || '');

      // Capturar dinámicamente el precio
      let productPrice = 0;
      if (addBtn.hasAttribute('data-product-price')) {
        productPrice = parseInt(addBtn.getAttribute('data-product-price'), 10) || 0;
      }
      if (!productPrice && card) {
        const priceEl = card.querySelector(SELECTORS.productPrice) ||
          Array.from(card.querySelectorAll('span')).find((el) => el.textContent.includes('$'));
        if (priceEl) {
          productPrice = parseCurrencyText(priceEl.textContent);
        }
      }
      if (!productPrice) {
        productPrice = 79900;
      }

      // Variante y clave de identificación
      const productVariant = addBtn.getAttribute('data-product-variant') || 'Estándar';
      const rawId = addBtn.getAttribute('data-product-id');
      const productId = rawId || `gl-${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${productVariant.toLowerCase().replace(/\s+/g, '-')}`;

      // Crear objeto del producto, añadir al array cartState, persistir y abrir el popover
      addProductToCart({
        id: productId,
        name: productName,
        variant: productVariant,
        price: productPrice,
        quantity: 1,
        image: productImg
      });
    });
  };

  /**
   * Añade o incrementa un producto en el estado del carrito, persiste en localStorage
   * y abre el drawer del carrito invocando el método nativo .showPopover().
   * @param {Object} itemData
   */
  const addProductToCart = (itemData) => {
    const existingIndex = cartState.findIndex((item) => item.id === itemData.id);
    let nextCart;

    if (existingIndex > -1) {
      nextCart = cartState.map((item, idx) => {
        if (idx === existingIndex) {
          return { ...item, quantity: item.quantity + itemData.quantity };
        }
        return item;
      });
    } else {
      nextCart = [...cartState, itemData];
    }

    // Persistir y renderizar
    saveCartToStorage(nextCart);

    // Abrir el popover del carrito llamando a .showPopover() en [data-js="cart-container"]
    const cartContainer = document.querySelector(SELECTORS.cartContainer);
    if (cartContainer && typeof cartContainer.showPopover === 'function') {
      try {
        cartContainer.showPopover();
      } catch (err) {
        console.warn('[Cart Popover] No se pudo invocar showPopover():', err);
      }
    }
  };

  /* ==========================================================================
     7. DELEGACIÓN DE EVENTOS EN EL CARRITO (SUMAR, RESTAR, ELIMINAR, CHECKOUT)
     ========================================================================== */
  const initCartInteractions = () => {
    const cartListEl = document.querySelector(SELECTORS.cartItemsList);
    const checkoutBtn = document.querySelector(SELECTORS.checkoutButton);

    if (cartListEl) {
      cartListEl.addEventListener('click', (e) => {
        const removeBtn = e.target.closest(SELECTORS.cartItemRemove);
        const minusBtn = e.target.closest(SELECTORS.cartItemQtyMinus);
        const plusBtn = e.target.closest(SELECTORS.cartItemQtyPlus);

        if (removeBtn) {
          const itemId = removeBtn.getAttribute('data-id');
          if (!itemId) return;
          const updatedCart = cartState.filter((item) => item.id !== itemId);
          saveCartToStorage(updatedCart);
          return;
        }

        if (minusBtn) {
          const itemId = minusBtn.getAttribute('data-id');
          if (!itemId) return;
          const updatedCart = cartState
            .map((item) => {
              if (item.id === itemId) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            })
            .filter((item) => item.quantity > 0);
          saveCartToStorage(updatedCart);
          return;
        }

        if (plusBtn) {
          const itemId = plusBtn.getAttribute('data-id');
          if (!itemId) return;
          const updatedCart = cartState.map((item) => {
            if (item.id === itemId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          saveCartToStorage(updatedCart);
        }
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cartState.length === 0) return;
        const total = cartState.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`¡Gracias por tu compra en GL Hazlo Tuyo!\nTotal a pagar: ${formatCOP(total)}\nRedirigiendo a pasarela de pagos segura...`);
      });
    }
  };

  /* ==========================================================================
     8. GALERÍA DE PRODUCTO (PROGRAMACIÓN DEFENSIVA PARA MINIATURAS)
     ========================================================================== */
  const initProductGallery = () => {
    const thumbnailsContainer = document.querySelector(SELECTORS.galleryThumbnails);
    const mainImg = document.querySelector(SELECTORS.mainProductImage);

    // Si la página no contiene galería de producto, salir silenciosamente
    if (!thumbnailsContainer || !mainImg) return;

    thumbnailsContainer.addEventListener('click', (e) => {
      const thumbBtn = e.target.closest(SELECTORS.thumbBtn);
      if (!thumbBtn) return;

      const newSrc = thumbBtn.getAttribute('data-img-src');
      if (newSrc) {
        mainImg.setAttribute('src', newSrc);
        if (mainImg.parentElement) {
          const pictureSource = mainImg.parentElement.querySelector('source');
          if (pictureSource) {
            pictureSource.setAttribute('srcset', newSrc);
          }
        }
      }
    });
  };

  /* ==========================================================================
     9. SINCRONIZACIÓN ENTRE PESTAÑAS (STORAGE EVENT)
     ========================================================================== */
  const initStorageListener = () => {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        cartState = loadCartFromStorage();
        renderCart();
      }
    });
  };

  /* ==========================================================================
     10. LÓGICA DE NEGOCIO: RASTREADOR DE PEDIDOS (PROGRAMACIÓN DEFENSIVA)
     ========================================================================== */
  const initOrderTracking = () => {
    const trackingForm = document.querySelector(SELECTORS.trackingForm);
    const trackingResult = document.querySelector(SELECTORS.trackingResult);

    // Programación defensiva estricta: Si no existe en la página actual (ej. Home), salir inmediatamente
    if (!trackingForm) return;

    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!trackingResult) return;

      const inputEl =
        trackingForm.querySelector(SELECTORS.trackingInput) ||
        trackingForm.querySelector('input[type="text"]') ||
        trackingForm.querySelector('input');

      const rawValue = inputEl ? inputEl.value.trim() : '';
      const orderId = rawValue || 'GL-84920';

      const submitBtn =
        trackingForm.querySelector('button[type="submit"]') ||
        trackingForm.querySelector('button');

      if (submitBtn) {
        submitBtn.disabled = true;
      }

      // Estado 1: "Buscando..." durante 1.5 segundos (usando setTimeout)
      trackingResult.innerHTML = `
        <div class="bg-white rounded-3xl border border-marca-gris/20 p-8 sm:p-12 shadow-md flex flex-col items-center justify-center text-center gap-4 animate-pulse">
          <div class="w-12 h-12 border-4 border-marca-primario border-t-transparent rounded-full animate-spin"></div>
          <div>
            <p class="text-lg font-bold text-marca-negro">Buscando información de tu pedido...</p>
            <p class="text-sm text-marca-gris mt-1">Conectando con la transportadora para la guía <strong class="text-marca-negro font-mono">#${orderId.toUpperCase()}</strong></p>
          </div>
        </div>
      `;

      // Simulación de respuesta tras 1.5 segundos
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
        }

        // Inyectar en el DOM (dentro de #tracking-result) un diseño en Tailwind simulando un estado de envío realista
        trackingResult.innerHTML = `
          <div class="bg-white rounded-3xl border border-marca-gris/20 shadow-xl overflow-hidden transition-all duration-300">
            <!-- Encabezado de Estado -->
            <div class="bg-gradient-to-r from-marca-primario to-indigo-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 backdrop-blur-sm">
                  Guía Oficial Registrada
                </span>
                <h3 class="text-2xl font-black tracking-tight">Pedido #${orderId.toUpperCase()}</h3>
                <p class="text-sm text-white/80 mt-1">Modalidad: <strong class="text-white">Pago Contra Entrega Asegurado</strong></p>
              </div>
              <div class="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-4 py-2 rounded-2xl w-fit">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span class="text-sm font-black tracking-wide uppercase text-white">Estado: En tránsito</span>
              </div>
            </div>

            <!-- Datos Clave del Envío -->
            <div class="p-6 sm:p-8 border-b border-marca-gris/10 bg-marca-crema/40 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-semibold text-marca-gris uppercase tracking-wider">Transportadora</span>
                <span class="text-base font-bold text-marca-negro flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-marca-primario"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  Servientrega / Envía
                </span>
              </div>

              <div class="flex flex-col gap-1">
                <span class="text-xs font-semibold text-marca-gris uppercase tracking-wider">Última ubicación</span>
                <span class="text-base font-bold text-marca-negro flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-marca-primario"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Centro Logístico Bogotá
                </span>
              </div>

              <div class="flex flex-col gap-1">
                <span class="text-xs font-semibold text-marca-gris uppercase tracking-wider">Entrega Estimada</span>
                <span class="text-base font-bold text-marca-primario capitalize flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  24 a 48 Horas Hábiles
                </span>
              </div>
            </div>

            <!-- Línea de Tiempo del Despacho -->
            <div class="p-6 sm:p-8">
              <h4 class="text-sm font-bold text-marca-gris uppercase tracking-wider mb-6">Historial de Movimientos</h4>
              
              <ol class="relative border-l-2 border-marca-primario/30 ml-4 space-y-6">
                <!-- Paso 1: Completado -->
                <li class="pl-6 relative">
                  <span class="absolute -left-[9px] top-1 bg-emerald-500 rounded-full h-4 w-4 border-2 border-white shadow-sm flex items-center justify-center">
                    <svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 class="text-sm font-bold text-marca-negro">Orden Verificada y Empacada</h5>
                    <span class="text-xs text-marca-gris">GL Bodega Central</span>
                  </div>
                  <p class="text-xs text-marca-gris mt-0.5">Control de calidad y embalaje seguro aprobado.</p>
                </li>

                <!-- Paso 2: En curso -->
                <li class="pl-6 relative">
                  <span class="absolute -left-[9px] top-1 bg-marca-primario rounded-full h-4 w-4 border-2 border-white shadow-sm animate-pulse"></span>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 class="text-sm font-bold text-marca-primario">En tránsito hacia la ciudad de destino</h5>
                    <span class="text-xs font-semibold text-marca-primario">Hoy</span>
                  </div>
                  <p class="text-xs text-marca-gris mt-0.5">Guía despachada desde el Centro Logístico Bogotá hacia tu dirección de entrega.</p>
                </li>

                <!-- Paso 3: Pendiente -->
                <li class="pl-6 relative opacity-60">
                  <span class="absolute -left-[9px] top-1 bg-marca-gris/40 rounded-full h-4 w-4 border-2 border-white shadow-sm"></span>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 class="text-sm font-bold text-marca-negro">En reparto con mensajero local</h5>
                    <span class="text-xs text-marca-gris">Próximamente</span>
                  </div>
                  <p class="text-xs text-marca-gris mt-0.5">El repartidor se comunicará antes de la visita.</p>
                </li>

                <!-- Paso 4: Pendiente Final -->
                <li class="pl-6 relative opacity-60">
                  <span class="absolute -left-[9px] top-1 bg-marca-gris/40 rounded-full h-4 w-4 border-2 border-white shadow-sm"></span>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 class="text-sm font-bold text-marca-negro">Entrega y Pago Contra Entrega</h5>
                    <span class="text-xs text-marca-gris">Destino final</span>
                  </div>
                  <p class="text-xs text-marca-gris mt-0.5">Recepción del paquete y pago en efectivo o transferencia.</p>
                </li>
              </ol>

              <!-- Banner de Asistencia Directa -->
              <div class="mt-8 pt-6 border-t border-marca-gris/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-marca-crema/60 rounded-2xl p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-marca-negro">¿Tienes alguna duda con tu entrega?</p>
                    <p class="text-xs text-marca-gris">Atención prioritaria 24/7 en nuestra línea oficial de soporte.</p>
                  </div>
                </div>
                <a href="https://wa.me/573000000000?text=Hola%20GL%20Hazlo%20Tuyo,%20quiero%20soporte%20sobre%20mi%20guía%20${encodeURIComponent(orderId)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors whitespace-nowrap">
                  Contactar Asesor
                </a>
              </div>
            </div>
          </div>
        `;
      }, 1500);
    });
  };

  /* ==========================================================================
     11. MOTOR DE AUTO-PLAY Y BOTONES PARA CAROUSELS (PROGRAMACIÓN DEFENSIVA)
     ========================================================================== */
  const initCarousels = () => {
    // Buscar todos los contenedores de carrusel con scroll horizontal
    const carousels = document.querySelectorAll(SELECTORS.carouselContainers);

    // Salir limpiamente si no hay carruseles en la página actual
    if (!carousels || carousels.length === 0) return;

    carousels.forEach((carousel) => {
      let autoPlayInterval = null;
      const carouselId = carousel.getAttribute('id');

      // Calcular el ancho de tarjeta para scroll fluido
      const getCardWidth = () => {
        const firstCard = carousel.firstElementChild;
        if (firstCard && firstCard.clientWidth > 0) {
          return firstCard.clientWidth;
        }
        return carousel.clientWidth || 320;
      };

      // Desplazamiento hacia la derecha o retorno al inicio si llega al final
      const scrollNext = () => {
        const cardWidth = getCardWidth();
        // Si el carrusel llega al final (scrollLeft + clientWidth >= scrollWidth)
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      };

      // Desplazamiento hacia la izquierda
      const scrollPrev = () => {
        const cardWidth = getCardWidth();
        if (carousel.scrollLeft <= 10) {
          carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
      };

      // Iniciar el temporizador de Auto-Play cada 4000ms (4 segundos)
      const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(scrollNext, 4000);
      };

      // Detener el temporizador de Auto-Play
      const stopAutoPlay = () => {
        if (autoPlayInterval) {
          clearInterval(autoPlayInterval);
          autoPlayInterval = null;
        }
      };

      // Control de Flechas por atributos [data-carousel-next] y [data-carousel-prev]
      if (carouselId) {
        const nextBtns = document.querySelectorAll(`[data-carousel-next="${carouselId}"]`);
        const prevBtns = document.querySelectorAll(`[data-carousel-prev="${carouselId}"]`);

        nextBtns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollNext();
            startAutoPlay(); // Reinicia el ciclo tras interacción del usuario
          });
        });

        prevBtns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollPrev();
            startAutoPlay();
          });
        });
      }

      // Pausa Inteligente (UX):
      // mouseenter y touchstart detienen el auto-play
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('touchstart', stopAutoPlay, { passive: true });

      // mouseleave y touchend reanudan el setInterval
      carousel.addEventListener('mouseleave', startAutoPlay);
      carousel.addEventListener('touchend', startAutoPlay, { passive: true });

      // Pausar si la pestaña pierde el foco (optimización de recursos)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
      });

      // Iniciar auto-play
      startAutoPlay();
    });

    // Control adicional de flechas genéricas sin ID explícito (delegación defensiva)
    document.addEventListener('click', (e) => {
      const nextBtn = e.target.closest(SELECTORS.carouselNext);
      const prevBtn = e.target.closest(SELECTORS.carouselPrev);

      if (nextBtn && !nextBtn.getAttribute('data-carousel-next')) {
        e.preventDefault();
        const section = nextBtn.closest('section');
        const targetCarousel = section ? section.querySelector(SELECTORS.carouselContainers) : null;
        if (targetCarousel) {
          const cardWidth = targetCarousel.firstElementChild ? targetCarousel.firstElementChild.clientWidth : targetCarousel.clientWidth;
          if (targetCarousel.scrollLeft + targetCarousel.clientWidth >= targetCarousel.scrollWidth - 10) {
            targetCarousel.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            targetCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }

      if (prevBtn && !prevBtn.getAttribute('data-carousel-prev')) {
        e.preventDefault();
        const section = prevBtn.closest('section');
        const targetCarousel = section ? section.querySelector(SELECTORS.carouselContainers) : null;
        if (targetCarousel) {
          const cardWidth = targetCarousel.firstElementChild ? targetCarousel.firstElementChild.clientWidth : targetCarousel.clientWidth;
          if (targetCarousel.scrollLeft <= 10) {
            targetCarousel.scrollTo({ left: targetCarousel.scrollWidth, behavior: 'smooth' });
          } else {
            targetCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
          }
        }
      }
    });
  };

  /* ==========================================================================
     12. INICIALIZACIÓN GLOBAL DEFENSIVA
     ========================================================================== */
  const init = () => {
    // 1. Cargar estado inicial desde localStorage
    cartState = loadCartFromStorage();

    // 2. Persistencia Visual Inmediata: Pinta el contador y subtotal al cargar cualquier página
    renderCart();

    // 3. Inicializar módulos protegidos con programación defensiva
    initQuantitySelector();
    initAddToCart();
    initCartInteractions();
    initProductGallery();
    initOrderTracking();
    initCarousels();
    initStorageListener();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
