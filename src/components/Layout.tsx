import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { Outlet, useLocation } from 'react-router-dom';
import { pageView } from '../lib/analytics';

export const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    pageView(location.pathname);
  }, [location]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
      <Sidebar className="hidden lg:flex w-72 h-screen sticky top-0" />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
