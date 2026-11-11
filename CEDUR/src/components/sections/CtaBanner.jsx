import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { authActions } from '../../data/navigation';
import { siteConfig } from '../../data/site';

export function CtaBanner() {
  const handleOpenDemo = () => {
    window.dispatchEvent(new CustomEvent('open-request-demo', { detail: { type: 'demo' } }));
  };

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-brand-600 to-accent-violet rounded-full blur-[120px] opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-brand-300 text-xs font-semibold border border-slate-700 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          Start in Less Than 5 Minutes
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          The All-in-One HR & Payroll System Built for Growing Indian Teams
        </h2>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Join {siteConfig.metrics.companiesCount} businesses that trust Cedur every month for stress-free salary runs, geofence check-ins, and 100% tax compliance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
          <Button
            as="a"
            href={authActions.register.href}
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full sm:w-auto shadow-xl"
          >
            Get Started Free
          </Button>

          <Button
            onClick={handleOpenDemo}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-slate-800/80 text-white border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            Request a Personalized Demo
          </Button>
        </div>

        {/* Avatar Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-400">
          <div className="flex -space-x-2">
            {[
              { initials: 'RK', bg: 'bg-indigo-600' },
              { initials: 'PS', bg: 'bg-pink-600' },
              { initials: 'HV', bg: 'bg-sky-600' },
              { initials: 'RS', bg: 'bg-emerald-600' },
            ].map((user) => (
              <div
                key={user.initials}
                className={`w-8 h-8 rounded-full border-2 border-slate-900 ${user.bg} text-white font-bold text-[11px] flex items-center justify-center shadow-xs`}
              >
                {user.initials}
              </div>
            ))}
          </div>
          <div>
            <strong className="text-white">{siteConfig.metrics.companiesCount} companies</strong> already using Cedur across India
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
