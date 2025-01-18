import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User ,AuthContextType} from '../types/auth.types';


import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize authentication
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          setUser(user);
        } catch (error) {
          localStorage.removeItem('token');
          console.log(error);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login method
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authService.login(email, password);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Logout method
  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  // Register method
  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authService.register(email, password, name);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, error }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook for AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
