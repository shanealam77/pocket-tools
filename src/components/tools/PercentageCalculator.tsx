import React, { useState } from 'react';
import { Calculator, ArrowRight, Percent, History } from 'lucide-react';
import { cn } from '../../lib/utils';

export const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = useState<string>('20');
  const [val2, setVal2] = useState<string>('500');
  const [mode, setMode] = useState<'of' | 'percent' | 'diff'>('of');

  const calculate = () => {
    const n1 = parseFloat(val1) || 0;
    const n2 = parseFloat(val2) || 0;
    
    if (mode === 'of') return (n1 / 100) * n2;
    if (mode === 'percent') return n2 === 0 ? 0 : (n1 / n2) * 100;
    if (mode === 'diff') return n1 === 0 ? 0 : ((n2 - n1) / n1) * 100;
    return 0;
  };

  const result = calculate();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        {[
          { id: 'of', label: 'X % of Y' },
          { id: 'percent', label: 'X is what % of Y' },
          { id: 'diff', label: 'X to Y % Change' },
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as any)}
            className={cn(
              "flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
              mode === m.id ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="grid grid-cols-[1fr_40px_1fr] gap-4 items-center">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Value X</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
              />
            </div>
            <div className="flex justify-center pt-6 text-slate-300">
              {mode === 'of' ? <Percent className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Value Y</label>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
              />
            </div>
          </div>
        </div>

        <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-500/20 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-125 duration-700">
            <Calculator className="w-32 h-32" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Result</span>
          <span className="text-5xl font-black mb-2 animate-in fade-in zoom-in-50 duration-300">
            {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            {mode !== 'of' && '%'}
          </span>
          <p className="text-xs opacity-70 font-medium text-center px-6">
            {mode === 'of' && `Is ${val1}% of ${val2}`}
            {mode === 'percent' && `${val1} is ${result.toFixed(2)}% of ${val2}`}
            {mode === 'diff' && `Percentage ${result >= 0 ? 'increase' : 'decrease'} from ${val1} to ${val2}`}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: History, text: 'Instant calculation as you type.' },
          { icon: Percent, text: 'Precise up to 2 decimal places.' },
        ].map((item, i) => (
          <div key={i} className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <item.icon className="w-4 h-4" />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
