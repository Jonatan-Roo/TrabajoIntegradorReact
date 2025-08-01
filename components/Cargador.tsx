import React from 'react';

const Cargador: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
    </div>
  );
};

export default Cargador;
