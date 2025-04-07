'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreditCard, CheckCircle, Info, ChevronLeft, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Component that uses the useSearchParams hook
function CheckoutContent() {
  const searchParams = useSearchParams();
  const planType = searchParams.get('plan') || 'basic';
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const getPlanPrice = () => {
    return planType === 'premium' ? 49.99 : 19.99;
  };

  const getPlanName = () => {
    return planType === 'premium' ? 'Plan Familiar' : 'Plan Profesional';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 'details':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Información Personal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="pt-4">
                <Button type="submit" className="w-full">Continuar al Pago</Button>
              </div>
            </form>
          </div>
        );
      
      case 'payment':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Información de Pago</h2>
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <CreditCard className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Expiración</label>
                  <input
                    type="text"
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleChange}
                    placeholder="MM/AA"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Procesando...' : 'Completar Pago'}
                </Button>
              </div>
              <div className="text-center text-sm text-gray-500 mt-2">
                <p className="flex items-center justify-center">
                  <Info className="h-4 w-4 mr-1" />
                  Este es un formulario de demostración, no se procesará ningún pago real
                </p>
              </div>
            </form>
          </div>
        );
      
      case 'confirmation':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">¡Suscripción Exitosa!</h2>
            <p className="text-gray-600 mb-6">
              Tu suscripción al {getPlanName()} ha sido procesada correctamente.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
              <h3 className="font-semibold mb-2">Detalles de la suscripción:</h3>
              <p className="text-sm text-gray-600">Plan: {getPlanName()}</p>
              <p className="text-sm text-gray-600">Precio: ${getPlanPrice()} USD/mes</p>
              <p className="text-sm text-gray-600">Fecha: {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Renovación: {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}</p>
            </div>
            <div className="space-y-3">
              <Link href="/courses/my-courses">
                <Button className="w-full">Ver mis cursos</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">Volver al inicio</Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Volver al inicio</span>
          </Link>
          <div className="flex items-center">
            <UserCircle2 className="w-5 h-5 mr-1 text-gray-600" />
            <span className="text-sm text-gray-600">Checkout</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <h3 className="font-semibold">Resumen de tu pedido</h3>
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{getPlanName()}</span>
              <span>${getPlanPrice()} USD/mes</span>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Suscripción mensual con renovación automática
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total:</span>
              <span>${getPlanPrice()} USD/mes</span>
            </div>
          </div>
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
}

// Loading fallback
function CheckoutLoading() {
  return <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
    <p className="text-lg">Cargando checkout...</p>
  </div>;
}

// Main component with Suspense boundary
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
} 