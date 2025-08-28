import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../lib/utils';

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({ value, className, indicatorClassName }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
        className
      )}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-blue-500 transition-all",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}