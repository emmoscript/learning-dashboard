"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Cargar el componente cliente dinámicamente
const CourseDetailClient = dynamic(() => import('./client'));

// Página como componente cliente para poder usar dynamic con opciones avanzadas
export default function Page({ params }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="container mx-auto p-8">Cargando...</div>;
  }
  
  return (
    <div>
      <CourseDetailClient id={params.id} />
    </div>
  );
} 