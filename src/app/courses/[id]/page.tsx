"use client";

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CourseFacade } from '@/lib/facade/CourseFacade';
import { VideoSection } from '@/components/Dashboard/VideoSection';
import { ExamSection } from '@/components/Dashboard/ExamSection';
import { ModuleList } from '@/components/Dashboard/ModuleList';
import { Progress } from '@/components/ui/progress';
import { Award, ChevronLeft, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseData } from '@/types';

export default function CourseDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  
  // Get ID only once on initial render using a callback, avoids React.use warning
  const [courseId] = useState<number | null>(() => {
    return params.id ? parseInt(params.id) : null;
  });
  
  const [currentModule, setCurrentModule] = useState(0);
  const [currentContent, setCurrentContent] = useState<'video' | 'exam'>('video');
  const [completedModules, setCompletedModules] = useState(new Set<number>());
  const [course, setCourse] = useState<CourseData | null>(null);
  
  // Load course data once on mount
  useEffect(() => {
    if (courseId) {
      const foundCourse = CourseFacade.getCourseById(courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      }
    }
  }, [courseId]);
  
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (!course || !courseId) {
      return;
    }
    
    if (!user.cursosInscritos.includes(courseId)) {
      router.push('/courses/my-courses');
      return;
    }
    
    // Initialize completed modules based on previously saved state
    const completedKeys = Object.keys(localStorage)
      .filter(key => key.startsWith(`${user.id}-${courseId}-`))
      .map(key => parseInt(key.split('-')[2]));
    
    setCompletedModules(new Set(completedKeys));
  }, [user, course, courseId, router]);
  
  if (!user || !course || !courseId) return null;
  
  const courseProgress = CourseFacade.getUserCourseProgress(user.id, courseId);
  
  const handleModuleComplete = (moduleIndex: number) => {
    // Save completed module to localStorage
    localStorage.setItem(`${user.id}-${courseId}-${moduleIndex}`, 'true');
    
    // Update state
    setCompletedModules(prev => new Set([...prev, moduleIndex]));
    
    // Update course progress
    const newProgress = Math.round(((completedModules.size + 1) / course.modules.length) * 100);
    CourseFacade.updateUserCourseProgress(user.id, courseId, newProgress);
    
    // Move to next module if available
    if (moduleIndex < course.modules.length - 1) {
      setCurrentModule(moduleIndex + 1);
      setCurrentContent('video');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/my-courses" className="flex items-center text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Volver a mis cursos</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <UserCircle className="w-5 h-5 mr-1 text-gray-600" />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
              {courseProgress === 100 && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Award className="w-4 h-4 mr-1" />
                  Certificado
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Course Title & Progress */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-gray-600">
              <span className="mr-3">{course.level}</span>
              <span>Instructor: {course.instructor}</span>
            </div>
            <div className="text-sm text-gray-600">
              Progreso: {courseProgress}%
            </div>
          </div>
          <Progress value={courseProgress} className="h-2" />
        </div>

        {/* Course Dashboard */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Module List */}
          <div className="md:w-1/3 lg:w-1/4">
            <ModuleList
              modules={course.modules}
              currentModule={currentModule}
              currentContent={currentContent}
              completedModules={completedModules}
              onModuleSelect={(index) => {
                if (index === 0 || completedModules.has(index - 1)) {
                  setCurrentModule(index);
                  setCurrentContent('video');
                }
              }}
              onContentSelect={setCurrentContent}
            />
          </div>

          {/* Content Area */}
          <div className="md:w-2/3 lg:w-3/4">
            {currentContent === 'video' ? (
              <VideoSection 
                videoUrl={course.modules[currentModule].videoUrl} 
                onComplete={() => setCurrentContent('exam')} 
              />
            ) : (
              <ExamSection
                onComplete={(passed) => {
                  if (passed) {
                    handleModuleComplete(currentModule);
                  }
                }}
                moduleIndex={currentModule}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 