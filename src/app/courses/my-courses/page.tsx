"use client";

import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { CourseFacade } from '@/lib/facade/CourseFacade';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, GraduationCap } from 'lucide-react';

export default function MyCourses() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  const userCourses = CourseFacade.getUserCourses(user.cursosInscritos);
  const availableCourses = CourseFacade.getCourses().filter(
    course => !user.cursosInscritos.includes(course.id)
  );

  const enrollInCourse = (courseId: number) => {
    // In a real app, this would be an API call
    // For now, we'll simulate by updating the user object directly
    user.cursosInscritos.push(courseId);
    CourseFacade.enrollUserInCourse(user.id, courseId);
    
    // Force a re-render
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Mis Cursos</h1>

        {userCourses.length > 0 ? (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <BookOpen className="mr-2" /> Cursos inscritos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={true}
                    progress={CourseFacade.getUserCourseProgress(user.id, course.id)}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tienes cursos inscritos</h3>
            <p className="text-gray-600 mb-6">Explora nuestro catálogo y comienza tu viaje de aprendizaje hoy mismo.</p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/">Explorar cursos</Link>
            </Button>
          </div>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <GraduationCap className="mr-2" /> Cursos disponibles
          </h2>
          {availableCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    {course.imagen ? (
                      <img 
                        src={course.imagen} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>{course.level}</span>
                      <span>{course.duration}</span>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => enrollInCourse(course.id)}
                    >
                      Inscribirse
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">¡Ya estás inscrito en todos nuestros cursos disponibles!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 