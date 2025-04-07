// Simulación de la funcionalidad de Stripe sin la dependencia real

// Función simulada para redireccionar al checkout
export const redirectToCheckout = async (sessionId: string) => {
  try {
    console.log('Simulando redirección a checkout con sessionId:', sessionId);
    
    // Simular un procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirigir a la página de éxito directamente
    window.location.href = '/checkout/success';
    
    return { success: true };
  } catch (error) {
    console.error('Error en el proceso de checkout simulado:', error);
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