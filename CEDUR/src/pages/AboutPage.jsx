import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Users,
  Target,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CtaBanner from '../components/sections/CtaBanner';
import { siteConfig } from '../data/site';

export function AboutPage() {
  const handleOpenDemo = () => {
    window.dispatchEvent(new CustomEvent('open-request-demo', { detail: { type: 'demo' } }));
  };

  return (
    <>
      <SEO
        title="About Us — The Story Behind Cedur"
        description="Learn about Cedur Enterprises Private Limited. Our mission is to simplify HR and payroll operations for Indian SMEs with modern cloud technology and 100% compliance."
        canonicalPath="/about-us"
      />

      {/* Hero Header */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Badge variant="brand" className="mb-4">
            Our Mission & Story
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Empowering Indian Small & Medium Enterprises with Frictionless HR
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            We started Cedur with one singular conviction: Indian business owners and HR teams spend far too many hours battling clunky spreadsheets and outdated legacy tools. We built a platform to change that.
          </p>
        </div>
      </section>

      {/* Brand Ethos & Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block">
                The Cedur Vision
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Outthink. Outwork. Outlast.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Managing a business in India comes with unique workforce dynamics—varying state labor laws, changing tax regimes, complex PF/ESI calculations, and distributed teams spanning factories, retail shops, and remote desks.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Cedur unifies employee records, mobile geofenced attendance, leave management, and payroll into an intuitive interface that anyone can master in minutes. No expensive hardware, no consultancy lock-in, and zero payroll errors.
              </p>
              <div className="pt-2">
                <Button onClick={handleOpenDemo} variant="primary" size="md">
                  Book a Product Tour <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-slate-900 to-brand-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl space-y-6">
                <h3 className="text-xl font-bold">Cedur at a Glance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-2xl font-black text-brand-300">200+</span>
                    <span className="text-xs text-slate-300 block mt-1">Companies Trusting Cedur</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-2xl font-black text-emerald-300">99.9%</span>
                    <span className="text-xs text-slate-300 block mt-1">Guaranteed Cloud SLA</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-2xl font-black text-yellow-300">2 mins</span>
                    <span className="text-xs text-slate-300 block mt-1">Average Payroll Run Time</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-2xl font-black text-cyan-300">100%</span>
                    <span className="text-xs text-slate-300 block mt-1">Made in India 🇮🇳</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  Operated by {siteConfig.legalName}, based in New Delhi, India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
              Our Values
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Principles That Guide Every Feature We Ship
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Radical Simplicity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an HR workflow takes more than 3 clicks or requires reading a user manual, we redesign it from scratch.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Compliance Fidelity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every deduction, tax slab, and PF rule is backed by verified Indian labor regulations and tax laws.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Hardware Hassle</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Biometric machines break and fail. We build software that runs directly on mobile phones with GPS geofencing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Customer Obsession</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Live Indian support via phone, email, and WhatsApp when you need help processing month-end salaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export default AboutPage;
