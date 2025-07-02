import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar productos', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#fff0f5] min-h-screen p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#B61D7D]">Lista de Productos</h1>
        <Link
          to="/dashboard"
          className="bg-[#B61D7D] text-white px-4 py-2 rounded hover:bg-[#D95BAA] transition"
        >
          ← Volver al Dashboard
        </Link>
      </div>

      {/* Lista de productos */}
      <ul className="grid gap-4">
        {products.map((prod) => (
          <li key={prod.id} className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold text-[#D95BAA]">{prod.name}</h3>
            <p className="text-gray-700">{prod.description}</p>
            <p className="text-sm text-gray-800 mt-1 font-medium">S/. {prod.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
