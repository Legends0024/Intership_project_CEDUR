export const pricingPlans = [
  {
    id: 'core',
    name: 'Core',
    tagline: 'Perfect for small, fast-growing teams getting started with automation',
    icon: 'Sparkles',
    seatsIncluded: 'Up to 25 employees',
    priceMonthly: 3945,
    priceAnnualMonthly: 3156, // 20% off
    badge: 'Starter',
    featured: false,
    ctaText: 'Get Started Free',
    ctaLink: '/register?plan=core',
    features: [
      { name: 'Payroll Management (2-click runs)', included: true },
      { name: 'Leave Management & Holiday Policies', included: true },
      { name: 'Attendance Management & Shift Tracking', included: true },
      { name: 'Employee Onboarding & Document Vault', included: true },
      { name: 'Access & User Management (Role-based)', included: true },
      { name: 'Digital Payslip Generation & Distribution', included: true },
      { name: 'Support via Email (24h SLA)', included: true },
      { name: 'Standard Analytics & Summary Reports', included: true },
      { name: 'Bulk Excel Import & Export', included: true },
      { name: 'Cost Per Additional Employee (₹75/emp/mo)', included: true },
      { name: 'Support via Call / Dedicated Phone', included: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Our most popular plan for scaling companies needing full automation',
    icon: 'Rocket',
    seatsIncluded: 'Up to 50 employees',
    priceMonthly: 5945,
    priceAnnualMonthly: 4756, // 20% off
    badge: 'Most Popular',
    featured: true,
    ctaText: 'Start 14-Day Free Trial',
    ctaLink: '/register?plan=growth',
    features: [
      { name: 'Payroll Management (2-click runs)', included: true },
      { name: 'Leave Management & Holiday Policies', included: true },
      { name: 'Attendance Management & Shift Tracking', included: true },
      { name: 'Employee Onboarding & Document Vault', included: true },
      { name: 'Access & User Management (Role-based)', included: true },
      { name: 'Digital Payslip Generation & Distribution', included: true },
      { name: 'Support via Email (Priority queue)', included: true },
      { name: 'Advanced Analytics & Custom Reporting', included: true },
      { name: 'Bulk Excel Import & Export', included: true },
      { name: 'Cost Per Additional Employee (₹65/emp/mo)', included: true },
      { name: 'Support via Call / Phone Assistance', included: true },
    ],
  },
  {
    id: 'veteran',
    name: 'Veteran',
    tagline: 'Comprehensive suite for established businesses with high-volume teams',
    icon: 'Crown',
    seatsIncluded: 'Up to 100+ employees',
    priceMonthly: 9945,
    priceAnnualMonthly: 7956, // 20% off
    badge: 'Enterprise',
    featured: false,
    ctaText: 'Contact Sales / Custom Demo',
    ctaLink: '#demo',
    features: [
      { name: 'Payroll Management (2-click runs)', included: true },
      { name: 'Leave Management & Holiday Policies', included: true },
      { name: 'Attendance Management & Shift Tracking', included: true },
      { name: 'Employee Onboarding & Document Vault', included: true },
      { name: 'Access & User Management (Role-based)', included: true },
      { name: 'Digital Payslip Generation & Distribution', included: true },
      { name: 'Support via Email (Dedicated SLA)', included: true },
      { name: 'Advanced Analytics & CA Audit Export', included: true },
      { name: 'Bulk Excel Import & Export', included: true },
      { name: 'Cost Per Additional Employee (₹50/emp/mo)', included: true },
      { name: 'Dedicated Account Manager & Phone Support', included: true },
    ],
  },
];

export const pricingComparisonFeatures = [
  {
    category: 'Payroll & Compliance',
    features: [
      { name: 'Automated 2-Click Salary Runs', core: true, growth: true, veteran: true },
      { name: 'EPFO (PF) & ESIC Compliance Calculations', core: true, growth: true, veteran: true },
      { name: 'TDS (Old vs New Regime Tax Slabs)', core: true, growth: true, veteran: true },
      { name: 'Professional Tax (PT) & LWF Multi-State', core: true, growth: true, veteran: true },
      { name: 'Bank Disbursement Payment Files (NEFT/RTGS)', core: true, growth: true, veteran: true },
      { name: 'Salary Advances & Expense Reimbursements', core: false, growth: true, veteran: true },
    ],
  },
  {
    category: 'Attendance & Leave',
    features: [
      { name: 'Geofence GPS Mobile Check-in (Zero Hardware)', core: true, growth: true, veteran: true },
      { name: 'Selfie Audit to Prevent Proxy Attendance', core: true, growth: true, veteran: true },
      { name: 'Custom Shift Scheduling & Late Rules', core: true, growth: true, veteran: true },
      { name: 'Leave Policy Workflows & Balance Ledgers', core: true, growth: true, veteran: true },
      { name: 'Multi-Location / Multi-Branch Tracking', core: false, growth: true, veteran: true },
    ],
  },
  {
    category: 'Employee Experience & Support',
    features: [
      { name: 'Employee Self Service Portal (Web & App)', core: true, growth: true, veteran: true },
      { name: 'Digital Payslip PDF Downloads', core: true, growth: true, veteran: true },
      { name: 'Bulk Data Import & CA Ready Reports', core: true, growth: true, veteran: true },
      { name: 'Email Support', core: 'Standard', growth: 'Priority', veteran: 'Dedicated SLA' },
      { name: 'Call / Phone Support', core: false, growth: true, veteran: 'Dedicated RM' },
      { name: 'Custom Onboarding & Migration Assistance', core: false, growth: true, veteran: true },
    ],
  },
];

export const pricingFaqs = [
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes! We offer a full-featured 14-day free trial on all plans so you and your team can experience Cedur firsthand. No credit card is required to sign up.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major Indian payment methods including UPI (Google Pay, PhonePe, Paytm), Net Banking, Corporate Credit/Debit Cards, NEFT/RTGS transfers, and automated monthly e-Mandate.',
  },
  {
    question: 'Are there any hidden fees or setup charges?',
    answer:
      'Zero hidden fees. Our pricing includes cloud hosting, regular statutory regulatory updates, mobile apps, and customer support. There are no surprise implementation or maintenance charges.',
  },
  {
    question: 'What happens if I exceed my employee plan limit?',
    answer:
      'You will never be blocked from running payroll! If your team grows beyond your plan seat allowance, extra employees are simply billed at the transparent per-employee rate (₹50–₹75/mo), or you can easily upgrade to the next tier with prorated billing.',
  },
  {
    question: 'Can I switch between Monthly and Annual billing?',
    answer:
      'Yes, you can switch between billing cycles anytime from your account dashboard. Annual billing provides an instant 20% discount on all plans.',
  },
  {
    question: 'Is my company payroll and employee data secure?',
    answer:
      'Absolutely. Cedur uses 256-bit bank-grade encryption in transit and at rest, automated daily backups, role-based access control, and ISO-compliant cloud infrastructure hosted locally in India.',
  },
];
