import { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('users/register/', form);
      navigate('/');
    } catch (err) {
      setError('Error al registrar. Intenta con otro usuario.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#E882C2] to-[#F5B2DC]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-10 w-96"
      >
        <h2 className="text-3xl font-bold text-center text-[#B61D7D] mb-2">
          CREA TU CUENTA
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Regístrate para comenzar
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#DC8C94]"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[#DC8C94]"
        />

        <button
          type="submit"
          className="w-full bg-[#D95BAA] text-white py-2 rounded hover:bg-[#B61D7D] transition-colors"
        >
          Crear cuenta
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className="text-[#B61D7D] font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
