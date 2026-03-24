import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/6" />
        </div>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};

const ProductGrid = ({ children, columns = 4 }: { children: React.ReactNode, columns?: number }) => {
  return (
    <div className={cn(
      "grid gap-x-6 gap-y-12",
      columns === 4 ? "grid-cols-2 lg:grid-cols-4" : 
      columns === 3 ? "grid-cols-2 lg:grid-cols-3" : 
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    )}>
      {children}
    </div>
  );
};

import { cn } from "@/lib/utils";
export default ProductGrid;
