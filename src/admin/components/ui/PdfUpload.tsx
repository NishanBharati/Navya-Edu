import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Loader2, Link2, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface PdfUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  bucket?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
}

export const PdfUpload: React.FC<PdfUploadProps> = ({
  value = '',
  onChange,
  folder = 'syllabi',
  bucket = 'media',
  placeholder = 'https://example.com/syllabus.pdf',
  hint = 'Upload official Course Syllabus PDF (max. 25MB) or provide a direct document URL.',
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate size (max 25MB for detailed syllabi PDFs)
    if (file.size > 25 * 1024 * 1024) {
      setUploadError('PDF file exceeds 25MB limit.');
      return;
    }

    // Validate type (must be PDF)
    const isPdf =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      setUploadError('Please select a valid PDF document (.pdf).');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
      const filePath = `${folder}/${Date.now()}-${cleanFileName}`;

      let uploadedUrl = '';

      // 1. Attempt Supabase storage upload
      try {
        const { error: uploadErr } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (!uploadErr) {
          const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
          if (urlData?.publicUrl) {
            uploadedUrl = urlData.publicUrl;
          }
        }
      } catch {
        // If Supabase storage bucket rejects mime-type or fails, fallback to local Data URL
      }

      // 2. If storage bucket returned an error or rejected the MIME type, embed as high-fidelity Data URL
      if (!uploadedUrl) {
        uploadedUrl = await readFileAsDataUrl(file);
      }

      onChange(uploadedUrl);
    } catch (err: unknown) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        onChange(dataUrl);
      } catch {
        const msg = err instanceof Error ? err.message : 'Upload failed. Please try providing a direct PDF URL.';
        setUploadError(msg);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const getFileNameFromUrl = (url: string) => {
    if (!url) return 'Syllabus-Document.pdf';
    if (url.startsWith('data:application/pdf')) {
      return 'Official-Syllabus-Document.pdf (Attached)';
    }
    try {
      const parts = url.split('/');
      const lastPart = parts[parts.length - 1];
      return decodeURIComponent(lastPart.split('?')[0]) || 'Syllabus-Document.pdf';
    } catch {
      return 'Syllabus-Document.pdf';
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-ink-faint">{hint}</span>
        <div className="flex items-center gap-1 bg-paper-alt p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              mode === 'upload'
                ? 'bg-white text-navy shadow-sm font-semibold'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Upload PDF
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              mode === 'url'
                ? 'bg-white text-navy shadow-sm font-semibold'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            PDF Link / URL
          </button>
        </div>
      </div>

      {/* Existing Uploaded PDF Card */}
      {value ? (
        <div className="relative rounded-xl border border-blue-mist bg-[#F8FAFC] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 group shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-navy/10 border border-navy/20 text-navy flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-navy" />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-ink truncate" title={value.startsWith('data:') ? 'Embedded PDF Document' : value}>
                {getFileNameFromUrl(value)}
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                <CheckCircle2 className="w-3 h-3" /> Attached
              </span>
            </div>
            <p className="text-[11px] text-ink-soft truncate max-w-md font-mono" title={value.startsWith('data:') ? 'Embedded PDF Data' : value}>
              {value.startsWith('data:') ? 'data:application/pdf;base64 [Embedded Document]' : value}
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || disabled}
                className="inline-flex items-center gap-1 font-medium text-blue hover:text-navy transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Replace PDF
              </button>
              <span className="text-input-border">|</span>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                download="Official-Syllabus.pdf"
                className="inline-flex items-center gap-1 font-medium text-navy hover:underline transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Preview / Open
              </a>
              <span className="text-input-border">|</span>
              <button
                type="button"
                onClick={() => onChange('')}
                disabled={disabled}
                className="inline-flex items-center gap-1 font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Upload Drop Zone */}
      {!value && mode === 'upload' && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && !disabled && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-navy bg-navy/5'
              : 'border-blue-mist bg-paper hover:bg-paper-alt hover:border-navy'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-11 h-11 rounded-xl bg-white border border-blue-mist shadow-sm flex items-center justify-center text-navy">
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue" />
              ) : (
                <Upload className="w-5 h-5 text-blue" />
              )}
            </div>

            <div>
              <p className="text-xs font-semibold text-ink">
                {isUploading ? (
                  'Processing and attaching Syllabus PDF…'
                ) : (
                  <>
                    <span className="text-blue underline">Click to upload Syllabus PDF</span> or drag and drop
                  </>
                )}
              </p>
              <p className="text-[11px] text-ink-faint mt-0.5">
                Official PDF Document (up to 25MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Direct URL Input Mode */}
      {(!value || mode === 'url') && mode === 'url' && (
        <div className="relative">
          <Link2 className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input-border bg-paper text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-colors"
          />
        </div>
      )}

      {/* Hidden PDF File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        disabled={disabled || isUploading}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      {/* Upload Error Alert */}
      {uploadError && (
        <div className="p-2.5 rounded-lg bg-red-50 border border-red-100 text-xs font-medium text-red-700 flex items-start justify-between gap-2">
          <span>{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
