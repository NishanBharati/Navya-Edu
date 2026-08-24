import React from 'react';
import { Clock, BarChart2, Laptop, Calendar, MessageSquare, Download, MapPin } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

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
    <section className="pt-8 pb-14 sm:pb-18 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        {/* Breadcrumb / Top Category */}
        <div className="flex items-center gap-2 text-xs text-[#5F6670] mb-4">
          <a href="/courses" className="hover:text-[#17324D] underline">
            Courses
          </a>
          <span>/</span>
          <span className="text-[#17324D] font-medium">{course.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="navy" size="md">
                {course.category}
              </Badge>
              <Badge variant="default" size="md">
                {course.level}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171A1F] leading-[1.15]">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg text-[#5F6670] leading-relaxed">
              {course.description}
            </p>

            {/* Key Metadata Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#F4F1EA] border border-[#E5DFD4]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#5F6670]">
                  <Clock className="w-3.5 h-3.5 text-[#356A9A]" />
                  <span>Duration</span>
                </div>
                <div className="text-sm font-bold text-[#171A1F]">
                  {course.duration}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#5F6670]">
                  <Laptop className="w-3.5 h-3.5 text-[#356A9A]" />
                  <span>Format</span>
                </div>
                <div className="text-sm font-bold text-[#171A1F]">
                  {course.mode}
                </div>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-[#5F6670]">
                  <BarChart2 className="w-3.5 h-3.5 text-[#356A9A]" />
                  <span>Target Level</span>
                </div>
                <div className="text-sm font-bold text-[#171A1F]">
                  {course.level}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-[#9BBAD4]" />}
              >
                Enquire About This Course
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onDownloadSyllabus}
                leftIcon={<Download className="w-4 h-4 text-[#356A9A]" />}
              >
                Download Course Outline
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Image & Batch Info Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-[#E0DACF] shadow-sm aspect-[16/10] bg-[#F4F1EA]">
              <img
                src={course.heroImage}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Upcoming Batch Card */}
            <div className="p-5 rounded-xl bg-white border border-[#E5DFD4] space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#17324D] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#356A9A]" />
                  <span>Upcoming Batch Details</span>
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#718C7A]/20 text-[#3D5644]">
                  {course.upcomingBatch.seatsStatus}
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-start justify-between">
                  <span className="text-[#5F6670]">Schedule:</span>
                  <span className="font-semibold text-[#171A1F] text-right">
                    {course.upcomingBatch.classDays}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#5F6670]">Session Times:</span>
                  <span className="font-medium text-[#171A1F] text-right">
                    {course.upcomingBatch.classTime}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#5F6670]">Location:</span>
                  <span className="font-medium text-[#171A1F] text-right">
                    {course.upcomingBatch.location}
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2 border-t border-[#F0ECE1]">
                  <span className="text-[#5F6670]">Tuition & Batch Fee:</span>
                  <span className="font-bold text-[#17324D] text-right">
                    {course.fee}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
