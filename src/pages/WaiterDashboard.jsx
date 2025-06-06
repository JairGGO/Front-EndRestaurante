import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';

const WaiterDashboard = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tablesResponse, menuResponse] = await Promise.all([
          api.get('/waiter/tables'),
          api.get('/products/search?q=')
        ]);
        
        setTables(tablesResponse.data);
        setMenuItems(menuResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const openTable = async (tableId) => {
    try {
      await api.post(`/waiter/tables/${tableId}/open`);
      const updatedTables = tables.map(table => 
        table.id === tableId ? { ...table, status: 'BUSY' } : table
      );
      setTables(updatedTables);
    } catch (error) {
      console.error('Error opening table:', error);
    }
  };

  const closeTable = async (tableId) => {
    try {
      await api.post(`/waiter/orders/${tables.find(t => t.id === tableId).currentOrderId}/close`, {
        tip: 0,
        paymentType: 'CASH'
      });
      const updatedTables = tables.map(table => 
        table.id === tableId ? { ...table, status: 'FREE', currentOrderId: null } : table
      );
      setTables(updatedTables);
    } catch (error) {
      console.error('Error closing table:', error);
    }
  };

  const addItemToOrder = async () => {
    if (!selectedTable || !selectedProductId) return;

    try {
      const table = tables.find(t => t.id === selectedTable);
      await api.post(`/waiter/orders/${table.currentOrderId}/items`, null, {
        params: {
          productId: selectedProductId,
          qty: qty
        }
      });
      alert('Producto agregado correctamente');
      setShowMenuModal(false);
      
      // Refrescar datos de la mesa
      const response = await api.get(`/waiter/tables/${selectedTable}`);
      setTables(tables.map(t => t.id === selectedTable ? response.data : t));
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error al agregar producto');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const statusColors = {
    FREE: 'bg-green-100 text-green-800',
    BUSY: 'bg-red-100 text-red-800',
    CLOSED: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    FREE: 'Disponible',
    BUSY: 'Ocupada',
    CLOSED: 'Cerrada'
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Gestión de Mesas</h2>
          <div className="text-lg text-gray-600">Bienvenido, {username}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tables.map(table => (
            <div key={table.id} className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-500">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-800">
                    Mesa {table.number}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[table.status]}`}>
                    {statusLabels[table.status]}
                  </span>
                </div>
                
                {table.status === 'BUSY' && table.currentOrderId && (
                  <div className="mt-3 border-t pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Órdenes:</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                        En preparación
                      </span>
                    </div>
                    {/* Aquí podrías agregar la lista de items si tu backend lo soporta */}
                  </div>
                )}

                <div className="mt-3 space-y-2">
                  {table.status === 'FREE' && (
                    <button 
                      onClick={() => openTable(table.id)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded text-sm"
                    >
                      Abrir Mesa
                    </button>
                  )}
                  
                  {table.status === 'BUSY' && (
                    <>
                      <button 
                        onClick={() => {
                          setSelectedTable(table.id);
                          setShowMenuModal(true);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-sm"
                      >
                        Agregar Producto
                      </button>
                      <button 
                        onClick={() => closeTable(table.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm"
                      >
                        Cerrar Mesa
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal para agregar productos */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button 
              onClick={() => setShowMenuModal(false)} 
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Agregar producto</h2>

            <label className="block mb-2">
              <span className="text-sm">Producto:</span>
              <select
                className="w-full border p-2 rounded"
                onChange={e => setSelectedProductId(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Selecciona un producto</option>
                {menuItems.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price}
                  </option>
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
              onClick={addItemToOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaiterDashboard;