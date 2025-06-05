import { useState, useEffect } from "react";

export default function MesaCard({ id, nombre, estado, capacidad, orden, reservacion, currentOrderId }) {
  const [open, setOpen] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [qty, setQty] = useState(1);

  const token = localStorage.getItem("token");

  
  useEffect(() => {
    if (showMenuModal) {
      fetch("http://localhost:8080/products/search?q=", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error("Error al obtener productos");
          return res.json();
        })
        .then(data => setMenuItems(data))
        .catch(err => {
          console.error("Error al cargar productos", err);
          alert("No se pudieron cargar los productos");
        });
    }
  }, [showMenuModal]);


  const agregarProducto = () => {
    if (!selectedProductId || !currentOrderId) return;

    fetch(`http://localhost:8080/waiter/orders/${currentOrderId}/items?productId=${selectedProductId}&qty=${qty}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al agregar producto");
        alert("Producto agregado");
        setShowMenuModal(false);
      })
      .catch(err => alert("Error: " + err.message));
  };

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

        {estado === "Ocupada" && (
          <button
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-sm"
            onClick={() => setShowMenuModal(true)}
          >
            Agregar Producto
          </button>
        )}
      </div>

      {/* Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button onClick={() => setShowMenuModal(false)} className="absolute top-2 right-3 text-gray-500 hover:text-black">&times;</button>
            <h2 className="text-lg font-semibold mb-4">Agregar producto</h2>

            <label className="block mb-2">
              <span className="text-sm">Producto:</span>
              <select
                className="w-full border p-2 rounded"
                onChange={e => setSelectedProductId(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Selecciona un producto</option>
                {menuItems.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>
                ))}
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-sm">Cantidad:</span>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={e => setQty(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </label>

            <button
              onClick={agregarProducto}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

