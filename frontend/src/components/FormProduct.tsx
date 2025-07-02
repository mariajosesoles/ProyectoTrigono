import { useState } from 'react';
import api from '../api/axios';

interface FormProductProps {
  initialData?: {
    id?: number;
    name: string;
    price: number;
    description: string;
  };
  onSuccess: () => void;
}

export default function FormProduct({ initialData, onSuccess }: FormProductProps) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    price: initialData?.price || 0,
    description: initialData?.description || ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await api.put(`products/${initialData.id}/`, form);
      } else {
        await api.post('products/', form);
      }
      onSuccess();
    } catch (err) {
      setError('Error al guardar el producto');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-[#F5B2DC] bg-white p-6 rounded-xl shadow-lg max-w-xl"
    >
      <h2 className="text-xl font-bold mb-4 text-[#B61D7D]">
        {initialData ? 'Editar Producto' : 'Nuevo Producto'}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="w-full p-2 border border-[#E882C2] rounded focus:outline-none focus:ring-2 focus:ring-[#D95BAA]"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Precio</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          className="w-full p-2 border border-[#E882C2] rounded focus:outline-none focus:ring-2 focus:ring-[#D95BAA]"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción del producto"
          className="w-full p-2 border border-[#E882C2] rounded focus:outline-none focus:ring-2 focus:ring-[#D95BAA]"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="bg-[#B61D7D] text-white w-full py-2 rounded hover:bg-[#D95BAA] transition"
      >
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}
