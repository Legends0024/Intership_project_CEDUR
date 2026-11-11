import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CtaBanner from '../components/sections/CtaBanner';
import { products } from '../data/products';

export function ProductsPage() {
  const handleOpenDemo = () => {
    window.dispatchEvent(new CustomEvent('open-request-demo', { detail: { type: 'demo' } }));
  };

  return (
    <>
      <SEO
        title="Products Suite — HR, Payroll & Attendance Modules"
        description="Explore Cedur's complete software suite: 2-click payroll, hardware-free geofence attendance, leave tracking, employee self-service, and mobile app for Indian businesses."
      />

      {/* Hero Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-50/50 to-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Badge variant="brand" className="mb-4">
            Unified SaaS Suite
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            The Complete HR & Payroll Suite for Modern Indian Businesses
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Everything your people operations need. Deploy the whole suite or start with individual modules and connect them as your team scales.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button onClick={handleOpenDemo} variant="primary" size="lg">
              Book a Custom Walkthrough
            </Button>
            <Button as={Link} to="/pricing" variant="outline" size="lg">
              View Plan Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Products Deep-Dive Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {products.map((prod, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={prod.slug}
                id={prod.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side (7 cols) */}
                <div className={`lg:col-span-7 space-y-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-brand-600 px-2.5 py-1 rounded-md bg-brand-50 border border-brand-200/60">
                      Module {String(index + 1).padStart(2, '0')}
                    </span>
                    <Badge variant="violet">{prod.badge}</Badge>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {prod.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Highlights Grid */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {prod.highlights.slice(0, 4).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 flex items-center gap-4">
                    <Button as={Link} to={`/${prod.slug}`} variant="primary" size="md">
                      View Module Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <button
                      onClick={handleOpenDemo}
                      className="text-xs font-semibold text-slate-600 hover:text-brand-600"
                    >
                      Request Demo →
                    </button>
                  </div>
                </div>

                {/* Stat Box Mockup (5 cols) */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="bg-gradient-to-br from-slate-50 to-brand-50/40 rounded-3xl p-8 border border-slate-200 shadow-lg space-y-5">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      Key Metrics & Impact
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {prod.stats.map((s, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600">{s.label}</span>
                          <span className="text-sm font-extrabold text-brand-600">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
                      <div className="text-xs font-bold text-slate-800 mb-1">
                        Why Teams Love It
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {prod.benefits[0]?.text || 'Designed for high productivity and zero manual errors.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export default ProductsPage;
