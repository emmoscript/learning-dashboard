"use client";

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CodeLab from '@/components/CodeLab';

// Mock lab exercises
const labExercises = [
  {
    id: 1,
    title: "Función de suma",
    description: "Implementa una función `sum` que reciba dos números como parámetros y devuelva su suma.",
    initialCode: "function sum(a, b) {\n  // Tu código aquí\n}",
    testCode: "sum(5, 3) // Debe devolver 8\nsum(-1, 1) // Debe devolver 0",
    testFunction: (code: string) => {
      try {
        // For demo purposes, we're using eval for testing
        // In production, you would use a safer approach
        const func = new Function('code', `
          ${code}
          return sum(5, 3) === 8 && sum(-1, 1) === 0;
        `);
        return func(code);
      } catch {
        // Ignore the error and return false
        return false;
      }
    }
  },
  {
    id: 2,
    title: "Verificar palíndromo",
    description: "Implementa una función `isPalindrome` que reciba una cadena y devuelva true si es un palíndromo (se lee igual de izquierda a derecha y de derecha a izquierda), o false en caso contrario.",
    initialCode: "function isPalindrome(str) {\n  // Tu código aquí\n}",
    testCode: "isPalindrome('radar') // Debe devolver true\nisPalindrome('hello') // Debe devolver false",
    testFunction: (code: string) => {
      try {
        const func = new Function('code', `
          ${code}
          return isPalindrome('radar') === true && 
                 isPalindrome('hello') === false;
        `);
        return func(code);
      } catch {
        // Ignore the error and return false
        return false;
      }
    }
  }
];

export default function LabDetail({ params }: { params: { id: string } }) {
  // Get ID only once on initial render, avoids React.use warning
  const [labId] = useState(() => {
    return params.id ? parseInt(params.id) : 0;
  });
  
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [labCompleted, setLabCompleted] = useState(false);
  
  const exercise = labExercises.find(lab => lab.id === labId);
  
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (!exercise) {
      router.push('/courses/my-courses');
      return;
    }
    
    // Check if the lab is already completed
    const isCompleted = localStorage.getItem(`lab-${user.id}-${labId}`) === 'completed';
    setLabCompleted(isCompleted);
  }, [user, exercise, labId, router]);
  
  if (!user || !exercise) return null;
  
  const handleLabComplete = () => {
    // Mark lab as completed
    localStorage.setItem(`lab-${user.id}-${labId}`, 'completed');
    setLabCompleted(true);
    
    // Show success message
    setTimeout(() => {
      // Check if there's a next lab
      const nextLabId = labId + 1;
      const nextLab = labExercises.find(lab => lab.id === nextLabId);
      
      if (nextLab) {
        router.push(`/labs/${nextLabId}`);
      } else {
        router.push('/courses/my-courses');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/my-courses" className="flex items-center text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Volver a mis cursos</span>
            </Link>
            <div className="text-sm">
              <span className={`px-2 py-1 rounded-full ${labCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {labCompleted ? 'Completado' : 'En progreso'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Laboratorio: {exercise.title}</h1>
        
        <div className="max-w-4xl mx-auto">
          <CodeLab 
            exercise={exercise}
            onComplete={handleLabComplete}
          />
        </div>
      </div>
    </div>
  );
} 