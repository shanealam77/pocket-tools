import React, { useState } from 'react';
import { CreditCard, Wallet, Calendar, PiggyBank } from 'lucide-react';
import { cn } from '../../lib/utils';

export const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('1000000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [tenure, setTenure] = useState<string>('20');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  const calculateEMI = () => {
    const P = parseFloat(loanAmount) || 0;
    const R = (parseFloat(interestRate) || 0) / 12 / 100;
    const N = tenureType === 'years' ? (parseFloat(tenure) || 0) * 12 : (parseFloat(tenure) || 0);

    if (P === 0 || R === 0 || N === 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    return { emi, totalInterest, totalPayment };
  };

  const { emi, totalInterest, totalPayment } = calculateEMI();

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Loan Amount</label>
            <div className="relative">
               <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full p-4 pl-12 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-lg font-bold"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loan Tenure</label>
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl scale-90 origin-right">
                  {(['years', 'months'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTenureType(type)}
                      className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-bold capitalize transition-all",
                        tenureType === type ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-lg font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-500/20 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-125 duration-700">
              <CreditCard className="w-32 h-32" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Monthly EMI</span>
            <span className="text-5xl font-black mb-1 block">
              ₹{Math.round(emi).toLocaleString()}
            </span>
            <p className="text-xs opacity-70">Payable every month for {tenure} {tenureType}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Total Interest</span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">₹{Math.round(totalInterest).toLocaleString()}</span>
            </div>
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Total Payable</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">₹{Math.round(totalPayment).toLocaleString()}</span>
            </div>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
              <PiggyBank className="w-5 h-5" />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 dark:text-emerald-400 leading-relaxed">
              Plan your finances wisely. Start small, dream big.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
