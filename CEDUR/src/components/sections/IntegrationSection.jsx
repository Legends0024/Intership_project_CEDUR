import React from 'react';
import { Puzzle, ShieldCheck, Check, Cpu } from 'lucide-react';
import { siteConfig } from '../../data/site';

export function IntegrationSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Diagram (6 cols) */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-violet to-brand-500 rounded-3xl blur-2xl opacity-15" />

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl border border-slate-700 relative">
                <div className="flex items-center justify-between pb-6 border-b border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-lg">
                      ⚡
                    </div>
                    <div>
                      <div className="font-bold text-base">Cedur Integration Hub</div>
                      <div className="text-xs text-slate-400">Connected with Indian Banking & CA Ecosystems</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                    Live Sync
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-6">
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-xs text-slate-400 block mb-1">Supported Banks</span>
                    <span className="text-lg font-bold text-white">HDFC, ICICI, SBI</span>
                    <span className="text-[11px] text-slate-400 block mt-1">+ Axis, Kotak, Yes Bank</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-xs text-slate-400 block mb-1">Govt Portals</span>
                    <span className="text-lg font-bold text-white">EPFO & ESIC</span>
                    <span className="text-[11px] text-emerald-400 block mt-1">Direct ECR Export</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-950/60 border border-brand-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-brand-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Open RESTful APIs</div>
                      <div className="text-[10px] text-slate-400">Custom webhooks for internal enterprise ERPs</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-400">v2 Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
              <Puzzle className="w-3.5 h-3.5" />
              Seamless Integration & Scale
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Scale Your Team <span className="gradient-text">Up-and-Down</span> Effortlessly
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Engineered specifically for Indian startups and SMBs, helping you establish frictionless HR operations, manage distributed teams, and scale smoothly as your headcount grows.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="text-3xl font-extrabold text-brand-600">
                  {siteConfig.metrics.toolIntegrations}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">Tool Integrations</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Biometrics, accounting & banking</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="text-3xl font-extrabold text-brand-600">
                  {siteConfig.metrics.uptime}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">Guaranteed Uptime</div>
                <div className="text-[11px] text-slate-500 mt-0.5">High availability cloud infrastructure</div>
              </div>
            </div>

            {/* Feature List */}
            <ul className="space-y-3 pt-2 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Seamless Banking Integration</strong> — Direct payment file generation for all Indian banks.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Real-time Data Sync</strong> — Instant calculation sync across attendance and payroll.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Enterprise Grade Security</strong> — 256-bit encryption with local Indian data residency.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntegrationSection;
