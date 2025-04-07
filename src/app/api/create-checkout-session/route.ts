import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/context/CartContext';

// Inicializar Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json() as { items: CartItem[] };
    
    // Verificar que se proporcionaron artículos
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No se proporcionaron artículos' }, { status: 400 });
    }

    // Determinar si hay elementos de suscripción
    const hasSubscription = items.some(item => item.type === 'subscription');
    
    // Crear una sesión de checkout para suscripción
    if (hasSubscription) {
      // En una implementación real, se debería verificar que solo hay un plan de suscripción
      const subscriptionItem = items.find(item => item.type === 'subscription');
      
      if (!subscriptionItem || !subscriptionItem.plan) {
        return NextResponse.json({ error: 'Plan de suscripción no válido' }, { status: 400 });
      }
      
      // Configurar la sesión de suscripción en Stripe
      // Los IDs de precio y producto deben obtenerse del panel de Stripe
      let priceId;
      if (subscriptionItem.plan === 'basic') {
        priceId = process.env.STRIPE_BASIC_PRICE_ID || 'price_basic_placeholder';
      } else if (subscriptionItem.plan === 'premium') {
        priceId = process.env.STRIPE_PREMIUM_PRICE_ID || 'price_premium_placeholder';
      } else {
        return NextResponse.json({ error: 'Plan de suscripción no reconocido' }, { status: 400 });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
        metadata: {
          subscriptionPlan: subscriptionItem.plan,
        },
      });

      return NextResponse.json({ sessionId: session.id });
    } 
    // Crear una sesión de checkout para compra única
    else {
      // Mapear los artículos al formato requerido por Stripe
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
            metadata: {
              courseId: item.courseId?.toString(),
            },
          },
          unit_amount: Math.round(item.price * 100), // Stripe trabaja con centavos
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
      });

      return NextResponse.json({ sessionId: session.id });
    }
  } catch (error) {
    console.error('Error al crear la sesión de checkout:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de checkout' },
      { status: 500 }
    );
  }
} 