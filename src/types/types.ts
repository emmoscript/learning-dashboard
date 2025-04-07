// Definición del modelo de usuario
export interface User {
  id: number | string;
  name?: string;
  email: string;
  role?: 'estudiante' | 'instructor' | 'admin';
  avatar?: string;
  cursosInscritos?: number[];
  cursosComprados?: number[]; // IDs de cursos comprados individualmente
  suscripcionActiva?: PlanSuscripcion; // Plan de suscripción activo
  labsInscritos?: number[]; // IDs de laboratorios inscritos
}

// Tipo de plan de suscripción
export type PlanSuscripcion = {
  tipo: "basico" | "premium";
  precioMensual: number; // 29.99 (basico) o 59.99 (premium)
  cursosIncluidos: number[]; // IDs de cursos
  fechaInicio: Date;
  fechaRenovacion: Date;
};

// Definición del modelo de curso
export interface CourseData {
  id: number;
  title: string;
  description: string;
  price?: number;
  level: string;
  duration: string;
  instructor: string;
  rating: number;
  students?: number;
  image?: string;
  imagen?: string; // Para compatibilidad con código existente
  topic?: string;
  modules?: Module[];
  status?: 'draft' | 'published';
  learningOutcomes?: string[];
  materials?: CourseMaterial[];
  precioIndividual?: number; // Precio en USD
  enSuscripcion?: boolean; // Si está incluido en planes de suscripción
}

// Definición de módulo de curso
export interface Module {
  title: string;
  description?: string;
  lessons: string[];
  questions?: Question[];
  videoUrl?: string;
  exam?: ExamData;
  examQuestions?: ExamQuestion[];
}

// Definición de examen
export interface ExamData {
  questions: Question[];
}

// Definición de material de curso
export interface CourseMaterial {
  title: string;
  type: 'pdf' | 'video' | 'audio' | 'zip';
  url: string;
}

// Definición de pregunta para exámenes
export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

// Alias para compatibilidad con código existente
export type ExamQuestion = Question;

// Tipos para el carrito de compras
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: CartItemType;
  image?: string;
  courseId?: number;
  plan?: 'basic' | 'premium';
  currency?: string;
  recurring?: { interval: string }; // Para suscripciones
  curso_id?: number; // ID del curso (para compras individuales)
};

export type CartItemType = 'course' | 'subscription';

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  hasSuscription: () => boolean;
};

// Definición del modelo de laboratorio
export interface LabData {
  id: number;
  title: string;
  description: string;
  price?: number;
  level: string;
  duration: string;
  instructor: string;
  rating: number;
  students?: number;
  image?: string;
  learningOutcomes?: string[];
  prerequisites?: string[];
  instructions?: string;
} 