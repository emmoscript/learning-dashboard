import { loadStripe, Stripe } from '@stripe/stripe-js';

// Singleton para asegurar que solo cargamos Stripe una vez
let stripePromise: Promise<Stripe | null>;

// Función para obtener la instancia de Stripe
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Función para redireccionar al checkout de Stripe
export const redirectToCheckout = async (sessionId: string) => {
  try {
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });
    
    if (error) {
      console.error('Error al redireccionar al checkout:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error en el proceso de checkout:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
};

// Función para formatear precios
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}; 