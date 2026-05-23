import React, { useEffect, useState } from 'react';
import { Search, Sun, Moon, Bell, LogOut, Menu, X, Home, BookOpen, Award, Settings, HelpCircle } from 'lucide-react';

const Navbar = ({ onSearch, searchValue = '', userName = 'Student' }) => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  const menuItems = [
    { icon: Home, label: 'Dashboard', color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, label: 'Courses', color: 'from-purple-500 to-pink-500' },
    { icon: Award, label: 'Results', color: 'from-orange-500 to-red-500' },
    { icon: Settings, label: 'Settings', color: 'from-green-500 to-emerald-500' },
    { icon: HelpCircle, label: 'Support', color: 'from-indigo-500 to-blue-500' },
  ];

  return (
    <header className="sticky top-0 z-30">
      {/* Desktop/Tablet View */}
      <div className="hidden sm:block overflow-hidden rounded-[28px] border border-white/70 bg-white/75 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_55%,#22d3ee_100%)] text-sm font-black tracking-[0.24em] text-white shadow-lg shadow-sky-500/20">
              MP
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">Maths Point</p>
              <div className="text-base font-semibold text-slate-900 dark:text-slate-100">Welcome back, {userName}</div>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchValue}
                onChange={(e) => onSearch && onSearch(e.target.value)}
                placeholder="Search courses, topics or faculty"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:focus:border-sky-400 dark:focus:ring-sky-950"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white">
                <Bell className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDark((state) => !state)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Modern Professional Design */}
      <div className="sm:hidden">
        {/* Top Bar */}
        <div className="relative z-10 bg-gradient-to-b from-white/95 to-white/90 dark:from-slate-950/95 dark:to-slate-950/90 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center justify-between px-4 py-3 gap-3">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => setMobileOpen(true)}
                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 active:scale-95 transition-transform dark:text-slate-300 dark:hover:bg-slate-900/50"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-lg shadow-blue-500/30">
                  MP
                </div>
                <div className="hidden">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Maths Point</p>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Hi, {userName.split(' ')[0]}</div>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMobileSearch((s) => !s)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/80 text-slate-700 transition hover:bg-slate-200 active:scale-95 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800/70"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/80 text-slate-700 transition hover:bg-slate-200 active:scale-95 relative dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800/70">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse" />
              </button>

              <button
                onClick={() => setDark((state) => !state)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/80 text-slate-700 transition hover:bg-slate-200 active:scale-95 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800/70"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar - Expandable */}
          {mobileSearch && (
            <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  autoFocus
                  value={searchValue}
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                  placeholder="Search courses, faculty..."
                  className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:focus:border-blue-400 dark:focus:ring-blue-950"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slide-over Menu - Professional Design */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setMobileOpen(false)} 
            aria-hidden="true" 
          />

          {/* Sidebar */}
          <aside className="relative ml-auto w-full max-w-xs h-full bg-white dark:bg-slate-950 shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 px-6 py-5 border-b border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30">MP</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Welcome back</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{userName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileOpen(false)} 
                  className="p-2 rounded-lg text-slate-600 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-slate-800/60 transition"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {menuItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                    }}
                    className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-102 active:scale-95 ${
                      idx === 0 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30' 
                        : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-900/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-all ${
                      idx === 0
                        ? 'bg-white/20'
                        : 'bg-slate-100 group-hover:bg-slate-200 dark:bg-slate-900/50 dark:group-hover:bg-slate-800'
                    }`}>
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="font-semibold text-sm">{item.label}</span>
                    {idx === 0 && <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded-full font-bold">Active</span>}
                  </a>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

            {/* Footer Actions */}
            <div className="px-4 py-4 space-y-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-95 transition-all">
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
