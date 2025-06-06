import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">CometDinner</Link>
        <nav className="flex space-x-4">
          <button className="text-gray-600 hover:text-red-600">Cerrar Sesión</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
  