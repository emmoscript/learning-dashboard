"use client";

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/stripe';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ShoppingCartComponent() {
  const { items, total, removeItem, clearCart, checkout, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  
  const toggleCart = () => setIsOpen(!isOpen);
  
  // Cerrar el carrito al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await checkout();
      if (result.error) {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert('Error al procesar el pago');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="relative" ref={cartRef}>
      {/* Botón del carrito */}
      <button 
        onClick={toggleCart}
        className="flex items-center p-2 rounded-md hover:bg-gray-100"
        aria-label="Carrito de compras"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      
      {/* Panel del carrito */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50 border">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Carrito de compra</h3>
            <button 
              onClick={toggleCart} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Cerrar carrito"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {items.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Tu carrito está vacío
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto p-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">
                          {formatPrice(item.price)} x {item.quantity}
                        </span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex justify-between font-semibold mb-4">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Procesando...' : 'Proceder al pago'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={clearCart}
                    disabled={isLoading}
                  >
                    Vaciar carrito
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={toggleCart}
                    disabled={isLoading}
                  >
                    Seguir comprando
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 