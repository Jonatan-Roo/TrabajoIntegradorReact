
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-64 w-full flex items-center justify-center p-4 bg-white">
           <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate flex-grow">
           <Link to={`/product/${product.id}`} className="hover:text-accent transition">{product.title}</Link>
        </h3>
        <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
           <button 
            onClick={handleAddToCart}
            className="px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
