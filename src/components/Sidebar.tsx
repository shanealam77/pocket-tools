import React, { useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { TOOLS } from "../constants";
import { Icon } from "./Icon";
import { cn } from "../lib/utils";
import { Search, Home, Star } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const [search, setSearch] = useState("");
  const { favorites } = useFavorites();

  const filteredTools = useMemo(() => {
    const queryParts = search
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((part) => part.length > 0);
    if (queryParts.length === 0) return TOOLS;
    return TOOLS.filter((tool) => {
      const searchContent =
        `${tool.name} ${tool.shortDescription} ${tool.category}`.toLowerCase();
      return queryParts.every((part) => searchContent.includes(part));
    });
  }, [search]);

  const favoritedTools = useMemo(() => {
    return TOOLS.filter((t) => favorites.includes(t.id));
  }, [favorites]);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r border-slate-200 bg-slate-50/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/50 transition-colors",
        className,
      )}
    >
      <div className="p-6 border-bottom border-slate-200 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-indigo-500/20 shadow-lg">
            W
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            WebToolz
          </span>
        </Link>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
              isActive
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
            )
          }
        >
          <Home className="w-4 h-4" />
          Home
        </NavLink>

        {favoritedTools.length > 0 && !search && (
          <>
            <div className="pt-4 pb-2 px-3 flex items-center gap-2">
              <Star className="w-3 h-3 text-amber-500 fill-current" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Favorites
              </span>
            </div>
            {favoritedTools.map((tool) => (
              <NavLink
                key={`fav-${tool.id}`}
                to={tool.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                  )
                }
              >
                <Icon name={tool.icon} className="w-4 h-4 text-amber-500" />
                {tool.name}
              </NavLink>
            ))}
          </>
        )}

        <div className="pt-4 pb-2 px-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            All Tools
          </span>
        </div>

        {filteredTools.map((tool) => (
          <NavLink
            key={tool.id}
            to={tool.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
              )
            }
          >
            <Icon
              name={tool.icon}
              className={cn(
                "w-4 h-4 transition-transform group-hover:scale-110",
              )}
            />
            {tool.name}
          </NavLink>
        ))}
        <div className="pt-4 pb-2 px-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Legal & WebToolz
          </span>
        </div>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
              isActive
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
            )
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
              isActive
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
            )
          }
        >
          Contact
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
        <div className="flex justify-center gap-4 text-xs text-slate-500">
          <Link
            to="/privacy-policy"
            className="hover:text-amber-500 transition-colors"
          >
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-amber-500 transition-colors">
            Terms
          </Link>
        </div>
        <p className="text-[10px] text-center text-slate-400">
          © 2026 WebToolz • Fast & Minimal
        </p>
      </div>
    </aside>
  );
};
