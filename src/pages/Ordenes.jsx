import React, { useState } from 'react';

const ordenesData = [
  {
    mesa: 2,
    estado: 'En preparación',
    colorEstado: 'red',
    items: [
      { nombre: 'Hamburguesa', cantidad: 1, precio: 12.99 },
      { nombre: 'Café negro', cantidad: 2, precio: 3.5 },
    ],
  },
  {
    mesa: 6,
    estado: 'Pendiente',
    colorEstado: 'yellow',
    items: [
      { nombre: 'Pastel de chocolate', cantidad: 1, precio: 5.99 },
    ],
  },
];

export default function Ordenes() {
  const [modalVisible, setModalVisible] = useState(false);

  const mostrarModal = () => setModalVisible(true);
  const ocultarModal = () => setModalVisible(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-xl font-semibold">CometDinner - Órdenes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => window.location.href = 'mesas.html'} className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
              Mesas
            </button>
            <button onClick={() => window.location.href = 'index.html'} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Órdenes Activas</h2>

        {ordenesData.map((orden, idx) => {
          const total = orden.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Mesa {orden.mesa}</h3>
                <span className={`px-3 py-1 bg-${orden.colorEstado}-100 text-${orden.colorEstado}-800 rounded-full text-sm`}>
                  {orden.estado}
                </span>
              </div>

              <div className="border-b pb-4 mb-4">
                {orden.items.map((item, i) => (
                  <div key={i} className="flex justify-between mb-2">
                    <span>{item.cantidad}x {item.nombre}</span>
                    <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium mt-3">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={mostrarModal} className="flex items-center text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Añadir Item
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                  Cerrar Orden
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h3 className="text-xl font-medium mb-4">Añadir Item a la Orden</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Comida</option>
                  <option>Bebida</option>
                  <option>Postre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Sushi Variado ($12.99)</option>
                  <option>Té Verde ($3.50)</option>
                  <option>Mochi ($5.99)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                <input type="number" min="1" defaultValue="1" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button onClick={ocultarModal} className="px-4 py-2 border border-gray-300 rounded-md">Cancelar</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md">Añadir</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}