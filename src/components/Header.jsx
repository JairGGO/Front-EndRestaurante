// src/components/Header.jsx
export default function Header() {
    return (
      <header className="bg-red-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-xl font-semibold">CometDinner - Gestión de Mesas</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Usuario: Admin</span>
            <button onClick={() => window.location.href = 'index.html'} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
    );
  }
  