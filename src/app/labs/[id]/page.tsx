"use client";

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Code, Play, BookOpen, Clock, Activity, Terminal } from 'lucide-react';

// Ejemplo de laboratorio
const labData = {
  id: 1,
  title: "Laboratorio de Desarrollo Web Frontend",
  description: "Construye una aplicación web completa con React y Next.js",
  duration: "3 horas",
  level: "Intermedio",
  instructor: "Carlos Mendoza",
  instructions: "En este laboratorio práctico, construirás paso a paso una aplicación web completa utilizando React y Next.js.",
  objectives: [
    "Construir componentes React eficientes",
    "Implementar rutas dinámicas en Next.js",
    "Crear layouts responsivos con Tailwind CSS",
    "Implementar autenticación de usuarios"
  ],
  codeTemplate: `// Componente de ejemplo
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Counter;`
};

export default function LabPage() {
  const { user } = useContext(AuthContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [code, setCode] = useState(labData.codeTemplate);
  const [output, setOutput] = useState("");
  
  useEffect(() => {
    // Simulación de verificación de inscripción
    if (user) {
      setIsEnrolled(true);
    }
  }, [user]);
  
  const handleRunCode = () => {
    setOutput("// Salida del código\nComponente renderizado correctamente\n✅ Pruebas pasadas: 3/3");
  };
  
  if (!isEnrolled) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">{labData.title}</h1>
        <p className="text-gray-600 mb-8">{labData.description}</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Inscríbete en este laboratorio</h2>
          <p className="mb-4">Para acceder al contenido del laboratorio, primero debes inscribirte.</p>
          <Button className="w-full md:w-auto" onClick={() => setIsEnrolled(true)}>
            Inscribirme Ahora
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              <span>Duración: {labData.duration}</span>
            </div>
            <div className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              <span>Nivel: {labData.level}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-3">Lo que aprenderás</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
            {labData.objectives.map((objective, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{labData.title}</h1>
      
      <Tabs defaultValue="instructions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="instructions" className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            Instrucciones
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Código
          </TabsTrigger>
          <TabsTrigger value="output" className="flex items-center">
            <Terminal className="w-4 h-4 mr-2" />
            Salida
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="instructions" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Instrucciones del Laboratorio</h2>
          <p className="mb-4">{labData.instructions}</p>
          
          <h3 className="text-lg font-medium mb-3">Objetivos</h3>
          <ul className="space-y-2 mb-6">
            {labData.objectives.map((objective, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        
        <TabsContent value="code" className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold">Editor de Código</h2>
            <Button onClick={handleRunCode} className="flex items-center">
              <Play className="w-4 h-4 mr-2" />
              Ejecutar
            </Button>
          </div>
          <div className="p-2">
            <textarea
              className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm w-full h-[400px]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="output" className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold">Resultado</h2>
          </div>
          <div className="p-2">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-auto h-[400px]">
              {output || "// Ejecuta tu código para ver la salida"}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button variant="outline" className="mr-2">
          Guardar Progreso
        </Button>
        <Button>
          Completar Laboratorio
        </Button>
      </div>
    </div>
  );
} 