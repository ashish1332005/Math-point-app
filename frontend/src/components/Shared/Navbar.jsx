import React, { useContext, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Contact,
  Home,
  LayoutGrid,
  LogIn,
  LogOut,
  Menu,
  Phone,
  School,
  Sparkles,
  UsersRound,
  User,
  X,
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { livePrograms } from '../../data/livePrograms';
import BrandLogo from './BrandLogo';

const navLinks = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'About', to: '/about', icon: Sparkles },
  { label: 'Courses', to: '/courses', icon: BookOpen },
  { label: 'Faculties', to: '/faculties', icon: UsersRound },
  { label: 'Contact', to: '/contact', icon: Contact },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Academic');

  const categories = useMemo(
    () => [...new Set(livePrograms.map((program) => program.category))],
    [],
  );

  const activePrograms = livePrograms.filter((program) => program.category === activeCategory);
  const studentPortalPath = user?.role === 'parent' ? '/parent' : '/student';

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate('/');
  };

  const handleProgramNavigate = () => {
    closeMenu();
    navigate('/courses');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-[0_10px_34px_-28px_rgba(15,23,42,0.55)] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-3 sm:h-[72px] sm:px-6 lg:px-8">
        <BrandLogo
          imageClassName="h-11 w-11 object-contain sm:h-12 sm:w-12"
          titleClassName="font-serif text-xl font-bold tracking-tight text-slate-950 sm:text-2xl"
          taglineClassName="hidden text-[10px] uppercase tracking-[0.26em] text-sky-600/80 sm:block"
        />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
          >
            <Phone className="h-4 w-4" />
            Enquire
          </Link>
          {user && user.role !== 'admin' ? (
            <>
              <Link
                to={studentPortalPath}
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sky-700"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sky-700"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.6)] transition active:scale-95 lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-[68px] z-50 bg-slate-950/35 backdrop-blur-[2px] lg:hidden" onClick={closeMenu}>
          <div
            className="absolute inset-x-0 top-0 mx-auto max-h-[calc(100vh-76px)] max-w-md overflow-hidden rounded-b-[30px] border-x border-b border-white/80 bg-white shadow-[0_30px_90px_-32px_rgba(15,23,42,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="max-h-[calc(100vh-92px)] overflow-y-auto px-4 pb-5 pt-4">
              <div className="overflow-hidden rounded-[24px] bg-slate-950 text-white shadow-xl">
                <div className="relative p-4">
                  <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.35),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.28),transparent_30%)]" />
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-sky-200">
                        Maths Point App
                      </p>
                      <h3 className="mt-1 truncate text-lg font-black">
                        {user ? `Hi, ${user.name?.split(' ')[0] || 'Student'}` : 'Welcome Student'}
                      </h3>
                      <p className="mt-1 max-w-[230px] text-xs leading-5 text-slate-300">
                        Courses, study material and dashboard in one place.
                      </p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-lg font-black ring-1 ring-white/15">
                      {user ? user.name?.charAt(0) : <User className="h-6 w-6" />}
                    </div>
                  </div>

                  <div className="relative mt-4 grid grid-cols-2 gap-2">
                    {user && user.role !== 'admin' ? (
                      <>
                        <Link
                          to={studentPortalPath}
                          onClick={closeMenu}
                          className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition active:scale-[0.98]"
                        >
                          <User className="h-4 w-4" />
                          Open Dashboard
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white ring-1 ring-white/15 transition active:scale-[0.98]"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={closeMenu}
                          className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition active:scale-[0.98]"
                        >
                          <LogIn className="h-4 w-4" />
                          Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={closeMenu}
                          className="flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-4 py-3 text-sm font-black text-slate-950 transition active:scale-[0.98]"
                        >
                          Join Now
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

            <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50 p-2.5">
              <button
                type="button"
                onClick={() => setIsExploreOpen((open) => !open)}
                className="flex w-full items-center justify-between rounded-[20px] bg-white px-4 py-3 text-left shadow-sm transition active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <LayoutGrid className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-900">Explore Courses</p>
                    <p className="text-xs text-slate-500">Choose your program</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-slate-500 transition ${isExploreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isExploreOpen && (
                <div className="mt-3 space-y-3">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${
                          activeCategory === category
                            ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                            : 'border border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-2">
                    {activePrograms.map((program) => {
                      const Icon = program.icon || BookOpen;
                      return (
                        <button
                          key={program.id}
                          type="button"
                          onClick={handleProgramNavigate}
                          className="group flex w-full items-center gap-3 rounded-[20px] border border-slate-200 bg-white p-3 text-left shadow-sm transition active:scale-[0.98]"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-700">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-extrabold text-slate-900">{program.title}</p>
                            <p className="truncate text-xs text-slate-500">{program.audience}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[20px] border px-2 py-3 text-center text-xs font-black shadow-sm transition active:scale-95 ${
                        isActive
                          ? 'border-sky-200 bg-sky-50 text-sky-800'
                          : 'border-slate-200 bg-white text-slate-900'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 text-sky-600" />
                    {link.label}
                  </NavLink>
                );
              })}
              <Link
                to="/free-study-materials"
                onClick={closeMenu}
                className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[20px] border border-slate-200 bg-white px-2 py-3 text-center text-xs font-black text-slate-900 shadow-sm transition active:scale-95"
              >
                <School className="h-5 w-5 text-sky-600" />
                Materials
              </Link>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[20px] border border-sky-200 bg-sky-50 px-2 py-3 text-center text-xs font-black text-sky-800 shadow-sm transition active:scale-95"
              >
                <Phone className="h-5 w-5 text-sky-700" />
                Enquire
              </Link>
            </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
