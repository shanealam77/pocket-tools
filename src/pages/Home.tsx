import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { TOOLS } from "../constants";
import { Icon } from "../components/Icon";
import { SEO } from "../components/SEO";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, Zap, Shield, Smartphone, Star } from "lucide-react";
import { cn } from "../lib/utils";
import { useFavorites } from "../context/FavoritesContext";

export const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const { favorites, isFavorite } = useFavorites();

  const filteredTools = useMemo(() => {
    const queryParts = search
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((part) => part.length > 0);

    if (queryParts.length === 0) return TOOLS;

    return TOOLS.filter((tool) => {
      const searchContent =
        `${tool.name} ${tool.description} ${tool.category} ${tool.shortDescription}`.toLowerCase();
      // Improved logic: matches all parts of the query (more permissive than exact string match)
      return queryParts.every((part) => searchContent.includes(part));
    });
  }, [search]);

  const favoriteTools = useMemo(() => {
    return TOOLS.filter((tool) => favorites.includes(tool.id));
  }, [favorites]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pb-20">
      <SEO
        title="WebToolz | 12+ Online Utilities"
        description="WebToolz - A lightweight, mobile-first collection of essential online tools. QR generator, age calculator, password generator and more."
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 p-20 -mr-20 -mt-20 blur-3xl opacity-20 pointer-events-none">
          <div className="w-[500px] h-[500px] bg-indigo-600 rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            12+ Tools & Counting
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            All your essential tools in{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              one pocket.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
            Fast, secure, and mobile-first. No tracking, just tools that work
            instantly.
          </p>

          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="What tool do you need today?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl text-lg shadow-xl shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {!search && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 pointer-events-none">
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-400">
                  ⌘
                </kbd>
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-400">
                  K
                </kbd>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Favorites Section */}
      <AnimatePresence>
        {favorites.length > 0 && !search && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 max-w-6xl mx-auto mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-500">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                Favorite Tools
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {favoriteTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-amber-400 dark:hover:border-amber-600 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all">
                    <Icon name={tool.icon} className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">
                    {tool.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Grid Section */}
      <section className="px-6 max-w-6xl mx-auto mt-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTools.map((tool) => (
            <motion.div key={tool.id} variants={item}>
              <Link
                to={tool.path}
                className="group flex flex-col h-full p-8 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-[32px] hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 transition-opacity pointer-events-none transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 duration-500">
                  <Icon name={tool.icon} className="w-32 h-32" />
                </div>

                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Icon name={tool.icon} className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {tool.description}
                </p>

                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-600">
                    {tool.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 px-6 bg-slate-100/50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-2">
              No tools found for "{search}"
            </h3>
            <p className="text-slate-500">
              Try searching for something else or browse categories.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-6 text-indigo-600 font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Features / SEO Text */}
      <section className="px-6 max-w-4xl mx-auto mt-32 space-y-20">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold">Instant Load</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Compressed assets and smart routing ensure sub-second loading even
              on slow 3G.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="font-bold">Privacy First</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              All processing happens in your browser. We never see your data or
              inputs.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center mx-auto text-amber-600">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="font-bold">Mobile First</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Designed for your pocket. Large touch targets and finger-friendly
              layouts.
            </p>
          </div>
        </div>

        <div className="p-10 bg-slate-900 dark:bg-black rounded-[40px] text-white overflow-hidden relative">
          <div className="absolute bottom-0 right-0 p-20 -mb-20 -mr-20 blur-3xl opacity-30">
            <div className="w-[300px] h-[300px] bg-indigo-500 rounded-full" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-black mb-6">Why WebToolz?</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We believe the best tools should be fast and reliable. WebToolz was built
              to provide essential digital utilities without the clutter of modern websites.
              Just the utility you need, when you need it.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Fast", "Reliable", "Minimal"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-32 px-6 py-12 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
          <Link to="/about" className="hover:text-indigo-500 transition-colors">
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-indigo-500 transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/privacy-policy"
            className="hover:text-indigo-500 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-indigo-500 transition-colors">
            Terms & Conditions
          </Link>
        </div>
        <p className="text-sm text-slate-400 font-medium">
          Made with ❤️ for the mobile web • WebToolz 2026
        </p>
      </footer>
    </div>
  );
};
