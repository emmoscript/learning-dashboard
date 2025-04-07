import { NextResponse } from 'next/server';
import { CartItem } from '@/context/CartContext';

// Simulación de respuesta de checkout sin usar Stripe
export async function POST(request: Request) {
  try {
    const { items } = await request.json() as { items: CartItem[] };
    
    // Verificar que se proporcionaron artículos
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No se proporcionaron artículos' }, { status: 400 });
    }

    // Generar un ID de sesión ficticio
    const mockSessionId = `mock_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simular una respuesta exitosa
    return NextResponse.json({ 
      sessionId: mockSessionId,
      success: true,
      message: "Simulación de checkout exitosa"
    });
    
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de checkout' },
      { status: 500 }
    );
  }
} 