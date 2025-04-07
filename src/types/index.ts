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
    videoUrl: string;
    lessons: string[];
    exam: ExamData;
    examQuestions: ExamQuestion[];
  }
  
  export interface CourseData {
    id: number;
    title: string;
    description: string;
    level: string;
    duration: string;
    instructor: string;
    rating: number;
    imagen?: string;
    modules: Module[];
    precioIndividual: number; // Precio en USD
    enSuscripcion: boolean; // Si está incluido en planes de suscripción
  }

  export interface ExamQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
  }

  export interface User {
    id: string;
    email: string;
    cursosInscritos: number[];
    cursosComprados: number[]; // IDs de cursos comprados individualmente
    suscripcionActiva?: PlanSuscripcion; // Plan de suscripción activo
  }

  export type PlanSuscripcion = {
    tipo: "basico" | "premium";
    precioMensual: number; // 29.99 (basico) o 59.99 (premium)
    cursosIncluidos: number[]; // IDs de cursos
    fechaInicio: Date;
    fechaRenovacion: Date;
  };

  // Tipos para el carrito de compras
  export type CartItem = {
    id: string;
    name: string;
    price: number; // En centavos para Stripe
    currency: string;
    recurring?: { interval: string }; // Para suscripciones
    curso_id?: number; // ID del curso (para compras individuales)
  };

  export type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getTotal: () => number;
    hasSuscription: () => boolean;
  };