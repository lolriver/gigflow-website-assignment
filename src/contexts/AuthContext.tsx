import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('gigflow_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    // Simulated login - will be replaced with actual API call
    const mockUser: User = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
    };
    setUser(mockUser);
    localStorage.setItem('gigflow_user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulated registration - will be replaced with actual API call
    const mockUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
    };
    setUser(mockUser);
    localStorage.setItem('gigflow_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gigflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
