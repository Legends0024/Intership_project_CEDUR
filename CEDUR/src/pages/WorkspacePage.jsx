import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  DollarSign,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  LogOut,
  Download,
  Building2,
  Layers,
  Sparkles,
  RefreshCw,
  FileText,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/useAuth';

export function WorkspacePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [payrollSimulated, setPayrollSimulated] = useState(false);

  useEffect(() => {
    // Fetch live captured leads from local SQLite
    async function fetchLeads() {
      try {
        const res = await fetch('/api/admin/leads');
        if (res.ok) {
          const data = await res.json();
          setLeads(data.leads || []);
        }
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoadingLeads(false);
      }
    }
    fetchLeads();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSimulatePayroll = () => {
    setPayrollSimulated(true);
    setTimeout(() => setPayrollSimulated(false), 5000);
  };

  const displayName = user?.name || 'Administrator';
  const displayCompany = user?.company || 'Cedur Enterprise Customer';

  return (
    <>
      <SEO
        title={`Workspace Dashboard — ${displayCompany}`}
        description="Cedur HR and Payroll management workspace for organizations."
        canonicalPath="/workspace"
      />

      <div className="min-h-screen bg-slate-50/60 pb-20 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Banner & User Profile */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-violet flex items-center justify-center text-white font-extrabold text-2xl shadow-md shrink-0">
                {user?.initials || 'AD'}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {displayName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Organization
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>{displayCompany}</span>
                  <span>•</span>
                  <span className="text-brand-600 font-semibold">{user?.role || 'Administrator'}</span>
                  <span>•</span>
                  <span className="text-slate-400">{user?.email || 'admin@company.com'}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link
                to="/"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
              >
                View Marketing Site
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Workforce
                </span>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-brand-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900">48</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <span>↑ 4 new onboarded this month</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Next Payroll Run
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900">₹14.85 L</div>
              <div className="text-xs text-slate-500 mt-1">
                Scheduled for 1st of next month · 100% Tax Compliant
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Today's Attendance
                </span>
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900">95.8%</div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                <span>46 present via GPS Geofence</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Compliance Status
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 mt-1">
                PF, ESI, TDS, PT challans up to date
              </div>
            </div>
          </div>

          {/* Interactive Action Ribbon */}
          <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  Fast Automation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Run 2-Click Salary Batch for Current Period
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                  Automate calculations across biometric shifts, tax slabs, EPF/ESI contributions, and generate downloadable digital payslips in under 2 minutes.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleSimulatePayroll}
                  variant="primary"
                  size="md"
                  className="bg-brand-500 hover:bg-brand-400 text-white shadow-md"
                >
                  {payrollSimulated ? '✓ Calculations Complete' : 'Execute Salary Run'}
                </Button>
                <a
                  href="/api/admin/leads.csv"
                  download="cedur_leads.csv"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition"
                >
                  <Download className="w-4 h-4" />
                  Export Data (CSV)
                </a>
              </div>
            </div>

            {payrollSimulated && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>
                  Salary processing simulated: 48 employee bank transfer batches & Form 16 slips queued successfully!
                </span>
              </div>
            )}
          </div>

          {/* Real SQLite Leads / Form Submissions Viewer */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span>Real-Time Ingestion: SQLite Form Submissions</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live data stored in local embedded file <code className="text-brand-600 bg-slate-100 px-1 py-0.5 rounded">backend/data/cedur.db</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  Total in SQLite: <strong className="text-slate-900">{leads.length}</strong>
                </span>
                <a
                  href="/api/admin/leads.csv"
                  download="leads.csv"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CSV
                </a>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Organization</th>
                    <th className="py-3 px-4">Team Size</th>
                    <th className="py-3 px-4">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {leads.length > 0 ? (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3 px-4 font-mono font-bold text-slate-400">#{lead.id}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                              lead.type === 'signup'
                                ? 'bg-purple-100 text-purple-700'
                                : lead.type === 'demo'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {lead.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{lead.full_name}</td>
                        <td className="py-3 px-4 font-mono text-slate-600">{lead.email}</td>
                        <td className="py-3 px-4">{lead.company_or_website || '—'}</td>
                        <td className="py-3 px-4">{lead.employee_count || '—'}</td>
                        <td className="py-3 px-4 text-slate-400">
                          {lead.created_at ? new Date(lead.created_at).toLocaleString('en-IN') : 'Just now'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No submissions recorded in SQLite yet. Submit any form on the site to see it appear here in real time!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkspacePage;
