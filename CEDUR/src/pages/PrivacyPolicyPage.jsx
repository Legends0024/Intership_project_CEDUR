import React from 'react';
import SEO from '../components/ui/SEO';
import { siteConfig } from '../data/site';

export function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy and data protection guidelines for Cedur Enterprises Private Limited."
        canonicalPath="/privacy-policy"
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 pb-8 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-2">
              Legal Information
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: October 2026 · {siteConfig.legalName}
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6 text-slate-700">
            <p>
              At <strong>{siteConfig.legalName}</strong> ("Cedur", "we", "our", or "us"), we are committed to safeguarding the privacy and security of our customers, their employees, and visitors to our platform (the "Service"). This Privacy Policy explains how we collect, use, disclose, and protect personal and organizational information.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">1. Information We Collect</h3>
            <p>We collect information necessary to provide cloud-based human resources, attendance, and payroll services:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account & Organization Data:</strong> Company name, authorized contact person, business email address, phone number, and employee headcount.</li>
              <li><strong>Employee Personnel Records:</strong> Provided by your organization, including full name, designation, department, bank account details for salary disbursement, and PAN / Aadhaar numbers for statutory tax and PF compliance.</li>
              <li><strong>Attendance & Geolocation Data:</strong> GPS location coordinates captured solely at the exact instant an employee clocks in or out via the Cedur mobile application within defined work premises. We do not track location continuously in the background outside attendance actions.</li>
              <li><strong>Technical & Usage Information:</strong> Device types, operating system version, IP address, and access timestamps for security audits.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">2. How We Use Information</h3>
            <p>We process data exclusively to operate and deliver the Cedur platform:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Calculating salaries, deductions (EPF, ESI, TDS, PT), and generating digital payslips.</li>
              <li>Producing payment transfer files for banking institutions authorized by your organization.</li>
              <li>Validating attendance within designated office or job-site boundaries.</li>
              <li>Providing customer support and communicating service updates.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">3. Data Security & Storage</h3>
            <p>
              All customer and employee records are stored in enterprise cloud infrastructure hosted within India, complying with local data residency regulations. Data is encrypted using 256-bit AES encryption at rest and TLS 1.3 in transit. Access is strictly governed by role-based authorization controls.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">4. Data Sharing & Third Parties</h3>
            <p>
              We do not sell, rent, or trade your organization's or employees' personal data to third parties. Data is only shared with authorized sub-processors (e.g. cloud hosting providers, transactional SMS/email delivery services) strictly necessary to deliver the service.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-2">5. Contact Our Data Protection Officer</h3>
            <p>
              For any questions or privacy inquiries, contact us at:
              <br />
              <strong>Email:</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-600 underline">{siteConfig.contact.email}</a>
              <br />
              <strong>Support Phone:</strong> {siteConfig.contact.supportPhone}
              <br />
              <strong>Entity:</strong> {siteConfig.legalName}, New Delhi, India
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicyPage;
