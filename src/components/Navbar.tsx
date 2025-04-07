"use client";

import { useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Menu, X, LogIn, LogOut, User, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShoppingCartComponent } from '@/components/Cart/ShoppingCart';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">8limpio Learning</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Inicio
              </Link>
              <Link href="/courses/my-courses" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Mis Cursos
              </Link>
              <Link href="/#pricing" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Precios
              </Link>
              <Link href="/labs/1" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Laboratorios
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex gap-4 items-center">
                <Link href="/courses/my-courses" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                  <GraduationCap className="mr-1 h-4 w-4" />
                  <span>Mis Cursos</span>
                </Link>
                
                <ShoppingCartComponent />
                
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-sm">
                  <LogOut className="mr-1 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="flex items-center text-gray-700 border-gray-300">
                    <LogIn className="h-4 w-4 mr-1" />
                    <span>Iniciar sesión</span>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="flex items-center text-white">
                    <User className="h-4 w-4 mr-1" />
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={isOpen ? 'block sm:hidden' : 'hidden'}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
            Inicio
          </Link>
          <div className="mt-4 flex flex-col space-y-3">
            <Link href="/courses/my-courses" className="flex items-center text-gray-600 hover:text-blue-600">
              <GraduationCap className="mr-1 h-4 w-4" />
              <span>Mis Cursos</span>
            </Link>
            
            <div className="py-1">
              <ShoppingCartComponent />
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <LogOut className="mr-1 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
          <Link href="/#pricing" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
            Precios
          </Link>
          <Link href="/labs/1" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
            Laboratorios
          </Link>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-2 px-3">
              <div className="text-base font-medium text-gray-800">{user.email}</div>
              <Button
                variant="outline"
                onClick={handleLogout}
                size="sm"
                className="w-full flex items-center justify-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <div className="space-y-2 px-3">
              <Link href="/login" onClick={() => setIsOpen(false)} className="block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center justify-center text-gray-700 border-gray-300"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="block">
                <Button 
                  size="sm" 
                  className="w-full flex items-center justify-center text-white"
                >
                  <User className="h-4 w-4 mr-1" />
                  Registrarse
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 