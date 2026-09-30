# GL Hazlo Tuyo - Landing Page E-Commerce

Proyecto frontend de alto rendimiento para la comercialización de productos de GL Hazlo Tuyo. Desarrollado bajo una arquitectura estricta de separación de responsabilidades utilizando agentes de Inteligencia Artificial (WebArchitect-AI).

## 🚀 Características Principales

* **Core Web Vitals Optimizados:** Priorización de carga de recursos críticos (LCP) con `fetchpriority="high"`, carga diferida (lazy loading) para elementos secundarios y mitigación de CLS mediante proporciones de imagen fijas.
* **UI/UX Mobile-First:** Maquetación fluida y responsiva construida 100% con utilidades de Tailwind CSS.
* **Carrito de Compras Reactivo:** Gestión de estado global y persistencia de datos mediante `localStorage` utilizando Vanilla JavaScript (ES6).
* **Accesibilidad (WCAG 2.2):** Implementación de la API nativa `popover` para overlays (menús y carrito) evitando trampas de foco de JS, junto con áreas mínimas de toque táctil (48x48px).
* **SEO Técnico:** Jerarquía de encabezados estructurada y microdatos enriquecidos (Schema.org) para optimización en motores de búsqueda.

## 🛠️ Stack Tecnológico

* **Estructura:** HTML5 Semántico
* **Estilos:** Tailwind CSS (vía CDN para desarrollo local)
* **Lógica:** Vanilla JavaScript (ES6 Modules)

## 📂 Estructura del Proyecto

```text
gl_hazlo_tuyo_page/
├── css/
│   └── style.css          # Reglas base y utilidades (si aplica localmente)
├── js/
│   └── script.js          # Lógica del carrito, persistencia y eventos
├── index.html             # Esqueleto semántico y clases de Tailwind
├── orquestacion.md        # Única Fuente de Verdad (Reglas de Arquitectura)
└── README.md              # Documentación del proyecto