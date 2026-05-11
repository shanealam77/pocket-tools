import React, { useState } from 'react';
import { Percent, Plus, Minus, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export const GSTCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<'add' | 'remove'>('add');

  const gstRates = [5, 12, 18, 28];

  const calculate = () => {
    const val = parseFloat(amount) || 0;
    if (type === 'add') {
      const gst = (val * rate) / 100;
      const total = val + gst;
      return { base: val, gst, total };
    } else {
      const total = val;
      const base = (total * 100) / (100 + rate);
      const gst = total - base;
      return { base, gst, total };
    }
  };

  const result = calculate();

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl flex gap-1">
            <button
              onClick={() => setType('add')}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all",
                type === 'add' ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Plus className="w-4 h-4" /> Add GST
            </button>
            <button
              onClick={() => setType('remove')}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all",
                type === 'remove' ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Minus className="w-4 h-4" /> Remove GST
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">GST Rate (%)</label>
              <div className="grid grid-cols-4 gap-2">
                {gstRates.map(r => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={cn(
                      "py-3 rounded-xl text-sm font-bold transition-all",
                      rate === r ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                    )}
                  >
                    {r}%
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom Rate"
                className="w-full p-3 mt-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-center"
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-sm relative">
             <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium text-slate-400">Net Amount</span>
                  <span className="text-lg font-bold">₹{result.base.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium text-slate-400">GST ({rate}%)</span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">+ ₹{result.gst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">₹{result.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
             </div>
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-3">
            <Info className="w-5 h-5 text-indigo-500" />
            <p className="text-xs text-indigo-700 dark:text-indigo-400/80 leading-relaxed font-medium">
              CGST and SGST will be {(rate / 2).toFixed(1)}% each (for intra-state transactions).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
