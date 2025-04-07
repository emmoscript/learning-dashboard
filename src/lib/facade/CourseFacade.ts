// Facade Pattern Implementation for Course Management
import { courses } from '@/data/courses';
import { 
  EnrollmentHandler, 
  ExamHandler, 
  PrerequisiteHandler 
} from '@/lib/handlers/UnlockHandler';

// Keep track of user progress (in real app, this would be in a database)
const userProgress: Record<number, Record<number, number>> = {}; // userId -> courseId -> progress
const passedExams: Record<string, boolean> = {}; // userId-courseId-moduleIdx
const completedModules: Record<string, boolean> = {}; // userId-courseId-moduleIdx

// In a real application, these would be database calls or API requests
export const CourseFacade = {
  // Course retrieval methods
  getCourses: () => courses,
  
  getCourseById: (id: number) => {
    return courses.find(course => course.id === id);
  },
  
  getFeaturedCourses: () => {
    return courses.filter(course => course.rating >= 4.5);
  },
  
  getUserCourses: (userCourseIds: number[]) => {
    return courses.filter(course => userCourseIds.includes(course.id));
  },
  
  // Enrollment methods
  enrollUserInCourse: (userId: number, courseId: number) => {
    // Initialize progress for this user and course
    if (!userProgress[userId]) {
      userProgress[userId] = {};
    }
    userProgress[userId][courseId] = 0;
    
    return true;
  },
  
  // Progress methods
  getUserCourseProgress: (userId: number, courseId: number) => {
    if (!userProgress[userId]) return 0;
    return userProgress[userId][courseId] || 0;
  },
  
  updateUserCourseProgress: (userId: number, courseId: number, progress: number) => {
    if (!userProgress[userId]) {
      userProgress[userId] = {};
    }
    userProgress[userId][courseId] = progress;
  },
  
  // Module methods
  canAccessModule: (userId: number, courseId: number, moduleIndex: number) => {
    // First module is always accessible
    if (moduleIndex === 0) return true;
    
    // Check if previous module was completed
    const prevModuleKey = `${userId}-${courseId}-${moduleIndex - 1}`;
    return completedModules[prevModuleKey] === true;
  },
  
  markModuleCompleted: (userId: number, courseId: number, moduleIndex: number) => {
    const moduleKey = `${userId}-${courseId}-${moduleIndex}`;
    completedModules[moduleKey] = true;
    
    // Update overall course progress
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const totalModules = course.modules.length;
      const completedCount = Object.keys(completedModules)
        .filter(key => key.startsWith(`${userId}-${courseId}`))
        .length;
      
      const progress = Math.round((completedCount / totalModules) * 100);
      CourseFacade.updateUserCourseProgress(userId, courseId, progress);
    }
  },
  
  // Exam methods
  markExamPassed: (userId: number, courseId: number, moduleIndex: number) => {
    const examKey = `${userId}-${courseId}-${moduleIndex}`;
    passedExams[examKey] = true;
    
    // Also mark the module as completed
    CourseFacade.markModuleCompleted(userId, courseId, moduleIndex);
  },
  
  hasPassedExam: (userId: number, courseId: number, moduleIndex: number) => {
    const examKey = `${userId}-${courseId}-${moduleIndex}`;
    return passedExams[examKey] === true;
  },
  
  // Unlock method using Chain of Responsibility
  canUnlockCourse: (userId: number, courseId: number) => {
    // Example prerequisites (in a real app, would be from database)
    const prerequisites: Record<number, number[]> = {
      2: [1] // Course 2 requires Course 1 to be completed
    };
    
    // Get the user enrollments
    const userEnrollments: Record<number, number[]> = {};
    Object.keys(userProgress).forEach(userIdStr => {
      const userId = parseInt(userIdStr);
      userEnrollments[userId] = Object.keys(userProgress[userId]).map(id => parseInt(id));
    });
    
    // Get completed courses
    const completedCourses: Record<number, number[]> = {};
    Object.keys(userProgress).forEach(userIdStr => {
      const userId = parseInt(userIdStr);
      completedCourses[userId] = Object.entries(userProgress[userId])
        .filter(([, progress]) => progress === 100)
        .map(([courseId]) => parseInt(courseId));
    });
    
    // Create and chain the handlers
    const enrollmentHandler = new EnrollmentHandler(userEnrollments);
    const prerequisiteHandler = new PrerequisiteHandler(prerequisites, completedCourses);
    const examHandler = new ExamHandler(passedExams);
    
    enrollmentHandler
      .setNext(prerequisiteHandler)
      .setNext(examHandler);
    
    return enrollmentHandler.handle(courseId, userId);
  },
  
  // Reset all user progress (for testing)
  resetProgress: () => {
    Object.keys(userProgress).forEach(key => delete userProgress[parseInt(key)]);
    Object.keys(passedExams).forEach(key => delete passedExams[key]);
    Object.keys(completedModules).forEach(key => delete completedModules[key]);
  },

  // Verificar si un curso está incluido en la suscripción de un usuario
  isCourseInUserSubscription: (userId: string, courseId: number): boolean => {
    // Simulación: Verificar si el usuario tiene una suscripción activa
    // En una implementación real, esto verificaría en la base de datos
    const userSubscription = localStorage.getItem(`subscription_${userId}`);
    
    if (!userSubscription) {
      return false;
    }
    
    try {
      const subscription = JSON.parse(userSubscription);
      
      // Verificar si la suscripción está activa
      if (!subscription.active) {
        return false;
      }
      
      // Simulación: Los cursos disponibles dependen del plan
      // En una implementación real, esto se obtendría de la base de datos
      if (subscription.plan === 'premium') {
        // El plan premium incluye todos los cursos
        return true;
      } else if (subscription.plan === 'basic') {
        // El plan básico incluye solo ciertos cursos
        // Simulamos una lista de cursos incluidos en el plan básico
        const basicPlanCourses = [1, 2, 3, 5, 7, 9]; // IDs de cursos
        return basicPlanCourses.includes(courseId);
      }
      
      return false;
    } catch (error) {
      console.error('Error al verificar la suscripción:', error);
      return false;
    }
  }
}; 