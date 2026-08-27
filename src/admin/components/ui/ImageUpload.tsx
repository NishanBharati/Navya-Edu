import React, { useRef, useState } from 'react';
import { Upload, X, Loader2, Link2, ExternalLink, RefreshCw } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  bucket?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value = '',
  onChange,
  folder = 'general',
  bucket = 'media',
  placeholder = 'https://…',
  hint = 'Supports PNG, JPG, WEBP, GIF, SVG up to 5MB.',
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File exceeds 5MB maximum limit.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP, GIF, or SVG).');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Create clean, unique file path: folder/timestamp-cleaned-name
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
      const filePath = `${folder}/${Date.now()}-${cleanFileName}`;

      const { error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadErr) {
        throw new Error(uploadErr.message);
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to retrieve public URL for the uploaded file.');
      }

      onChange(urlData.publicUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed. Check Supabase Storage permissions.';
      setUploadError(msg);
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

  return (
    <div className="space-y-2">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-ink-faint">{hint}</span>
        <div className="flex items-center gap-1 bg-paper-alt p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md font-medium transition-colors ${
              mode === 'upload'
                ? 'bg-white text-navy shadow-sm font-semibold'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md font-medium transition-colors ${
              mode === 'url'
                ? 'bg-white text-navy shadow-sm font-semibold'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {/* Existing Image Preview Card */}
      {value ? (
        <div className="relative rounded-xl border border-input-border bg-paper p-3 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 group">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-white border border-border overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback for broken URLs
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%238C939E" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
              }}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-xs font-semibold text-ink truncate" title={value}>
              {value.split('/').pop() || 'Image Asset'}
            </p>
            <p className="text-[11px] text-ink-faint truncate max-w-sm" title={value}>
              {value}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || disabled}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue hover:text-navy transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Replace
              </button>
              <span className="text-input-border">|</span>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-ink transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View Full
              </a>
              <span className="text-input-border">|</span>
              <button
                type="button"
                onClick={() => onChange('')}
                disabled={disabled}
                className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                <X className="w-3 h-3" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Upload Zone or URL Input (when no image, or when replacing) */}
      {!value && mode === 'upload' && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && !disabled && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-navy bg-navy/5'
              : 'border-input-border bg-paper hover:bg-paper-alt hover:border-ink-faint'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center text-navy">
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue" />
              ) : (
                <Upload className="w-5 h-5 text-blue" />
              )}
            </div>

            <div>
              <p className="text-xs font-semibold text-ink">
                {isUploading ? (
                  'Uploading image to Supabase Storage…'
                ) : (
                  <>
                    <span className="text-blue underline">Click to upload</span> or drag and drop
                  </>
                )}
              </p>
              <p className="text-[11px] text-ink-faint mt-0.5">
                PNG, JPG, WebP, GIF, or SVG (max. 5MB)
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

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
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
            className="text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
