import React from "react";

export default function Menu() {
  return (
    <div>
      {/* Header */}
      <header className="bg-red-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-xl font-semibold">CometDinner - Menú</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => (window.location.href = "mesas.html")}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
            >
              Mesas
            </button>
            <button
              onClick={() => (window.location.href = "index.html")}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Menú del Restaurante
        </h2>

        {/* Comida */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4 border-b pb-2">
            Comida
          </h3>
          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded">
            <div>
              <h4 className="font-medium">Hamburguesa</h4>
              <p className="text-sm text-gray-600">
                Lechuga, carne de res, cebolla, tomate.
              </p>
            </div>
            <span className="font-medium">$12.99</span>
          </div>
        </div>

        {/* Bebidas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4 border-b pb-2">
            Bebidas
          </h3>
          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded">
            <div>
              <h4 className="font-medium">Café negro</h4>
              <p className="text-sm text-gray-600">Café americano</p>
            </div>
            <span className="font-medium">$3.50</span>
          </div>
        </div>

        {/* Postres */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4 border-b pb-2">
            Postres
          </h3>
          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded">
            <div>
              <h4 className="font-medium">Pastel de chocolate</h4>
              <p className="text-sm text-gray-600">
                Rebanada de pastel de chocolate
              </p>
            </div>
            <span className="font-medium">$5.99</span>
          </div>
        </div>
      </main>
    </div>
  );
}
