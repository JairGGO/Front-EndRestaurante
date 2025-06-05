import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Mesas from './pages/Mesas';
import AdminCRUD from './pages/AdminCRUD';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import Menu from './pages/Menu';
import Ordenes from './pages/Ordenes';
import Reservaciones from './pages/Reservaciones';

export default function App() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Ruta de login (pública) */}
        <Route path="/login" element={
          isAuthenticated ? 
            (userRole === 'ADMIN' ? 
              <Navigate to="/admin-crud" replace /> : 
              <Navigate to="/mesas" replace />) : 
            <Login />
        } />
        
        {/* Redirigir la raíz a /login o a la página según rol */}
        <Route path="/" element={
          isAuthenticated ? 
            (userRole === 'ADMIN' ? 
              <Navigate to="/admin-crud" replace /> : 
              <Navigate to="/mesas" replace />) : 
            <Navigate to="/login" replace />
        } />

        {/* Ruta protegida para mesas (WAITER o ADMIN) */}
        <Route path="/mesas" element={
          <ProtectedRoute allowedRoles={['WAITER', 'ADMIN']}>
            <Mesas />
          </ProtectedRoute>
        } />

        {/* Ruta protegida para admin */}
        <Route path="/admin-crud" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminCRUD />
          </ProtectedRoute>
        } />

        {/* Otras rutas protegidas */}
        <Route path="/menu" element={
          <ProtectedRoute allowedRoles={['WAITER', 'ADMIN']}>
            <Menu />
          </ProtectedRoute>
        } />

        <Route path="/ordenes" element={
          <ProtectedRoute allowedRoles={['WAITER', 'ADMIN']}>
            <Ordenes />
          </ProtectedRoute>
        } />

        <Route path="/reservaciones" element={
          <ProtectedRoute allowedRoles={['WAITER', 'ADMIN']}>
            <Reservaciones />
          </ProtectedRoute>
        } />

        {/* Página para acceso no autorizado */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Ruta de fallback para URLs no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}