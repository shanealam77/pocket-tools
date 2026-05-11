import React, { useState } from 'react';
import { Dices, RefreshCw, Hash, Settings2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [result, setResult] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 100;
    
    // Aesthetic delay
    setTimeout(() => {
      const num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      setResult(num);
      setIsGenerating(false);
    }, 400);
  };

  return (
    <div className="space-y-12 py-10">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="w-48 h-48 rounded-full border-4 border-indigo-600/10 dark:border-indigo-400/10 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {result !== null ? (
                <motion.span
                  key={result}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-7xl font-black text-indigo-600 dark:text-indigo-400"
                >
                  {result}
                </motion.span>
              ) : (
                <Dices className="w-20 h-20 text-slate-200 dark:text-slate-800" />
              )}
            </AnimatePresence>
            
            {isGenerating && (
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="absolute inset-0 border-4 border-t-indigo-600 rounded-full"
               />
            )}
          </div>
        </div>

        <button
          onClick={generate}
          disabled={isGenerating}
          className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-3"
        >
          <RefreshCw className={cn("w-5 h-5", isGenerating && "animate-spin")} />
          Generate
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <div className="p-8 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Settings2 className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Range Settings</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 pl-2">Minimum</label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 pl-2">Maximum</label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
