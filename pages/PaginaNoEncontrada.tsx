import React from 'react';
import { Link } from 'react-router-dom';

const PaginaNoEncontrada: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-9xl font-extrabold text-accent tracking-widest">404</h1>
      <div className="bg-primary text-white px-2 text-sm rounded rotate-12 absolute">
        Página No Encontrada
      </div>
      <p className="mt-4 text-lg text-gray-600">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Link 
        to="/" 
        className="mt-8 inline-block bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-400 transition"
      >
        Ir al Inicio
      </Link>
    </div>
  );
};

export default PaginaNoEncontrada;
