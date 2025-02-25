"use client";

import { ExamSection } from "@/components/Dashboard/ExamSection";
import { VideoSection } from "@/components/Dashboard/VideoSection";
import { ModuleList } from "@/components/Dashboard/ModuleList";
import { useState } from "react";

const courseData = {
  modules: [
    {
      title: "Module 1",
      videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      lessons: ["Lesson 1", "Lesson 2"],
      exam: { questions: [] }, // Se asegura que siempre sea un array
    },
    {
      title: "Module 2",
      videoUrl: "https://example.com/video2",
      lessons: [],
      exam: { questions: [] }, // Se agrega un array vacío en lugar de undefined
    },
  ],
};

export default function Dashboard() {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentContent, setCurrentContent] = useState<'video' | 'exam'>('video');
  const [completedModules, setCompletedModules] = useState(new Set<number>());

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-50 p-4 border-r">
        <ModuleList
          modules={courseData.modules}
          currentModule={currentModule}
          completedModules={completedModules}
          onModuleSelect={(index) => {
            if (index === 0 || completedModules.has(index - 1)) {
              setCurrentModule(index);
              setCurrentContent('video');
            }
          }}
          currentContent={currentContent}
          onContentSelect={setCurrentContent}
        />
      </div>
      <div className="flex-1 p-6">
        {currentContent === 'video' ? (
          <VideoSection videoUrl={courseData.modules[currentModule].videoUrl} onComplete={() => setCurrentContent('exam')} />
        ) : (
          <ExamSection
            onComplete={(passed: any) => {
              if (passed) {
                setCompletedModules((prev) => new Set([...prev, currentModule]));
                if (currentModule < courseData.modules.length - 1) {
                  setCurrentModule(currentModule + 1);
                  setCurrentContent('video');
                }
              }
            }}
            moduleIndex={currentModule}
          />
        )}
      </div>
    </div>
  );
}
