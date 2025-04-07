"use client";

import { useState, useEffect, useContext, use } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { CourseFacade } from '@/lib/facade/CourseFacade';
import { ModuleList } from '@/components/Dashboard/ModuleList';
import VideoSection from '@/components/Dashboard/VideoSection';
import { ExamSection } from '@/components/Dashboard/ExamSection';
import { CheckCircle, Users, Award, BookOpen, Clock, Activity } from 'lucide-react';
import { CourseData } from '@/types/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

type PageParams = {
  id: string;
};

export default function CourseDetail({ params }: { params: Promise<PageParams> }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentContent, setCurrentContent] = useState<'video' | 'exam'>('video');
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  
  const resolvedParams = use(params);
  
  useEffect(() => {
    // Cargar datos del curso
    const courseId = parseInt(resolvedParams.id);
    const courseData = CourseFacade.getCourseById(courseId);
    
    if (courseData) {
      setCourse(courseData);
      
      // Verificar si el usuario está inscrito
      if (user && user.cursosInscritos) {
        setIsEnrolled(user.cursosInscritos.includes(courseId));
        
        // Cargar módulos completados
        const completed = new Set<number>();
        for (let i = 0; i < (courseData.modules?.length || 0); i++) {
          if (CourseFacade.hasPassedExam(user.id, courseId, i)) {
            completed.add(i);
          }
        }
        setCompletedModules(completed);
      }
    }
    
    setLoading(false);
  }, [resolvedParams.id, user]);
  
  const handleModuleSelect = (moduleIndex: number) => {
    setCurrentModule(moduleIndex);
  };
  
  const handleContentSelect = (type: 'video' | 'exam') => {
    setCurrentContent(type);
  };
  
  const handleModuleComplete = (success: boolean) => {
    if (!user || !course) return;
    
    if (success) {
      const courseId = parseInt(resolvedParams.id);
      CourseFacade.markExamPassed(user.id, courseId, currentModule);
      
      // Actualizar el estado local
      const newCompleted = new Set(completedModules);
      newCompleted.add(currentModule);
      setCompletedModules(newCompleted);
      
      // Si hay un siguiente módulo, avanzar
      if (course.modules && currentModule < course.modules.length - 1) {
        setCurrentModule(currentModule + 1);
        setCurrentContent('video');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-10"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3 space-y-4">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <div className="md:w-1/3">
              <div className="h-72 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Curso no encontrado</h1>
        <p className="mb-6">El curso que estás buscando no existe o ha sido removido.</p>
        <Link href="/courses/my-courses">
          <Button>Volver a Mis Cursos</Button>
        </Link>
      </div>
    );
  }
  
  const renderContent = () => {
    if (!isEnrolled) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Inscríbete en este curso</h2>
          <p className="mb-4">Para acceder al contenido del curso, primero debes inscribirte.</p>
          <Button className="w-full">
            Inscribirme Ahora
          </Button>
        </div>
      );
    }
    
    if (!course.modules || course.modules.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contenido en desarrollo</h2>
          <p>El contenido de este curso está siendo desarrollado y estará disponible pronto.</p>
        </div>
      );
    }
    
    const currentModuleData = course.modules[currentModule];
    
    if (currentContent === 'video') {
      return (
        <VideoSection 
          videoUrl={currentModuleData.videoUrl || ''}
          title={currentModuleData.title}
          description={currentModuleData.description}
        />
      );
    } else {
      return (
        <ExamSection 
          onComplete={handleModuleComplete} 
          moduleIndex={currentModule}
        />
      );
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Contenido principal */}
        <div className="md:w-2/3 space-y-6">
          {renderContent()}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Información del Curso</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                <span>Duración: {course.duration}</span>
              </div>
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-500" />
                <span>Nivel: {course.level}</span>
              </div>
              {course.students && (
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{course.students} estudiantes</span>
                </div>
              )}
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-500" />
                <span>Certificado al completar</span>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-3">Lo que aprenderás</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {(course.learningOutcomes || []).map((outcome, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            
            {course.instructor && (
              <>
                <h3 className="text-lg font-medium mb-3">Instructor</h3>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-sm text-gray-600">Instructor Certificado</p>
                  </div>
                </div>
              </>
            )}
            
            {course.topic && (
              <>
                <h3 className="text-lg font-medium mb-3">Incluye</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                    <span>Acceso a todos los materiales del curso</span>
                  </li>
                  <li className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-500" />
                    <span>Certificado de finalización</span>
                  </li>
                </ul>
              </>
            )}
            
            {course.materials && course.materials.length > 0 && (
              <>
                <h3 className="text-lg font-medium mb-3">Materiales del Curso</h3>
                <ul className="space-y-2">
                  {course.materials.map((material, i) => (
                    <li key={i} className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                      <a href={material.url} className="text-blue-600 hover:underline">
                        {material.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        
        {/* Barra lateral con lista de módulos */}
        <div className="md:w-1/3">
          {course.modules && course.modules.length > 0 && isEnrolled ? (
            <div className="bg-white rounded-lg shadow-md">
              <ModuleList 
                modules={course.modules}
                currentModule={currentModule}
                currentContent={currentContent}
                completedModules={completedModules}
                onModuleSelect={handleModuleSelect}
                onContentSelect={handleContentSelect}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                <Image 
                  src={course.image || '/placeholder-course.jpg'} 
                  alt={course.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Instructor:</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Duración:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Nivel:</span>
                  <span>{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Valoración:</span>
                  <span>{course.rating}/5</span>
                </div>
              </div>
              
              {!isEnrolled && (
                <Button className="w-full mb-2">
                  Inscribirme Ahora
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 