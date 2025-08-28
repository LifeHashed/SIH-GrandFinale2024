import React from 'react';
import { X, User, Sun, Moon, HelpCircle, Info, Phone, History } from 'lucide-react';
import { cn } from '../lib/utils';
import { useThemeStore } from '../store/theme';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme, toggleTheme } = useThemeStore();

  const menuItems = [
    { icon: User, label: 'Account Details' },
    { icon: HelpCircle, label: 'How to Use' },
    { icon: Info, label: 'About Us' },
    { icon: Phone, label: 'Contact Us' },
    { icon: History, label: 'History' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900",
          "transform transition-transform duration-200 ease-in-out z-50",
          "border-r border-gray-200 dark:border-gray-800",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              onClick={() => (window.location.href = `/${item.label.toLowerCase().replace(' ', '-') }`)}
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
          
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-5 h-5" />
                Dark Mode
              </>
            ) : (
              <>
                <Sun className="w-5 h-5" />
                Light Mode
              </>
            )}
          </button>
        </nav>
      </aside>
    </>
  );
}