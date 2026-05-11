import React from 'react';
import { Link } from 'react-router-dom';

export const MobileHeader: React.FC = () => {
  return (
    <header className="lg:hidden sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
          P
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Pocket Tools</span>
      </Link>
    </header>
  );
};
