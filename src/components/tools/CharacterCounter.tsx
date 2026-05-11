import React, { useState } from 'react';
import { Type, Copy, Check, Twitter, Instagram, AlignLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

export const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = {
    chars: text.length,
    noSpaces: text.replace(/\s+/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter(Boolean).length,
    paragraphs: text.split('\n').filter(p => p.trim()).length,
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limits = [
    { label: 'Twitter (X)', limit: 280, icon: Twitter },
    { label: 'Instagram Bio', limit: 150, icon: Instagram },
    { label: 'SMS Message', limit: 160, icon: AlignLeft },
  ];

  return (
    <div className="space-y-8">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text here..."
          className="w-full min-h-[250px] p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl focus:border-indigo-500 focus:outline-none transition-all resize-none text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
        />
        <div className="absolute top-4 right-4">
           {text && (
             <button
              onClick={copyToClipboard}
              className={cn(
                "p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all shadow-sm",
                copied ? "text-green-500" : "text-slate-400 hover:text-indigo-500"
              )}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-50 dark:border-slate-800 text-center flex flex-col items-center">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{val}</span>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1 block px-2 line-clamp-1">{key}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {limits.map((limit) => {
          const progress = Math.min((stats.chars / limit.limit) * 100, 100);
          const isOver = stats.chars > limit.limit;
          
          return (
            <div key={limit.label} className="p-6 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <limit.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">{limit.label}</span>
                </div>
                <span className={cn("text-xs font-mono font-bold", isOver ? "text-red-500" : "text-slate-400")}>
                  {stats.chars}/{limit.limit}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-300", isOver ? "bg-red-500" : "bg-indigo-500")} 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
