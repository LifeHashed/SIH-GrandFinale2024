import React from 'react';
import { FileText, Image, FileUp, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface RedactionCardProps {
  icon: typeof FileText;
  title: string;
  description: string;
  onClick: () => void;
}

export function RedactionCard({ icon: Icon, title, description, onClick }: RedactionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm",
        "border border-gray-200 dark:border-gray-700",
        "hover:shadow-md transition-shadow duration-200",
        "text-left w-full"
      )}
    >
      <Icon className="w-8 h-8 mb-4 text-blue-500" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </button>
  );
}