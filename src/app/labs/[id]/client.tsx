"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LabDetailClient(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Obtener ID del laboratorio
  const labId = props.params?.id;
  
  useEffect(() => {
    // Simulación de carga
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <div className="container mx-auto p-8">Cargando laboratorio...</div>;
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Laboratorio ID: {labId}</h1>
      <p className="mb-4">Esta es una página simplificada para evitar errores de tipos.</p>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => router.push('/courses/my-courses')}
      >
        Volver a Mis Cursos
      </button>
    </div>
  );
} 