import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import Cargador from '../components/Cargador';
import { generateCreativeDescription } from '../services/geminiService';

const PaginaDetalleProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const [aiDescription, setAiDescription] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleGenerateDescription = async () => {
    if (!product) return;
    setIsAiLoading(true);
    const description = await generateCreativeDescription(product.title);
    setAiDescription(description);
    setIsAiLoading(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) return <Cargador />;
  if (error) return <div className="text-center text-red-500 p-8">Error: {error}</div>;
  if (!product) return <div className="text-center p-8">Producto no encontrado.</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-center">
            <img src={product.image} alt={product.title} className="max-h-96 object-contain"/>
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">{product.title}</h1>
            <span className="text-sm font-medium bg-gray-200 text-gray-800 py-1 px-3 rounded-full capitalize">{product.category}</span>
            <div className="flex items-center my-4">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <span className="text-gray-600 ml-2">{product.rating.rate} ({product.rating.count} valoraciones)</span>
            </div>
            <p className="text-gray-700 my-4 text-lg">{product.description}</p>
            <div className="my-6">
                <span className="text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-4">
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 p-2 border border-gray-300 rounded-lg text-center"/>
                <button onClick={handleAddToCart} className="flex-1 bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-400 transition-colors">Añadir al Carrito</button>
            </div>
            <div className="mt-8">
              <button onClick={handleGenerateDescription} disabled={isAiLoading || !process.env.API_KEY} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isAiLoading ? 'Generando...' : '✨ Pide a la IA una Descripción Creativa'}
              </button>
              {!process.env.API_KEY && <p className="text-xs text-gray-500 mt-1">Clave de API de Gemini no configurada.</p>}
              {aiDescription && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <p className="text-gray-800 italic">{aiDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaDetalleProducto;
