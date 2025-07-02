import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export function useAuth() {
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('token/', {
        username,
        password
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      navigate('/dashboard');
    } catch (error: any) {
      throw new Error('Credenciales incorrectas');
    }
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('access');
  };

  return { login, logout, isAuthenticated };
}
