export type FAQCategory = 'admissions' | 'fees' | 'classes' | 'careers';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  categoryLabel: string;
  question: string;
  answer: string;
  link?: {
    label: string;
    href: string;
  };
}

export const FAQ_CATEGORIES: { id: FAQCategory; label: string; count?: number }[] = [
  { id: 'admissions', label: 'Admissions & Enrollment' },
  { id: 'fees', label: 'Fees & Payment' },
  { id: 'classes', label: 'Classes & Format' },
  { id: 'careers', label: 'Careers & Placement' },
];

export const FAQS: FAQItem[] = [
  // =========================================================================
  // 1. Admissions & Enrollment
  // =========================================================================
  {
    id: 'faq-1',
    category: 'admissions',
    categoryLabel: 'Admissions & Enrollment',
    question: 'How do I apply or enroll in a course or career program at Navya Ed Tech?',
    answer:
      'You can apply directly online through our Enrollment page (/apply) or from any course page. Once you select your track and submit your contact details, our admissions desk will schedule a 15-minute diagnostic consultation to understand your learning goals, confirm batch availability, and issue payment details.',
    link: { label: 'Start Enrollment Process', href: '/apply' },
  },
  {
    id: 'faq-2',
    category: 'admissions',
    categoryLabel: 'Admissions & Enrollment',
    question: 'Can I attend a free demo class or diagnostic consultation before committing?',
    answer:
      'Yes! We encourage prospective students to attend a free live online demo session before committing to tuition. This lets you experience our hands-on teaching methodology, review the full syllabus roadmap, and interact directly with instructors.',
    link: { label: 'Book a Free Demo Session', href: '/contact?intent=demo' },
  },
  {
    id: 'faq-3',
    category: 'admissions',
    categoryLabel: 'Admissions & Enrollment',
    question: 'Are these courses suitable for complete beginners with zero programming background?',
    answer:
      'Yes! Our foundational courses—including Web Development (45 Days), Python Beginner (40 Days), and Scratch Coding for younger students—are structured from first principles with zero prior coding assumed. Students from non-CS disciplines (management, humanities, civil engineering, commerce) regularly build strong practical software foundations here.',
    link: { label: 'View Beginner Courses', href: '/courses?level=Beginner' },
  },
  {
    id: 'faq-4',
    category: 'admissions',
    categoryLabel: 'Admissions & Enrollment',
    question: 'What documents and background information do I need to provide to enroll?',
    answer:
      'We require basic personal identification (Citizenship, National ID, or Student ID card) for invoice issuance, your contact details (phone/WhatsApp & email), and your laptop specifications. We do not require formal entrance examinations or prior computer science degrees for foundational tracks.',
    link: { label: 'Review Step-by-Step Application', href: '/apply#requirements' },
  },

  // =========================================================================
  // 2. Fees & Payment
  // =========================================================================
  {
    id: 'faq-5',
    category: 'fees',
    categoryLabel: 'Fees & Payment',
    question: 'What are the tuition fees and payment options in Nepalese Rupees (NPR)?',
    answer:
      'All course and program fees are quoted transparently in Nepalese Rupees (NPR) with zero hidden lab surcharges or registration fees. For multi-month comprehensive programs and intensive tracks, we offer structured 2 to 3 milestone installment plans so you can pay comfortably across the course duration.',
    link: { label: 'View Full Pricing Table', href: '/pricing' },
  },
  {
    id: 'faq-6',
    category: 'fees',
    categoryLabel: 'Fees & Payment',
    question: 'What payment methods do you accept in Nepal?',
    answer:
      'We accept official institutional bank transfers (ConnectIPS / Mobile Banking), and Fonepay QR payments. Every payment receives an official VAT/PAN tax invoice and stamped receipt voucher.',
  },
  {
    id: 'faq-7',
    category: 'fees',
    categoryLabel: 'Fees & Payment',
    question: 'How do installment plans work, and what payment happens when?',
    answer:
      'For short courses (40–50 Days), fees are split into two equal milestones: Milestone 1 (50%) due upon registration to reserve your place in the batch, and Milestone 2 (50%) due at the mid-course mark (Day 20/25). For multi-month career programs (60–90 Days), fees can be divided into 3 monthly milestones. Details are clearly documented in your enrollment voucher.',
    link: { label: 'View Enrollment Payment Milestones', href: '/apply#payment-schedule' },
  },
  {
    id: 'faq-8',
    category: 'fees',
    categoryLabel: 'Fees & Payment',
    question: 'What is your refund and cancellation policy?',
    answer:
      'Tuition fee refund requests submitted prior to the official batch commencement date are eligible for refunds subject to a standard administrative processing fee. Once classes and digital module repository access have commenced, tuition fees are non-refundable. However, we allow cohort batch transfers in verifiable medical or personal emergencies.',
    link: { label: 'Read Full Refund Policy', href: '/refund' },
  },
  {
    id: 'faq-9',
    category: 'fees',
    categoryLabel: 'Fees & Payment',
    question: 'Are there scholarships or merit discounts available?',
    answer:
      'We periodically offer merit-based scholarships, early-bird cohort discounts, and women-in-tech grants [PLACEHOLDER: Exact scholarship percentages and criteria are announced per admissions intake]. Inquire with our admissions counselor during your diagnostic call.',
    link: { label: 'Contact Admissions Desk', href: '/contact' },
  },

  // =========================================================================
  // 3. Classes & Format
  // =========================================================================
  {
    id: 'faq-10',
    category: 'classes',
    categoryLabel: 'Classes & Format',
    question: 'Are classes held online or in person?',
    answer:
      'All classes are live and online. You join interactive cohorts with real-time code-along sessions, screen sharing, and mentor support from anywhere in Nepal or abroad. We do not run in-person classes.',
  },
  {
    id: 'faq-11',
    category: 'classes',
    categoryLabel: 'Classes & Format',
    question: 'Do I need to travel anywhere to attend classes?',
    answer:
      'No. Every class, mentor session, and project review happens online, so you can learn from home on a laptop or desktop computer with a stable internet connection. Recorded walkthroughs are available if you miss a session.',
  },
  {
    id: 'faq-12',
    category: 'classes',
    categoryLabel: 'Classes & Format',
    question: 'What happens if I miss a live online class?',
    answer:
      'Every lecture includes structured code repositories, step-by-step module notes, and recorded backup sessions. In addition, students receive dedicated 1-on-1 online mentor hours to resolve any doubts or blockers before advancing to the next module.',
  },
  {
    id: 'faq-13',
    category: 'classes',
    categoryLabel: 'Classes & Format',
    question: 'What is the typical batch size and instructor attention ratio?',
    answer:
      'To guarantee rigorous line-by-line pull request code reviews and personal debugging attention during daily live coding sprints, we cap batch sizes strictly at 12 to 16 students per cohort. Places are reserved on a confirmed registration basis.',
  },
  {
    id: 'faq-14',
    category: 'classes',
    categoryLabel: 'Classes & Format',
    question: 'What hardware/laptop specifications do I need for classes?',
    answer:
      'Since all classes are online, you need a stable internet connection, a working microphone, and a laptop or desktop computer running Windows, macOS, or Linux with at least an Intel Core i5 / AMD Ryzen 5 or Apple Silicon processor, 8 GB RAM (16 GB recommended for Docker and full-stack development), and an SSD.',
  },
  {
    id: 'faq-15',
    category: 'classes',
    categoryLabel: 'Classes & Format',
    question: 'What are the prerequisites for Advanced Python and Data Science?',
    answer:
      'For Data Science and Advanced Python, familiarity with core programming syntax, control flow, and basic data structures is expected. If you need a refresher or are starting completely fresh, our foundational Python Beginner or Web Development modules can bring you up to speed first.',
    link: { label: 'Explore Python Beginner', href: '/courses/python-beginner' },
  },

  // =========================================================================
  // 4. Careers & Placement
  // =========================================================================
  {
    id: 'faq-16',
    category: 'careers',
    categoryLabel: 'Careers & Placement',
    question: 'Do you offer job placement guarantees?',
    answer:
      'As an ethical educational institution in our inaugural operating year, we reject deceptive "100% job placement guarantee" claims. What we do provide is rigorous, production-grade preparation: live project building, regular pull-request code reviews, GitHub portfolio polishing, technical mock interviews, resume structuring, and direct referral opportunities through Navya EdTech\'s software engineering network.',
  },
  {
    id: 'faq-17',
    category: 'careers',
    categoryLabel: 'Careers & Placement',
    question: 'What kind of career support is provided after graduation?',
    answer:
      'Graduates receive continuous support including access to our developer community, ongoing mentor office hours, technical interview preparation workshops, and direct portfolio reviews for junior engineering roles.',
    link: { label: 'Explore Curriculum Capstones', href: '/student-work' },
  },
  {
    id: 'faq-18',
    category: 'careers',
    categoryLabel: 'Careers & Placement',
    question: 'How do I earn the Navya Ed Tech Certificate of Completion?',
    answer:
      'Certificates are not handed out automatically for mere attendance. To earn an industry-recognized certificate, students must maintain at least 80% class attendance, submit all core coding assignments, and successfully deploy and defend their individual or team Capstone Project before an engineering review panel.',
    link: { label: 'See Certificate Standards', href: '/terms#section-certification' },
  },
  {
    id: 'faq-19',
    category: 'careers',
    categoryLabel: 'Careers & Placement',
    question: 'Are the certificates verifiable by employers?',
    answer:
      'Yes. Every graduate certificate includes a unique verification credential ID and URL that hiring employers or university evaluators can check directly on our portal to verify the student name, course syllabus covered, capstone project repository, and completion date.',
  },
  {
    id: 'faq-20',
    category: 'careers',
    categoryLabel: 'Careers & Placement',
    question: 'Who owns the intellectual property of projects built during the course?',
    answer:
      'You do! Students retain 100% ownership, copyright, and intellectual property rights over all application source code, designs, and repositories built during the course. You are encouraged to open-source your work, publish it on your personal GitHub, and showcase it on your resume.',
  },
];
