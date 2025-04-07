import { labs } from '@/data/labs';

// Estado interno para laboratorios (en memoria)
const enrolledLabs: Record<string, number[]> = {}; // userId -> labIds
const labProgress: Record<string, number> = {}; // userId-labId -> progress

export const LabFacade = {
  // Lab retrieval methods
  getLabs: () => labs,
  
  getLabById: (id: number) => labs.find(lab => lab.id === id),
  
  getFeaturedLabs: () => {
    // Devolver los 3 primeros laboratorios como destacados
    // Ya que no tenemos un campo 'featured' en nuestro modelo
    return labs.slice(0, 3);
  },
  
  getUserLabs: (userLabIds: number[]) => labs.filter(lab => 
    userLabIds.includes(lab.id)
  ),
  
  // Enrollment methods
  enrollUserInLab: (userId: number | string, labId: number) => {
    const userKey = String(userId);
    enrolledLabs[userKey] = [...(enrolledLabs[userKey] || []), labId];
    return true;
  },
  
  isUserEnrolledInLab: (userId: number | string, labId: number) => {
    const userKey = String(userId);
    return enrolledLabs[userKey]?.includes(labId) || false;
  },
  
  // Progress tracking
  getUserLabProgress: (userId: number | string, labId: number) => {
    const progressKey = `${userId}-${labId}`;
    return labProgress[progressKey] || 0;
  },
  
  updateUserLabProgress: (userId: number | string, labId: number, progress: number) => {
    const progressKey = `${userId}-${labId}`;
    labProgress[progressKey] = progress;
    return true;
  },
  
  // Statistics
  getMostPopularLabs: (limit = 5) => {
    // En una implementación real, esto contaría las inscripciones reales
    // Por ahora, simplemente devolvemos los laboratorios ordenados por rating
    return [...labs]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}; 