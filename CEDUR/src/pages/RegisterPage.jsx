import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  Phone,
  Building,
  Users,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { submitLead } from '../lib/api';
import { useAuth } from '../context/useAuth';

export function RegisterPage() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const initialPlan = searchParams.get('plan') || 'growth';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    employee_count: '11-50',
    plan: initialPlan,
    password: '',
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam) {
      setFormData((prev) => ({ ...prev, plan: planParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.full_name.trim() || !formData.email || !formData.company_name.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('Please agree to the privacy policy & terms to continue.');
      return;
    }

    setLoading(true);
    try {
      // Record the signup into the SQLite leads database
      await submitLead({
        type: 'signup',
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company_or_website: formData.company_name,
        employee_count: formData.employee_count,
        message: `Self-Service Signup for plan: ${formData.plan}`,
        consent: formData.consent,
      });

      // Automatically initialize authenticated local session
      login({
        name: formData.full_name,
        email: formData.email,
        company: formData.company_name,
        plan: formData.plan,
        role: 'Account Owner (Primary Admin)',
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/workspace');
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Start 14-Day Free Trial — Cedur Platform"
        description="Create your Cedur account today. Get 14 days of free access to 2-click payroll, geofence attendance, and leave management. No credit card required."
      />

      <section className="py-12 sm:py-20 bg-gradient-to-b from-brand-50/40 via-white to-slate-50 min-h-[85vh] flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-violet flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                C
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">Cedur</span>
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              14-Day Full Access Trial · No Credit Card Required
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create your organization account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Start running payroll and tracking attendance in under 5 minutes
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-xl">
            {success ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Account Created Successfully!</h3>
                <p className="text-xs text-slate-500">
                  Welcome to Cedur. Redirecting to sign in...
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="full_name"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="company_name"
                        required
                        placeholder="e.g. Acme Enterprises"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Team Size
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        name="employee_count"
                        value={formData.employee_count}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-white cursor-pointer"
                      >
                        <option value="1-10">1 – 10 employees</option>
                        <option value="11-25">11 – 25 employees (Core)</option>
                        <option value="26-50">26 – 50 employees (Growth)</option>
                        <option value="51-100">51 – 100 employees</option>
                        <option value="100+">100+ employees (Veteran)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Selected Plan
                    </label>
                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-white cursor-pointer"
                    >
                      <option value="core">Core (₹3,945/mo)</option>
                      <option value="growth">Growth (₹5,945/mo) — Popular</option>
                      <option value="veteran">Veteran (₹9,945/mo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="reg-consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 accent-brand-600 rounded cursor-pointer"
                  />
                  <label htmlFor="reg-consent" className="text-xs text-slate-500 leading-tight cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms-of-service" className="text-brand-600 underline">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-brand-600 underline">Privacy Policy</Link>.
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  className="w-full mt-2"
                >
                  Create Organization Account
                </Button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700 underline">
                Sign in here
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mt-6">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Instant setup · Cancel anytime during trial</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
