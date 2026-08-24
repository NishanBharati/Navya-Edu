import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, BookOpen, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from './Button';
import { COURSES } from '../../data/courses';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseSlug?: string;
}

export const AdvisorModal: React.FC<AdvisorModalProps> = ({
  isOpen,
  onClose,
  defaultCourseSlug = ''
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedCourse: defaultCourseSlug || (COURSES[0]?.slug ?? 'mern-stack-development'),
    preferredMode: 'Classroom (Kathmandu)',
    learningGoal: 'Career preparation / Job readiness',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="advisor-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="advisor-modal-card"
        className="relative w-full max-w-xl bg-white border border-[#E5DFD4] rounded-2xl shadow-xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="bg-[#17324D] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            aria-label="Close Advisor Modal"
            className="absolute top-5 right-5 p-2 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9BBAD4] uppercase mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Admissions & Advisory Desk</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Talk to an Education Advisor
          </h3>
          <p className="text-sm text-stone-300 mt-1.5 leading-relaxed">
            Connect directly with our training team for upcoming batch schedules, syllabus walk-throughs, and learning path recommendations.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#718C7A]/20 text-[#3D5644] mx-auto flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#171A1F]">
                Inquiry Received
              </h4>
              <p className="text-sm text-[#5F6670] mt-2 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in Navya Ed Tech. Our education advisor will contact you at <span className="font-semibold text-[#171A1F]">{formData.phone || formData.email}</span> within 1 business day with batch details and curriculum guides.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-[#F4F1EA] border border-[#E8E3D8] text-left text-xs text-[#5F6670] space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#17324D] shrink-0" />
                  <span>Advisory Hours: Sunday – Friday, 7:00 AM – 7:00 PM (NPT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#17324D] shrink-0" />
                  <span>Location: Kathmandu, Nepal [Navya Ed Tech Campus]</span>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="primary" onClick={handleReset}>
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aarav@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                  Interested Course / Domain
                </label>
                <select
                  value={formData.interestedCourse}
                  onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-all"
                >
                  {COURSES.map((course) => (
                    <option key={course.slug} value={course.slug}>
                      {course.title} ({course.duration})
                    </option>
                  ))}
                  <option value="career-program">Full Stack Engineering Career Program (6 Months)</option>
                  <option value="general-counseling">General IT Career Counseling</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                    Preferred Mode
                  </label>
                  <select
                    value={formData.preferredMode}
                    onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-all"
                  >
                    <option value="Classroom (Kathmandu)">Classroom (Kathmandu Campus)</option>
                    <option value="Online Live">Online Live (Interactive)</option>
                    <option value="Flexible / Undecided">Flexible / Discuss with Advisor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                    Learning Goal
                  </label>
                  <select
                    value={formData.learningGoal}
                    onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-all"
                  >
                    <option value="Job Readiness / Career Transition">Job Readiness / Career Entry</option>
                    <option value="Skill Upgrade for Current Job">Skill Upgrade for Current Job</option>
                    <option value="College Project & Academic Support">College Project & Academic Support</option>
                    <option value="General Exploration">General Skill Exploration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
                  Questions / Specific Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your background or any specific questions about batches and timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-[#5F6670]">
                  No spam. Direct academic and batch schedule consultation only.
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
