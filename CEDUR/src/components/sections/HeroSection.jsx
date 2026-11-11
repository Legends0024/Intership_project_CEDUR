import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Zap, Users } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { siteConfig } from '../../data/site';
import { authActions } from '../../data/navigation';

export function HeroSection({ onOpenDemo }) {
  const handleOpenRequestDemo = () => {
    window.dispatchEvent(new CustomEvent('open-request-demo', { detail: { type: 'demo' } }));
  };

  return (
    <section className="relative pt-6 pb-20 lg:pt-12 lg:pb-32 overflow-hidden hero-radial-bg hero-mesh-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-brand-900 tracking-wide">
                ✨ Trusted by {siteConfig.metrics.companiesCount} Indian Businesses
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              The All-in-One <br className="hidden sm:inline" />
              <span className="gradient-text">HR & Payroll</span> Platform <br className="hidden sm:inline" />
              for Growing Indian Teams
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Hire, track attendance with zero hardware, manage leaves, run 2-click payroll, and stay 100% compliant with EPF, ESI, and TDS—all from one unified cloud platform.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                as="a"
                href={authActions.register.href}
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto shadow-lg shadow-brand-500/25"
              >
                Get Started Free
              </Button>

              <Button
                onClick={handleOpenRequestDemo}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Request a Live Demo
              </Button>
            </div>

            {/* Quick Proof Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Hardware Needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Made for Indian SME Rules</span>
              </div>
            </div>
          </div>

          {/* Right Visual Dashboard Mockup (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glow backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-violet rounded-3xl blur-2xl opacity-20 -z-10" />

              {/* Glass Card Dashboard Preview */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80 relative">
                {/* Header Mockup */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                      C
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">May 2026 Payroll Run</div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Attendance Synced
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Ready to Disburse
                  </span>
                </div>

                {/* Stat Numbers */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                      Total Net Payout
                    </span>
                    <span className="text-xl font-extrabold text-slate-900">₹14,82,450</span>
                    <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
                      48 Employees
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-brand-50/60 border border-brand-100/60">
                    <span className="text-[11px] font-semibold text-brand-600 block uppercase">
                      Statutory Covered
                    </span>
                    <span className="text-xl font-extrabold text-brand-900">100%</span>
                    <span className="text-[10px] text-brand-600 font-medium block mt-0.5">
                      PF, ESI, TDS, PT
                    </span>
                  </div>
                </div>

                {/* Workflow Checklist inside Dashboard */}
                <div className="space-y-2.5 py-1">
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                      <span className="font-semibold text-slate-800">Geofence Attendance Marked</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">100% Present</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                      <span className="font-semibold text-slate-800">TDS (Old & New Regime)</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">Calculated</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">
                        ⚡
                      </div>
                      <span className="font-semibold text-slate-800">Bank File (HDFC / ICICI)</span>
                    </div>
                    <span className="text-brand-600 font-semibold text-[11px]">Generated</span>
                  </div>
                </div>

                {/* Floating Micro Badge 1 (Top Right) */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2 animate-float">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">2-Click Payroll</div>
                    <div className="text-[10px] text-slate-500">Run in 120 seconds</div>
                  </div>
                </div>

                {/* Floating Micro Badge 2 (Bottom Left) */}
                <div
                  className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={onOpenDemo}
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">Watch Live Demo</div>
                    <div className="text-[10px] text-brand-600 font-semibold">2 min video</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
