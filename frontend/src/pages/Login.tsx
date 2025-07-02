import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#B61D7D] to-[#F5B2DC]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-10 w-96"
      >
        <h2 className="text-3xl font-bold text-center text-[#B61D7D] mb-2">
          CRUD OPERATIONS
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Inicia sesión con tus credenciales
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#E882C2]"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded pr-16 focus:outline-none focus:ring-2 focus:ring-[#E882C2]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-[#B61D7D] hover:underline"
          >
            {showPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#B61D7D] text-white py-2 rounded hover:bg-[#D95BAA] transition-colors"
        >
          Entrar
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-[#B61D7D] font-medium hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}
