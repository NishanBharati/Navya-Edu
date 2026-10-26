import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SITE_CONFIG } from '../config/site';
import type { Inquiry } from '../types';

export interface InquirySubmissionPayload {
  fullName: string;
  email: string;
  phone: string;
  interestedCourse: string;
  preferredMode: string;
  message: string;
  source?: string;
}

export interface InquirySubmissionResult {
  success: boolean;
  savedLocally: boolean;
  cloudSynced: boolean;
  localId: string;
  mailtoUrl: string;
  whatsappUrl: string;
  errorMessage?: string;
}

export interface LocalQueuedInquiry extends Inquiry {
  isOfflineQueued: boolean;
  syncAttemptedAt?: string;
  syncError?: string;
}

const LOCAL_STORAGE_KEY = 'navya_offline_inquiries';

/**
 * Reads any locally queued inquiries from localStorage
 */
export function getLocalInquiries(): LocalQueuedInquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[inquiryService] Failed to read local inquiries:', err);
    return [];
  }
}

/**
 * Saves or updates an inquiry in localStorage
 */
export function saveLocalInquiry(inquiry: LocalQueuedInquiry): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getLocalInquiries();
    const existingIndex = list.findIndex((i) => i.id === inquiry.id);
    if (existingIndex >= 0) {
      list[existingIndex] = inquiry;
    } else {
      list.unshift(inquiry);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('[inquiryService] Failed to save local inquiry:', err);
  }
}

/**
 * Removes an inquiry from localStorage
 */
export function removeLocalInquiry(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getLocalInquiries().filter((i) => i.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('[inquiryService] Failed to remove local inquiry:', err);
  }
}

/**
 * Generates an instant mailto: URL for admissions
 */
export function createAdmissionsMailtoUrl(payload: InquirySubmissionPayload): string {
  const subject = encodeURIComponent(`Course Inquiry: ${payload.interestedCourse} — ${payload.fullName}`);
  const body = encodeURIComponent(
    `Hello Navya EdTech Admissions,\n\n` +
    `I would like to inquire about training opportunities with the following details:\n\n` +
    `• Full Name: ${payload.fullName}\n` +
    `• Email: ${payload.email}\n` +
    `• Phone: ${payload.phone}\n` +
    `• Interested Course: ${payload.interestedCourse}\n` +
    `• Preferred Mode: ${payload.preferredMode}\n` +
    `• Source: ${payload.source || 'Website'}\n\n` +
    `Message / Notes:\n${payload.message || 'None'}\n\n` +
    `Please contact me regarding batch schedules and enrollment details.`
  );
  return `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
}

/**
 * Generates an instant WhatsApp chat link with pre-filled message
 */
export function createAdmissionsWhatsAppUrl(payload: InquirySubmissionPayload): string {
  // Cleans phone number from config or default admissions hotline
  const rawNumber = SITE_CONFIG.contactPhone.replace(/[^0-9]/g, '');
  const targetNumber = rawNumber || '9779800000000';
  
  const text = encodeURIComponent(
    `Hello Navya EdTech, I'm ${payload.fullName}. ` +
    `I'm interested in the "${payload.interestedCourse}" course (${payload.preferredMode}). ` +
    `My contact number is ${payload.phone}. Please share upcoming batch schedules and admission details.`
  );
  return `https://wa.me/${targetNumber}?text=${text}`;
}

// Anti-spam and duplicate submission tracking in memory
const lastSubmissions: { key: string; timestamp: number }[] = [];
const DUPLICATE_WINDOW_MS = 30000; // 30 seconds

/**
 * Sanitizes input text: trims whitespace, removes non-printable characters, and limits string length.
 */
export function sanitizeInput(input: string, maxLength = 2000): string {
  if (!input) return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Checks whether an identical inquiry was submitted within DUPLICATE_WINDOW_MS.
 */
export function isDuplicateSubmission(email: string, phone: string, course: string): boolean {
  const now = Date.now();
  const key = `${email.toLowerCase()}_${phone.replace(/[^0-9]/g, '')}_${course.toLowerCase()}`;
  
  // Clean up old entries
  while (lastSubmissions.length > 0 && now - lastSubmissions[0].timestamp > DUPLICATE_WINDOW_MS) {
    lastSubmissions.shift();
  }

  const existing = lastSubmissions.find((s) => s.key === key);
  if (existing) {
    return true;
  }

  lastSubmissions.push({ key, timestamp: now });
  return false;
}

/**
 * Submits an inquiry with dual-layer reliability:
 * 1. Sanitizes inputs and validates essential boundaries.
 * 2. Checks for rapid duplicate submissions.
 * 3. Always records locally in browser storage immediately as a failsafe.
 * 4. Persists directly to the Supabase PostgreSQL table (without .select(), respecting anon INSERT RLS).
 * 5. If Supabase is unconfigured or unreachable, guarantees zero data loss by
 *    preserving the local queue and providing direct WhatsApp and email actions.
 */
export async function submitInquiry(payload: InquirySubmissionPayload): Promise<InquirySubmissionResult> {
  const sanitizedFullName = sanitizeInput(payload.fullName, 100);
  const sanitizedEmail = sanitizeInput(payload.email, 120);
  const sanitizedPhone = sanitizeInput(payload.phone, 30);
  const sanitizedCourse = sanitizeInput(payload.interestedCourse, 150);
  const sanitizedMode = sanitizeInput(payload.preferredMode, 100);
  const sanitizedMessage = sanitizeInput(payload.message, 2500);
  const sanitizedSource = sanitizeInput(payload.source || 'Website Form', 100);

  // Validate required fields
  if (!sanitizedFullName || sanitizedFullName.length < 2) {
    return {
      success: false,
      savedLocally: false,
      cloudSynced: false,
      localId: '',
      mailtoUrl: '#',
      whatsappUrl: '#',
      errorMessage: 'Full name must be at least 2 characters.',
    };
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!sanitizedEmail || !emailPattern.test(sanitizedEmail)) {
    return {
      success: false,
      savedLocally: false,
      cloudSynced: false,
      localId: '',
      mailtoUrl: '#',
      whatsappUrl: '#',
      errorMessage: 'Please provide a valid email address.',
    };
  }

  const digitsOnly = sanitizedPhone.replace(/[^0-9]/g, '');
  if (!digitsOnly || digitsOnly.length < 7 || digitsOnly.length > 15) {
    return {
      success: false,
      savedLocally: false,
      cloudSynced: false,
      localId: '',
      mailtoUrl: '#',
      whatsappUrl: '#',
      errorMessage: 'Please provide a valid phone number (7–15 digits).',
    };
  }

  // Duplicate check
  if (isDuplicateSubmission(sanitizedEmail, sanitizedPhone, sanitizedCourse)) {
    return {
      success: false,
      savedLocally: false,
      cloudSynced: false,
      localId: '',
      mailtoUrl: '#',
      whatsappUrl: '#',
      errorMessage: 'A recent inquiry with these details was already received. Please wait 30 seconds before submitting again.',
    };
  }

  const localId = `inq_loc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  const record: LocalQueuedInquiry = {
    id: localId,
    fullName: sanitizedFullName,
    email: sanitizedEmail,
    phone: sanitizedPhone,
    interestedCourse: sanitizedCourse,
    preferredMode: sanitizedMode,
    message: sanitizedMessage,
    status: 'New',
    source: sanitizedSource,
    createdAt: now,
    isOfflineQueued: true,
  };

  // 1. Save to local storage first (failsafe)
  saveLocalInquiry(record);

  const cleanPayload: InquirySubmissionPayload = {
    fullName: sanitizedFullName,
    email: sanitizedEmail,
    phone: sanitizedPhone,
    interestedCourse: sanitizedCourse,
    preferredMode: sanitizedMode,
    message: sanitizedMessage,
    source: sanitizedSource,
  };

  const mailtoUrl = createAdmissionsMailtoUrl(cleanPayload);
  const whatsappUrl = createAdmissionsWhatsAppUrl(cleanPayload);

  // 2. If Supabase is NOT configured on this host, graceful degradation succeeds immediately
  if (!isSupabaseConfigured) {
    console.info('[inquiryService] Supabase not configured on this host. Inquiry stored in local queue.');
    record.syncError = 'Supabase environment variables not configured on host';
    saveLocalInquiry(record);
    return {
      success: true,
      savedLocally: true,
      cloudSynced: false,
      localId,
      mailtoUrl,
      whatsappUrl,
    };
  }

  // 3. Attempt cloud persistence via Supabase
  try {
    const dbPayload: Omit<Inquiry, 'id' | 'createdAt'> = {
      fullName: record.fullName,
      email: record.email,
      phone: record.phone,
      interestedCourse: record.interestedCourse,
      preferredMode: record.preferredMode,
      message: record.message,
      status: 'New',
      source: record.source,
    };

    // NOTE: In PostgreSQL RLS, anon role has INSERT permission (with check true)
    // but not SELECT permission on inquiries. Omitting .select() avoids triggering
    // the SELECT policy RETURNING check, allowing the INSERT to succeed cleanly.
    const { error } = await supabase.from('inquiries').insert(dbPayload as never);

    if (error) {
      console.warn('[inquiryService] Supabase insert warning:', error.message);
      record.syncError = error.message;
      record.syncAttemptedAt = now;
      saveLocalInquiry(record);
      return {
        success: true,
        savedLocally: true,
        cloudSynced: false,
        localId,
        mailtoUrl,
        whatsappUrl,
        errorMessage: error.message,
      };
    }

    // Successfully synced to cloud
    record.isOfflineQueued = false;
    record.syncAttemptedAt = now;
    saveLocalInquiry(record);

    return {
      success: true,
      savedLocally: true,
      cloudSynced: true,
      localId: record.id,
      mailtoUrl,
      whatsappUrl,
    };
  } catch (networkErr) {
    const msg = networkErr instanceof Error ? networkErr.message : 'Network error';
    console.warn('[inquiryService] Cloud sync network exception:', msg);
    record.syncError = msg;
    record.syncAttemptedAt = now;
    saveLocalInquiry(record);

    return {
      success: true,
      savedLocally: true,
      cloudSynced: false,
      localId,
      mailtoUrl,
      whatsappUrl,
      errorMessage: msg,
    };
  }
}

