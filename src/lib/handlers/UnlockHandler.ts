// Chain of Responsibility Pattern implementation

export abstract class UnlockHandler {
  private nextHandler: UnlockHandler | null = null;

  public setNext(handler: UnlockHandler): UnlockHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(courseId: number, userId: number): boolean {
    if (this.nextHandler) return this.nextHandler.handle(courseId, userId);
    return true;
  }
}

export class EnrollmentHandler extends UnlockHandler {
  private enrollments: Record<number, number[]> = {};

  constructor(enrollments: Record<number, number[]>) {
    super();
    this.enrollments = enrollments;
  }

  public handle(courseId: number, userId: number): boolean {
    const userEnrollments = this.enrollments[userId] || [];
    
    if (!userEnrollments.includes(courseId)) {
      return false;
    }
    
    return super.handle(courseId, userId);
  }
}

export class ExamHandler extends UnlockHandler {
  private passedExams: Record<string, boolean> = {};

  constructor(passedExams: Record<string, boolean>) {
    super();
    this.passedExams = passedExams;
  }

  public handle(courseId: number, userId: number): boolean {
    const examKey = `${userId}-${courseId}`;
    const hasPassed = this.passedExams[examKey] || false;
    
    if (!hasPassed) {
      return false;
    }
    
    return super.handle(courseId, userId);
  }
}

export class PrerequisiteHandler extends UnlockHandler {
  private prerequisites: Record<number, number[]> = {};
  private completedCourses: Record<number, number[]> = {};

  constructor(prerequisites: Record<number, number[]>, completedCourses: Record<number, number[]>) {
    super();
    this.prerequisites = prerequisites;
    this.completedCourses = completedCourses;
  }

  public handle(courseId: number, userId: number): boolean {
    const coursePrerequisites = this.prerequisites[courseId] || [];
    const userCompletedCourses = this.completedCourses[userId] || [];
    
    // Check if the user has completed all prerequisites
    for (const prereqId of coursePrerequisites) {
      if (!userCompletedCourses.includes(prereqId)) {
        return false;
      }
    }
    
    return super.handle(courseId, userId);
  }
}

// Example usage:
// 
// const enrollmentHandler = new EnrollmentHandler(userEnrollments);
// const examHandler = new ExamHandler(passedExams);
// const prerequisiteHandler = new PrerequisiteHandler(coursePrerequisites, userCompletedCourses);
// 
// // Chain the handlers
// enrollmentHandler
//   .setNext(prerequisiteHandler)
//   .setNext(examHandler);
// 
// // Try to unlock the module
// const canAccess = enrollmentHandler.handle(courseId, userId); 