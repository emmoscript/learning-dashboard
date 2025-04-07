import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, BookOpen } from 'lucide-react';
import { CourseData } from '@/types';

interface CourseCardProps {
  course: CourseData;
  progress?: number;
  isEnrolled?: boolean;
}

export function CourseCard({ course, progress = 0, isEnrolled = false }: CourseCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        {course.imagen ? (
          <img 
            src={course.imagen} 
            alt={course.title} 
            className="object-cover w-full h-full" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100">
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
        )}
        {!isEnrolled && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span className="mr-2">{course.level}</span>
          <span>•</span>
          <span className="ml-2">{course.duration}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span>Instructor: {course.instructor}</span>
            <span className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-4 h-4 ${star <= Math.round(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="ml-1">{course.rating.toFixed(1)}</span>
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex flex-col">
        {isEnrolled && (
          <div className="w-full mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progreso</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <Link 
          href={isEnrolled ? `/courses/${course.id}` : `/courses/my-courses`} 
          className={`w-full text-center py-2 rounded-md ${
            isEnrolled 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isEnrolled ? 'Continuar' : 'Inscribirse'}
        </Link>
      </CardFooter>
    </Card>
  );
} 