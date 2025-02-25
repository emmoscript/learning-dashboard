export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface ExamData {
    questions: Question[];
  }
  
  export interface Module {
    title: string;
    lessons: string[];
    exam: ExamData;
  }
  
  export interface CourseData {
    title: string;
    modules: Module[];
  }