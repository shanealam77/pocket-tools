import React from 'react';
import { motion } from 'motion/react';
import { SEO } from './SEO';
import { Icon } from './Icon';
import { Tool } from '../types';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';
import { ArrowLeft, Share2, Star } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { cn } from '../lib/utils';

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

const TOOL_DETAILS: Record<string, { title: string; content: string }[]> = {
  'qr-generator': [
    { title: 'Why use an Online QR Code Generator?', content: 'QR codes are essential for bridging the gap between physical and digital worlds. Our free QR code generator allows you to create high-quality codes for URLs, text, and contact info instantly.' },
    { title: 'Is this QR Generator free?', content: 'Yes, Pocket Tools provides a 100% free QR generator with no hidden costs or limits. All codes are generated locally in your browser for maximum privacy.' }
  ],
  'gst-calculator': [
    { title: 'How to calculate GST online?', content: 'Simply enter your base amount and select the GST slab (5%, 12%, 18%, or 28%). Our Free GST Calculator will show you the Net Amount, GST Amount, and Total Payable instantly.' },
    { title: 'Add or Remove GST', content: 'You can easily toggle between adding tax to a price or calculating the original price by removing the tax (GST inclusive vs exclusive).' }
  ],
  'password-generator': [
    { title: 'Secure Password Generator', content: 'Creating strong passwords is the first step in online security. Use our random password generator to create unbreakable keys with symbols, numbers, and mixed cases.' },
    { title: 'Local Generation', content: 'Your passwords never touch our servers. We use browser-native cryptography to ensure your security remains absolute.' }
  ],
  // Add more as needed or use a generic fallback
};

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, children }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(tool.id);
  const relatedTools = TOOLS.filter(t => t.id !== tool.id && t.category === tool.category).slice(0, 4);
  const details = TOOL_DETAILS[tool.id] || [
    { title: `About ${tool.name}`, content: tool.description },
    { title: 'Fast & Secure', content: 'All our tools are designed to be extremely lightweight and process data locally in your browser to ensure your privacy.' }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tool.name,
        text: tool.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pb-20">
      <SEO title={tool.name} description={tool.description} />
      
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <nav className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-800" />
          <span className="text-sm font-medium text-slate-400 capitalize">{tool.category}</span>
        </nav>

        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
                <Icon name={tool.icon} className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">{tool.name}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{tool.shortDescription}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button 
                onClick={() => toggleFavorite(tool.id)}
                className={cn(
                  "p-2 rounded-xl border transition-all",
                  favorited 
                    ? "bg-amber-50 border-amber-200 text-amber-500 dark:bg-amber-900/20 dark:border-amber-800"
                    : "border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <Star className={cn("w-5 h-5", favorited && "fill-current")} />
              </button>
            </div>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-10 shadow-sm backdrop-blur-sm"
        >
          {children}
        </motion.main>

        <section className="mt-16 space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            {details.map((item, i) => (
              <div key={i} className="space-y-3">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{item.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            Related Tools
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map(t => (
              <Link
                key={t.id}
                to={t.path}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all group overflow-hidden relative"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 mb-3 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                  <Icon name={t.icon} className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-indigo-600 transition-colors">{t.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{t.shortDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
