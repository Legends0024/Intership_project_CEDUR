import React from 'react';
import { Zap, ShieldCheck, MapPin, Receipt, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const keyBenefits = [
  {
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    title: 'Simple 2-Click Payroll',
    description:
      'Cedur automatically calculates payroll in direct sync with marked attendance, paid leaves, and national holidays. Generate full salary sheets in seconds.',
    link: '/payroll-software',
  },
  {
    icon: ShieldCheck,
    color: 'from-blue-600 to-indigo-600',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    title: 'All Compliances Covered',
    description:
      'Cedur computes your employee PF (EPFO ECR), ESIC, monthly TDS (Old & New Regimes), and state-level Professional Tax (PT) automatically with 100% fidelity.',
    link: '/payroll-software',
  },
  {
    icon: MapPin,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    title: 'No-Touch Geofence Attendance',
    description:
      'All attendance is marked by your team on their mobile phones via GPS geofencing. No biometric fingerprint machines, zero hardware breakdowns.',
    link: '/geofence-attendance-software',
  },
  {
    icon: Receipt,
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    title: 'Advances & Expenses Covered',
    description:
      'Mid-month salary advances and receipt-backed expense reimbursements are integrated into the payroll engine for smooth month-end disbursement.',
    link: '/expense-management-software',
  },
];

export function FeatureCards() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            Why Indian Teams Choose Cedur
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Cutting-Edge Cloud Platform Built to Streamline Every Step
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Designed from the ground up for Indian SMBs to eliminate error-prone spreadsheets, manual attendance registers, and compliance fines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyBenefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.bg} ${item.text} flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureCards;
