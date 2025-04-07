// Página del lado del servidor
import { Metadata } from 'next';
import CourseDetailClient from './client';

// No definimos nuestra propia interfaz PageProps, usamos la de Next.js
// Usamos generics de TypeScript para la función
export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <CourseDetailClient id={params.id} />;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Curso ${params.id}`,
  };
} 