// src/components/MesaCard.jsx
import { useState } from "react";

export default function MesaCard({ id, nombre, estado, capacidad, orden }) {
  const [open, setOpen] = useState(false);

  const statusColors = {
    Disponible: "bg-green-100 text-green-800",
    Ocupada: "bg-red-100 text-red-800",
    Reservada: "bg-yellow-100 text-yellow-800",
  };

  const buttonText = {
    Disponible: "Reservar",
    Ocupada: "Liberar",
    Reservada: "Cancelar",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-500">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3
            className="text-lg font-medium text-gray-800 cursor-pointer hover:text-red-600"
            onClick={() => setOpen(!open)}
          >
            {nombre}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[estado]}`}>
            {estado}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Capacidad: {capacidad} personas</p>

        {estado === "Ocupada" && open && (
          <div className="mt-3 transition-all duration-300 ease-in-out">
            <div className="border-t pt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Órdenes:</span>
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">En preparación</span>
              </div>
              <div className="text-sm space-y-2">
                {orden.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.cantidad}x {item.nombre}</span>
                    <span>${item.precio}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium border-t mt-2 pt-2">
                  <span>Total:</span>
                  <span>${orden.reduce((acc, o) => acc + o.precio * o.cantidad, 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {estado === "Reservada" && open && reservacion && (
          <div className="mt-3 transition-all duration-300 ease-in-out">
            <div className="border-t pt-3">
              <div className="mb-2">
                <span className="text-sm font-medium">Reservación:</span>
              </div>
              <div className="text-sm space-y-1">
                <div><strong>Cliente:</strong> {reservacion.nombreCliente}</div>
                <div><strong>Hora:</strong> {reservacion.hora}</div>
                <div><strong>Personas:</strong> {reservacion.personas}</div>
              </div>
            </div>
          </div>
        )}


        

        <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded text-sm">
          {buttonText[estado]}
        </button>
      </div>
    </div>
  );
}
