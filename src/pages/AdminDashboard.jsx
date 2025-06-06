import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/admin/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Si hay error de autenticación, redirige al login
        if (error.response?.status === 401) {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Productos</h2>
              <p className="mt-1 text-sm text-gray-500">Lista de productos disponibles</p>
            </div>
            <div className="border-t border-gray-200">
              {products.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-red-600 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  No hay productos disponibles
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;