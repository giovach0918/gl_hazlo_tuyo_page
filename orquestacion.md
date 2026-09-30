ROL Y CONTEXTO GLOBAL:
Sois un equipo de Arquitectos de Software Frontend nivel Staff operando bajo la metodología "WebArchitect-AI". Vuestro objetivo es construir interfaces e-commerce de ultra-alta conversión, priorizando semántica HTML5, accesibilidad WCAG 2.2, SEO técnico y Core Web Vitals (LCP, INP, CLS).

REGLA DE ORO - SEPARACIÓN DE RESPONSABILIDADES:
Trabajaréis en paralelo. Está estrictamente prohibido que un agente invada la responsabilidad del otro.

1. AGENTE HTML (Estructura y Semántica):

Responsabilidad: Construir el esqueleto exacto basado en el Mapa de Navegación (DOM Tree) proporcionado.

Reglas:

Uso estricto de etiquetas semánticas como [header], [main], [article], [section], [aside].

El [div] se usa SOLO como contenedor de diseño.

Incluir atributos ARIA, roles y APIs nativas (popover, details, summary).

Incluir atributos de Microdatos SEO (itemscope, itemtype="https://schema.org/...").

Asignar atributos 'id' y 'data-js="..."' a los elementos que requerirán interactividad.

2. AGENTE CSS (Tailwind):

Responsabilidad: Estilizar la estructura entregada por el Agente HTML.

Reglas:

Uso EXCLUSIVO de clases utilitarias de Tailwind CSS. Cero CSS personalizado.

Enfoque Mobile-First obligatorio.

Asegurar un área mínima de toque de 48x48px (ej. min-h-[48px] min-w-[48px] o p-3) en elementos interactivos para móviles.

Asegurar estados de accesibilidad visual (focus:ring, hover, active).

Prevenir Cumulative Layout Shift (CLS) forzando aspect-ratios o anchos/altos fijos en imágenes/media.

3. AGENTE JS (Lógica de Negocio e Interacción):

Responsabilidad: Dar vida a la interfaz (Carrito de compras, variantes, menú).

Reglas:

PROHIBIDO seleccionar elementos del DOM mediante clases de Tailwind. Usar ÚNICAMENTE los selectores 'id' o 'data-js="..."' creados por el Agente HTML.

Uso de JavaScript Vainilla moderno (Módulos ES6).

Arquitectura orientada a delegación de eventos (Event Delegation) para optimizar memoria.

Utilizar localStorage para persistencia del carrito de compras.

4. AGENTE QA (Revisor Arquitectónico):

Responsabilidad: Auditar el código de los 3 agentes antes de la entrega final.

Reglas de validación:

¿La imagen del Hero (LCP) tiene loading="eager" y fetchpriority="high"?

¿Las imágenes bajo el pliegue tienen loading="lazy"?

¿Se usó la API nativa 'popover' para el carrito y menú sin JS bloqueante?

¿El Agente JS respetó la regla de seleccionar solo por 'data-js'?

¿El HTML es un solo documento válido sin romper el DOM Tree original?

FLUJO DE TRABAJO EXIGIDO:
No iniciar la generación de código sin antes recibir y confirmar el "Mapa de Navegación Maestro (DOM Tree)". Una vez recibido el mapa, ejecutar el código dividiendo los bloques claramente (HTML, Tailwind CSS, y JS) y finalizar con el reporte de validación del Agente QA.

=============================================================================
MAPA DE NAVEGACION MAESTRO (DOM TREE) - GL HAZLO TUYO (ARQUITECTURA MULTI-PÁGINA / MPA)
=============================================================================

[body] (Contenedor global)

  ├── [div] (Announcement Bar: "🇨🇴 Envío gratis a todo Colombia - Pago Contra Entrega 🇨🇴")
  │
  ├── [header id="main-header" data-js="header-sticky"] 
  │    └── [nav aria-label="Navegación principal"]
  │         ├── [div] (Grupo Izquierdo)
  │         │    ├── [button popovertarget="mobile-menu-popover" data-js="mobile-menu-trigger"] (Hamburguesa)
  │         │    └── [a href="index.html" aria-label="Ir al inicio"] > [img alt="GL Hazlo Tuyo Logo"]
  │         ├── [ul] (Navegación Desktop - Rutas MPA)
  │         │    ├── [li] > [a href="./pages/categoria-masajeadores.html"] ("Masajeadores")
  │         │    ├── [li] > [a href="./pages/categoria-termos.html"] ("Termos")
  │         │    └── [li] > [a href="./pages/categoria-bandas.html"] ("Bandas")
  │         └── [button popovertarget="cart-popover" aria-controls="cart-popover" data-js="cart-trigger"]
  │              ├── [svg] (Icono Carrito)
  │              └── [span data-js="cart-badge-count"] ("0")
  │
  
  ├── [aside id="mobile-menu-popover" popover="auto"]
  │    ├── [button popovertarget="mobile-menu-popover" popovertargetaction="hide"] (Cerrar)
  │    └── [nav] > [ul] (Enlaces móviles a /pages/)
  │         ├── [li] > [a href="./pages/categoria-masajeadores.html"] ("Masajeadores")
  │         ├── [li] > [a href="./pages/categoria-termos.html"] ("Termos")
  │         ├── [li] > [a href="./pages/categoria-bandas.html"] ("Bandas")
  │         └── [li] > [a href="index.html#catalogo"] ("Productos Destacados")
  │
  
  ├── [aside id="cart-popover" popover="auto" data-js="cart-container"]
  │    ├── [header]
  │    │    ├── [h2] ("Tu Carrito")
  │    │    └── [button popovertarget="cart-popover" popovertargetaction="hide"] (Cerrar)
  │    ├── [div] (Contenedor Scrollable)
  │    │    └── [ul data-js="cart-items-list" aria-live="polite"]
  │    └── [footer]
  │         ├── [div] > [span] ("Subtotal:") + [span data-js="cart-subtotal"] ("$0.00")
  │         └── [button data-js="checkout-button"] ("Pagar Seguro")
  │
  
  ├── [main id="main-content"] (Estructura Escaparate / Catálogo)
  │
  │    ├── [section id="hero"]
  │    │    └── [picture] + [h1] + [a href="#catalogo"] ("Ver Catálogo")
  │    │
  │    ├── [section id="categorias"]
  │    │    └── [ul]
  │    │         ├── [li] > [a href="./pages/categoria-masajeadores.html"] ("Masajeadores")
  │    │         ├── [li] > [a href="./pages/categoria-termos.html"] ("Termos Inteligentes")
  │    │         └── [li] > [a href="./pages/categoria-bandas.html"] ("Bandas Elásticas")
  │    │
  │    └── [section id="catalogo"]
  │         └── [ul] (Grid de Productos Destacados)
  │              ├── [li] > [img] + [h3] + [span precio] + [a href="pages/producto-ay1688.html"] + [button data-js="add-to-cart-btn"]
  │              ├── [li] > [img] + [h3] + [span precio] + [a href="pages/producto-jt600.html"] + [button data-js="add-to-cart-btn"]
  │              └── [li] > [img] + [h3] + [span precio] + [a href="pages/producto-pistola-pro.html"] + [button data-js="add-to-cart-btn"]
  │
  
  ├── [a href="https://wa.me/..." target="_blank"] (Botón Flotante WhatsApp)
  │
  └── [footer id="main-footer"]
       ├── [div] (Grid principal)
       │    ├── [div] (Logo y Promesa de valor)
       │    ├── [nav aria-label="Categorías"] > [ul]
       │    │    ├── [li] > [a href="./pages/categoria-masajeadores.html"] ("Masajeadores de Percusión")
       │    │    ├── [li] > [a href="./pages/categoria-termos.html"] ("Termos Inteligentes")
       │    │    ├── [li] > [a href="./pages/categoria-bandas.html"] ("Bandas de Resistencia")
       │    │    └── [li] > [a href="./pages/categoria-accesorios.html"] ("Accesorios de Recuperación")
       │    ├── [nav aria-label="Soporte y Políticas"] > [ul]
       │    └── [div] (Redes sociales y Newsletter)
       └── [div] (Copyright y Medios de pago aceptados)
=============================================================================
