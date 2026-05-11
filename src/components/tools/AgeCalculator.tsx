import React, { useState } from 'react';
import { Calendar, Cake, Clock, History } from 'lucide-react';
import { cn } from '../../lib/utils';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');

  const calculateAge = () => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, daysToBirthday };
  };

  const age = calculateAge();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2 block">
          Select Your Date of Birth
        </label>
        <div className="relative">
          <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500" />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-6 pl-16 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold appearance-none"
          />
        </div>
      </div>

      {age ? (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Years', value: age.years },
              { label: 'Months', value: age.months },
              { label: 'Days', value: age.days },
            ].map(item => (
              <div key={item.label} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-center shadow-sm">
                <span className="block text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400">{item.value}</span>
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-2 block">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-indigo-600 shadow-sm">
                <Cake className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-900 dark:text-indigo-200">Next Birthday</p>
                <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70">Celebrate in {age.daysToBirthday} days</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-1 bg-indigo-200 dark:bg-indigo-800 rounded-full relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-indigo-500" 
                  style={{ width: `${((365 - age.daysToBirthday) / 365) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-300">
            <Clock className="w-8 h-8" />
          </div>
          <p className="text-slate-400 font-medium tracking-wide">Enter your birth date to see results</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
            <History className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Calculates precisely using calendar-aware month and day logic.
          </p>
        </div>
        <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
             <Cake className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Includes countdown to your next anniversary.
          </p>
        </div>
      </div>
    </div>
  );
};
