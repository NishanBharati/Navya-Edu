import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  Check,
  Download,
  Terminal,
  CheckCircle2,
  MessageSquare,
  Search,
  FileText,
  ExternalLink,
  X,
  BookOpen
} from 'lucide-react';
import { Course, SubLesson } from '../../types';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface CourseCurriculumProps {
  course: Course;
  onDownloadSyllabus?: () => void;
  onOpenAdvisor?: () => void;
}

export const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  course,
  onDownloadSyllabus,
  onOpenAdvisor
}) => {
  // Open the first module by default
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullDocumentOpen, setIsFullDocumentOpen] = useState(false);

  // Track which sub-lessons are open inside each module (default: module 0, subLesson 0)
  const [openSubLessons, setOpenSubLessons] = useState<Record<string, boolean>>({
    '0-0': true
  });

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  const toggleSubLesson = (moduleIdx: number, subIdx: number) => {
    const key = `${moduleIdx}-${subIdx}`;
    setOpenSubLessons((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const hasModules = Boolean(course.curriculum && course.curriculum.length > 0);

  const expandAll = () => {
    setOpenModuleIndex(-1); // special flag for all open
    const allSubs: Record<string, boolean> = {};
    (course.curriculum || []).forEach((mod, mIdx) => {
      const count = mod.subLessons?.length || 1;
      for (let sIdx = 0; sIdx < count; sIdx++) {
        allSubs[`${mIdx}-${sIdx}`] = true;
      }
    });
    setOpenSubLessons(allSubs);
  };

  const collapseAll = () => {
    setOpenModuleIndex(null);
    setOpenSubLessons({});
  };

  // Filter modules based on search
  const filteredCurriculum = useMemo(() => {
    const list = course.curriculum || [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list.map((mod, idx) => ({ module: mod, originalIndex: idx, matches: true }));

    return list.map((mod, idx) => {
      const matchTitle = mod.title.toLowerCase().includes(q) || mod.moduleNumber?.toLowerCase().includes(q);
      const matchTopics = mod.topics?.some((t) => t.toLowerCase().includes(q));
      const matchSub = mod.subLessons?.some((s) =>
        s.title.toLowerCase().includes(q) || s.topics?.some((st) => st.toLowerCase().includes(q))
      );
      const matchLab = mod.practicalExercise?.toLowerCase().includes(q);
      const matchOutcome = mod.expectedOutcome?.toLowerCase().includes(q);

      const isMatch = matchTitle || matchTopics || matchSub || matchLab || matchOutcome;
      return { module: mod, originalIndex: idx, matches: isMatch };
    });
  }, [course.curriculum, searchQuery]);

  // Fallback "Why [Course]?" value points
  const defaultWhyPoints = [
    {
      headline: 'Modern Industry Standards:',
      detail: `Learn practical technologies and engineering patterns widely demanded by technology firms in Nepal and international markets.`
    },
    {
      headline: 'Hands-On, Project-Based Training:',
      detail: `Gain practical keyboard muscle memory through daily laboratory coding sessions, Git version control, and verifiable project portfolios.`
    },
    {
      headline: 'Line-by-Line Code Critiques:',
      detail: `Receive personalized feedback on every project deliverable from active software engineers and instructors at Navya EdTech.`
    },
    {
      headline: 'Small Cohort Mentorship:',
      detail: `Learn in an intensive small-batch environment ensuring personalized attention, direct doubt resolution, and collaborative code reviews.`
    }
  ];

  const whyTitle = course.whyChooseThis?.title || `Why ${course.title}?`;
  const whyPoints = course.whyChooseThis?.points && course.whyChooseThis.points.length > 0
    ? course.whyChooseThis.points
    : defaultWhyPoints;

  return (
    <section id="curriculum" className="py-12 sm:py-16 bg-paper border-b border-border scroll-mt-24">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue">
                Curriculum & Practical Syllabus
              </span>
              {course.syllabusPdfUrl && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-navy/10 text-navy border border-navy/20">
                  <FileText className="w-3 h-3 text-blue" /> Official PDF Available
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
              Course Syllabus & Topics
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft max-w-2xl">
              Inspect the module breakdown, lesson topics, practical exercises, and expected competency milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFullDocumentOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-paper-alt text-navy text-xs font-semibold border border-blue-mist shadow-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue" />
              <span>Read Full Syllabus</span>
            </button>

            {onDownloadSyllabus && (
              <Button
                variant="primary"
                size="sm"
                onClick={onDownloadSyllabus}
                leftIcon={<Download className="w-4 h-4 text-[#93C5FD]" />}
              >
                Download Syllabus (PDF)
              </Button>
            )}
          </div>
        </div>

        {/* Syllabus Search & Quick Control Bar (if modules uploaded) or Status Strip */}
        {hasModules ? (
          <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-blue-mist shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search syllabus topics..."
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm text-ink placeholder:text-ink-faint bg-paper border border-transparent focus:border-navy focus:bg-white focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-ink-faint hover:text-ink p-1 cursor-pointer"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-medium shrink-0">
              <span className="text-ink-faint hidden md:inline">
                {(course.curriculum || []).length} Modules Total
              </span>
              <span className="text-input-border hidden md:inline">|</span>
              <button
                type="button"
                onClick={expandAll}
                className="px-2.5 py-1.5 rounded-lg text-blue hover:bg-[#F0F5FA] transition-colors cursor-pointer font-semibold"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-2.5 py-1.5 rounded-lg text-ink-soft hover:bg-paper-alt transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:px-5 rounded-2xl bg-white border border-blue-mist shadow-xs text-xs">
            <div className="flex items-center gap-2 text-ink">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-navy">Official {course.duration} Syllabus Specification</span>
              <span className="text-ink-faint hidden sm:inline">•</span>
              <span className="text-ink-soft hidden sm:inline">Module schedule & lecture plan verified by Navya Ed Tech</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {course.syllabusPdfUrl && (
                <span className="text-xs font-bold text-blue flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> PDF Attached
                </span>
              )}
            </div>
          </div>
        )}

        {/* 2-Column Layout: Left (Syllabus Content) & Right (Sidebar Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Main Curriculum Accordion OR Comprehensive Syllabus Overview */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8">
            {hasModules ? (
              <div className="border border-blue-mist rounded-2xl bg-white overflow-hidden shadow-xs divide-y divide-blue-mist">
                {filteredCurriculum.map(({ module, originalIndex, matches }, modIdx) => {
                  if (!matches) return null;

                  const isModuleOpen = openModuleIndex === -1 || openModuleIndex === originalIndex || (searchQuery.trim() !== '' && matches);

                  // Check if subLessons exist, or format topics into structured subLessons
                  const subLessonsList: SubLesson[] =
                    module.subLessons && module.subLessons.length > 0
                      ? module.subLessons
                      : [
                          {
                            subNumber: `${originalIndex + 1}.1`,
                            title: `Core Architectural Concepts & Syntax`,
                            topics: module.topics
                          }
                        ];

                  return (
                    <div key={modIdx} className="transition-colors">
                      {/* Primary Lesson Header */}
                      <button
                        type="button"
                        onClick={() => toggleModule(originalIndex)}
                        className={`w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer focus:outline-none ${
                          isModuleOpen
                            ? 'bg-[#F0F5FA] text-navy'
                            : 'bg-white hover:bg-[#F8FAFC] text-ink'
                        }`}
                        aria-expanded={isModuleOpen}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="px-2.5 py-1 rounded-md bg-navy/10 text-navy font-mono text-xs font-bold shrink-0">
                            {module.moduleNumber || `M${String(originalIndex + 1).padStart(2, '0')}`}
                          </span>
                          <span className="text-sm sm:text-base font-bold tracking-tight leading-snug truncate">
                            {module.title}
                          </span>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                          {module.duration && (
                            <span className="text-xs text-ink-soft font-medium hidden sm:inline">
                              {module.duration}
                            </span>
                          )}
                          <div className="p-1 rounded-md text-ink-soft">
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isModuleOpen ? 'rotate-180 text-navy' : ''
                              }`}
                            />
                          </div>
                        </div>
                      </button>

                      {/* Lesson Body: Sub-lessons tree */}
                      {isModuleOpen && (
                        <div className="p-5 sm:p-6 bg-white space-y-4 animate-fade-in">
                          <div className="space-y-3">
                            {subLessonsList.map((sub, subIdx) => {
                              const subKey = `${originalIndex}-${subIdx}`;
                              const isSubOpen = openModuleIndex === -1 || (openSubLessons[subKey] ?? (subIdx === 0)) || searchQuery.trim() !== '';

                              return (
                                <div key={subIdx} className="space-y-2">
                                  {/* Sub-lesson header button */}
                                  <button
                                    type="button"
                                    onClick={() => toggleSubLesson(originalIndex, subIdx)}
                                    className="w-full flex items-start sm:items-center gap-2 text-left text-xs sm:text-sm font-bold text-navy hover:text-blue transition-colors cursor-pointer py-1"
                                  >
                                    <span className="font-mono text-blue shrink-0 font-bold">
                                      {isSubOpen ? '−' : '+'}
                                    </span>
                                    <span>
                                      {sub.subNumber ? `${sub.subNumber} ` : ''}
                                      {sub.title}
                                    </span>
                                  </button>

                                  {/* Sub-lesson bullet points */}
                                  {isSubOpen && sub.topics && sub.topics.length > 0 && (
                                    <ul className="pl-6 sm:pl-7 space-y-2 text-xs sm:text-[13px] text-[#4A5568] animate-fade-in">
                                      {sub.topics.map((t, tIdx) => (
                                        <li key={tIdx} className="flex items-start gap-2.5">
                                          <span className="text-ink font-bold shrink-0 mt-0.5">•</span>
                                          <span className="leading-relaxed">{t}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Practical Exercise & Target Competency */}
                          {(module.practicalExercise || module.expectedOutcome) && (
                            <div className="mt-5 pt-4 border-t border-[#EAEFF5] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {module.practicalExercise && (
                                <div className="p-3.5 rounded-xl bg-[#F0F5FA] border border-[#D9E6F2] space-y-1">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-navy">
                                    <Terminal className="w-3.5 h-3.5 text-blue" />
                                    <span>Lab Deliverable</span>
                                  </div>
                                  <p className="text-xs text-[#4A5568] leading-relaxed">
                                    {module.practicalExercise}
                                  </p>
                                </div>
                              )}

                              {module.expectedOutcome && (
                                <div className="p-3.5 rounded-xl bg-sage/10 border border-sage/25 space-y-1">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-sage-ink">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-ink" />
                                    <span>Target Competency</span>
                                  </div>
                                  <p className="text-xs text-sage-ink leading-relaxed">
                                    {module.expectedOutcome}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Fallback when curriculum modules are being uploaded via admin */
              <div className="space-y-6">
                {/* Official Syllabus Document Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy via-[#162D4A] to-navy text-white shadow-md relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#A8C6E5] uppercase tracking-wider">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Curriculum Specification • {course.duration}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                      Structured Course Syllabus & Topic Plan
                    </h3>
                    <p className="text-xs sm:text-sm text-mist leading-relaxed max-w-xl">
                      The comprehensive lecture plan, practical exercises, and lab schedules for {course.title} are available through our admissions desk and direct PDF download.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {onDownloadSyllabus && (
                        <Button
                          variant="secondary"
                          size="md"
                          onClick={onDownloadSyllabus}
                          leftIcon={<Download className="w-4 h-4" />}
                        >
                          Download Syllabus (PDF)
                        </Button>
                      )}
                      {onOpenAdvisor && (
                        <Button
                          variant="outline"
                          size="md"
                          onClick={onOpenAdvisor}
                          className="!border-white/30 !text-white hover:!bg-white/10"
                          leftIcon={<MessageSquare className="w-4 h-4" />}
                        >
                          Request Detailed Roadmap
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Core Learning Tracks / Modules Overview */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-mist shadow-xs space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue" />
                      <span>Core Competencies & Learning Pillars</span>
                    </h4>
                    <p className="text-xs text-ink-soft">
                      Key foundational and project milestones covered over the {course.duration} instructional period.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card 1: Technologies & Frameworks */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-paper border border-border space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-navy/10 text-navy font-bold text-xs flex items-center justify-center font-mono">01</span>
                        <h5 className="text-sm font-bold text-ink">Core Toolchain & Environment</h5>
                      </div>
                      <p className="text-xs text-ink-soft leading-relaxed">
                        Hands-on command of the primary tools, libraries, and workflows required for modern development.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {course.technologies.slice(0, 6).map((tech, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white text-navy border border-input-border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card 2: Guided Project Development */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-paper border border-border space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-navy/10 text-navy font-bold text-xs flex items-center justify-center font-mono">02</span>
                        <h5 className="text-sm font-bold text-ink">Practical Capstone Execution</h5>
                      </div>
                      <p className="text-xs text-ink-soft leading-relaxed">
                        Directly apply conceptual knowledge into real-world code deliverables reviewed by engineering mentors.
                      </p>
                      <ul className="space-y-1.5 text-xs text-ink-soft">
                        {course.projects.map((proj, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-blue shrink-0 mt-0.5" />
                            <span className="font-medium text-ink truncate">{proj.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card 3: Measured Outcomes */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-paper border border-border space-y-3 sm:col-span-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-navy/10 text-navy font-bold text-xs flex items-center justify-center font-mono">03</span>
                        <h5 className="text-sm font-bold text-ink">Verified Competency Outcomes</h5>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {course.outcomes.map((outcome, oIdx) => (
                          <div key={oIdx} className="flex items-start gap-2 text-xs text-ink-soft">
                            <CheckCircle2 className="w-4 h-4 text-sage-ink shrink-0 mt-0.5" />
                            <span className="leading-snug">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: "Why [Course Name]?" Value Proposition Card */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs sticky top-28">
              <h3 className="text-base font-extrabold text-ink tracking-tight">
                {whyTitle}
              </h3>

              <div className="space-y-3.5">
                {whyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                    <Check className="w-4 h-4 text-blue shrink-0 mt-0.5 font-bold" />
                    <div>
                      <strong className="font-bold text-ink">
                        {point.headline}{' '}
                      </strong>
                      <span className="text-ink-soft">
                        {point.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {onOpenAdvisor && (
                <div className="pt-2 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={onOpenAdvisor}
                    className="w-full py-2.5 rounded-xl bg-navy hover:bg-navy-deep text-white text-xs font-bold transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Talk to an Academic Advisor</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* ========================================================================= */}
      {/* INTERACTIVE FULL SYLLABUS DOCUMENT MODAL VIEWER */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isFullDocumentOpen}
        onClose={() => setIsFullDocumentOpen(false)}
        maxWidthClass="max-w-4xl"
        contentClassName="max-h-[90vh] flex flex-col"
        labelledBy="full-syllabus-title"
      >
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-border bg-paper flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center shadow-xs">
                  <FileText className="w-5 h-5 text-[#93C5FD]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="full-syllabus-title" className="text-base font-bold text-ink">
                      {course.title} — Official Curriculum
                    </h3>
                    {course.syllabusPdfUrl && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Official PDF
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-soft">
                    {course.duration} • {course.level} • {course.mode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {course.syllabusPdfUrl && (
                  <a
                    href={course.syllabusPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-blue-mist text-navy hover:bg-paper-alt transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Tab</span>
                  </a>
                )}

                {onDownloadSyllabus && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onDownloadSyllabus}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download PDF
                  </Button>
                )}

                <button
                  type="button"
                  onClick={() => setIsFullDocumentOpen(false)}
                  className="p-2 rounded-lg text-ink-soft hover:text-ink hover:bg-paper-alt transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-navy"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Complete Curriculum Document Reader */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Document Header Banner */}
              <div className="p-6 rounded-2xl bg-navy text-white space-y-3">
                <div className="flex items-center justify-between text-xs text-navy-mist">
                  <span>NAVYA ED TECH • ACADEMIC CURRICULUM SPECIFICATION</span>
                  <span>Kathmandu Innovation Lab</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {course.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {course.description || course.shortDescription}
                </p>
                {course.technologies && course.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-navy-mist font-semibold">Core Stack:</span>
                    {course.technologies.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/10 text-white text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Module-by-Module Complete Reading View */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-navy border-b border-border pb-2">
                  {hasModules
                    ? `Comprehensive Module Breakdown (${(course.curriculum || []).length} Modules)`
                    : `Syllabus Overview & Practical Framework (${course.duration})`}
                </h4>

                {hasModules ? (
                  <div className="space-y-5">
                    {(course.curriculum || []).map((mod, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-paper border border-border space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-1 rounded-lg bg-navy text-white font-mono text-xs font-bold">
                              {mod.moduleNumber || `Module ${idx + 1}`}
                            </span>
                            <h5 className="text-base font-bold text-ink">
                              {mod.title}
                            </h5>
                          </div>
                          {mod.duration && (
                            <span className="text-xs font-mono text-ink-soft shrink-0">
                              {mod.duration}
                            </span>
                          )}
                        </div>

                        {/* Topics */}
                        {mod.topics && mod.topics.length > 0 && (
                          <div className="space-y-1.5 pl-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft block">
                              Topics Covered:
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A5568]">
                              {mod.topics.map((top, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2">
                                  <span className="text-blue font-bold shrink-0">•</span>
                                  <span>{top}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Practical Lab & Competency */}
                        {(mod.practicalExercise || mod.expectedOutcome) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {mod.practicalExercise && (
                              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] space-y-1 text-xs">
                                <span className="font-bold text-navy block">Lab Deliverable:</span>
                                <p className="text-ink-soft">{mod.practicalExercise}</p>
                              </div>
                            )}
                            {mod.expectedOutcome && (
                              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] space-y-1 text-xs">
                                <span className="font-bold text-sage-ink block">Expected Outcome:</span>
                                <p className="text-ink-soft">{mod.expectedOutcome}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 sm:p-6 rounded-2xl bg-paper border border-border space-y-4">
                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                      The day-by-day lecture plan and lab exercises for <strong className="text-ink">{course.title}</strong> ({course.duration}) are structured around practical industry milestones. You can download the verified syllabus PDF prospectus or consult with our course counselor for batch scheduling and lab facilities.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {onDownloadSyllabus && (
                        <Button variant="primary" size="sm" onClick={onDownloadSyllabus} leftIcon={<Download className="w-4 h-4" />}>
                          Download Official Syllabus (PDF)
                        </Button>
                      )}
                      {onOpenAdvisor && (
                        <Button variant="outline" size="sm" onClick={onOpenAdvisor} leftIcon={<MessageSquare className="w-4 h-4" />}>
                          Consult Academic Advisor
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Capstone Projects Section if available */}
              {course.projects && course.projects.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-navy border-b border-border pb-2">
                    Production Capstone Deliverables ({course.projects.length} Projects)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="p-4 rounded-xl bg-paper border border-border space-y-2">
                        <h6 className="text-xs sm:text-sm font-bold text-ink">{proj.title}</h6>
                        <p className="text-xs text-ink-soft leading-relaxed">{proj.description}</p>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {proj.technologies.map((tech, tIdx) => (
                              <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-input-border text-navy">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Institutional Footer Signoff */}
              <div className="p-5 rounded-2xl bg-[#F0F5FA] border border-[#D9E6F2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="space-y-0.5 text-center sm:text-left">
                  <p className="font-bold text-navy">Navya Ed Tech Pvt. Ltd. • Kathmandu Innovation Lab</p>
                  <p className="text-ink-soft">Inquiries: info@navyaedtech.com • https://navyaedtech.com</p>
                </div>
                {onDownloadSyllabus && (
                  <Button variant="primary" size="sm" onClick={onDownloadSyllabus}>
                    Download Verified PDF
                  </Button>
                )}
              </div>
            </div>
      </Modal>
    </section>
  );
};
