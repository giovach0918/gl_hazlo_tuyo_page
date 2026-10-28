# 🚀 GL Hazlo Tuyo - E-Commerce React (SPA)

Plataforma e-commerce moderna, modular y de alto rendimiento para **GL Hazlo Tuyo**, especializada en tecnología para el bienestar, masajeadores ergonómicos, hidratación activa y accesorios de recuperación física.

Construida bajo el estándar **SPA (Single Page Application)** con **React 18 + Vite + Tailwind CSS**, integrando un catálogo completo de 12 productos, enrutamiento dinámico, simulador de rastreo de pedidos y arquitectura preparada para conexión con backend en **Node.js y MySQL**.

---

## 🌟 Características Principales

* ⚡ **Arquitectura React SPA:** Navegación instantánea sin recarga de página mediante `react-router-dom` v6.
* 📦 **Catálogo Completo (12 Productos):** Distribución equitativa en 4 categorías oficiales:
  * **Masajeadores:** Masajeador Facial (AY-1688), Masajeador de Cuello (JT-600), Pistola de Masaje Pro.
  * **Termos e Hidratación:** Termo Inteligente LED 500ml, Termo Deportivo Inox 1L, Botella Motivacional 2L.
  * **Bandas de Resistencia:** Set x 5 Bandas Látex, Banda de Tela Antideslizante, Kit Bandas Tubulares.
  * **Accesorios:** Foam Roller Texturizado, Pelota de Masaje de Corcho, Tapete de Yoga Pro 6mm.
* 🛒 **Carrito de Compras Reactivo:** Persistencia en `localStorage`, selector dinámico de cantidades, variantes y cálculo de subtotales en tiempo real.
* 🚚 **Soporte y Rastreo Interactivo:** Simulador de seguimiento de pedidos en `/soporte-rastreo` con timeline en tiempo real (*Coordinadora / Servientrega*).
* 📜 **Políticas y Garantías Adaptadas a Colombia:** Cobertura de garantía (6, 3 y 1 mes), derecho de retracto (5 días hábiles) y Ley 1581 de protección de datos.
* 🎨 **Diseño "Elegancia Nocturna GL":** Paleta corporativa con acentos en Morado GL (`#2E2FDC`), fondo nocturno sofisticado (`#0A0B26`), efectos glassmorphism y micro-interacciones hover.
* ♿ **Accesibilidad y Core Web Vitals:** Áreas mínimas de toque táctil de 48x48px (WCAG 2.2), prevención de saltos de diseño (CLS) con aspect ratios fijos y carga optimizada de recursos.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Framework / Biblioteca** | React 18.3 |
| **Empaquetador y Servidor Dev** | Vite 5.4 |
| **Enrutamiento** | React Router DOM v6 |
| **Estilos y Diseño UI** | Tailwind CSS v3 + PostCSS + Autoprefixer |
| **Gestión de Estado** | React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`) |
| **Almacenamiento de Assets** | `public/assets/` (Rutas absolutas blindadas para SPA) |
| **Backend Preparado** | Node.js + Express + MySQL (`schema.sql` listo) |

---

## 📂 Arquitectura del Proyecto

```text
gl_hazlo_tuyo_page/
├── index.html                   # Entry point de Vite con <div id="root"></div>
├── vite.config.js               # Configuración oficial de Vite + Plugin React
├── tailwind.config.js           # Paleta corporativa (#2E2FDC, #0A0B26) y tipografías
├── postcss.config.js            # Plugins PostCSS
├── package.json                 # Dependencias y scripts npm
│
├── public/                      # Assets estáticos servidos en la raíz
│   └── assets/                  # 26 fotografías y banners (Hero.jpg, prod-*.jpg)
│
├── src/
│   ├── components/              # Componentes atómicos reutilizables
│   │   ├── Navbar.jsx           # Encabezado sticky, menú responsive y badge de carrito
│   │   ├── Footer.jsx           # Footer corporativo "Elegancia Nocturna"
│   │   ├── HeroBanner.jsx       # Banner de conversión con overlay profundo
│   │   ├── CategoryCarousel.jsx # Carrusel con scroll snap de categorías
│   │   ├── ProductCarousel.jsx  # Carrusel y grid de productos destacados
│   │   ├── ProductCard.jsx      # Tarjeta de producto con precios COP y acciones
│   │   ├── CartDrawer.jsx       # Carrito lateral deslizable interactivo
│   │   ├── VideoSection.jsx     # Sección de video demostrativo de productos
│   │   ├── TestimonialsSection.jsx # Prueba social y comentarios de clientes
│   │   └── WhatsAppButton.jsx   # Botón flotante para atención directa
│   │
│   ├── pages/                   # Vistas principales enrutadas
│   │   ├── Home.jsx             # Portada principal
│   │   ├── CategoryPage.jsx     # Catálogo filtrado por categoría
│   │   ├── ProductDetailPage.jsx# Ficha técnica individual con variantes y badges
│   │   ├── LegalPage.jsx        # Vistas de soporte, rastreador y políticas
│   │   └── AdminProducts.jsx    # Panel de administración de inventario
│   │
│   ├── data/
│   │   └── mockData.js          # Datos normalizados de los 12 productos y navegación
│   │
│   ├── context/
│   │   └── CartContext.jsx      # Estado global del carrito de compras
│   │
│   ├── services/
│   │   └── api.js               # Cliente HTTP hacia API Node.js / MySQL
│   │
│   ├── utils/
│   │   └── ScrollToTop.jsx      # Reseteo de scroll automático al cambiar de vista
│   │
│   ├── App.jsx                  # Enrutador principal SPA (<BrowserRouter>)
│   ├── main.jsx                 # Montaje en el DOM
│   └── index.css                # Directivas Tailwind y Google Fonts
│
└── orquestacion.md              # Documentación de reglas y arquitectura WebArchitect-AI
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
* Node.js v18.0 o superior instalado.
* Gestor de paquetes npm o yarn.

### 1. Clonar el repositorio
```bash
git clone https://github.com/giovach0918/gl_hazlo_tuyo_page.git
cd gl_hazlo_tuyo_page
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo local
```bash
npm run dev
```
La aplicación se abrirá automáticamente en: `http://localhost:5173`

### 4. Compilar para producción
```bash
npm run build
```
Genera la carpeta optimizada y minificada `dist/` lista para ser desplegada en Vercel, Netlify, Hostinger o cualquier CDN.

---

## 👨‍💻 Metodología y Equipo de Agentes (WebArchitect-AI)
El proyecto fue construido bajo la orquestación de agentes especializados con separación estricta de responsabilidades:
* **Agente React JSX:** Estructura atómica, accesibilidad ARIA y props.
* **Agente Tailwind UI:** Estilos dinámicos, diseño mobile-first y paleta de marca.
* **Agente State & Hooks:** Gestión reactiva del estado, hooks personalizados y enrutador.
* **Agente Auditor QA:** Control de calidad, auditoría de código, testing y blindaje de assets.

---

## 📄 Licencia
© 2026 **GL Hazlo Tuyo**. Todos los derechos reservados.
