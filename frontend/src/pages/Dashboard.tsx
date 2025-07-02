import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import FormProduct from '../components/FormProduct';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Dashboard() {
  const { logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get('products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar productos', error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmDelete) return;

    try {
      await api.delete(`products/${id}/`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#fff0f5] min-h-screen">
      {/* Top Bar */}
      <header className="bg-[#B61D7D] text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">CRUD APP</h1>
        <div className="flex items-center gap-4">
          <Link to="/products" className="hover:underline text-sm">
            Productos
          </Link>
          <button
            onClick={logout}
            className="bg-white text-[#B61D7D] px-3 py-1 rounded hover:bg-pink-100 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-[#B61D7D] mb-4">
          {editing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>

        <FormProduct
          key={editing ? editing.id : 'new'}
          initialData={editing || undefined}
          onSuccess={() => {
            fetchProducts();
            setEditing(null);
          }}
        />

        <ul className="grid gap-4 mt-6">
          {products.map((prod: Product) => (
            <li key={prod.id} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-bold text-[#D95BAA]">{prod.name}</h3>
              <p className="text-sm text-gray-700">{prod.description}</p>
              <p className="text-sm text-gray-800 mt-1 font-medium">S/. {prod.price}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditing(prod)}
                  className="bg-[#F5B2DC] text-[#B61D7D] px-3 py-1 rounded hover:bg-[#E882C2]"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="bg-[#C8C94F] text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
