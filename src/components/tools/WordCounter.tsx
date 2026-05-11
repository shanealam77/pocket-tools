import React, { useState } from 'react';
import { Copy, Check, Clock, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const readingTime = Math.ceil(words / 200); // 200 words per minute average

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => setText('');

  return (
    <div className="space-y-8">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="w-full min-h-[300px] p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl focus:border-indigo-500 focus:outline-none transition-all resize-none text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {text && (
            <button
              onClick={clear}
              className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
            >
              Clear
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className={cn(
              "p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all",
              copied ? "text-green-500" : "text-slate-400 hover:text-indigo-500"
            )}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Words', value: words },
          { label: 'Characters', value: characters },
          { label: 'Without Spaces', value: charsNoSpaces },
          { label: 'Sentences', value: text.split(/[.!?]+/).filter(Boolean).length },
        ].map((stat) => (
          <div key={stat.label} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-center shadow-sm">
            <span className="block text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1 block px-2">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Est. Reading Time</p>
            <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{readingTime} minute{readingTime !== 1 ? 's' : ''}</p>
          </div>
        </div>
        
        <div className="flex-1 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <Info className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed italic">
            Calculated using standard 200 wpm average.
          </p>
        </div>
      </div>
    </div>
  );
};
