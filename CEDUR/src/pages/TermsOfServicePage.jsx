import React from 'react';
import SEO from '../components/ui/SEO';
import { siteConfig } from '../data/site';

export function TermsOfServicePage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms and conditions governing the use of Cedur software and services."
        canonicalPath="/terms-of-service"
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 pb-8 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-2">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: October 2026 · {siteConfig.legalName}
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6 text-slate-700">
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between your organization ("Customer", "you") and <strong>{siteConfig.legalName}</strong> ("Cedur", "we", "us") governing access to and use of our SaaS software, mobile applications, and customer support.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">1. Subscription & License</h3>
            <p>
              Subject to these Terms and payment of applicable fees, Cedur grants you a non-exclusive, non-transferable, revocable subscription license to use the platform solely for internal HR, attendance, and payroll operations.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">2. Customer Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You are responsible for ensuring that all employee data, salary figures, and tax parameters entered into the system are accurate and lawful.</li>
              <li>You are responsible for safeguarding admin passwords and managing internal employee permissions.</li>
              <li>You must comply with all applicable Indian labor statutes, including EPFO, ESIC, and Income Tax Department rules.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">3. Fees & Payment</h3>
            <p>
              Subscription fees are billed in advance on a monthly or annual basis based on your chosen tier (Core, Growth, or Veteran) and active employee headcount. All payments are non-refundable except where explicitly required by law. Unused subscription periods or early cancellations will not result in prorated refunds.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">4. Service Availability & Support</h3>
            <p>
              Cedur targets a 99.9% uptime SLA for its cloud services, excluding scheduled maintenance windows notified in advance. Technical support is provided via phone, email, and WhatsApp according to plan terms.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">5. Governing Law & Jurisdiction</h3>
            <p>
              These Terms are governed by the laws of India. Any legal disputes or claims arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsOfServicePage;
