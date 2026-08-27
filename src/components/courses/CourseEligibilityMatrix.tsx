import React from 'react';
import {
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Laptop,
  Award,
  Target
} from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';

interface CourseEligibilityMatrixProps {
  course: Course;
}

export const CourseEligibilityMatrix: React.FC<CourseEligibilityMatrixProps> = ({ course }) => {
  return (
    <section id="eligibility" className="py-16 sm:py-24 bg-paper border-b border-border scroll-mt-24">
      <Container>
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold text-navy uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-blue" />
            <span>Eligibility & Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            Who It's For & Where It Takes You
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Ensure this curriculum matches your educational background, learning pace, and target engineering career track.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Target Learners & Prerequisites */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue" />
                  <span>Target Learners</span>
                </h3>
                <p className="text-xs text-ink-soft mt-1">
                  Ideal profiles who gain maximum career impact from this syllabus
                </p>
              </div>

              <div className="space-y-3">
                {course.targetAudience.map((audience, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-paper border border-border-soft">
                    <div className="w-5 h-5 rounded-full bg-navy/10 text-navy flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <p className="text-xs sm:text-sm text-ink leading-relaxed">
                      {audience}
                    </p>
                  </div>
                ))}
              </div>

              {/* Prerequisites */}
              <div className="pt-4 border-t border-border-faint space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue">
                  <AlertCircle className="w-4 h-4" />
                  <span>Prerequisites & Minimum Background</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-ink-soft">
                  {course.prerequisites.map((prereq, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hardware Requirements */}
              <div className="pt-4 border-t border-border-faint flex items-start gap-3 text-xs text-ink-soft bg-paper-alt p-3.5 rounded-xl">
                <Laptop className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Hardware Recommendation:</strong>
                  <span>Personal laptop with min. 8GB RAM (16GB recommended) and modern OS (Windows, macOS, or Linux).</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Career Trajectories & Outcomes */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue" />
                  <span>Qualified Career Roles</span>
                </h3>
                <p className="text-xs text-ink-soft mt-1">
                  Positions graduates are prepared to apply for in Nepal and remote markets
                </p>
              </div>

              {/* Role Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.careerPaths.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-paper border border-border flex items-center gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-navy text-white flex items-center justify-center shrink-0">
                      <Target className="w-3.5 h-3.5 text-blue-light" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-ink">
                      {role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Core Competencies Acquired */}
              <div className="pt-4 border-t border-border-faint space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                  <CheckCircle2 className="w-4 h-4 text-sage-ink" />
                  <span>Key Competencies You Demonstrate</span>
                </div>
                <div className="space-y-2">
                  {course.outcomes.slice(0, 5).map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
                      <span className="leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate & Placement Support */}
              <div className="pt-4 border-t border-border-faint p-3.5 rounded-xl bg-sage/10 border border-sage/25 flex items-start gap-3 text-xs text-sage-ink">
                <Award className="w-4 h-4 text-sage-ink shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-sage-ink block">Navya Verified Credential:</strong>
                  <span>Includes verifiable certificate ID, capstone defense score report, and portfolio review for partner hiring networks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
