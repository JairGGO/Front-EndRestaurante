// src/pages/Mesas.jsx
import Header from "../components/Header";
import MesaCard from "../components/MesaCard";

const mesas = [
    { id: 1, nombre: "Mesa 1", estado: "Disponible", capacidad: 4 },
    { id: 2, nombre: "Mesa 2", estado: "Ocupada", capacidad: 6, orden: [
      { nombre: "Hamburguesa", cantidad: 1, precio: 12.99 },
      { nombre: "Café negro", cantidad: 2, precio: 3.5 },
    ]},
    { id: 3, nombre: "Mesa 3", estado: "Reservada", capacidad: 8, reservacion: {
        nombreCliente: "Carlos Pérez",
        hora: "19:30",
        personas: 8
      }},
    { id: 4, nombre: "Mesa 4", estado: "Disponible", capacidad: 4 },
    { id: 5, nombre: "Mesa 5", estado: "Disponible", capacidad: 4 },
    { id: 6, nombre: "Mesa 6", estado: "Ocupada", capacidad: 6, orden: [
      { nombre: "Pizza", cantidad: 2, precio: 15.99 },
      { nombre: "Jugo", cantidad: 3, precio: 4.5 },
    ]},
    { id: 7, nombre: "Mesa 7", estado: "Disponible", capacidad: 2 },
    { id: 8, nombre: "Mesa 8", estado: "Reservada", capacidad: 6, reservacion: {
        nombreCliente: "María Gómez",
        hora: "20:00",
        personas: 6
      }},
    { id: 9, nombre: "Mesa 9", estado: "Ocupada", capacidad: 4, orden: [
      { nombre: "Tacos", cantidad: 3, precio: 2.5 },
      { nombre: "Refresco", cantidad: 1, precio: 2 },
    ]},
    { id: 10, nombre: "Mesa 10", estado: "Disponible", capacidad: 4 },
    { id: 11, nombre: "Mesa 11", estado: "Reservada", capacidad: 5, reservacion: {
        nombreCliente: "Lucía Rodríguez",
        hora: "18:45",
        personas: 5
      }},
    { id: 12, nombre: "Mesa 12", estado: "Ocupada", capacidad: 4, orden: [
      { nombre: "Sopa", cantidad: 1, precio: 6.5 },
      { nombre: "Agua mineral", cantidad: 2, precio: 2.2 },
    ]},
  ];
  

export default function Mesas() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Gestión de Mesas</h2>
          <div className="flex space-x-4">
            <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm" onClick={() => window.location.href = 'reservaciones.html'}>Reservaciones</button>
            <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm" onClick={() => window.location.href = 'menu.html'}>Menú</button>
            <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm" onClick={() => window.location.href = 'ordenes.html'}>Órdenes</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mesas.map(mesa => (
            <MesaCard
            key={mesa.id}
            id={mesa.id}
            nombre={mesa.nombre}
            estado={mesa.estado}
            capacidad={mesa.capacidad}
            orden={mesa.orden}
            reservacion={mesa.reservacion}
          />
          
          ))}
        </div>
      </main>
    </div>
  );
}
