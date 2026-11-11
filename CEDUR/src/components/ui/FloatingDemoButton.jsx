import React from 'react';
import { Play } from 'lucide-react';

export function FloatingDemoButton({ onOpenDemo }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <button
        onClick={onOpenDemo}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white shadow-xl hover:shadow-2xl hover:shadow-brand-500/20 border border-slate-700/80 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Watch Demo Video"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-500 text-white group-hover:bg-brand-400 transition-colors shadow-sm animate-pulse-subtle">
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        </span>
        <span className="text-sm font-semibold pr-1">Watch Demo</span>
      </button>
    </div>
  );
}

export default FloatingDemoButton;
