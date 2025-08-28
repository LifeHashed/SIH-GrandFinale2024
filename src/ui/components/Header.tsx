import React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 h-16",
      "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800",
      "flex items-center px-4 z-50"
    )}>
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => (window.location.href = '/#/')}
          className="text-xl font-bold"
        >
          Redact-X
        </button>
        
      </div>
    </header>
  );
}