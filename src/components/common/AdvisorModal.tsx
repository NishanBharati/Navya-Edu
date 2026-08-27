import React, { useEffect, useState } from 'react';
import { X, CheckCircle, ArrowRight, BookOpen, Clock, MapPin } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { supabase } from '../../lib/supabaseClient';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import type { Course, Inquiry } from '../../types';

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
  const { items: courses } = useSupabaseTable<Course>('courses', { orderBy: 'title', ascending: true });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedCourse: defaultCourseSlug,
    preferredMode: 'Classroom (Kathmandu)',
    learningGoal: 'Career preparation / Job readiness',
    message: ''
  });

  useEffect(() => {
    if (!formData.interestedCourse && courses.length > 0) {
      setFormData((prev) => ({ ...prev, interestedCourse: courses[0].slug }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const inquiry: Omit<Inquiry, 'id' | 'createdAt'> = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      interestedCourse: formData.interestedCourse,
      preferredMode: formData.preferredMode,
      message: [formData.learningGoal, formData.message].filter(Boolean).join(' — '),
      status: 'New',
      source: 'Advisor Modal',
    };

    const { error } = await supabase.from('inquiries').insert(inquiry as never);
    setIsSubmitting(false);

    if (error) {
      setSubmitError('Something went wrong sending your inquiry. Please try again.');
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidthClass="max-w-xl" labelledBy="advisor-modal-title">
        {/* Header */}
        <div className="bg-navy text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            aria-label="Close Advisor Modal"
            className="absolute top-5 right-5 p-2 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-navy-mist uppercase mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Admissions & Advisory Desk</span>
          </div>
          <h3 id="advisor-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
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
              <div className="w-14 h-14 rounded-full bg-sage/20 text-sage-ink mx-auto flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-ink">
                Inquiry Received
              </h4>
              <p className="text-sm text-ink-soft mt-2 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in Navya Ed Tech. Our education advisor will contact you at <span className="font-semibold text-ink">{formData.phone || formData.email}</span> within 1 business day with batch details and curriculum guides.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-paper-alt border border-[#E8E3D8] text-left text-xs text-ink-soft space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-navy shrink-0" />
                  <span>Advisory Hours: Sunday – Friday, 7:00 AM – 7:00 PM (NPT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-navy shrink-0" />
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
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-input-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aarav@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                  Interested Course / Domain
                </label>
                <select
                  value={formData.interestedCourse}
                  onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-input-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                >
                  {courses.map((course) => (
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
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                    Preferred Mode
                  </label>
                  <select
                    value={formData.preferredMode}
                    onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                  >
                    <option value="Classroom (Kathmandu)">Classroom (Kathmandu Campus)</option>
                    <option value="Online Live">Online Live (Interactive)</option>
                    <option value="Flexible / Undecided">Flexible / Discuss with Advisor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                    Learning Goal
                  </label>
                  <select
                    value={formData.learningGoal}
                    onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                  >
                    <option value="Job Readiness / Career Transition">Job Readiness / Career Entry</option>
                    <option value="Skill Upgrade for Current Job">Skill Upgrade for Current Job</option>
                    <option value="College Project & Academic Support">College Project & Academic Support</option>
                    <option value="General Exploration">General Skill Exploration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                  Questions / Specific Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your background or any specific questions about batches and timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-input-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all resize-none"
                />
              </div>

              {submitError && (
                <div className="px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-100 text-xs font-medium text-red-700">
                  {submitError}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-ink-soft">
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
    </Modal>
  );
};
