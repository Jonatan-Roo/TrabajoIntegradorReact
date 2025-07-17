import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import TarjetaProducto from '../components/TarjetaProducto';
import Cargador from '../components/Cargador';

const PaginaInicio: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data: Product[] = await response.json();
        setProducts(data);
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

    fetchProducts();
  }, []);

  if (loading) {
    return <Cargador />;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-primary tracking-tight lg:text-5xl">Productos Destacados</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Descubre nuestra selección de productos de alta calidad.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <TarjetaProducto key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PaginaInicio;
