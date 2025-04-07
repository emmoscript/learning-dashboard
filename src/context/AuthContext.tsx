"use client";
import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserService } from '@/data/users';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {}
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email: string, password: string) => {
    const foundUser = UserService.authenticate(email, password);
    if (foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: passwordValue, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string) => {
    const newUser = UserService.create(email, password);
    
    if (newUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: passwordValue, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 