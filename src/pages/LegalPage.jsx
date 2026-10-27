import React from 'react';

export default function LegalPage({ title = 'Políticas y Soporte', content }) {
  return (
    <main id="main-content" className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-black text-marca-negro tracking-tight mb-8">
        {title}
      </h1>
      <div className="prose prose-zinc max-w-none text-marca-gris leading-relaxed space-y-6">
        {content || (
          <>
            <p>
              En <strong>GL Hazlo Tuyo</strong> garantizamos la calidad y originalidad de cada uno de
              nuestros productos. Ofrecemos cobertura de garantía directa por defectos de fábrica y
              soporte continuo.
            </p>
            <p>
              Para cualquier consulta o solicitud de cambio, nuestro canal de atención al cliente en
              WhatsApp está disponible de lunes a sábado.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
