import React, { useState } from 'react';
import { Copy, RefreshCw, Check, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const charset = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let fullCharset = '';
    if (options.lowercase) fullCharset += charset.lowercase;
    if (options.uppercase) fullCharset += charset.uppercase;
    if (options.numbers) fullCharset += charset.numbers;
    if (options.symbols) fullCharset += charset.symbols;

    if (!fullCharset) return;

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += fullCharset[array[i] % fullCharset.length];
    }

    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    trackEvent('password_copied', { length });
    setTimeout(() => setCopied(false), 2000);
  };

  // Initial generate
  React.useEffect(generate, []);

  const getStrength = () => {
    if (length < 8) return { label: 'Weak', color: 'bg-red-500' };
    if (length < 12) return { label: 'Medium', color: 'bg-yellow-500' };
    if (length < 16) return { label: 'Strong', color: 'bg-green-500' };
    return { label: 'Very Strong', color: 'bg-emerald-500' };
  };

  const strength = getStrength();

  return (
    <div className="space-y-8">
      <div className="relative">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full p-6 pr-32 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-mono text-2xl text-center focus:outline-none focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={generate}
            className="p-3 text-slate-400 hover:text-indigo-500 transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
          <button
            onClick={copyToClipboard}
            className={cn(
              "p-3 rounded-xl transition-all",
              copied ? "text-green-500" : "text-slate-400 hover:text-indigo-500"
            )}
          >
            {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Password Length: <span className="text-indigo-600 dark:text-indigo-400 ml-2">{length}</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Strength:</span>
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-white shadow-sm", strength.color)}>
                {strength.label}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(options).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setOptions({ ...options, [key]: !val })}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border-2 transition-all",
                val 
                  ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600 text-indigo-700 dark:text-indigo-400" 
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
              )}
            >
              <span className="capitalize text-sm font-medium">{key}</span>
              <div className={cn(
                "w-5 h-5 rounded flex items-center justify-center transition-all",
                val ? "bg-indigo-600 text-white" : "border-2 border-slate-300 dark:border-slate-700"
              )}>
                {val && <Check className="w-3.5 h-3.5" />}
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-xs text-emerald-700 dark:text-emerald-400/80 leading-relaxed">
            Your password is generated locally and never sent to any server. Security is our priority.
          </p>
        </div>
      </div>
    </div>
  );
};
