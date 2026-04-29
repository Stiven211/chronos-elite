"use client";

import { cn } from "../lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 bg-[length:200%_100%] rounded-xl",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-dark-100 rounded-2xl overflow-hidden border border-white/5">
      <div className="aspect-square bg-dark-200 animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="h-4 w-16 bg-dark-200 rounded animate-pulse" />
        <div className="h-6 w-3/4 bg-dark-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-dark-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-dark-200 rounded animate-pulse" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 bg-dark-200 rounded animate-pulse" />
          <div className="h-9 w-20 bg-dark-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
