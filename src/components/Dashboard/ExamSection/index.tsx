"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Award } from 'lucide-react';
import { examQuestions } from '@/data/examQuestions'; 

// Definir los tipos para las preguntas
interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

// Definir los tipos de props para ExamSection
interface ExamSectionProps {
  onComplete: (success: boolean) => void;
  moduleIndex: number;
}

export function ExamSection({ onComplete, moduleIndex }: ExamSectionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [examMode, setExamMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

  useEffect(() => {
    try {
      if (examQuestions.modules[moduleIndex]?.exam?.questions) {
        setQuestions(examQuestions.modules[moduleIndex].exam.questions);
      }
    } catch (error) {
      console.error('Error al cargar preguntas:', error);
    } finally {
      setLoading(false);
    }
  }, [moduleIndex]);

  const showAlert = (message: string, type = 'info') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'info' }), 5000);
  };

  const evaluateExam = () => {
    const correctAnswers = Object.entries(answers).filter(
      ([questionIndex, answer]) => questions[Number(questionIndex)]?.correctAnswer === answer
    ).length;
    return (correctAnswers / questions.length) * 100;
  };

  const handleExamSubmit = () => {
    const score = evaluateExam();
    if (score === 100) {
      showAlert('¡Excelente! Has completado el examen.', 'success');
      onComplete(true);
    } else {
      showAlert(`Necesitas responder correctamente todas las preguntas. Tu puntuación: ${score}%`, 'warning');
      setAnswers({});
      setCurrentQuestion(0);
    }
  };

  if (loading) return <p>Cargando preguntas...</p>;
  if (!questions.length)
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Error en la evaluación</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>No se encontraron preguntas en el módulo.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="w-6 h-6" />
          <span>Evaluación del Módulo {moduleIndex + 1}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alert.show && (
          <Alert className="mb-4" variant={alert.type === 'success' ? 'default' : 'destructive'}>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        {!examMode ? (
          <div className="text-center space-y-4">
            <p>¿Estás listo para tomar la evaluación?</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setExamMode(true)}>
              Comenzar Examen
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-full" />
            <div className="space-y-4">
              <h3 className="font-medium">{questions[currentQuestion]?.question || 'Pregunta no disponible'}</h3>
              <div className="space-y-2">
                {questions[currentQuestion]?.options?.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                      answers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setAnswers({ ...answers, [currentQuestion]: index })}
                  >
                    {option}
                  </div>
                )) || <p className="text-red-500">Opciones no disponibles</p>}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Anterior
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                  Siguiente
                </button>
              ) : (
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleExamSubmit}>
                  Enviar
                </button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
