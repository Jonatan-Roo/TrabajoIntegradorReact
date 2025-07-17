
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ShoppingCartIcon: React.FC = () => {
    const { itemCount } = useCart();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            {itemCount > 0 && (
                <text x="14" y="8" className="text-xs font-bold" fill="white">{itemCount > 9 ? '9+' : itemCount}</text>
            )}
        </svg>
    );
};

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-accent">
              TiendaUniverso
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition">Inicio</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition">Perfil</Link>
                <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition">Cerrar Sesión</button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition">Iniciar Sesión</Link>
            )}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-700 transition">
              <ShoppingCartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{itemCount}</span>
              )}
            </Link>
          </div>
          <div className="md:hidden flex items-center">
             <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-700 transition mr-2">
              <ShoppingCartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{itemCount}</span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition">Inicio</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition">Perfil ({user})</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition">Cerrar Sesión</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
