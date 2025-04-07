"use client";

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, CloudLightning, Code, Terminal } from 'lucide-react';
import React from 'react';

interface LabsDetailProps {
  params: {
    id: string;
  };
}

export default function LabDetail({ params }: LabsDetailProps) {
  const resolvedParams = React.use(params);
  const labId = resolvedParams.id ? parseInt(resolvedParams.id) : null;
  
  const [activeTab, setActiveTab] = useState<string>('instructions');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Check if the lab has been completed before
    const completionKey = `lab_${labId}_completed`;
    if (localStorage.getItem(completionKey) === 'true') {
      setIsCompleted(true);
    }
  }, [user, router, labId]);

  const handleComplete = () => {
    // Mark lab as completed
    localStorage.setItem(`lab_${labId}_completed`, 'true');
    setIsCompleted(true);
  };

  const labs = [
    {
      id: 1,
      title: "Laboratorio de Análisis de Datos con Python",
      description: "Aprende a utilizar Python y bibliotecas como Pandas, NumPy y Matplotlib para análisis de datos.",
      instructions: [
        "Configura un entorno virtual en Python",
        "Instala las bibliotecas necesarias: pandas, numpy, matplotlib",
        "Carga el dataset proporcionado",
        "Realiza un análisis exploratorio de los datos",
        "Visualiza los resultados utilizando gráficos adecuados"
      ],
      code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Cargar datos
df = pd.read_csv('datos_ejemplo.csv')

# Mostrar información del dataset
print(df.info())
print(df.describe())

# Visualización básica
plt.figure(figsize=(10, 6))
plt.hist(df['columna_numerica'], bins=20)
plt.title('Distribución de valores')
plt.xlabel('Valores')
plt.ylabel('Frecuencia')
plt.show()`,
      terminal: [
        "> python -m venv env",
        "> source env/bin/activate  # En Windows: env\\Scripts\\activate",
        "> pip install pandas numpy matplotlib",
        "> python analisis_datos.py",
        "Output:",
        "<class 'pandas.core.frame.DataFrame'>",
        "RangeIndex: 1000 entries, 0 to 999",
        "Data columns (total 5 columns):",
        " #   Column           Non-Null Count  Dtype  ",
        "---  ------           --------------  -----  ",
        " 0   columna_numerica 1000 non-null   float64",
        " 1   categoria        1000 non-null   object ",
        " 2   valores          1000 non-null   int64  ",
        " 3   fecha            1000 non-null   object ",
        " 4   resultado        1000 non-null   float64",
        "dtypes: float64(2), int64(1), object(2)",
        "memory usage: 39.1+ KB"
      ]
    }
  ];

  const lab = labs.find(l => l.id === labId);

  if (!lab) {
    return <div className="container mx-auto px-4 py-8">Laboratorio no encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{lab.title}</h1>
            {isCompleted && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-1" />
                <span>Completado</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 mt-2">{lab.description}</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="p-0 h-auto">
              <TabsTrigger 
                value="instructions" 
                className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Instrucciones
              </TabsTrigger>
              <TabsTrigger 
                value="code" 
                className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              >
                <Code className="w-4 h-4 mr-2" />
                Código
              </TabsTrigger>
              <TabsTrigger 
                value="terminal" 
                className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              >
                <CloudLightning className="w-4 h-4 mr-2" />
                Terminal
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="instructions" className="p-6">
            <h2 className="text-lg font-medium mb-4">Paso a paso:</h2>
            <ol className="list-decimal pl-6 space-y-3">
              {lab.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
            
            <div className="mt-8">
              <Button 
                onClick={handleComplete}
                disabled={isCompleted}
                className="w-full md:w-auto"
              >
                {isCompleted ? 'Laboratorio Completado' : 'Marcar como Completado'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="p-6">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="font-mono text-sm">
                <code>{lab.code}</code>
              </pre>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <Button variant="outline">
                Copiar Código
              </Button>
              <Button>
                Ejecutar en Entorno Virtual
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="terminal" className="p-6">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="font-mono text-sm">
                {lab.terminal.map((line, index) => (
                  <div key={index} className={line.startsWith('>') ? 'text-green-400' : ''}>
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push('/courses/my-courses')}>
          Volver a Mis Cursos
        </Button>
        
        {isCompleted && (
          <Button variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            Descargar Certificado
          </Button>
        )}
      </div>
    </div>
  );
} 