import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../lib/utils';

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function Slider({ value, onValueChange, min = 0, max = 4, step = 1, className }: SliderProps) {
  const marks = React.useMemo(() => {
    const result = [];
    for (let i = min; i <= max; i += step) {
      result.push(i);
    }
    return result;
  }, [min, max, step]);

  return (
    <div className="relative pt-1 pb-8">
      <SliderPrimitive.Root
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-gray-200 dark:bg-gray-800">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-blue-500" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full border border-blue-500 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-400 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-800"
        />
      </SliderPrimitive.Root>

      <div className="absolute left-0 right-0 -bottom-1 flex justify-between">
        {marks.map((mark) => (
          <div
            key={mark}
            className="flex flex-col items-center"
          >
            <div className="w-0.5 h-2 bg-gray-300 dark:bg-gray-700 mb-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">{mark}</span>
          </div>
        ))}
      </div>
    </div>
  );
}