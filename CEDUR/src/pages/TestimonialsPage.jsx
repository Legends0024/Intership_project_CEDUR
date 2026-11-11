import React from 'react';
import { Star, Quote, ArrowRight, Building, Award } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CtaBanner from '../components/sections/CtaBanner';
import { testimonials } from '../data/testimonials';
import { clientLogos } from '../data/clients';

export function TestimonialsPage() {
  const handleOpenDemo = () => {
    window.dispatchEvent(new CustomEvent('open-request-demo', { detail: { type: 'demo' } }));
  };

  return (
    <>
      <SEO
        title="Client Testimonials & Case Studies"
        description="Read how Indian SMEs, logistics, and manufacturing businesses use Cedur to increase productivity by 40% and cut payroll processing time in half."
        canonicalPath="/testimonials"
      />

      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Badge variant="brand" className="mb-4">
            Customer Success
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How Growing Indian Businesses Succeed with Cedur
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Discover how founders, operations heads, and HR leaders eliminated payroll headaches and gained complete peace of mind.
          </p>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/80">
                      {t.metric}
                    </span>
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed italic mb-8">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/60">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-base shadow-sm shrink-0 ${t.bgClass || 'bg-brand-600 text-white'}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{t.author}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {t.role} · <strong className="text-brand-600 font-semibold">{t.company}</strong>
                    </p>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Industry: {t.industry}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All 12 Companies Mention */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">
            More Leading Companies Running On Cedur
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center"
              >
                <div className="text-sm font-bold text-slate-900">{client.name}</div>
                <div className="text-[11px] text-slate-400 mt-1">{client.industry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export default TestimonialsPage;
