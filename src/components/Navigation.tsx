import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  Home,
  Search,
  PlusSquare,
  Wallet,
  User,
  Trophy,
  Moon,
  Sun,
  LogOut,
  Repeat
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Sidebar() {
  const { profile, toggleRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isRunner = profile?.role === 'runner';

  const navItems = [
    { label: isRunner ? 'Bounty Board' : 'Dashboard', path: '/dashboard', icon: isRunner ? Search : Home },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { label: 'Wallet', path: '/wallet', icon: Wallet },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 bg-light-surface dark:bg-primary-bg p-6">
      <div className="mb-10 flex items-center gap-2">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-colors duration-500",
          isRunner ? "bg-accent-cyan shadow-accent-cyan/20" : "bg-accent-blue shadow-accent-blue/20"
        )}>
          <span className="text-white font-bold text-xl italic">Q</span>
        </div>
        <h1 className="text-2xl font-bold font-geist-sans tracking-tight">QuestRaid</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? (isRunner ? "bg-accent-cyan text-white shadow-lg shadow-accent-cyan/20" : "bg-accent-blue text-white shadow-lg shadow-accent-blue/20")
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-6">
        <div className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
           <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Active Persona</p>
           <div className="flex items-center justify-between">
              <span className={cn(
                "font-bold text-sm",
                isRunner ? "text-accent-cyan" : "text-accent-blue"
              )}>{profile?.role?.toUpperCase()}</span>
              <button
                onClick={toggleRole}
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <Repeat size={16} />
              </button>
           </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-accent-blue transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const { profile } = useAuth();
  const location = useLocation();
  const isRunner = profile?.role === 'runner';

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Quests', path: '/bounty', icon: Search },
    { label: 'Wallet', path: '/wallet', icon: Wallet },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-light-surface/80 dark:bg-primary-bg/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive
                ? (isRunner ? "text-accent-cyan" : "text-accent-blue")
                : "text-slate-400"
            )}
          >
            <item.icon size={24} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();

  return (
    <div className={cn(
      "min-h-screen",
      profile?.role === 'runner' ? "runner-mode" : "giver-mode"
    )}>
      <Sidebar />
      <main className="md:ml-64 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
