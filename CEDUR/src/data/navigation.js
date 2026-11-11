export const navProducts = [
  {
    slug: 'hr-software',
    title: 'HR Software for Indian SMEs',
    description: 'Manage employee records, onboarding, lifecycle and documents.',
    path: '/hr-software',
    badge: 'Popular',
    icon: 'Users',
  },
  {
    slug: 'payroll-software',
    title: 'Payroll Software for Indian Businesses',
    description: 'Calculate salaries, TDS, EPF, ESI and generate bank payment files.',
    path: '/payroll-software',
    badge: 'Core',
    icon: 'DollarSign',
  },
  {
    slug: 'leave-management-software',
    title: 'Leave Management Software',
    description: 'Custom leave types, holiday calendars, workflows & instant approvals.',
    path: '/leave-management-software',
    icon: 'Calendar',
  },
  {
    slug: 'attendance-management-software',
    title: 'Attendance Management Software',
    description: 'Track working hours, shifts, half-days, and sync with payroll.',
    path: '/attendance-management-software',
    icon: 'CalendarCheck',
  },
  {
    slug: 'employee-self-service-portal',
    title: 'Employee Self Service Portal',
    description: 'Employee mobile & web access to payslips, tax forms & requests.',
    path: '/employee-self-service-portal',
    icon: 'Shield',
  },
  {
    slug: 'mobile-app',
    title: 'HR and Payroll Mobile App',
    description: 'Self-service attendance, leave and payslip downloads on Android.',
    path: '/mobile-app',
    badge: 'Android',
    icon: 'Smartphone',
  },
  {
    slug: 'expense-management-software',
    title: 'Expense & Reimbursement Software',
    description: 'Submit receipts, manager approvals & seamless reimbursement via payroll.',
    path: '/expense-management-software',
    icon: 'Receipt',
  },
  {
    slug: 'geofence-attendance-software',
    title: 'Geofence Attendance Software',
    description: 'GPS location-based mobile check-in without biometric hardware.',
    path: '/geofence-attendance-software',
    badge: 'Zero Hardware',
    icon: 'MapPin',
  },
];

export const mainNav = [
  { title: 'Home', path: '/' },
  {
    title: 'Products',
    path: '/products',
    hasDropdown: true,
    items: navProducts,
  },
  { title: 'Pricing', path: '/pricing' },
  { title: 'About', path: '/about' },
  { title: 'Resources', path: '/blogs' },
  { title: 'Contact', path: '/support' },
];

export const authActions = {
  login: { title: 'Login', href: '/login' },
  register: { title: 'Get Started Free', href: '/register' },
};

export const footerNav = {
  company: [
    { title: 'About Us', path: '/about' },
    { title: 'Contact Us', path: '/support' },
    { title: 'Testimonials', path: '/testimonials' },
    { title: 'FAQs', path: '/faqs' },
    { title: 'Privacy Policy', path: '/privacy-policy' },
    { title: 'Terms of Service', path: '/terms-of-service' },
  ],
  products: [
    { title: 'HR Software', path: '/hr-software' },
    { title: 'Payroll Software', path: '/payroll-software' },
    { title: 'Leave Management', path: '/leave-management-software' },
    { title: 'Attendance Management', path: '/attendance-management-software' },
    { title: 'Geofence Attendance', path: '/geofence-attendance-software' },
    { title: 'Employee Self Service', path: '/employee-self-service-portal' },
    { title: 'Mobile App', path: '/mobile-app' },
    { title: 'Expense Management', path: '/expense-management-software' },
  ],
  resources: [
    { title: 'Blog & HR Guides', path: '/blogs' },
    { title: 'Statutory Compliance Matrix', path: '/payroll-software#compliance' },
    { title: 'TDS & Tax Deduction Calculator', path: '/payroll-software#tax' },
    { title: 'Pricing Comparison', path: '/pricing' },
    { title: 'Help & Support', path: '/support' },
  ],
};
