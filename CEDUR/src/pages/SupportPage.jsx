import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Headphones,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { siteConfig } from '../data/site';
import { submitLead } from '../lib/api';

export function SupportPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_or_website: '',
    message: '',
    consent: true,
    website: '', // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name.trim()) {
      setStatus({ state: 'error', message: 'Full name is required.' });
      return;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ state: 'error', message: 'Valid work email is required.' });
      return;
    }
    if (!formData.consent) {
      setStatus({ state: 'error', message: 'Please accept communications consent.' });
      return;
    }

    setLoading(true);
    setStatus({ state: 'loading', message: '' });

    try {
      const res = await submitLead({
        type: 'contact',
        ...formData,
      });

      setStatus({
        state: 'success',
        message: res.message || 'Thank you! Your message has been sent. We will respond within 24 hours.',
      });
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company_or_website: '',
        message: '',
        consent: true,
        website: '',
      });
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.message || 'Something went wrong. Please reach out via phone or email.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us & Customer Support"
        description="Get in touch with Cedur's customer support and sales team in New Delhi. Call 011-4345-1244 or +91 85959 21201 for prompt assistance."
        canonicalPath="/contact-us"
      />

      <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="brand" className="mb-3">
              We're Here to Help
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Get in Touch with the Cedur Team
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Have questions about Indian payroll compliance, geofencing, or custom enterprise setups? Our team responds within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Direct Contact Channels
                </h3>

                {/* Support Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Support Desk</span>
                    <a
                      href={`tel:${siteConfig.contact.supportPhone}`}
                      className="text-base font-extrabold text-slate-900 hover:text-brand-600 transition-colors"
                    >
                      {siteConfig.contact.supportPhone}
                    </a>
                    <span className="text-xs text-slate-500 block mt-0.5">Mon–Sat, 9:30 AM – 6:30 PM IST</span>
                  </div>
                </div>

                {/* Sales Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Direct Sales</span>
                    <a
                      href={`tel:${siteConfig.contact.salesPhone.replace(/\s+/g, '')}`}
                      className="text-base font-extrabold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      {siteConfig.contact.salesPhone}
                    </a>
                    <span className="text-xs text-slate-500 block mt-0.5">Instant callbacks for new companies</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Email Us</span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-base font-extrabold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <span className="text-xs text-slate-500 block mt-0.5">For general queries & partnership</span>
                  </div>
                </div>

                {/* WhatsApp Quick Chat */}
                <div className="pt-2">
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              {/* Office Location Box */}
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  Registered Office
                </div>
                <p>
                  <strong>{siteConfig.legalName}</strong>
                  <br />
                  New Delhi, National Capital Region, India
                </p>
              </div>
            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
              <p className="text-xs text-slate-500 mb-6">
                Tell us about your organization and requirements. We'll be in touch shortly.
              </p>

              {status.state === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2.5 mb-6 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.state === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-2.5 mb-6 text-sm font-medium">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
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
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name / Website
                  </label>
                  <input
                    type="text"
                    name="company_or_website"
                    placeholder="e.g. Acme Tech Solutions"
                    value={formData.company_or_website}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="How can we assist you with HR, attendance, or payroll?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition resize-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="support-consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 accent-brand-600 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="support-consent"
                    className="text-xs text-slate-500 cursor-pointer leading-tight"
                  >
                    I agree to allow Cedur to store and process my contact information to respond to this inquiry.
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full mt-2"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SupportPage;
