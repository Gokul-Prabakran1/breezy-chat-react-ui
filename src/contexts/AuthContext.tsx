
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('chatapp_token');
    const storedUser = localStorage.getItem('chatapp_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
      };
      const mockToken = 'mock_jwt_token_' + Date.now();

      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('chatapp_token', mockToken);
      localStorage.setItem('chatapp_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      // For demo, we'll still login with mock data
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
      };
      const mockToken = 'mock_jwt_token_' + Date.now();

      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('chatapp_token', mockToken);
      localStorage.setItem('chatapp_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // For demo purposes, we'll simulate a successful registration
      const mockUser = {
        id: '1',
        name: name,
        email: email,
      };
      const mockToken = 'mock_jwt_token_' + Date.now();

      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('chatapp_token', mockToken);
      localStorage.setItem('chatapp_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      // For demo, we'll still register with mock data
      const mockUser = {
        id: '1',
        name: name,
        email: email,
      };
      const mockToken = 'mock_jwt_token_' + Date.now();

      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('chatapp_token', mockToken);
      localStorage.setItem('chatapp_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('chatapp_token');
    localStorage.removeItem('chatapp_user');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
