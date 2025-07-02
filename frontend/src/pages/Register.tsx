import { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#B61D7D] to-[#F5B2DC]">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-[#B61D7D] mb-2">Crear Cuenta</h2>
        <p className="text-center text-gray-600 mb-6">Regístrate para comenzar</p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#E882C2]"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E882C2]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-sm text-[#B61D7D] hover:underline"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#B61D7D] text-white py-2 rounded hover:bg-[#D95BAA] transition-colors"
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
