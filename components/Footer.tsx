
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} TiendaUniverso. Todos los derechos reservados.</p>
          <p className="text-sm text-gray-400">Creado con React, TypeScript y Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
