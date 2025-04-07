"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import of Monaco Editor
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <p>Cargando editor...</p>
    </div>
  ),
});

interface Exercise {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  testCode?: string;
  testFunction: (code: string) => boolean;
}

interface CodeLabProps {
  exercise: Exercise;
  onComplete: () => void;
}

export default function CodeLab({ exercise, onComplete }: CodeLabProps) {
  const [code, setCode] = useState(exercise.initialCode);
  const [output, setOutput] = useState<{ message: string; isError: boolean } | null>(null);

  const runCode = () => {
    setOutput(null);
    
    try {
      // For security, we would use a sandboxed environment in a real app
      // For demo purposes, we'll use a try/catch with eval
      
      const result = exercise.testFunction(code);
      
      if (result) {
        setOutput({
          message: '¡Correcto! La solución ha pasado todas las pruebas.',
          isError: false
        });
      } else {
        setOutput({
          message: 'La solución no ha pasado las pruebas. Intenta de nuevo.',
          isError: true
        });
      }
    } catch (error) {
      setOutput({
        message: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        isError: true
      });
    }
  };

  const handleComplete = () => {
    if (output && !output.isError) {
      onComplete();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-800">{exercise.description}</p>
        </div>
        
        <div className="h-[400px] border rounded-md overflow-hidden">
          <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value: string | undefined) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              tabSize: 2,
            }}
          />
        </div>
        
        {output && (
          <div
            className={`p-4 rounded-md ${
              output.isError ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
            }`}
          >
            <div className="flex items-start">
              {output.isError ? (
                <XCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              )}
              <p>{output.message}</p>
            </div>
          </div>
        )}
        
        {exercise.testCode && (
          <div className="bg-gray-800 text-gray-200 p-4 rounded-md text-sm">
            <p className="text-gray-400 mb-2">Código de prueba:</p>
            <pre>{exercise.testCode}</pre>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={runCode}>
          Ejecutar código
        </Button>
        <Button 
          onClick={handleComplete}
          disabled={!output || output.isError}
          className={!output || output.isError ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Continuar
        </Button>
      </CardFooter>
    </Card>
  );
} 