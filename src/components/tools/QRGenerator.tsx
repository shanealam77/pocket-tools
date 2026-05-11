import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Link as LinkIcon, Type, Smartphone } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';

export const QRGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async (val: string) => {
    setText(val);
    if (!val) {
      setQrDataUrl('');
      return;
    }
    try {
      const url = await QRCode.toDataURL(val, {
        width: 1000,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrDataUrl(url);
      trackEvent('qr_generated', { length: val.length });
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `pocket-tools-qr-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider block">
          Enter URL or Text
        </label>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => generateQRCode(e.target.value)}
            placeholder="https://example.com"
            className="w-full min-h-[120px] p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all resize-none text-lg"
          />
          <div className="absolute top-4 right-4 text-slate-300 dark:text-slate-700 pointer-events-none">
            <LinkIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 aspect-square">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Generated QR Code" className="max-w-full h-auto rounded-lg shadow-sm" />
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-300 dark:text-slate-600">
                <Type className="w-8 h-8" />
              </div>
              <p className="text-sm text-slate-400">Your QR code will appear here</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
            <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Instant & Secure
            </h3>
            <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80 leading-relaxed">
              Generate QR codes completely in your browser. No data leaves your device. Perfect for URLs, WiFi credentials, or business cards.
            </p>
          </div>

          <button
            onClick={downloadQR}
            disabled={!qrDataUrl}
            className={cn(
              "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20",
              qrDataUrl 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
            )}
          >
            <Download className="w-5 h-5" />
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
};
