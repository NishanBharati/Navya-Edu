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
    { label: 'Student Project Showcase', href: '/student-work' },
    { label: 'Course Curriculum FAQ', href: '/courses' },
    { label: 'Talk to an Advisor', href: '/contact' },
  ],
  popularCourses: [
    { label: 'MERN Stack Web Development', href: '/courses/mern-stack-development' },
    { label: 'Python, Data Science & AI', href: '/courses/python-data-science-ai' },
    { label: 'UI/UX & Product Design', href: '/courses/ui-ux-product-design' },
    { label: 'React & Frontend Engineering', href: '/courses/react-frontend-engineering' },
    { label: 'DevOps & Cloud Engineering', href: '/courses/devops-cloud-engineering' },
    { label: 'Flutter Mobile App Development', href: '/courses/flutter-mobile-app-development' },
  ],
  company: [
    { label: 'About Navya Ed Tech', href: '/about' },
    { label: 'Parent Company (Navya EdTech)', href: 'https://navyaedtech.com/', external: true },
    { label: 'Industry Insights & Articles', href: '/insights' },
    { label: 'Contact & Advisory Desk', href: '/contact' },
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
