import React, { useState } from 'react';
import { Send, Phone, MessageSquare, Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';

export const WhatsAppLinkGenerator: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('1'); // Default USA
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const cleanPhone = phone.replace(/\D/g, '');
  const link = `https://wa.me/${code}${cleanPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  const copyToClipboard = () => {
    if (!cleanPhone) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = () => {
    if (!cleanPhone) return;
    window.open(link, '_blank');
    trackEvent('whatsapp_link_opened');
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-[120px_1fr] gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Country</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">+</span>
            <input
              type="number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 pl-7 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123 456 7890"
              className="w-full p-4 pl-12 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-xl font-bold"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Optional Message</label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hello! I'm interested in..."
            className="w-full min-h-[120px] p-4 pl-12 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all resize-none text-lg"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={copyToClipboard}
          disabled={!cleanPhone}
          className={cn(
            "p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all",
            cleanPhone 
              ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200" 
              : "bg-slate-50 dark:bg-slate-800/50 text-slate-300 cursor-not-allowed"
          )}
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          Copy Link
        </button>
        <button
          onClick={openWhatsApp}
          disabled={!cleanPhone}
          className={cn(
            "p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/10",
            cleanPhone 
              ? "bg-[#25D366] text-white hover:bg-[#128C7E] active:scale-95" 
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
          )}
        >
          <Send className="w-5 h-5" />
          Open in WhatsApp
        </button>
      </div>

      <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
        <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 mb-1">Preview URL</h4>
        <p className="text-xs font-mono text-indigo-600/60 dark:text-indigo-400/60 break-all">
          {cleanPhone ? link : 'Enter a phone number to see the link...'}
        </p>
      </div>
    </div>
  );
};
