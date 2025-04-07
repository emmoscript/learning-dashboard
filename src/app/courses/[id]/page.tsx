// Separar la definición del componente del lado del servidor y del cliente

// Componente del lado del servidor (sin "use client")
import { CoursePaymentOptions } from '@/components/Course/CoursePaymentOptions';
import VideoSection from '@/components/Dashboard/VideoSection';
import { ModuleList } from '@/components/Dashboard/ModuleList';
import { ExamSection } from '@/components/Dashboard/ExamSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Clock, BarChart } from 'lucide-react';

// Esta es la función de página del lado del servidor
export default function Page({ params }: { params: { id: string } }) {
  return <CourseDetailClient params={params} />;
}

// Ahora el componente del lado del cliente
"use client";

import { useEffect, useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CourseFacade } from '@/lib/facade/CourseFacade';
import { AuthContext } from '@/context/AuthContext';

interface CourseDetailClientProps {
  params: {
    id: string;
  };
}

function CourseDetailClient({ params }: CourseDetailClientProps) {
  // Extraer el ID del curso directamente
  const courseId = params.id ? parseInt(params.id) : null;
  
  const [currentModule, setCurrentModule] = useState(0);
  const [currentContent, setCurrentContent] = useState<'video' | 'exam'>('video');
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  
  // Cargar el curso cuando cambie el ID
  useEffect(() => {
    if (courseId) {
      const foundCourse = CourseFacade.getCourseById(courseId);
      setCourse(foundCourse);
    }
  }, [courseId]);

  useEffect(() => {
    // Redirect if course doesn't exist
    if (!course) {
      return;
    }

    // If not logged in, stay on the page but don't allow access to course materials
    if (!user) return;

    // Check if the user is enrolled in the course
    const isEnrolled = user.cursosInscritos?.includes(course.id) || false;
    if (!isEnrolled) return;

    // Load saved progress
    const savedProgress = CourseFacade.getUserCourseProgress(user.id, course.id);
    if (savedProgress > 0) {
      // Simulate completed modules based on progress
      const totalModules = course.modules?.length || 0;
      const completedCount = Math.floor((savedProgress / 100) * totalModules);
      const newCompletedModules = new Set<number>();
      
      for (let i = 0; i < completedCount; i++) {
        newCompletedModules.add(i);
      }
      
      setCompletedModules(newCompletedModules);
      
      // Set current module to the next incomplete one
      if (completedCount < totalModules) {
        setCurrentModule(completedCount);
      }
    }
  }, [course, router, user]);

  const handleModuleComplete = useCallback(() => {
    if (!course || !user) return;
    
    const newCompletedModules = new Set(completedModules);
    newCompletedModules.add(currentModule);
    setCompletedModules(newCompletedModules);
    
    // Update progress in "backend"
    const newProgress = Math.round((newCompletedModules.size / (course.modules?.length || 1)) * 100);
    CourseFacade.updateUserCourseProgress(user.id, course.id, newProgress);
    
    // Move to the next module if available
    if (currentModule < (course.modules?.length || 0) - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentContent('video');
    }
  }, [completedModules, course, currentModule, user]);

  if (!course) {
    return <div className="container mx-auto p-8">Cargando curso...</div>;
  }

  const isEnrolled = user?.cursosInscritos?.includes(course.id) || false;
  const currentProgress = user ? CourseFacade.getUserCourseProgress(user.id, course.id) : 0;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{course.level}</span>
          </div>
          {course.students && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.students} estudiantes</span>
            </div>
          )}
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-6 flex-col md:flex-row">
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-semibold mb-4">Acerca de este curso</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              
              {course.learningOutcomes && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Lo que aprenderás:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.learningOutcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">Instructor:</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">
                      {course.instructor?.split(' ').map(n => n[0]).join('') || '??'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{course.instructor}</h4>
                    {course.topic && (
                      <p className="text-sm text-gray-600">Experto en {course.topic}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progreso del curso</span>
                  <span>{currentProgress}%</span>
                </div>
                <Progress value={currentProgress} className="h-2" />
              </div>
              
              {!isEnrolled && (
                user ? (
                  <Button 
                    className="w-full mb-4"
                    onClick={() => {
                      // Enroll user in the course
                      CourseFacade.enrollUserInCourse(user.id, course.id);
                      // Force a reload to update state
                      window.location.reload();
                    }}
                  >
                    Inscribirme en este curso
                  </Button>
                ) : (
                  <Button 
                    className="w-full mb-4"
                    onClick={() => router.push('/login')}
                  >
                    Inicia sesión para inscribirte
                  </Button>
                )
              )}
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <BarChart className="w-4 h-4 mr-1 text-yellow-500" />
                  <span className="text-sm font-medium">Calificación</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-4 h-4 ${star <= Math.round(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="ml-1 text-sm">{course.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <ul className="text-sm text-gray-600">
                <li className="flex items-center mb-1">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.modules?.length || 0} módulos</span>
                </li>
                <li className="flex items-center mb-1">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>Acceso a foros de discusión</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Certificado al completar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {isEnrolled ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Tabs defaultValue="content" className="mb-6">
                <TabsList>
                  <TabsTrigger value="content">Contenido del Curso</TabsTrigger>
                  <TabsTrigger value="materials">Materiales</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="p-4">
                  {currentContent === 'video' ? (
                    <VideoSection 
                      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title={`Módulo ${currentModule + 1}: ${course.modules?.[currentModule]?.title || "Sin título"}`}
                      description={course.modules?.[currentModule]?.description || "Sin descripción"}
                    />
                  ) : (
                    <ExamSection 
                      questions={course.modules?.[currentModule]?.questions || []}
                      moduleTitle={course.modules?.[currentModule]?.title || "Sin título"}
                      onComplete={handleModuleComplete}
                      moduleIndex={currentModule}
                    />
                  )}
                </TabsContent>
                <TabsContent value="materials" className="p-4">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Materiales del Curso</h2>
                    {course.materials && course.materials.length > 0 ? (
                      <ul className="divide-y">
                        {course.materials.map((material, i) => (
                          <li key={i} className="py-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>{material.title}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              Descargar
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No hay materiales disponibles para este curso.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <ModuleList 
                modules={course.modules || []}
                currentModule={currentModule}
                currentContent={currentContent}
                completedModules={completedModules}
                onModuleSelect={setCurrentModule}
                onContentSelect={setCurrentContent}
              />
            </div>
          </div>
        ) : (
          // Opciones de pago
          typeof window !== 'undefined' && (
            <CoursePaymentOptions course={course} />
          )
        )}
      </div>
    </div>
  );
} 