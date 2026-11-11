import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Users,
  DollarSign,
  Calendar,
  CalendarCheck,
  Shield,
  Smartphone,
  Receipt,
  MapPin,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  LogOut,
  Building,
} from 'lucide-react';
import { mainNav, navProducts, authActions } from '../../data/navigation';
import { siteConfig } from '../../data/site';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';
import { useAuth } from '../../context/useAuth';

const iconMap = {
  Users,
  DollarSign,
  Calendar,
  CalendarCheck,
  Shield,
  Smartphone,
  Receipt,
  MapPin,
};

export function Navbar({ onOpenDemo }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <nav
          className={cn(
            'flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300',
            scrolled
              ? 'glass-island-nav shadow-lg'
              : 'bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm'
          )}
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-violet flex items-center justify-center text-white font-black text-xl shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
              C
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                Cedur
              </span>
              <span className="text-[10px] font-semibold text-brand-600 tracking-wider uppercase mt-0.5">
                HR & Payroll
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNav.map((item) => {
              const isActive = location.pathname === item.path;

              if (item.hasDropdown) {
                return (
                  <li key={item.title} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setProductsOpen((prev) => !prev)}
                      className={cn(
                        'flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors',
                        location.pathname.startsWith('/products') ||
                          navProducts.some((p) => location.pathname === p.path)
                          ? 'text-brand-600 bg-brand-50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                      )}
                      aria-expanded={productsOpen}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          productsOpen && 'rotate-180 text-brand-600'
                        )}
                      />
                    </button>

                    {/* Mega Dropdown */}
                    {productsOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 z-50 animate-fadeIn">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            The Cedur Workplace Suite
                          </span>
                          <Link
                            to="/products"
                            onClick={() => setProductsOpen(false)}
                            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                          >
                            View all modules <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {navProducts.map((prod) => {
                            const IconComponent = iconMap[prod.icon] || Users;
                            return (
                              <Link
                                key={prod.slug}
                                to={prod.path}
                                onClick={() => setProductsOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                              >
                                <div className="w-9 h-9 rounded-xl bg-brand-50 group-hover:bg-brand-600 text-brand-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                                      {prod.title}
                                    </span>
                                    {prod.badge && (
                                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-brand-50 text-brand-600 border border-brand-200/50">
                                        {prod.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                    {prod.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors',
                      isActive
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={onOpenDemo}
              className="text-xs font-semibold px-3 py-1.5 rounded-full text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
            >
              Watch Demo
            </button>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Button
                  as={Link}
                  to="/workspace"
                  variant="primary"
                  size="sm"
                  className="shadow-md flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Workspace</span>
                </Button>

                {/* User Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200/80 group"
                    aria-label="User account menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-accent-violet text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {user.initials || 'AD'}
                    </div>
                    <span className="text-xs font-bold text-slate-800 max-w-[110px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 space-y-1.5 z-50 animate-fadeIn">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <div className="font-extrabold text-xs text-slate-900 truncate">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                        <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {user.company || 'Cedur Workspace'}
                        </div>
                      </div>

                      <Link
                        to="/workspace"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/70 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-600" />
                        <span>HR & Payroll Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to={authActions.login.href}
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100/70 transition-colors"
                >
                  {authActions.login.title}
                </Link>
                <Button
                  as={Link}
                  to={authActions.register.href}
                  variant="primary"
                  size="sm"
                >
                  {authActions.register.title}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 bg-white rounded-3xl shadow-xl border border-slate-100 p-5 space-y-4 animate-fadeIn">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors',
                      location.pathname === item.path
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Products Preview */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 block">
                Products
              </span>
              <div className="grid grid-cols-1 gap-1">
                {navProducts.map((p) => (
                  <Link
                    key={p.slug}
                    to={p.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <span>{p.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              {isAuthenticated && user ? (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-violet text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                      {user.initials || 'AD'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-slate-900 truncate">{user.name}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                      <div className="text-[11px] text-brand-600 font-semibold">{user.company}</div>
                    </div>
                  </div>

                  <Button
                    as={Link}
                    to="/workspace"
                    onClick={() => setMobileOpen(false)}
                    variant="primary"
                    size="md"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open HR & Payroll Workspace</span>
                  </Button>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="w-full py-2.5 text-center text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Session</span>
                  </button>
                </div>
              ) : (
                <>
                  <Button
                    as={Link}
                    to={authActions.register.href}
                    onClick={() => setMobileOpen(false)}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    Get Started Free
                  </Button>
                  <Link
                    to={authActions.login.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Already have an account? Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
