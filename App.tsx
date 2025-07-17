import React, { ReactNode } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Encabezado from './components/Encabezado';
import PieDePagina from './components/PieDePagina';
import RutaProtegida from './components/RutaProtegida';

import PaginaInicio from './pages/PaginaInicio';
import PaginaDetalleProducto from './pages/PaginaDetalleProducto';
import PaginaCarrito from './pages/PaginaCarrito';
import PaginaLogin from './pages/PaginaLogin';
import PaginaPerfil from './pages/PaginaPerfil';
import PaginaNoEncontrada from './pages/PaginaNoEncontrada';

const Layout: React.FC<{children?: ReactNode}> = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Encabezado />
      <main className="flex-grow">
        {children || <Outlet />}
      </main>
      <PieDePagina />
    </div>
  );
};


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PaginaInicio />} />
              <Route path="product/:id" element={<PaginaDetalleProducto />} />
              <Route path="cart" element={<PaginaCarrito />} />
              <Route path="profile" element={
                <RutaProtegida>
                  <PaginaPerfil />
                </RutaProtegida>
              }/>
            </Route>
            <Route path="/login" element={<PaginaLogin />} />
            <Route path="*" element={<Layout><PaginaNoEncontrada /></Layout>} />
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
