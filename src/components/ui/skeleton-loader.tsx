
import React from 'react';
import { Skeleton } from './skeleton';

export interface SkeletonProps {
  className?: string;
}

export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={`rounded-lg border bg-card shadow-sm ${className}`}>
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsPageSkeleton() {
  return (
    <div className="space-y-6 fade-in-fast">
      <div>
        <Skeleton className="h-9 w-3/12 mb-2" />
        <Skeleton className="h-5 w-5/12" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <CardSkeleton className="h-64" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      
      <CardSkeleton className="h-72" />
      
      <Skeleton className="h-10 w-32 mt-4" />
    </div>
  );
}
