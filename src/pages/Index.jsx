import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // React Router para navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate('/mesas'); // Redirige a la página de mesas
    } else {
      alert('Por favor ingrese usuario y contraseña');
    }
  };

  return (
    <div className="min-h-screen login-bg flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-red-600">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">CometDinner</h1>
          <p className="text-gray-600 mt-2">Gestión - Restaurante</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
