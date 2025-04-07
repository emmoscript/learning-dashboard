"use client";

import { useRef } from 'react';
import { CourseCard } from '@/components/CourseCard';
import { CourseData } from '@/types/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CourseCarouselProps {
  courses: CourseData[];
  title?: string;
}

export default function CourseCarousel({ courses, title }: CourseCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!courses.length) return null;

  return (
    <div className="relative">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <button 
          onClick={scrollLeft}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {courses.map((course) => (
          <div key={course.id} className="min-w-[300px] snap-start">
            <CourseCard course={course} isEnrolled={false} />
          </div>
        ))}
      </div>
      
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <button 
          onClick={scrollRight}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 