import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { COURSES } from '../data/courses';
import { SEOHead } from '../components/common/SEOHead';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedCourse: 'mern-stack-development',
    preferredMode: 'Classroom (Kathmandu)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8]">
      <SEOHead
        title="Contact Admissions & Academic Advisory | Navya Ed Tech Nepal"
        description="Get in touch with the admissions team at Navya Ed Tech. Schedule a campus visit, ask about upcoming batch dates, or request curriculum syllabi."
      />

      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
            Admissions & Student Advisory
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171A1F]">
            Let's Talk About Your Learning Goals.
          </h1>
          <p className="text-base sm:text-lg text-[#5F6670] leading-relaxed">
            Have questions about course prerequisites, batch schedules, fees in NPR, or lab facilities? Submit your inquiry below or reach out to our admissions desk directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#E8E4DA] shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#718C7A]/20 text-[#3D5644] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-[#171A1F]">
                  Inquiry Dispatched
                </h2>
                <p className="text-sm text-[#5F6670] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#171A1F]">{formData.fullName}</strong>. Your academic inquiry has been registered. An education counselor will contact you at <strong className="text-[#171A1F]">{formData.phone || formData.email}</strong> to review course options and batch timelines.
                </p>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        interestedCourse: 'mern-stack-development',
                        preferredMode: 'Classroom (Kathmandu)',
                        message: ''
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bijay Adhikari"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="bijay@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                      Phone / Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                      Interested Course
                    </label>
                    <select
                      value={formData.interestedCourse}
                      onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white"
                    >
                      {COURSES.map((course) => (
                        <option key={course.slug} value={course.slug}>
                          {course.title} ({course.duration})
                        </option>
                      ))}
                      <option value="full-stack-track">Full Stack Engineering Track (6 Months)</option>
                      <option value="general-counseling">General IT Career Counseling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                      Preferred Learning Mode
                    </label>
                    <select
                      value={formData.preferredMode}
                      onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white"
                    >
                      <option value="Classroom (Kathmandu)">Classroom (Kathmandu Campus)</option>
                      <option value="Online Live">Online Live (Interactive)</option>
                      <option value="Undecided">Undecided / Discuss with Advisor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                    Your Message / Specific Inquiries
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your background, college, or any questions regarding syllabus and schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-[#5F6670]">
                    Direct academic and batch consultation. No unsolicited marketing.
                  </p>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus & Admissions Information */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DA] shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-[#171A1F]">
                Admissions & Office Information
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#5F6670]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#171A1F] block">Training Campus:</strong>
                    <span>Kathmandu, Nepal [Contact admissions desk for exact campus directions]</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#171A1F] block">Admissions Email:</strong>
                    <span>info@navyaedtech.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#171A1F] block">Advisory Hours:</strong>
                    <span>Sunday – Friday: 7:00 AM – 7:00 PM (NPT)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#171A1F] block">Currency & Payments:</strong>
                    <span>All fees in NPR (Rs.). Admissions processed directly with our counseling team.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Organization Link */}
            <div className="p-6 rounded-2xl bg-[#F4F1EA] border border-[#E5DFD4] space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A] block">
                Parent Company
              </span>
              <h3 className="text-base font-bold text-[#171A1F]">
                Navya EdTech (Technology Solutions)
              </h3>
              <p className="text-xs text-[#5F6670] leading-relaxed">
                For commercial software services, cloud engineering, or institutional partnerships, visit the main enterprise site.
              </p>
              <a
                href="https://navyaedtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17324D] hover:text-[#356A9A] transition-colors"
              >
                <span>navyaedtech.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
