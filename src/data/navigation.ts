export interface NavChildItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: NavChildItem[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Courses', href: '/courses' },
  { label: 'Programs', href: '/programs' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Institutional', href: '/corporate-training' },
  {
    label: 'More',
    href: '#',
    children: [
      {
        label: 'Student Work',
        href: '/student-work',
        description: 'Production capstone projects & live student GitHub repositories',
      },
      {
        label: 'About Navya',
        href: '/about',
        description: 'Software company lineage, engineering faculty & the Navya Method',
      },
      {
        label: 'Admissions FAQ',
        href: '/faq',
        description: 'Consolidated answers on admissions, fees, formats & careers',
      },
      {
        label: 'Industry Insights',
        href: '/insights',
        description: 'Technical articles, coding roadmaps & tech ecosystem analyses',
      },
      {
        label: 'Contact & Counseling',
        href: '/contact',
        description: 'Admissions questions, free online demo classes & advisor calls',
      },
    ],
  },
];

export const FOOTER_LINKS = {
  education: [
    { label: 'All Courses', href: '/courses' },
    { label: 'Kids Coding (Ages 8–14)', href: '/courses?audience=kids' },
    { label: 'Career Programs', href: '/programs' },
    { label: 'Pricing & Tuition (NPR)', href: '/pricing' },
    { label: 'Enroll / Apply Now', href: '/apply' },
    { label: 'Corporate & College Training', href: '/corporate-training' },
    { label: 'Student Work & Showcase', href: '/student-work' },
    { label: 'Frequently Asked Questions', href: '/faq' },
  ],
  popularCourses: [
    { label: 'Data Science (50 Days)', href: '/courses/data-science' },
    { label: 'Python Advance (40 Days)', href: '/courses/python-advance' },
    { label: 'Python Beginner (40 Days)', href: '/courses/python-beginner' },
    { label: 'Scratch Advanced (30 Days)', href: '/courses/scratch-advanced' },
    { label: 'Scratch Beginner (30 Days)', href: '/courses/scratch-beginner' },
    { label: 'Web Development (45 Days)', href: '/courses/web-development' },
  ],
  company: [
    { label: 'About Navya Ed Tech', href: '/about' },
    { label: 'Parent Company (Navya EdTech)', href: 'https://navyaedtech.com/', external: true },
    { label: 'Institutional Training', href: '/corporate-training' },
    { label: 'Admissions & FAQ', href: '/faq' },
    { label: 'Contact & Advisory Desk', href: '/contact' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund & Cancellation', href: '/refund' },
    { label: 'Tuition Fee Policy', href: '/pricing' },
    { label: 'Student FAQ', href: '/faq' },
  ],
  contact: {
    organization: 'Navya Ed Tech Pvt. Ltd.',
    subheading: 'IT & Technology Education Division',
    parentCompany: 'Navya EdTech (Technology & Software Solutions)',
    parentUrl: 'https://navyaedtech.com/',
    location: 'Online classes, available across Nepal',
    email: 'info@navyaedtech.com [Official admissions inquiries]',
    phone: '+977-9800000000 [Direct Admissions line]',
    whatsapp: 'Available via Advisor Desk & Contact Form',
    hours: 'Sunday – Friday: 7:00 AM – 7:00 PM (NPT)',
  }
};
