import React, { createContext, useState, useContext, useEffect } from 'react';

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 从 localStorage 恢复认证状态
  useEffect(() => {
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        if (parsed.isAuthenticated && parsed.user) {
          setIsAuthenticated(true);
          setUser(parsed.user);
        }
      }
    } catch (error) {
      console.error('Failed to restore auth state from localStorage:', error);
      localStorage.removeItem('auth');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (username && password) {
      const newUser: User = {
        id: '1',
        username,
        email: `${username}@example.com`,
        role: 'admin',
      };
      setIsAuthenticated(true);
      setUser(newUser);
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: newUser }));
      return true;
    }
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return username && email && password ? true : false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth');
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
