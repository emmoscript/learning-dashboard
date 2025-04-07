// Componente de página asíncrono
import type { Metadata } from 'next';
import CourseDetailClient from './client';

// Declaramos la función como asincrónica
export default async function CoursePage({ params }: { params: { id: string } }) {
  return <CourseDetailClient id={params.id} />;
}

// La metadata también asincrónica
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Curso ${params.id}`,
  };
} 