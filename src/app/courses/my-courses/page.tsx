"use client";

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CourseFacade } from '@/lib/facade/CourseFacade';
import { CourseData } from '@/types/types';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function MyCourses() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [enrolledCoursesData, setEnrolledCoursesData] = useState<CourseData[]>([]);

  useEffect(() => {
    // Redirigir si no hay usuario autenticado
    if (!user) {
      router.push('/login');
      return;
    }

    // Obtener cursos inscritos
    const allCourses = CourseFacade.getCourses();
    setCourses([...allCourses]);

    const enrolledCourses = user.cursosInscritos 
      ? allCourses.filter(course => user.cursosInscritos.includes(course.id))
      : [];
    
    setEnrolledCoursesData([...enrolledCourses]);
  }, [user, router]);

  const handleEnroll = (courseId: number) => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Inscribir al usuario en el curso
    CourseFacade.enrollUserInCourse(user.id, courseId);
    
    // Actualizar el estado
    const updatedUser = {
      ...user,
      cursosInscritos: [...(user.cursosInscritos || []), courseId]
    };
    
    // Simular la actualización del usuario en un entorno real
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Forzar recarga para reflejar los cambios
    window.location.reload();
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Cursos</h1>
      
      {enrolledCoursesData.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Aún no tienes cursos inscritos</h2>
          <p className="text-gray-600 mb-8">Explora nuestro catálogo y comienza tu aprendizaje hoy.</p>
          <Link href="/">
            <Button>Ver todos los cursos</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCoursesData.map(course => {
            const progress = CourseFacade.getUserCourseProgress(user.id, course.id);
            
            return (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-48 w-full">
                  <Image 
                    src={course.image || '/placeholder-course.jpg'} 
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span>{course.level}</span>
                    <span className="mx-2">•</span>
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progreso</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <Link href={`/courses/${course.id}`}>
                    <Button className="w-full">Continuar</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <h2 className="text-2xl font-bold mt-16 mb-8">Cursos Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses
          .filter(course => !user.cursosInscritos?.includes(course.id))
          .slice(0, 3)
          .map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="relative h-48 w-full">
                <Image 
                  src={course.image || '/placeholder-course.jpg'} 
                  alt={course.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <span>{course.level}</span>
                  <span className="mx-2">•</span>
                  <span>{course.duration}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <Button onClick={() => handleEnroll(course.id)} className="w-full">
                  Inscribirme
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
} 