"use client"

import { Card } from '@/components/ui/card';

interface VideoSectionProps {
  videoUrl: string;
  onComplete: () => void;
}

export function VideoSection({ videoUrl, onComplete }: VideoSectionProps) {
  return (
    <Card className="w-full">
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Card>
  );
}