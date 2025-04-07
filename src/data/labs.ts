import { LabData } from '@/types/types';

// Laboratiorios de ejemplo para la plataforma de e-learning
export const labs: LabData[] = [
  {
    id: 1,
    title: "Laboratorio de Desarrollo Web Frontend",
    description: "Construye una aplicación web completa con React y Next.js",
    price: 29.99,
    level: "Intermedio",
    duration: "3 horas",
    instructor: "Carlos Mendoza",
    rating: 4.8,
    students: 245,
    image: "/labs/frontend-lab.jpg",
    learningOutcomes: [
      "Construir componentes React eficientes",
      "Implementar rutas dinámicas en Next.js",
      "Crear layouts responsivos con Tailwind CSS",
      "Implementar autenticación de usuarios"
    ],
    prerequisites: [
      "Conocimientos básicos de HTML, CSS y JavaScript",
      "Familiaridad con React"
    ],
    instructions: "En este laboratorio práctico, construirás paso a paso una aplicación web completa utilizando React y Next.js. Comenzarás configurando el proyecto, creando componentes reutilizables, implementando rutas y finalizando con la integración de una API."
  },
  {
    id: 2,
    title: "Laboratorio de Backend con Node.js",
    description: "Crea una API RESTful completa con Node.js, Express y MongoDB",
    price: 34.99,
    level: "Avanzado",
    duration: "4 horas",
    instructor: "Ana Martínez",
    rating: 4.7,
    students: 189,
    image: "/labs/backend-lab.jpg",
    learningOutcomes: [
      "Diseñar una API RESTful siguiendo mejores prácticas",
      "Implementar autenticación con JWT",
      "Crear modelos de datos con Mongoose",
      "Implementar validación de datos y manejo de errores"
    ],
    prerequisites: [
      "Conocimientos de JavaScript",
      "Fundamentos de bases de datos",
      "Conceptos básicos de API REST"
    ],
    instructions: "Durante este laboratorio, crearás una API RESTful completa utilizando Node.js con Express y MongoDB. Implementarás rutas, controladores, modelos, autenticación de usuarios y validación de datos. Al finalizar, tendrás una API funcional lista para ser integrada con cualquier frontend."
  },
  {
    id: 3,
    title: "Laboratorio de CI/CD con GitHub Actions",
    description: "Implementa un pipeline de integración y despliegue continuo para aplicaciones web",
    price: 39.99,
    level: "Intermedio",
    duration: "2.5 horas",
    instructor: "Roberto Sánchez",
    rating: 4.9,
    students: 156,
    image: "/labs/cicd-lab.jpg",
    learningOutcomes: [
      "Configurar GitHub Actions para testing automático",
      "Implementar despliegue automático en Vercel y Netlify",
      "Crear ambientes de staging y producción",
      "Implementar pruebas de calidad de código"
    ],
    prerequisites: [
      "Conocimientos de Git y GitHub",
      "Experiencia con desarrollo web",
      "Familiaridad con testing"
    ],
    instructions: "En este laboratorio, configurarás un pipeline completo de CI/CD utilizando GitHub Actions. Aprenderás a automatizar pruebas, verificar la calidad del código y desplegar automáticamente en plataformas como Vercel y Netlify cuando se realicen cambios en el repositorio."
  },
  {
    id: 4,
    title: "Laboratorio de Docker y Kubernetes",
    description: "Aprende a containerizar aplicaciones y orquestarlas con Kubernetes",
    price: 44.99,
    level: "Avanzado",
    duration: "5 horas",
    instructor: "Miguel López",
    rating: 4.8,
    students: 128,
    image: "/labs/docker-lab.jpg",
    learningOutcomes: [
      "Crear imágenes Docker eficientes",
      "Configurar un cluster de Kubernetes",
      "Implementar deployments y servicios en Kubernetes",
      "Gestionar persistencia de datos y configuraciones"
    ],
    prerequisites: [
      "Conocimientos de Linux",
      "Experiencia con línea de comandos",
      "Fundamentos de redes"
    ],
    instructions: "Durante este laboratorio práctico, aprenderás a containerizar aplicaciones utilizando Docker y a orquestarlas con Kubernetes. Crearás imágenes, configurarás un cluster, implementarás deployments, servicios, y aprenderás a gestionar configuraciones y persistencia de datos."
  },
  {
    id: 5,
    title: "Laboratorio de Machine Learning",
    description: "Implementa modelos de aprendizaje automático para análisis de datos",
    price: 49.99,
    level: "Intermedio-Avanzado",
    duration: "6 horas",
    instructor: "Laura González",
    rating: 4.9,
    students: 210,
    image: "/labs/ml-lab.jpg",
    learningOutcomes: [
      "Preparar y limpiar datasets para modelos ML",
      "Implementar algoritmos de clasificación y regresión",
      "Evaluar y mejorar modelos",
      "Desplegar modelos en producción"
    ],
    prerequisites: [
      "Conocimientos básicos de Python",
      "Fundamentos de estadística",
      "Experiencia con manipulación de datos"
    ],
    instructions: "En este laboratorio, implementarás varios modelos de machine learning utilizando Python, scikit-learn y TensorFlow. Aprenderás a preparar datos, entrenar modelos, evaluarlos y mejorarlos. Finalmente, aprenderás a desplegar tus modelos en un entorno de producción."
  }
];

// Función para obtener todos los laboratorios
export const getAllLabs = () => {
  return labs;
};

// Función para obtener laboratorios destacados
export const getFeaturedLabs = () => {
  return labs.slice(0, 3);
}; 