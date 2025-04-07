"use client"

import { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  Book, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Module } from '@/types/types';

interface ModuleListProps {
  modules: Module[];
  currentModule: number;
  currentContent: 'video' | 'exam';
  completedModules: Set<number>;
  onModuleSelect: (index: number) => void;
  onContentSelect: (type: 'video' | 'exam') => void;
}

export function ModuleList({ 
  modules, 
  currentModule, 
  currentContent,
  completedModules, 
  onModuleSelect,
  onContentSelect
}: ModuleListProps) {
  const [openModule, setOpenModule] = useState<string>(String(currentModule));

  const canAccessModule = (moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    return completedModules.has(moduleIndex - 1);
  };

  const getModuleProgress = (moduleIndex: number) => {
    if (completedModules.has(moduleIndex)) return 100;
    if (!canAccessModule(moduleIndex)) return 0;
    if (currentContent === 'exam' && currentModule === moduleIndex) return 75;
    if (currentModule === moduleIndex) return 50;
    return 0;
  };

  return (
    <div className="space-y-4">
      <div className="px-2 py-4">
        <h2 className="text-xl font-semibold">Contenido del Curso</h2>
        <p className="text-sm text-gray-500 mt-1">
          Progreso total: {Math.round((completedModules.size / modules.length) * 100)}%
        </p>
        <Progress 
          value={(completedModules.size / modules.length) * 100}
          className="mt-2"
        />
      </div>

      <Accordion
        type="single"
        collapsible
        value={openModule}
        onValueChange={setOpenModule}
        className="space-y-2"
      >
        {modules.map((module, moduleIndex) => {
          const isLocked = !canAccessModule(moduleIndex);
          const isCompleted = completedModules.has(moduleIndex);
          const isActive = currentModule === moduleIndex;
          const progress = getModuleProgress(moduleIndex);

          return (
            <AccordionItem
              key={moduleIndex}
              value={String(moduleIndex)}
              className={cn(
                "border rounded-lg overflow-hidden",
                isLocked && "opacity-60",
                isActive && "border-blue-500"
              )}
            >
              <AccordionTrigger
                className={cn(
                  "flex items-center justify-between p-4 w-full",
                  isLocked && "cursor-not-allowed"
                )}
                onClick={(e: { preventDefault: () => void; }) => {
                  if (isLocked) {
                    e.preventDefault();
                    return;
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Book className="w-5 h-5 text-blue-500" />
                  )}
                  <div className="text-left">
                    <h3 className="font-medium">Módulo {moduleIndex + 1}</h3>
                    <p className="text-sm text-gray-500">{module.title}</p>
                  </div>
                </div>
                <Progress value={progress} className="w-20" />
              </AccordionTrigger>

              <AccordionContent>
                <div className="p-4 space-y-3">
                  {/* Lecciones */}
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Button
                      key={lessonIndex}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        currentModule === moduleIndex && 
                        currentContent === 'video' && 
                        "bg-blue-50"
                      )}
                      onClick={() => {
                        if (!isLocked) {
                          onModuleSelect(moduleIndex);
                          onContentSelect('video');
                        }
                      }}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {lesson}
                      {currentModule === moduleIndex && 
                       currentContent === 'video' && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </Button>
                  ))}

                  {/* Examen del módulo */}
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      currentModule === moduleIndex && 
                      currentContent === 'exam' && 
                      "bg-blue-50"
                    )}
                    onClick={() => {
                      if (!isLocked) {
                        onModuleSelect(moduleIndex);
                        onContentSelect('exam');
                      }
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Evaluación del módulo
                    {currentModule === moduleIndex && 
                     currentContent === 'exam' && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </Button>

                  {/* Estado del módulo */}
                  <div className="mt-4 pt-3 border-t">
                    {isCompleted ? (
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Módulo completado
                      </div>
                    ) : isLocked ? (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Lock className="w-4 h-4 mr-2" />
                        Completa el módulo anterior para desbloquear
                      </div>
                    ) : (
                      <div className="flex items-center text-blue-600 text-sm">
                        <Book className="w-4 h-4 mr-2" />
                        En progreso
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}