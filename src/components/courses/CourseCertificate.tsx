import React from 'react';
import { Award, ShieldCheck, CheckCircle2, QrCode, FileCheck, AlertCircle } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';

interface CourseCertificateProps {
  course: Course;
}

export const CourseCertificate: React.FC<CourseCertificateProps> = ({ course }) => {
  return (
    <section id="certificate" className="py-16 sm:py-24 bg-white border-b border-border scroll-mt-24">
      <Container>
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold text-navy uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-blue" />
            <span>Course Credential & Certification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            Verifiable Industry Certificate of Competence
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Graduates who fulfill rigorous project benchmarks receive an official digital and printed Certificate of Technical Competence issued by Navya Ed Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Certificate Visual Representation */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-paper border border-border relative overflow-hidden shadow-xs">
            {/* Decorative watermark */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-navy/5 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-border-faint pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-navy text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    N
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Navya Ed Tech</h3>
                    <p className="text-[10px] text-ink-faint">Kathmandu, Nepal • Registered Division</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sage/15 text-sage-ink border border-sage/25">
                  Verified Credential
                </span>
              </div>

              <div className="space-y-2 py-4 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-ink-faint">
                  Certificate of Technical Competence
                </span>
                <p className="text-sm font-semibold text-ink-soft">Awarded for successfully mastering</p>
                <h4 className="text-lg sm:text-xl font-extrabold text-navy">
                  {course.title}
                </h4>
                <p className="text-xs text-ink-muted">
                  Cohort Duration: {course.duration} • Practical Engineering Track
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-border-soft space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
                    <QrCode className="w-3.5 h-3.5 text-blue" />
                    <span>Verifiable ID</span>
                  </div>
                  <p className="text-[10px] font-mono text-ink-faint">Unique Serial Hash & QR Code</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-border-soft space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
                    <FileCheck className="w-3.5 h-3.5 text-sage-ink" />
                    <span>Defense Score</span>
                  </div>
                  <p className="text-[10px] font-mono text-ink-faint">Capstone Panel Evaluated</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-faint flex items-center justify-between text-[11px] text-ink-soft relative z-10">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue" />
                <span>Issuing Authority: Navya Ed Tech Pvt. Ltd.</span>
              </span>
              <span className="font-mono text-[10px] text-ink-faint">NAV-CERT-2026</span>
            </div>
          </div>

          {/* Right Column: 3-Step Qualification Milestones & Honest Disclosure */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue" />
                  <span>Qualification Criteria (No Free Passes)</span>
                </h3>
                <p className="text-xs text-ink-soft mt-1">
                  To protect the credibility of Navya certification and our graduates, certificates are earned through demonstrated engineering milestones:
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-paper border border-border-soft">
                  <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-ink">
                      80% Minimum Live Attendance
                    </h4>
                    <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">
                      Active presence in classroom laboratory sessions or live interactive online cohorts. Habitual absences without prior academic leave disqualify certification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-paper border border-border-soft">
                  <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-ink">
                      Weekly GitHub Assignment Submissions
                    </h4>
                    <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">
                      Completion of all module programming exercises pushed to personal GitHub repositories, reviewed and approved by assigned faculty mentors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-paper border border-border-soft">
                  <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-ink">
                      Capstone Project Defense Before Engineering Panel
                    </h4>
                    <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">
                      A live technical presentation of your final cloud-deployed system where you explain architecture, database schemas, and answer technical questions from senior engineers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transparent Legal/Accreditation Notice */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-bold text-amber-900 block">
                    Transparent Credential Notice:
                  </strong>
                  <p className="leading-relaxed text-amber-900/90 text-[11.5px]">
                    This certificate is an industry technical competence credential issued directly by Navya Ed Tech Pvt. Ltd. to validate practical software development proficiency. It is <strong>not</strong> an accredited academic university degree, Tribhuvan University affiliation, CTEVT diploma, or government charter. Employers value it for verified GitHub code, architecture defense scores, and practical skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
