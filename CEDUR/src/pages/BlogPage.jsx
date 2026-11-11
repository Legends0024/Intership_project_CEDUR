import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Badge from '../components/ui/Badge';
import CtaBanner from '../components/sections/CtaBanner';

const articles = [
  {
    id: 'tds-regime-guide',
    title: 'Old vs New Tax Regime: What Indian Employers Must Know for FY 2026-27',
    summary:
      'A practical guide to implementing employee tax declarations, TDS withholding calculations, and standard deduction changes across your payroll runs.',
    category: 'Tax & Compliance',
    readTime: '6 min read',
    date: 'Oct 2026',
    author: 'Cedur Compliance Team',
  },
  {
    id: 'epfo-ecr-guide',
    title: 'How to Generate Error-Free EPFO ECR Files Every Month',
    summary:
      'Avoid late fees and inspection notices by understanding the exact 12% EPF breakdown, EDLI caps, and admin charge calculations.',
    category: 'Statutory Payroll',
    readTime: '5 min read',
    date: 'Oct 2026',
    author: 'Payroll Specialist',
  },
  {
    id: 'geofence-attendance-benefits',
    title: 'Why Indian SMEs Are Replacing Biometric Fingerprint Machines with Geofencing',
    summary:
      'Discover how zero-hardware mobile GPS clock-in cuts machine maintenance expenses and eliminates proxy punch fraud for distributed workforces.',
    category: 'Workforce Operations',
    readTime: '4 min read',
    date: 'Sep 2026',
    author: 'Operations Desk',
  },
  {
    id: 'sme-payroll-mistakes',
    title: 'Top 5 Payroll Mistakes Indian Small Businesses Make (And How to Fix Them)',
    summary:
      'From Excel formula errors to missed state Professional Tax thresholds, here is how automated payroll protects founders from compliance liabilities.',
    category: 'Best Practices',
    readTime: '7 min read',
    date: 'Sep 2026',
    author: 'Cedur Editorial',
  },
];

export function BlogPage() {
  return (
    <>
      <SEO
        title="Resources & HR Knowledge Base for Indian SMEs"
        description="Insights, guides, and practical advice on payroll compliance, tax regimes, attendance management, and HR automation for Indian employers."
        canonicalPath="/blogs"
      />

      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Badge variant="brand" className="mb-4">
            Cedur Knowledge Hub
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Workforce, Payroll & Compliance Resources
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Practical guides and statutory updates written specifically for Indian business owners, finance heads, and HR teams.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:bg-white hover:border-brand-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs">
                    <span className="font-bold text-brand-600 uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 border border-brand-200/50">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug mb-3">
                    {art.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">{art.author}</span>
                    <span>·</span>
                    <span>{art.date}</span>
                  </div>
                  <span className="font-bold text-brand-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export default BlogPage;
