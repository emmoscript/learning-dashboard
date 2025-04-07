// Página del lado del servidor
import { Metadata } from 'next';
import CourseDetailClient from './client';

export interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <CourseDetailClient id={params.id} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Curso ${params.id}`,
  };
} 