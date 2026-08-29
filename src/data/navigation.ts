export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Programs', href: '/programs' },
  { label: 'About', href: '/about' },
  { label: 'Student Work', href: '/student-work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  education: [
    { label: 'All Courses', href: '/courses' },
    { label: 'Career Programs', href: '/programs' },
    { label: 'Student Work & Showcase', href: '/student-work' },
    { label: 'Industry Insights', href: '/insights' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  popularCourses: [
    { label: 'Python Beginner (40 Days)', href: '/courses/python-beginner' },
    { label: 'Python Advance (40 Days)', href: '/courses/python-advance' },
    { label: 'Web Development (45 Days)', href: '/courses/web-development' },
    { label: 'Scratch Beginner (30 Days)', href: '/courses/scratch-beginner' },
    { label: 'Scratch Advanced (30 Days)', href: '/courses/scratch-advanced' },
    { label: 'Data Science (50 Days)', href: '/courses/data-science' },
  ],
  company: [
    { label: 'About Navya Ed Tech', href: '/about' },
    { label: 'Parent Company (Navya EdTech)', href: 'https://navyaedtech.com/', external: true },
    { label: 'Industry Insights & Articles', href: '/insights' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Contact & Advisory Desk', href: '/contact' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  contact: {
    organization: 'Navya Ed Tech Pvt. Ltd.',
    subheading: 'IT & Technology Education Division',
    parentCompany: 'Navya EdTech (Technology & Software Solutions)',
    parentUrl: 'https://navyaedtech.com/',
    location: 'Kathmandu, Nepal [Contact office for exact campus address]',
    email: 'info@navyaedtech.com [Official admissions inquiries]',
    phone: '+977 [Inquire via Advisor Desk or WhatsApp]',
    whatsapp: 'Available via Advisor Desk',
    hours: 'Sunday – Friday: 7:00 AM – 7:00 PM (NPT)',
  }
};
