import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseData } from '@/types';
import Image from 'next/image';

interface CourseCardProps {
  course: CourseData;
  progress?: number;
  isEnrolled?: boolean;
}

export function CourseCard({ course, progress = 0, isEnrolled = false }: CourseCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image 
          src={course.imagen || '/placeholder-course.jpg'} 
          alt={course.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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