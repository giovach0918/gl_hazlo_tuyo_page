/**
 * Datos simulados y constantes para GL Hazlo Tuyo
 * Utilizados para alimentar componentes vía props sin hardcodear.
 */

export const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio', href: '/' },
  { id: 'masajeadores', label: 'Masajeadores', href: '/categoria-masajeadores' },
  { id: 'termos', label: 'Termos', href: '/categoria-termos' },
  { id: 'bandas', label: 'Bandas', href: '/categoria-bandas' },
  { id: 'accesorios', label: 'Accesorios', href: '/categoria-accesorios' },
];

export const HERO_DATA = {
  badge: 'Tecnología y Bienestar',
  title: 'Potencia tu bienestar y recuperación diaria con GL Hazlo Tuyo',
  description: 'Encuentra masajeadores ergonómicos, termos inteligentes y accesorios de alto rendimiento diseñados para cuidar tu cuerpo y potenciar tu estilo de vida.',
  ctaText: 'Ver Catálogo',
  ctaHref: '#catalogo',
  bgImage: './assets/Hero.jpg',
  announcementText: '🇨🇴 Envío gratis a todo Colombia - Pago Contra Entrega 🇨🇴',
};

export const CATEGORIES_DATA = [
  {
    id: 'cat-masajeadores',
    title: 'Masajeadores',
    description: 'Terapia de percusión y electroestimulación para alivio localizado.',
    image: './assets/cat-masajeadores.jpg',
    href: '/categoria-masajeadores',
    ctaText: 'Explorar Masajeadores',
  },
  {
    id: 'cat-termos',
    title: 'Termos Inteligentes',
    description: 'Botellas térmicas con display LED de temperatura y acero inoxidable.',
    image: './assets/cat_termos.jpg',
    href: '/categoria-termos',
    ctaText: 'Explorar Termos',
  },
  {
    id: 'cat-bandas',
    title: 'Bandas Elásticas',
    description: 'Entrenamiento de resistencia y movilidad para cualquier nivel.',
    image: './assets/cat-bandas-lifestyle.jpg',
    href: '/categoria-bandas',
    ctaText: 'Explorar Bandas',
  },
  {
    id: 'cat-accesorios',
    title: 'Accesorios',
    description: 'Complementos ideales para maximizar tu recuperación y rendimiento deportivo.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    href: '/categoria-accesorios',
    ctaText: 'Explorar Accesorios',
  },
];

export const PRODUCTS_DATA = [
  {
    id: 'gl-facial-ay1688',
    name: 'Masajeador facial y anti-papada (Ref. AY-1688)',
    category: 'Cuidado Facial',
    description: 'Microcorrientes y fototerapia LED para rejuvenecimiento facial y reducción de papada.',
    price: 89900,
    originalPrice: 120000,
    image: './assets/prod-facial.jpg',
    variant: 'Estándar',
    detailsUrl: '/producto-ay1688',
  },
  {
    id: 'gl-cuello-jt600',
    name: 'Masajeador de cuello (Ref. JT-600)',
    category: 'Cervical & Cuello',
    description: 'Pulsos electromagnéticos y termoterapia constante para eliminar la rigidez del cuello.',
    price: 119900,
    originalPrice: 160000,
    image: './assets/prod-cuello.jpg',
    variant: 'Gris Titanio',
    detailsUrl: '/producto-jt600',
  },
  {
    id: 'gl-pistola-pro',
    name: 'Pistola de Masaje Pro',
    category: 'Terapia de Percusión',
    description: '6 niveles de intensidad y 4 cabezales intercambiables para recuperación muscular profunda.',
    price: 149900,
    originalPrice: 220000,
    image: './assets/prod-pistola.jpg',
    variant: 'Negro Mate',
    detailsUrl: '/producto-pistola-pro',
  },
  {
    id: 'gl-termo-led',
    name: 'Termo Inteligente LED',
    category: 'Hidratación Activa',
    description: 'Acero inoxidable con display digital de temperatura.',
    price: 45000,
    originalPrice: 65000,
    image: './assets/Termo-lifestyle.jpg',
    variant: 'Estándar',
    detailsUrl: '/producto-termo-led-negro',
  },
  {
    id: 'gl-banda-tela',
    name: 'Banda de Tela Antideslizante',
    category: 'Resistencia',
    description: 'Ideal para glúteos y piernas, no se enrolla durante el ejercicio.',
    price: 35000,
    originalPrice: 50000,
    image: './assets/Dest-Bandastela-lifestyle.jpg',
    variant: 'Estándar',
    detailsUrl: '/producto-banda-tela',
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    rating: 5,
    comment: 'El masajeador facial me quitó la tensión en la mandíbula y ha reducido mi papada notablemente. Excelente compra, llegó súper rápido y pago contra entrega.',
    author: 'Laura M.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    productImage: null,
  },
  {
    id: 2,
    rating: 5,
    comment: 'Trabajo todo el día frente al computador y el dolor cervical era insoportable. Con el masajeador de cuello siento un alivio inmediato en minutos.',
    author: 'Carlos R.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    productImage: null,
  },
  {
    id: 3,
    rating: 5,
    comment: 'Uso la pistola de masajes después de entrenar y la recuperación es otra cosa. La potencia que tiene es imbatible para su tamaño.',
    author: 'Diana G.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    productImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&auto=format&fit=crop&q=80',
  },
];

export const FOOTER_DATA = {
  aboutText: 'Tu bienestar y rendimiento físico al siguiente nivel con tecnología y calidad garantizada.',
  categories: [
    { label: 'Masajeadores de Percusión', href: '/categoria-masajeadores' },
    { label: 'Termos Inteligentes', href: '/categoria-termos' },
    { label: 'Bandas de Resistencia', href: '/categoria-bandas' },
    { label: 'Accesorios de Recuperación', href: '/categoria-accesorios' },
  ],
  support: [
    { label: 'Rastrea tu Pedido', href: '/soporte-rastreo' },
    { label: 'Términos de Garantía', href: '/politica-garantia' },
    { label: 'Políticas de Devolución', href: '/politica-devoluciones' },
    { label: 'Política de Privacidad', href: '/politica-privacidad' },
  ],
  socialLinks: [
    { platform: 'Instagram', href: 'https://instagram.com' },
    { platform: 'Facebook', href: 'https://facebook.com' },
    { platform: 'TikTok', href: 'https://tiktok.com' },
  ],
  copyrightText: '© 2026 GL Hazlo Tuyo. Todos los derechos reservados.',
  paymentMethodsText: 'Medios de pago seguros: PSE, Tarjetas de Crédito, Efecty, Contra Entrega',
};
