import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/mockData';

export default function AdminProducts() {
  const [products] = useState(PRODUCTS_DATA);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-marca-negro">
            Panel de Administración - Productos
          </h1>
          <p className="text-sm text-marca-gris">
            Gestiona el inventario de GL Hazlo Tuyo conectado a MySQL
          </p>
        </div>
        <button
          type="button"
          className="bg-marca-primario text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-md min-h-[48px]"
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-xs font-bold text-zinc-500 uppercase">
              <th className="p-4">Producto</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Precio (COP)</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 text-sm">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                <td className="p-4 font-bold text-marca-negro flex items-center gap-3">
                  <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <span>{p.name}</span>
                </td>
                <td className="p-4 text-zinc-600">{p.category || 'General'}</td>
                <td className="p-4 font-semibold text-marca-primario">
                  ${p.price?.toLocaleString('es-CO')}
                </td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    En Stock
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-indigo-600 hover:underline font-bold text-xs">Editar</button>
                  <button className="text-red-500 hover:underline font-bold text-xs">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
