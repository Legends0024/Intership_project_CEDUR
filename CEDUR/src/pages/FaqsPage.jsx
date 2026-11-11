import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CtaBanner from '../components/sections/CtaBanner';
import { faqs } from '../data/faq';
import { pricingFaqs } from '../data/pricing';

const allFaqs = [
  ...faqs,
  ...pricingFaqs.map((pf, i) => ({
    id: `pricing-${i}`,
    category: 'Pricing & Billing',
    question: pf.question,
    answer: pf.answer,
  })),
  {
    id: 'comp-1',
    category: 'Compliance & Legal',
    question: 'How does Cedur handle the New Tax Regime vs Old Tax Regime?',
    answer:
      'Employees can declare their preferred tax regime directly via their self-service portal. Cedur automatically computes monthly TDS according to the latest Indian Finance Act slabs for each individual.',
  },
  {
    id: 'geo-1',
    category: 'Attendance & Mobile',
    question: 'What happens if an employee loses network connectivity while marking attendance?',
    answer:
      'The Cedur mobile app caches GPS timestamped punches locally with cryptographic integrity checks. As soon as connectivity returns, the attendance record syncs seamlessly to the cloud.',
  },
];

const categories = ['All', 'General', 'Payroll & Taxes', 'Attendance & Hardware', 'Compliance & Legal', 'Pricing & Billing'];

export function FaqsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openId, setOpenId] = useState(allFaqs[0]?.id);

  const filtered = allFaqs.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQs)"
        description="Find answers to all your questions about Cedur HR software, payroll processing in India, PF/ESI compliance, geofenced attendance, and subscription pricing."
        canonicalPath="/faqs"
      />

      <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Badge variant="brand" className="mb-4">
            Knowledge Center
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about setting up Cedur, automating payroll, and staying compliant with Indian labor regulations.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, e.g. PF, TDS, Geofencing, Pricing..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition"
            />
          </div>
        </div>
      </section>

      {/* Category Pills & FAQ List */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching questions found. Try a different keyword or{' '}
              <a href="/support" className="text-brand-600 font-bold underline">
                contact support
              </a>
              .
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-brand-50/40 border-brand-200 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <span>{item.question}</span>
                      </div>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-brand-600' : 'text-slate-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-brand-100/60 animate-fadeIn">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export default FaqsPage;
