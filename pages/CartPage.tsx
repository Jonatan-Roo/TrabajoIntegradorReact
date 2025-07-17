
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Tu Carrito está Vacío</h1>
        <p className="text-gray-600 mb-8">Parece que todavía no has añadido nada a tu carrito.</p>
        <Link to="/" className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-400 transition">
          Comenzar a Comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito de Compras</h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-md">
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex items-center p-4 border-b last:border-b-0">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4"/>
                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`} className="font-semibold hover:text-accent">{item.title}</Link>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold mt-1">Eliminar</button>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      min="1"
                      className="w-16 p-1 border rounded text-center"
                    />
                  </div>
                  <div className="text-right w-24 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={clearCart} className="mt-4 text-gray-500 hover:text-red-500 font-semibold text-sm">Vaciar Carrito</button>
        </div>
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
             <div className="flex justify-between mb-2 text-gray-500">
              <span>Impuestos (estimados)</span>
              <span>${(subtotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total</span>
              <span>${(subtotal * 1.08).toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-lg hover:bg-teal-400 transition">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
