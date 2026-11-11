import React, { useState } from 'react';
import { Users, DollarSign, Clock, ShieldCheck, FileText, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const processTabs = [
  {
    id: 'workforce',
    title: 'Workforce Management',
    icon: Users,
    heading: 'Manage Your Employee Lifecycle like a Breeze',
    subheading: 'Empowering your employees with a simplified journey from Onboarding to Exit.',
    features: [
      'Digital Employee Records and KYC Vault (Aadhaar & PAN verification)',
      'Customizable Onboarding workflows with zero paperwork',
      'Departmental hierarchy, reporting managers & designation trees',
      'Digital asset management and company property tracking',
    ],
    metric: '10 mins to onboard',
    link: '/hr-software',
    linkText: 'Explore HR Software',
  },
  {
    id: 'attendance',
    title: 'Attendance Management',
    icon: Clock,
    heading: 'Track Attendance Effortlessly Without Biometrics',
    subheading: 'Keep accurate, indisputable records of employee attendance on mobile.',
    features: [
      'Hardware-free mobile clock-in powered by GPS Geofencing',
      'Selfie verification to prevent proxy and buddy punches',
      'Flexible multi-shift schedules with late arrival grace periods',
      'Real-time supervisor attendance dashboard with live present counts',
    ],
    metric: '100% Hardware Free',
    link: '/attendance-management-software',
    linkText: 'Explore Attendance Software',
  },
  {
    id: 'advances',
    title: 'Advances & Expenses',
    icon: DollarSign,
    heading: 'Internal Workplace Finances with You in Total Control',
    subheading: 'Mid-month finance made easy with seamless hand-off to your accounts.',
    features: [
      'Employee salary advance requests with configurable ceilings',
      'Camera receipt capture for travel, fuel, and daily business meals',
      'Multi-tier manager approval flows before disbursement',
      'Automatic incorporation as additions/deductions in monthly payroll',
    ],
    metric: '< 24hr Approval Cycle',
    link: '/expense-management-software',
    linkText: 'Explore Expense Management',
  },
  {
    id: 'payroll',
    title: 'Payroll Management',
    icon: ShieldCheck,
    heading: 'Run Monthly Payroll with 100% Fidelity in 2 Minutes',
    subheading: 'Automated, compliant payroll processing that never lets you down.',
    features: [
      'Auto-synced calculation with attendance, paid leaves, and overtime',
      'Full statutory compliance: PF, ESI, TDS (Old vs New regime), and PT',
      'Automated payroll registers and variance checks from previous month',
      'Direct integration with major Indian commercial and private banks',
    ],
    metric: '120 seconds to run',
    link: '/payroll-software',
    linkText: 'Explore Payroll Software',
  },
  {
    id: 'after-payroll',
    title: 'After Payroll & Banking',
    icon: FileText,
    heading: 'All Documents, Bank Files & Records at Your Fingertips',
    subheading: 'Instant access to all statutory reports and payment transfer sheets.',
    features: [
      '1-click Bank Payment File (HDFC, ICICI, SBI, Axis, Kotak, etc.)',
      'Automated password-protected Payslip PDF distribution',
      'EPFO ECR electronic return text files and ESIC contribution schedules',
      'Quarterly and Annual payroll summary statements for CA audits',
    ],
    metric: 'Zero Manual Formatting',
    link: '/employee-self-service-portal',
    linkText: 'Explore Self Service Portal',
  },
];

export function InteractiveProcessTabs() {
  const [activeTab, setActiveTab] = useState(processTabs[0]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Workplace Management, Simplified.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Run payroll, attendance, and HR operations from one simple platform.
            <span className="font-bold text-slate-900 ml-1">1 Platform, 26 Processes.</span>
          </p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
          {processTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 border ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/25 scale-[1.02]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel Card */}
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/80 text-brand-800 text-xs font-bold">
                ⚡ {activeTab.metric}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {activeTab.heading}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeTab.subheading}
              </p>

              {/* Feature Checklist */}
              <ul className="space-y-3 pt-2">
                {activeTab.features.map((feat, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-800 font-medium">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button as={Link} to={activeTab.link} variant="primary" size="md">
                  {activeTab.linkText} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Right Mockup Card Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Process Flow
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active & Automated
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Step 1: Data Capture</span>
                    <span className="text-[11px] font-bold text-brand-600">Real-Time Mobile</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Step 2: Rule Verification</span>
                    <span className="text-[11px] font-bold text-brand-600">Company Policies</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Step 3: Statutory Audit</span>
                    <span className="text-[11px] font-bold text-brand-600">Govt Slabs</span>
                  </div>
                  <div className="p-3 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-900">Step 4: Final Output</span>
                    <span className="text-[11px] font-extrabold text-brand-700">100% Fidelity</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center pt-2">
                  Encrypted & compliant with Indian regulatory standards
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveProcessTabs;
