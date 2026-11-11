import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Phone,
  Headphones,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../../data/site';
import { footerNav } from '../../data/navigation';
import { subscribeNewsletter } from '../../lib/api';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ state: 'idle', message: '' });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setNewsletterStatus({ state: 'loading', message: '' });
    try {
      const res = await subscribeNewsletter(newsletterEmail);
      setNewsletterStatus({ state: 'success', message: res.message || 'Thanks for subscribing!' });
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus({ state: 'idle', message: '' }), 4000);
    } catch (err) {
      setNewsletterStatus({
        state: 'error',
        message: err.message || 'Failed to subscribe. Please try again.',
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-accent-violet flex items-center justify-center text-white font-black text-xl shadow-md">
                C
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">Cedur</span>
            </Link>

            <p className="text-sm text-slate-400 font-medium italic">
              {siteConfig.tagline}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Leading HR and Payroll software for Indian SMEs, startups, and growing enterprises. Automate your workforce management with complete confidence.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Made in India 🇮🇳</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
                <Lock className="w-3.5 h-3.5 text-brand-400" />
                <span>Bank-Grade Encryption</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Stay Updated
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus.state === 'loading'}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-colors flex items-center justify-center shrink-0 disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {newsletterStatus.state === 'success' && (
                <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {newsletterStatus.message}
                </p>
              )}
              {newsletterStatus.state === 'error' && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {newsletterStatus.message}
                </p>
              )}
            </div>
          </div>

          {/* Company Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {footerNav.company.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {footerNav.products.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Contact Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Connect</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Support Desk</div>
                  <a
                    href={`tel:${siteConfig.contact.supportPhone}`}
                    className="font-medium text-white hover:text-brand-300 transition-colors"
                  >
                    {siteConfig.contact.supportPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Headphones className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Direct Sales</div>
                  <a
                    href={`tel:${siteConfig.contact.salesPhone.replace(/\s+/g, '')}`}
                    className="font-medium text-white hover:text-brand-300 transition-colors"
                  >
                    {siteConfig.contact.salesPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Email Enquiries</div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-white hover:text-brand-300 transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Social Channels (Shown only if URLs configured) */}
              {Object.values(siteConfig.socials || {}).some(Boolean) && (
                <div className="pt-2">
                  <div className="text-xs text-slate-400 mb-2">Social Communities</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {siteConfig.socials.whatsapp && (
                      <a
                        href={siteConfig.socials.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                        aria-label="WhatsApp"
                      >
                        WA
                      </a>
                    )}
                    {siteConfig.socials.linkedin && (
                      <a
                        href={siteConfig.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                        aria-label="LinkedIn"
                      >
                        IN
                      </a>
                    )}
                    {siteConfig.socials.instagram && (
                      <a
                        href={siteConfig.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                        aria-label="Instagram"
                      >
                        IG
                      </a>
                    )}
                    {siteConfig.socials.youtube && (
                      <a
                        href={siteConfig.socials.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                        aria-label="YouTube"
                      >
                        YT
                      </a>
                    )}
                    {siteConfig.socials.twitter && (
                      <a
                        href={siteConfig.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                        aria-label="Twitter / X"
                      >
                        X
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {siteConfig.legalName}. All Rights Reserved. Made in India.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/support" className="hover:text-slate-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
