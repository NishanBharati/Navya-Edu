import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Laptop,
  Calendar,
  MessageSquare,
  Download,
  MapPin,
  Users,
  Layers
} from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

interface CourseHeroProps {
  course: Course;
  onOpenAdvisor: () => void;
  onDownloadSyllabus: () => void;
}

export const CourseHero: React.FC<CourseHeroProps> = ({
  course,
  onOpenAdvisor,
  onDownloadSyllabus
}) => {
  return (
    <section className="pt-6 pb-12 sm:pb-16 bg-paper border-b border-border-soft">
      <Container>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-ink-soft mb-5">
          <Link to="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-navy transition-colors">
            Courses
          </Link>
          <span>/</span>
          <span className="text-blue font-semibold">{course.category}</span>
          <span>/</span>
          <span className="text-ink font-bold truncate max-w-[200px] sm:max-w-none">
            {course.title}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Heading, Value Prop, Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-navy text-white tracking-wide shadow-xs">
                {course.category}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue/15 text-navy">
                {course.level}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-sage/10 text-sage-ink border border-sage/25">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                {course.upcomingBatch?.seatsStatus || 'Admissions Open'}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-[1.14]">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                {course.description || course.shortDescription}
              </p>
            </div>

            {/* Telemetry Metric Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-border shadow-xs">
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-ink-faint block uppercase tracking-wider">
                  Duration
                </span>
                <strong className="text-sm sm:text-base font-bold text-ink flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue" />
                  {course.duration}
                </strong>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-ink-faint block uppercase tracking-wider">
                  Delivery Mode
                </span>
                <strong className="text-sm sm:text-base font-bold text-ink flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-blue" />
                  {course.mode.includes('Hybrid') ? 'Hybrid' : course.mode.split(' ')[0]}
                </strong>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-ink-faint block uppercase tracking-wider">
                  Curriculum
                </span>
                <strong className="text-sm sm:text-base font-bold text-ink flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue" />
                  {course.curriculum?.length || 4} Modules
                </strong>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-ink-faint block uppercase tracking-wider">
                  Mentorship
                </span>
                <strong className="text-sm sm:text-base font-bold text-sage-ink flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sage-ink" />
                  1 : 12 Max
                </strong>
              </div>
            </div>

            {/* Core Tech Pill Cloud */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft block">
                Primary Technologies & Tools Covered:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {course.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-paper-alt text-navy border border-border-warm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-navy-mist" />}
              >
                Enquire / Reserve Seat
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onDownloadSyllabus}
                leftIcon={<Download className="w-4 h-4 text-blue" />}
              >
                Download Syllabus (PDF)
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Image & Batch Card */}
          <div className="lg:col-span-5 space-y-4">
            <ImagePlaceholder
              src={course.heroImage}
              alt={course.title}
              aspectRatio="video"
              priority
              className="rounded-2xl border border-[#E0DACF] shadow-sm group"
              imgClassName="group-hover:scale-102 transition-transform duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  Kathmandu Campus & Live Online
                </span>
                <span className="bg-navy/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  {course.projects?.length || 3} Capstone Projects
                </span>
              </div>
            </ImagePlaceholder>

            {/* Upcoming Batch Schedule Card */}
            <div id="schedule" className="p-5 sm:p-6 rounded-2xl bg-white border border-border-warm space-y-4 shadow-sm scroll-mt-28">
              <div className="flex items-center justify-between border-b border-border-faint pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-navy/5 text-navy">
                    <Calendar className="w-4 h-4 text-blue" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                      Upcoming Cohort Details
                    </h3>
                    <p className="text-[11px] text-ink-soft">Next scheduled batch start</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-sage/10 text-sage-ink border border-sage/25">
                  {course.upcomingBatch.seatsStatus}
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-ink-soft">Start Date:</span>
                  <span className="font-bold text-ink text-right">
                    {course.upcomingBatch.startDate}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-ink-soft">Class Days:</span>
                  <span className="font-semibold text-ink text-right">
                    {course.upcomingBatch.classDays}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-ink-soft">Session Times:</span>
                  <span className="font-medium text-ink text-right">
                    {course.upcomingBatch.classTime}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-ink-soft">Location:</span>
                  <span className="font-medium text-ink text-right flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue shrink-0" />
                    <span>{course.upcomingBatch.location}</span>
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5 border-t border-border-faint">
                  <span className="text-ink-soft">Tuition & Fee Structure:</span>
                  <span className="font-bold text-navy text-right">
                    {course.fee}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenAdvisor}
                className="w-full py-2.5 rounded-xl bg-navy hover:bg-navy-deep text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                Inquire for Fee & Seat Availability
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
