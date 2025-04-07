"use client";

import { ReactNode } from 'react';
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProgressLockProps {
  isLocked: boolean;
  requiredMessage?: string;
  children: ReactNode;
  onUnlock?: () => void;
  progress?: number;
}

export function ProgressLock({
  isLocked,
  requiredMessage = "Complete previous modules to unlock",
  children,
  onUnlock,
  progress = 0
}: ProgressLockProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative rounded-md overflow-hidden group">
      {/* Blurred content */}
      <div className="blur-sm pointer-events-none">
        {children}
      </div>
      
      {/* Lock overlay */}
      <div className="absolute inset-0 bg-gray-900/70 flex flex-col items-center justify-center p-6 text-center">
        <Lock className="w-12 h-12 text-white mb-4" />
        <h3 className="text-white text-xl font-semibold mb-2">Contenido bloqueado</h3>
        <p className="text-gray-200 mb-4 max-w-md">{requiredMessage}</p>
        
        {progress > 0 && (
          <div className="w-full max-w-xs mb-4">
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>{progress}% completado</span>
              <span>100%</span>
            </div>
          </div>
        )}
        
        {onUnlock && (
          <button
            onClick={onUnlock}
            className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Verificar acceso
          </button>
        )}
      </div>
    </div>
  );
}

export function CompletionBadge({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Completado
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
      <AlertCircle className="w-3 h-3 mr-1" />
      Pendiente
    </span>
  );
} 