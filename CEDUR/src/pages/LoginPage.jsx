import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { useAuth } from '../context/useAuth';

export function LoginPage() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both your work email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      const cleanName = email.includes('admin')
        ? 'Vikram Malhotra'
        : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      login({
        email,
        name: cleanName,
        company: 'Malhotra Enterprises Pvt Ltd',
        role: 'Workspace Administrator',
      });

      setTimeout(() => {
        navigate('/workspace');
      }, 900);
    }, 500);
  };

  const handleFillDemo = () => {
    setEmail('admin@company.com');
    setPassword('CedurDemo2026!');
    setErrorMsg('');
  };

  return (
    <>
      <SEO
        title="Sign In to Cedur Platform"
        description="Sign in to your Cedur account to manage employees, process payroll, and track geofenced attendance."
      />

      <section className="py-12 sm:py-20 bg-gradient-to-b from-brand-50/40 via-white to-slate-50 min-h-[85vh] flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-violet flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                C
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">Cedur</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your credentials to access your HR & Payroll workspace
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-xl">
            {isAuthenticated && user && !success ? (
              <div className="py-4 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-violet text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md">
                  {user.initials || 'AD'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
                  <p className="text-xs text-slate-500">{user.email}</p>
                  <p className="text-xs text-brand-600 font-semibold mt-0.5">{user.company}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    Active Session
                  </span>
                </div>
                <div className="pt-2 space-y-2">
                  <Button as={Link} to="/workspace" variant="primary" size="md" className="w-full">
                    Go to Workspace Dashboard →
                  </Button>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full py-2 text-xs font-bold text-rose-600 hover:text-rose-700 transition"
                  >
                    Sign Out and Switch Account
                  </button>
                </div>
              </div>
            ) : success ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Signed in successfully</h3>
                <p className="text-xs text-slate-500">Redirecting to your workspace...</p>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset instructions have been sent to your registered email.')}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-brand-600 rounded"
                    />
                    <span>Remember me on this browser</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  className="w-full mt-2"
                >
                  Sign In to Workspace
                </Button>

                {/* Demo autofill button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    ⚡ Fill Demo Credentials
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700 underline">
                Sign up free
              </Link>
            </div>
          </div>

          {/* Security footnote */}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mt-6">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-bit bank-grade encryption · Local Indian cloud</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
