import { Course } from '../types';

/**
 * Escapes characters for PDF literal strings.
 */
function escapePdfText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Splits text into lines that fit within a maximum character width.
 */
function wrapText(text: string, maxChars: number): string[] {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxChars) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      if (word.length > maxChars) {
        let remaining = word;
        while (remaining.length > maxChars) {
          lines.push(remaining.substring(0, maxChars));
          remaining = remaining.substring(maxChars);
        }
        currentLine = remaining;
      } else {
        currentLine = word;
      }
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

interface PdfPageContent {
  commands: string[];
}

/**
 * Generates an official, publication-ready PDF binary for a Course syllabus.
 */
function generateCourseSyllabusPdf(course: Course): Blob {
  const pageWidth = 595.28; // Standard A4 width in pt
  const pageHeight = 841.89; // Standard A4 height in pt
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  const pages: PdfPageContent[] = [];
  let currentPage: PdfPageContent = { commands: [] };
  let currentY = pageHeight - margin;

  const startNewPage = () => {
    if (currentPage.commands.length > 0) {
      pages.push(currentPage);
    }
    currentPage = { commands: [] };
    currentY = pageHeight - margin;
    drawPageHeader();
  };

  const ensureSpace = (neededHeight: number) => {
    if (currentY - neededHeight < margin + 40) {
      startNewPage();
    }
  };

  const drawPageHeader = () => {
    // Top Brand Accent Bar (Navy #17324D)
    currentPage.commands.push(`
0.09 0.20 0.30 rg
${margin} ${pageHeight - 28} ${contentWidth} 3 re f
0.09 0.20 0.30 rg
BT
/F1 9 Tf
${margin} ${pageHeight - 22} Td
(NAVYA ED TECH  |  OFFICIAL CURRICULUM SPECIFICATION) Tj
ET

0.45 0.50 0.55 rg
BT
/F2 8 Tf
${pageWidth - margin - 150} ${pageHeight - 22} Td
(Kathmandu Innovation Lab) Tj
ET
`);
    currentY = pageHeight - 50;
  };

  // 1. Initial Page Header
  drawPageHeader();

  // 2. Course Title Banner
  currentPage.commands.push(`
0.09 0.20 0.30 rg
${margin} ${currentY - 60} ${contentWidth} 60 re f

1 1 1 rg
BT
/F1 18 Tf
${margin + 16} ${currentY - 26} Td
(${escapePdfText(course.title)}) Tj
ET

0.80 0.88 0.95 rg
BT
/F2 9 Tf
${margin + 16} ${currentY - 44} Td
(Category: ${escapePdfText(course.category)}   |   Duration: ${escapePdfText(course.duration)}   |   Level: ${escapePdfText(course.level)}   |   Mode: ${escapePdfText(course.mode)}) Tj
ET
`);
  currentY -= 75;

  // 3. Telemetry / Metadata Grid
  ensureSpace(45);
  currentPage.commands.push(`
0.96 0.95 0.93 rg
${margin} ${currentY - 36} ${contentWidth} 36 re f
0.88 0.85 0.80 RG
0.75 w
${margin} ${currentY - 36} ${contentWidth} 36 re S

0.09 0.20 0.30 rg
BT
/F1 8.5 Tf
${margin + 12} ${currentY - 14} Td
(Upcoming Cohort Start:) Tj
ET
0.25 0.27 0.30 rg
BT
/F2 8.5 Tf
${margin + 115} ${currentY - 14} Td
(${escapePdfText(course.upcomingBatch?.startDate || 'Rolling Admissions')} | ${escapePdfText(course.upcomingBatch?.classDays || 'Mon-Fri')} ${escapePdfText(course.upcomingBatch?.classTime || '')}) Tj
ET

0.09 0.20 0.30 rg
BT
/F1 8.5 Tf
${margin + 12} ${currentY - 28} Td
(Academic Location:) Tj
ET
0.25 0.27 0.30 rg
BT
/F2 8.5 Tf
${margin + 115} ${currentY - 28} Td
(${escapePdfText(course.upcomingBatch?.location || 'Kathmandu Innovation Lab, Nepal')}) Tj
ET
`);
  currentY -= 48;

  // 4. Executive Summary Section
  ensureSpace(60);
  currentPage.commands.push(`
0.09 0.20 0.30 rg
BT
/F1 12 Tf
${margin} ${currentY} Td
(1. Executive Course Overview) Tj
ET
0.09 0.20 0.30 rg
${margin} ${currentY - 4} ${contentWidth} 1 re f
`);
  currentY -= 16;

  const descLines = wrapText(course.description || course.shortDescription, 92);
  for (const line of descLines) {
    ensureSpace(14);
    currentPage.commands.push(`
0.25 0.27 0.30 rg
BT
/F2 9.5 Tf
${margin} ${currentY} Td
(${escapePdfText(line)}) Tj
ET
`);
    currentY -= 13;
  }
  currentY -= 10;

  // 5. Technologies & Stack Matrix
  if (course.technologies && course.technologies.length > 0) {
    ensureSpace(35);
    currentPage.commands.push(`
0.09 0.20 0.30 rg
BT
/F1 10 Tf
${margin} ${currentY} Td
(Core Technologies & Toolchain:) Tj
ET
`);
    currentY -= 14;

    const techString = course.technologies.join('  •  ');
    const techLines = wrapText(techString, 88);
    for (const tLine of techLines) {
      ensureSpace(14);
      currentPage.commands.push(`
0.21 0.42 0.60 rg
BT
/F1 9 Tf
${margin + 8} ${currentY} Td
(${escapePdfText(tLine)}) Tj
ET
`);
      currentY -= 13;
    }
    currentY -= 8;
  }

  // 6. Comprehensive Curriculum Modules
  if (course.curriculum && course.curriculum.length > 0) {
    ensureSpace(40);
    currentPage.commands.push(`
0.09 0.20 0.30 rg
BT
/F1 12 Tf
${margin} ${currentY} Td
(2. Module-by-Module Curriculum Breakdown) Tj
ET
0.09 0.20 0.30 rg
${margin} ${currentY - 4} ${contentWidth} 1 re f
`);
    currentY -= 20;

    course.curriculum.forEach((mod) => {
      const topicCount = mod.topics ? mod.topics.length : 0;
      const estimatedHeight = 35 + topicCount * 14 + (mod.practicalExercise ? 24 : 0);
      ensureSpace(Math.min(estimatedHeight, 140));

      // Module Header Box
      currentPage.commands.push(`
0.93 0.95 0.97 rg
${margin} ${currentY - 20} ${contentWidth} 20 re f
0.09 0.20 0.30 rg
BT
/F1 10 Tf
${margin + 8} ${currentY - 14} Td
(${escapePdfText(mod.moduleNumber || 'Module')}: ${escapePdfText(mod.title)}) Tj
ET
`);
      if (mod.duration) {
        currentPage.commands.push(`
0.45 0.50 0.55 rg
BT
/F2 8.5 Tf
${pageWidth - margin - 80} ${currentY - 14} Td
(${escapePdfText(mod.duration)}) Tj
ET
`);
      }
      currentY -= 28;

      // Module Topics
      if (mod.topics && mod.topics.length > 0) {
        for (const topic of mod.topics) {
          const tLines = wrapText(`•  ${topic}`, 86);
          for (const line of tLines) {
            ensureSpace(13);
            currentPage.commands.push(`
0.25 0.27 0.30 rg
BT
/F2 8.5 Tf
${margin + 12} ${currentY} Td
(${escapePdfText(line)}) Tj
ET
`);
            currentY -= 12;
          }
        }
      }

      // Practical Exercise / Lab specification
      if (mod.practicalExercise) {
        ensureSpace(16);
        const labLines = wrapText(`Lab: ${mod.practicalExercise}`, 86);
        for (const line of labLines) {
          ensureSpace(13);
          currentPage.commands.push(`
0.44 0.55 0.48 rg
BT
/F1 8 Tf
${margin + 12} ${currentY} Td
(${escapePdfText(line)}) Tj
ET
`);
          currentY -= 11;
        }
      }
      currentY -= 6;
    });
  }

  // 7. Capstone Projects Section
  if (course.projects && course.projects.length > 0) {
    ensureSpace(50);
    currentPage.commands.push(`
0.09 0.20 0.30 rg
BT
/F1 12 Tf
${margin} ${currentY} Td
(3. Production-Grade Capstone Deliverables) Tj
ET
0.09 0.20 0.30 rg
${margin} ${currentY - 4} ${contentWidth} 1 re f
`);
    currentY -= 18;

    course.projects.forEach((proj) => {
      ensureSpace(40);
      currentPage.commands.push(`
0.09 0.20 0.30 rg
BT
/F1 9.5 Tf
${margin + 4} ${currentY} Td
(${escapePdfText(proj.title)}) Tj
ET
`);
      if (proj.technologies && proj.technologies.length > 0) {
        currentPage.commands.push(`
0.45 0.50 0.55 rg
BT
/F2 8 Tf
${margin + 200} ${currentY} Td
(Stack: ${escapePdfText(proj.technologies.join(', '))}) Tj
ET
`);
      }
      currentY -= 13;

      const pLines = wrapText(proj.description, 88);
      for (const line of pLines) {
        ensureSpace(12);
        currentPage.commands.push(`
0.35 0.38 0.42 rg
BT
/F2 8.5 Tf
${margin + 12} ${currentY} Td
(${escapePdfText(line)}) Tj
ET
`);
        currentY -= 11;
      }
      currentY -= 6;
    });
  }

  // 8. Learning Outcomes & Career Roles
  if ((course.outcomes && course.outcomes.length > 0) || (course.careerPaths && course.careerPaths.length > 0)) {
    ensureSpace(60);
    currentPage.commands.push(`
0.09 0.20 0.30 rg
BT
/F1 12 Tf
${margin} ${currentY} Td
(4. Competency Outcomes & Target Industry Roles) Tj
ET
0.09 0.20 0.30 rg
${margin} ${currentY - 4} ${contentWidth} 1 re f
`);
    currentY -= 18;

    if (course.outcomes && course.outcomes.length > 0) {
      for (const outcome of course.outcomes) {
        const oLines = wrapText(`✓  ${outcome}`, 86);
        for (const line of oLines) {
          ensureSpace(13);
          currentPage.commands.push(`
0.25 0.27 0.30 rg
BT
/F2 8.5 Tf
${margin + 6} ${currentY} Td
(${escapePdfText(line)}) Tj
ET
`);
          currentY -= 12;
        }
      }
      currentY -= 6;
    }

    if (course.careerPaths && course.careerPaths.length > 0) {
      ensureSpace(20);
      currentPage.commands.push(`
0.09 0.20 0.30 rg
BT
/F1 9 Tf
${margin + 6} ${currentY} Td
(Qualifying Roles: ${escapePdfText(course.careerPaths.join('  •  '))}) Tj
ET
`);
      currentY -= 16;
    }
  }

  // 9. Official Institutional Signoff & Verification Box
  ensureSpace(70);
  currentPage.commands.push(`
0.96 0.97 0.98 rg
${margin} ${currentY - 55} ${contentWidth} 55 re f
0.09 0.20 0.30 RG
0.8 w
${margin} ${currentY - 55} ${contentWidth} 55 re S

0.09 0.20 0.30 rg
BT
/F1 9 Tf
${margin + 12} ${currentY - 14} Td
(NAVYA ED TECH - KATHMANDU CAMPUS ADMISSIONS & COUNSELING) Tj
ET

0.30 0.33 0.36 rg
BT
/F2 8 Tf
${margin + 12} ${currentY - 26} Td
(Inquiries & Lab Tours: info@navyaedtech.com   |   Official Portal: https://navyaedtech.com) Tj
ET

0.45 0.50 0.55 rg
BT
/F2 7.5 Tf
${margin + 12} ${currentY - 38} Td
(Curriculum validated against Nepal enterprise IT standards & remote engineering hiring rubrics.) Tj
ET

0.44 0.55 0.48 rg
BT
/F1 8 Tf
${pageWidth - margin - 120} ${currentY - 20} Td
([VERIFIED SYLLABUS]) Tj
ET
`);
  currentY -= 65;

  // Push the final page
  pages.push(currentPage);

  // 10. Add Page Footers with Page Numbers to All Pages
  const totalPages = pages.length;
  pages.forEach((page, idx) => {
    page.commands.push(`
0.75 0.78 0.82 RG
0.5 w
${margin} 30 ${contentWidth} 0.5 re f

0.50 0.55 0.60 rg
BT
/F2 7.5 Tf
${margin} 20 Td
(Navya Ed Tech Pvt. Ltd. • Kathmandu, Nepal • Licensed & Professional IT Education) Tj
ET

BT
/F1 7.5 Tf
${pageWidth - margin - 60} 20 Td
(Page ${idx + 1} of ${totalPages}) Tj
ET
`);
  });

  // 11. Assemble PDF Document Objects
  const totalObjects = 5 + pages.length * 2;
  const objects: string[] = [];

  // Object 1: Catalog
  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;

  // Object 2: Pages
  const kids = pages.map((_, i) => `${6 + i * 2} 0 R`).join(' ');
  objects[2] = `<< /Type /Pages /Kids [${kids}] /Count ${totalPages} >>`;

  // Object 3: Font Helvetica Bold
  objects[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;

  // Object 4: Font Helvetica Regular
  objects[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

  // Object 5: Font Courier
  objects[5] = `<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>`;

  // Generate Page and Stream objects
  pages.forEach((page, i) => {
    const pageObjNum = 6 + i * 2;
    const streamObjNum = 7 + i * 2;

    const streamContent = page.commands.join('\n');
    const streamLength = new TextEncoder().encode(streamContent).length;

    objects[pageObjNum] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${streamObjNum} 0 R >>`;
    objects[streamObjNum] = `<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`;
  });

  // Build the complete PDF string with xref table
  let pdfOutput = `%PDF-1.4\n`;
  const xrefOffsets: number[] = [];

  for (let i = 1; i <= totalObjects; i++) {
    xrefOffsets[i] = new TextEncoder().encode(pdfOutput).length;
    pdfOutput += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const startXref = new TextEncoder().encode(pdfOutput).length;
  pdfOutput += `xref\n0 ${totalObjects + 1}\n0000000000 65535 f \n`;

  for (let i = 1; i <= totalObjects; i++) {
    const offsetStr = String(xrefOffsets[i]).padStart(10, '0');
    pdfOutput += `${offsetStr} 00000 n \n`;
  }

  pdfOutput += `trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;

  return new Blob([pdfOutput], { type: 'application/pdf' });
}

/**
 * Initiates an immediate browser download of the course syllabus PDF.
 * If a custom syllabusPdfUrl is uploaded by admin, it downloads that file;
 * otherwise it generates the verified client-side vector PDF document.
 */
export async function downloadCourseSyllabus(course: Course): Promise<void> {
  const sanitizedTitle = course.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `Navya-Edu_${sanitizedTitle}_Syllabus.pdf`;

  // 1. If admin provided a custom uploaded PDF URL
  if (course.syllabusPdfUrl && course.syllabusPdfUrl.trim()) {
    try {
      const response = await fetch(course.syllabusPdfUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        return;
      }
    } catch {
      // If direct fetch is restricted, fallback to direct anchor click
      const link = document.createElement('a');
      link.href = course.syllabusPdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  }

  // 2. Automated High-Resolution Verified PDF Generation
  try {
    const blob = generateCourseSyllabusPdf(course);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error('Failed to generate direct syllabus PDF:', error);
  }
}
