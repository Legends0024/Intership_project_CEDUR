import React, { useState } from 'react';
import {
  Check,
  X,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  ChevronDown,
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CtaBanner from '../components/sections/CtaBanner';
import {
  pricingPlans,
  pricingComparisonFeatures,
  pricingFaqs,
} from '../data/pricing';
import { formatINR } from '../lib/utils';
import { authActions } from '../data/navigation';

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(35);
  const [openFaq, setOpenFaq] = useState(0);

  const handleOpenDemo = () => {
    window.dispatchEvent(
      new CustomEvent('open-request-demo', { detail: { type: 'pricing' } }));
  };

  // Recommended plan based on employee count slider
  const recommendedPlanId =
    employeeCount <= 25 ? 'core' : employeeCount <= 50 ? 'growth' : 'veteran';

  return (
    <>
      <SEO
        title="Payroll & HR Software Pricing Plans"
        description="Explore Cedur HR and payroll pricing plans for Indian businesses. Transparent pricing with no hidden fees. Compare Core, Growth, and Veteran tiers."
        canonicalPath="/pricing"
      />

      {/* Pricing Hero Header */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Badge variant="brand" className="mb-4">
            Transparent Pricing for Indian Businesses
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Payroll & HR Pricing Tailored to Suit Your Needs
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Choose a plan that matches your current team size. Switch or upgrade anytime as your company hires more talent.
          </p>

          {/* Billing Toggle Switch */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-bold transition-colors ${
                !isAnnual ? 'text-slate-900' : 'text-slate-500'
              }`}
            >
              Monthly Billing
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-slate-200 border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 p-0.5"
              aria-label="Toggle annual billing"
            >
              <div
                className={`w-6 h-6 rounded-full bg-brand-600 shadow-md transform transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6 bg-emerald-600' : 'translate-x-0'
                }`}
              />
            </button>

            <span
              className={`text-sm font-bold flex items-center gap-1.5 transition-colors ${
                isAnnual ? 'text-emerald-700' : 'text-slate-500'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan) => {
              const price = isAnnual ? plan.priceAnnualMonthly : plan.priceMonthly;
              const isSelected = plan.featured;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-2 border-brand-500 shadow-2xl scale-[1.02] z-10'
                      : 'bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300'
                  }`}
                >
                  {/* Badge banner */}
                  {plan.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-accent-violet text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                          {plan.seatsIncluded}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price Tag */}
                    <div className="py-4 border-y border-slate-100 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-slate-900 tracking-tight">
                          {formatINR(price)}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">/ month</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium block mt-1">
                        {isAnnual ? 'Billed annually (Includes 20% discount)' : 'Billed monthly, cancel anytime'}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                        Features Included:
                      </span>
                      <ul className="space-y-2.5">
                        {plan.features.map((feat, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-2.5 text-xs font-medium ${
                              feat.included ? 'text-slate-800' : 'text-slate-400 line-through'
                            }`}
                          >
                            {feat.included ? (
                              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            ) : (
                              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                                <X className="w-3 h-3" />
                              </span>
                            )}
                            <span>{feat.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <Button
                      as={plan.ctaLink.startsWith('#') ? 'button' : 'a'}
                      href={!plan.ctaLink.startsWith('#') ? plan.ctaLink : undefined}
                      onClick={plan.ctaLink.startsWith('#') ? handleOpenDemo : undefined}
                      variant={plan.featured ? 'primary' : 'outline'}
                      size="md"
                      className="w-full"
                    >
                      {plan.ctaText}
                    </Button>
                    <span className="text-[10px] text-slate-400 text-center block mt-2">
                      Instant onboarding · 14-day free trial
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Employee Calculator Tool */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-brand-50 to-indigo-50/40 rounded-3xl p-8 sm:p-10 border border-brand-200/80 shadow-md">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
                Plan Recommender
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                How Many Employees Are On Your Team?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Slide to calculate your estimated cost and see which plan fits your business.
              </p>
            </div>

            {/* Slider */}
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Team Size:</span>
                <span className="text-2xl font-black text-brand-600 bg-white px-4 py-1 rounded-xl shadow-xs border border-brand-200">
                  {employeeCount} {employeeCount >= 500 ? '+' : ''} employees
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 employees</span>
                <span>50</span>
                <span>100</span>
                <span>250+ employees</span>
              </div>
            </div>

            {/* Recommendation Result */}
            <div className="mt-8 pt-6 border-t border-brand-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-xs font-semibold text-slate-500">Recommended Tier:</span>
                <div className="text-xl font-bold text-slate-900">
                  Cedur{' '}
                  <span className="text-brand-600">
                    {recommendedPlanId === 'core'
                      ? 'Core (up to 25)'
                      : recommendedPlanId === 'growth'
                      ? 'Growth (up to 50)'
                      : 'Veteran (100+)'}
                  </span>
                </div>
              </div>

              <Button
                as="a"
                href={authActions.register.href}
                variant="primary"
                size="md"
              >
                Choose {recommendedPlanId.toUpperCase()} & Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
              Deep Dive
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Features Across All Plans
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-5 px-6 font-bold text-slate-900 w-2/5">Plan Features</th>
                    <th className="py-5 px-6 font-bold text-slate-900 text-center w-1/5">
                      Core (₹3,945)
                    </th>
                    <th className="py-5 px-6 font-bold text-brand-600 text-center w-1/5 bg-brand-50/50">
                      Growth (₹5,945)
                    </th>
                    <th className="py-5 px-6 font-bold text-slate-900 text-center w-1/5">
                      Veteran (₹9,945)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pricingComparisonFeatures.map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      <tr className="bg-slate-50/70">
                        <td
                          colSpan={4}
                          className="py-3 px-6 text-xs font-extrabold text-brand-800 uppercase tracking-wider"
                        >
                          {cat.category}
                        </td>
                      </tr>
                      {cat.features.map((feat, featIdx) => (
                        <tr key={featIdx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-6 text-slate-800 font-medium text-xs sm:text-sm">
                            {feat.name}
                          </td>
                          <td className="py-3.5 px-6 text-center text-xs">
                            {typeof feat.core === 'boolean' ? (
                              feat.core ? (
                                <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                              ) : (
                                <span className="text-slate-300">—</span>
                              )
                            ) : (
                              <span className="font-semibold text-slate-700">{feat.core}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-6 text-center text-xs bg-brand-50/30">
                            {typeof feat.growth === 'boolean' ? (
                              feat.growth ? (
                                <Check className="w-4 h-4 text-brand-600 mx-auto" />
                              ) : (
                                <span className="text-slate-300">—</span>
                              )
                            ) : (
                              <span className="font-bold text-brand-700">{feat.growth}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-6 text-center text-xs">
                            {typeof feat.veteran === 'boolean' ? (
                              feat.veteran ? (
                                <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                              ) : (
                                <span className="text-slate-300">—</span>
                              )
                            ) : (
                              <span className="font-semibold text-slate-700">{feat.veteran}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
              Pricing Clarity
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Billing
            </h2>
          </div>

          <div className="space-y-3">
            {pricingFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all ${
                    isOpen ? 'bg-brand-50/40 border-brand-200' : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-brand-600' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-brand-100/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export default PricingPage;
