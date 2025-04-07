"use client";

import { useState, useContext } from 'react';
import { CourseData } from '@/types';
import { useCart } from '@/context/CartContext';
import { AuthContext } from '@/context/AuthContext';
import { CourseFacade } from '@/lib/facade/CourseFacade';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/stripe';
import { CreditCard, Check, Zap } from 'lucide-react';

interface CoursePaymentOptionsProps {
  course: CourseData;
}

export function CoursePaymentOptions({ course }: CoursePaymentOptionsProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { addItem } = useCart();
  const { user } = useContext(AuthContext);
  
  // Verificar si el usuario ya tiene acceso a este curso a través de una suscripción
  const hasSubscriptionAccess = user && 
    CourseFacade.isCourseInUserSubscription(String(user.id), course.id);

  const handleAddToCart = () => {
    addItem({
      id: `course-${course.id}`,
      name: course.title,
      price: course.price || 19.99,
      type: 'course',
      quantity: 1,
      image: course.imagen || '/placeholder-course.jpg',
      courseId: course.id
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAddSubscriptionToCart = (plan: 'basic' | 'premium') => {
    addItem({
      id: `subscription-${plan}`,
      name: plan === 'basic' ? 'Plan Básico Mensual' : 'Plan Premium Mensual',
      price: plan === 'basic' ? 14.99 : 29.99,
      type: 'subscription',
      quantity: 1,
      plan
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  if (hasSubscriptionAccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-center text-green-700 mb-2">
          <Check className="w-5 h-5 mr-2" />
          <h3 className="text-lg font-semibold">Tienes acceso a este curso</h3>
        </div>
        <p className="text-green-600">
          Este curso está incluido en tu suscripción activa. Puedes acceder a todo el contenido sin costo adicional.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold mb-2">Opciones de compra</h2>
        <p className="text-gray-600">Elige la opción que mejor se adapte a tus necesidades</p>
      </div>

      {showSuccessMessage && (
        <div className="bg-green-50 p-4 m-6 rounded-md border border-green-200">
          <div className="flex items-center text-green-700">
            <Check className="w-5 h-5 mr-2" />
            <p className="font-medium">¡El producto ha sido agregado a tu carrito!</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Compra individual del curso */}
        <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Curso individual</h3>
              <p className="text-gray-600 text-sm mb-2">Acceso permanente a este curso</p>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(course.price || 19.99)}
            </div>
          </div>
          
          <ul className="mb-6 space-y-2">
            <li className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span>Acceso de por vida a todo el contenido del curso</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span>Laboratorios prácticos y proyectos</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span>Certificado de finalización</span>
            </li>
          </ul>
          
          <Button 
            className="w-full"
            onClick={handleAddToCart}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Agregar al carrito
          </Button>
        </div>
        
        {/* Planes de suscripción */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">Suscripción mensual</h3>
            <p className="text-gray-600 text-sm">Accede a más de 300 cursos</p>
            
            <div className="mt-4 space-y-4">
              {/* Plan básico */}
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Plan Básico</h4>
                  <span className="font-bold text-blue-600">{formatPrice(14.99)}/mes</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Más de 200 cursos y laboratorios</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleAddSubscriptionToCart('basic')}
                >
                  Suscribirme
                </Button>
              </div>
              
              {/* Plan premium */}
              <div className="bg-white rounded-lg p-4 border-2 border-blue-400 relative">
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                  Popular
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Plan Premium</h4>
                  <span className="font-bold text-blue-600">{formatPrice(29.99)}/mes</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Acceso a todos los cursos y características exclusivas</p>
                <Button 
                  className="w-full"
                  onClick={() => handleAddSubscriptionToCart('premium')}
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Obtener Premium
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 