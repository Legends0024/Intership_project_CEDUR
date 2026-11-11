import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { submitLead } from '../../lib/api';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export function RequestDemoModal({ isOpen, onClose, initialType = 'demo' }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_or_website: '',
    employee_count: 50,
    message: '',
    consent: true,
    website: '', // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.full_name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    if (formData.phone && !/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('Please accept the terms to continue.');
      return;
    }

    setLoading(true);
    try {
      await submitLead({
        type: initialType,
        ...formData,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          company_or_website: '',
          employee_count: 50,
          message: '',
          consent: true,
          website: '',
        });
      }, 2500);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Let's start a conversation" maxWidth="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Side Banner */}
        <div className="md:col-span-2 bg-gradient-to-br from-brand-600 to-accent-violet rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              1-on-1 Product Demo
            </div>
            <h4 className="text-xl font-bold leading-snug mb-2">
              Transform Your HR & Payroll in Minutes
            </h4>
            <p className="text-brand-100 text-xs leading-relaxed mb-6">
              Fill in your details and our product specialist will reach out within 24 hours for a live walkthrough.
            </p>

            <ul className="space-y-3 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Free consultation & compliance check</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Custom demo tailored to your team size</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>No credit card or commitment required</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-white/20 text-xs text-brand-100">
            Trusted by <strong>200+ growing companies</strong> across India.
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-3">
          {success ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Thank you!</h4>
              <p className="text-slate-600 text-sm max-w-sm">
                We have received your details. One of our specialists will get in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field for bot spam */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="e.g. Ramesh Kumar"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Number of Employees:
                  </label>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                    {formData.employee_count} {formData.employee_count >= 500 ? '+' : ''}
                  </span>
                </div>
                <input
                  type="range"
                  name="employee_count"
                  min="5"
                  max="500"
                  step="5"
                  value={formData.employee_count}
                  onChange={handleChange}
                  className="w-full accent-brand-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>5 emps</span>
                  <span>100</span>
                  <span>250</span>
                  <span>500+ emps</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  How can we help? (Optional)
                </label>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="Tell us about your team or current payroll challenge..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition resize-none"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 accent-brand-600 rounded cursor-pointer"
                />
                <label htmlFor="consent" className="text-xs text-slate-500 leading-tight cursor-pointer">
                  I agree to receive communications regarding Cedur's HR and payroll solutions. You can unsubscribe anytime.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                className="w-full mt-2"
              >
                Submit Demo Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default RequestDemoModal;
