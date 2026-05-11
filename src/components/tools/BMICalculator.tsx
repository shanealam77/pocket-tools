import React, { useState } from 'react';
import { Activity, Info, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const bmi = weight && height 
    ? parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)
    : 0;

  const getCategory = () => {
    if (!bmi) return null;
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-500', description: 'Possible nutritional deficiency and osteoporosis.' };
    if (bmi < 25) return { label: 'Healthy', color: 'text-green-500', bg: 'bg-green-500', description: 'Low risk of health problems.' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-500', description: 'Increased risk of developing health problems.' };
    return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-500', description: 'High risk of heart disease, diabetes and certain cancers.' };
  };

  const category = getCategory();

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            {(['male', 'female'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold capitalize transition-all",
                  gender === g 
                    ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
          {category && (
            <div className={cn("absolute inset-x-0 bottom-0 h-1 opacity-20", category.bg)} />
          )}
          
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your BMI</span>
          <span className={cn("text-6xl font-black mb-4", category?.color || "text-slate-300")}>
            {bmi ? bmi.toFixed(1) : '--.-'}
          </span>
          
          {category && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className={cn("inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-4", category.bg)}>
                {category.label}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                {category.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-500" />
          Healthy BMI Range
        </h3>
        <div className="space-y-3">
          {[
            { range: '< 18.5', label: 'Underweight', color: 'bg-blue-500' },
            { range: '18.5 – 24.9', label: 'Healthy Weight', color: 'bg-green-500' },
            { range: '25.0 – 29.9', label: 'Overweight', color: 'bg-yellow-500' },
            { range: '30.0 >', label: 'Obese', color: 'bg-red-500' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className={cn("w-2 h-2 rounded-full", item.color)} />
                <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
              </div>
              <span className="font-mono font-bold text-slate-400">{item.range}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
