import { CourseData } from "@/types/types";

export const courses: CourseData[] = [
  {
    title: "Introducción a la Programación",
    id: 1,
    description: "Aprende los fundamentos de la programación desde cero",
    level: "Principiante",
    duration: "4 semanas",
    instructor: "Ana García",
    rating: 4.8,
    imagen: "https://picsum.photos/600/400?random=1",
    modules: [
      {
        title: "Fundamentos de Programación",
        description: "Aprende los fundamentos básicos de programación",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        lessons: ["Introducción a la lógica", "Variables y tipos de datos", "Estructuras de control"],
        questions: [
          {
            question: "¿Qué es una variable?",
            options: [
              "Una función que retorna un valor",
              "Un espacio en memoria para almacenar datos",
              "Un operador lógico",
              "Un tipo de estructura de control"
            ],
            correctAnswer: 1
          },
          {
            question: "¿Cuál NO es una estructura de control?",
            options: [
              "if-else",
              "for",
              "while",
              "variable"
            ],
            correctAnswer: 3
          }
        ]
      },
      {
        title: "Funciones y Arrays",
        description: "Aprende a crear funciones y trabajar con arrays",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        lessons: ["Funciones básicas", "Parámetros y retorno", "Arrays y colecciones"],
        exam: {
          questions: [
            {
              question: "¿Qué es una función?",
              options: [
                "Un valor numérico",
                "Un bloque de código reutilizable",
                "Un tipo de dato especial",
                "Un operador matemático"
              ],
              correctAnswer: 1
            },
            {
              question: "¿Qué es un array?",
              options: [
                "Una estructura para almacenar múltiples valores",
                "Una función especial",
                "Un tipo de variable booleana",
                "Un operador de comparación"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    title: "Desarrollo Web Frontend",
    id: 2,
    description: "Domina HTML, CSS y JavaScript para crear interfaces modernas",
    level: "Intermedio",
    duration: "6 semanas",
    instructor: "Carlos Mendoza",
    rating: 4.5,
    imagen: "https://picsum.photos/600/400?random=2",
    modules: [
      {
        title: "Fundamentos de HTML",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        lessons: ["Estructura básica", "Elementos semánticos", "Formularios"],
        exam: {
          questions: [
            {
              question: "¿Cuál es la etiqueta para crear un enlace en HTML?",
              options: [
                "<link>",
                "<a>",
                "<href>",
                "<url>"
              ],
              correctAnswer: 1
            },
            {
              question: "¿Qué significa HTML?",
              options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Machine Learning",
                "Home Tool Markup Language"
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        title: "CSS Básico",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        lessons: ["Selectores", "Box Model", "Flexbox"],
        exam: {
          questions: [
            {
              question: "¿Qué propiedad CSS se usa para cambiar el color de fondo?",
              options: [
                "color",
                "bgcolor",
                "background-color",
                "font-color"
              ],
              correctAnswer: 2
            },
            {
              question: "¿Qué es Flexbox?",
              options: [
                "Una propiedad de texto",
                "Un modelo de diseño unidimensional",
                "Un selector especial",
                "Una etiqueta HTML"
              ],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    title: "Desarrollo de Aplicaciones con React",
    id: 3,
    description: "Aprende a crear aplicaciones web modernas con React JS",
    level: "Intermedio",
    duration: "8 semanas",
    instructor: "Laura Martínez",
    rating: 4.9,
    imagen: "https://picsum.photos/600/400?random=3",
    modules: [
      {
        title: "Fundamentos de React",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        lessons: ["Componentes", "Props y State", "Hooks básicos"],
        exam: {
          questions: [
            {
              question: "¿Qué es un componente en React?",
              options: [
                "Una función que retorna elementos HTML",
                "Un objeto JSON",
                "Un archivo CSS",
                "Una base de datos"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    title: "Python para Ciencia de Datos",
    id: 4,
    description: "Usa Python para análisis de datos, visualización y machine learning",
    level: "Intermedio",
    duration: "10 semanas",
    instructor: "Alejandro Ruiz",
    rating: 4.7,
    imagen: "https://picsum.photos/600/400?random=4",
    modules: [
      {
        title: "Fundamentos de Python para Datos",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        lessons: ["NumPy", "Pandas", "Matplotlib"],
        exam: {
          questions: [
            {
              question: "¿Qué biblioteca se usa para análisis de datos estructurados?",
              options: [
                "NumPy",
                "Pandas",
                "Matplotlib",
                "Scikit-learn"
              ],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    title: "Desarrollo Backend con Node.js",
    id: 5,
    description: "Crea APIs y servicios web robustos con Node.js y Express",
    level: "Intermedio",
    duration: "7 semanas",
    instructor: "Miguel Torres",
    rating: 4.6,
    imagen: "https://picsum.photos/600/400?random=5",
    modules: [
      {
        title: "Fundamentos de Node.js",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        lessons: ["Módulos", "Express", "Middleware"],
        exam: {
          questions: [
            {
              question: "¿Qué es Express?",
              options: [
                "Un framework para Node.js",
                "Una base de datos",
                "Un lenguaje de programación",
                "Un servicio de hosting"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    title: "Diseño UX/UI para Desarrolladores",
    id: 6,
    description: "Aprende principios de diseño para crear mejores interfaces de usuario",
    level: "Principiante",
    duration: "5 semanas",
    instructor: "Elena Gómez",
    rating: 4.8,
    imagen: "https://picsum.photos/600/400?random=6",
    modules: [
      {
        title: "Principios de Diseño UI",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        lessons: ["Color y Tipografía", "Layout", "Componentes UI"],
        exam: {
          questions: [
            {
              question: "¿Qué es el contraste en diseño UI?",
              options: [
                "La diferencia visual entre elementos",
                "Un tipo de fuente",
                "Un framework CSS",
                "Un principio de programación"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    title: "DevOps y CI/CD",
    id: 7,
    description: "Automatiza el despliegue de aplicaciones con prácticas DevOps",
    level: "Avanzado",
    duration: "9 semanas",
    instructor: "Javier Rodríguez",
    rating: 4.7,
    imagen: "https://picsum.photos/600/400?random=7",
    modules: [
      {
        title: "Introducción a DevOps",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        lessons: ["Docker", "CI/CD", "Kubernetes"],
        exam: {
          questions: [
            {
              question: "¿Qué es Docker?",
              options: [
                "Una plataforma de contenedores",
                "Un lenguaje de programación",
                "Un sistema operativo",
                "Una base de datos"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    title: "Inteligencia Artificial: Fundamentos",
    id: 8,
    description: "Conoce los conceptos básicos de IA y machine learning",
    level: "Intermedio",
    duration: "8 semanas",
    instructor: "Sofía Castro",
    rating: 4.9,
    imagen: "https://picsum.photos/600/400?random=8",
    modules: [
      {
        title: "Machine Learning Básico",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        lessons: ["Regresión", "Clasificación", "Redes Neuronales"],
        exam: {
          questions: [
            {
              question: "¿Qué es el aprendizaje supervisado?",
              options: [
                "Aprendizaje con datos etiquetados",
                "Aprendizaje sin supervisión humana",
                "Aprendizaje con refuerzo",
                "Aprendizaje sin datos"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  }
];

// Facade Pattern implementation
export const CourseFacade = {
  getCourses: () => courses,
  getCourseById: (id: number) => courses.find(course => course.id === id),
  getFeaturedCourses: () => courses.filter(course => course.rating >= 4.5),
  getUserCourses: (userCourseIds: number[]) => courses.filter(course => 
    userCourseIds.includes(course.id)
  )
}; 