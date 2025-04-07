"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { redirectToCheckout } from '@/lib/stripe';

// Definir los tipos para los elementos del carrito
export type CartItemType = 'course' | 'subscription';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: CartItemType;
  image?: string;
  courseId?: number;
  plan?: 'basic' | 'premium';
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  checkout: () => Promise<{success: boolean, error?: string}>;
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}

// Proveedor del contexto
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Estado para los items del carrito
  const [items, setItems] = useState<CartItem[]>([]);
  // Estado para controlar si el carrito está abierto o cerrado
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error al cargar el carrito:', error);
          localStorage.removeItem('cart');
        }
      }
    }
  }, []);
  
  // Guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);
  
  // Calcular el número total de items en el carrito
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  // Calcular el precio total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Añadir un item al carrito
  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Si el item ya existe, actualizar la cantidad
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        // Si es un nuevo item, agregarlo al carrito
        return [...prevItems, item];
      }
    });
  };
  
  // Remover un item del carrito
  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  // Limpiar todo el carrito
  const clearCart = () => {
    setItems([]);
  };
  
  // Procesar el checkout
  const checkout = async () => {
    if (items.length === 0) {
      return { success: false, error: 'El carrito está vacío' };
    }
    
    try {
      // En una implementación real, esto llamaría a una API para crear una sesión de checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      
      const { sessionId, error } = await response.json();
      
      if (error) {
        return { success: false, error };
      }
      
      // Redirigir a la página de checkout de Stripe
      const result = await redirectToCheckout(sessionId);
      
      if (result.success) {
        // Limpiar el carrito después de un checkout exitoso
        clearCart();
      }
      
      return result;
    } catch (error) {
      console.error('Error durante el checkout:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error durante el proceso de pago' 
      };
    }
  };
  
  // Valor que se va a proporcionar a través del contexto
  const value = {
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    checkout
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
} 