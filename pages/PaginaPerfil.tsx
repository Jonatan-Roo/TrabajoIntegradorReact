import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PaginaPerfil: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-4">Perfil de Usuario</h1>
        <p className="text-lg text-gray-700">¡Bienvenido, <span className="font-bold text-accent">{user}</span>!</p>
        <p className="mt-2 text-gray-600">Esta es tu página de perfil personal. Pronto se añadirán más funcionalidades.</p>
        <button 
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default PaginaPerfil;
