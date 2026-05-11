import React, { useState } from 'react';
import { Type, Copy, Check, Hash, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const TextCaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = (type: 'upper' | 'lower' | 'capitalize' | 'sentence' | 'title') => {
    let result = '';
    if (type === 'upper') result = text.toUpperCase();
    if (type === 'lower') result = text.toLowerCase();
    if (type === 'capitalize') result = text.replace(/\b\w/g, c => c.toUpperCase());
    if (type === 'title') result = text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
    if (type === 'sentence') result = text.toLowerCase().replace(/(^\w|\.\s*\w)/g, c => c.toUpperCase());
    
    setText(result);
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert..."
          className="w-full min-h-[250px] p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl focus:border-indigo-500 focus:outline-none transition-all resize-none text-lg"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {text && (
            <button onClick={() => setText('')} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-5 h-5" />
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { id: 'upper', label: 'UPPERCASE' },
          { id: 'lower', label: 'lowercase' },
          { id: 'capitalize', label: 'Capitalize' },
          { id: 'title', label: 'Title Case' },
          { id: 'sentence', label: 'Sentence' },
        ].map(m => (
          <button
            key={m.id}
            onClick={() => convert(m.id as any)}
            className="py-4 px-2 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
         <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Characters: {text.length}
         </div>
         <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Words: {text.trim() ? text.trim().split(/\s+/).length : 0}
         </div>
      </div>
    </div>
  );
};
