export interface UserData {
  id: number;
  email: string;
  name?: string;
  subscriptions?: Subscription[];
}

export interface CourseData {
  id: number;
  title: string;
  description: string;
  instructor: string;
  image: string;
  duration: string;
  level: string;
  price: number;
  rating: number;
  modules: ModuleData[];
}

export interface ModuleData {
  id: number;
  title: string;
  description: string;
  lessons: LessonData[];
  exam?: ExamData;
}

export interface LessonData {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  content: string;
}

export interface ExamData {
  id: number;
  title: string;
  questions: QuestionData[];
  passingScore: number;
}

export interface QuestionData {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
}

export interface Subscription {
  id: string;
  plan: 'basic' | 'premium';
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface LabData {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  language: string;
  initialCode: string;
  solution: string;
  tests: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
} 