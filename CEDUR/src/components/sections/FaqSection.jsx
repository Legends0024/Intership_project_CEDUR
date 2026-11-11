import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqs } from '../../data/faq';

export function FaqSection({ items = faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Most Common Questions Asked by Businesses
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Find transparent answers to how Cedur streamlines payroll, ensures tax compliance, and works seamlessly for your Indian workplace.
            </p>

            <div className="pt-4">
              <Link
                to="/faqs"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                <span>Browse our full knowledgebase</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Accordion Column (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
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
                    onClick={() => toggle(index)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-brand-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
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
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
