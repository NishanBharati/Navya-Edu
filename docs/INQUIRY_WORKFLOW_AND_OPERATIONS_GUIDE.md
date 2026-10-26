# Navya Ed Tech — Student Inquiry Workflow & Operations Manual

**Version:** 1.0  
**Target Audience:** Admissions Counselors, Student Advisors, Academic Coordinators, and Reception Desk  
**Inquiry Management Console:** `https://navya-edu.vercel.app/admin/inquiries` (or `https://navyaedtech.com/admin/inquiries`)

---

## 1. Inquiry Intake Channels

Prospective students submit admissions inquiries through three primary digital touchpoints:
1. **Contact Page Form (`/contact`):** Full admissions inquiry capturing name, email, phone/WhatsApp, course of interest, delivery mode, preferred batch time, experience level, and custom questions.
2. **Academic Advisor Modal (Universal Desk):** Triggered by "Speak with an Advisor" or "Book a Free Demo" buttons across the header, homepage, and course pages.
3. **Course Detail Quick Inquiry:** Embedded on individual course pages (`/courses/:slug`) pre-populated with the relevant course slug.

---

## 2. Dual-Layer Reliability & Zero-Data-Loss Architecture

The application implements a dual-layer inquiry pipeline in [`src/lib/inquiryService.ts`](file:///c:/Users/ASUS/Desktop/Navya-Edu/src/lib/inquiryService.ts):

```
                                  [Student Submits Form]
                                            │
                             ┌──────────────┴──────────────┐
                             │ 1. Validate & Sanitize      │
                             │ - Name, Email, Phone, Msg   │
                             │ - Honeypot & 30s Throttle   │
                             └──────────────┬──────────────┘
                                            │
                             ┌──────────────┴──────────────┐
                             │ 2. Local Storage Cache      │
                             │ - Stored immediately in     │
                             │   browser as failsafe       │
                             └──────────────┬──────────────┘
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     │                                             │
           [Host Online & Configured]                   [Host Offline / Network Fault]
                     │                                             │
       ┌─────────────┴─────────────┐                 ┌─────────────┴─────────────┐
       │ 3. Supabase Cloud Sync    │                 │ Fallback Action Panel     │
       │ - Persists to inquiries   │                 │ - Pre-filled WhatsApp link│
       │   table via anon INSERT   │                 │ - Pre-filled mailto: email│
       └─────────────┬─────────────┘                 │ - Reference Ticket code   │
                     │                               └───────────────────────────┘
       ┌─────────────┴─────────────┐
       │ 4. Success State Shown    │
       │ - Displays Reference ID   │
       │ - Instant WhatsApp link   │
       └───────────────────────────┘
```

### Safety Features
- **Anti-Spam Honeypot:** Automated bots that fill the hidden `website_hp` field are silently acknowledged without polluting the counselor dashboard or database.
- **Duplicate Prevention:** Identical email/phone/course submissions within 30 seconds are rejected with a helpful throttle notice.
- **Fail-Safe Offline Mode:** If the student's mobile internet fluctuates or Supabase is temporarily unreachable, the inquiry is preserved in browser storage, and instant pre-filled **WhatsApp** and **Email** buttons are presented to the student.

---

## 3. Counselor Triage Workflow & Status Lifecycle

Admissions staff manage incoming leads at `/admin/inquiries`.

### 3.1 Status Lifecycle

```
   [New] ──────> [Contacted] ──────> [Enrolled]
     │                 │
     └─────────────────┴───────────> [Closed] (Not Interested / Ineligible)
```

| Status | Definition | Counselor Action Required |
| :--- | :--- | :--- |
| **New** | Newly received inquiry awaiting counselor review. | **Immediate SLA:** Initiate outreach via phone call or WhatsApp within **2 hours** during business hours (7:00 AM – 7:00 PM NPT). |
| **Contacted** | Counselor has spoken with student, clarified syllabus details, fees, and installment options. | Log notes on student preference, schedule demo session, and follow up within 48 hours. |
| **Enrolled** | Student has confirmed batch seat, completed registration, or paid first milestone installment. | Hand off to Academic Course Coordinator for workstation onboarding. |
| **Closed** | Student withdrew inquiry, selected another cohort date, or decided against enrollment. | Archive inquiry with explanatory note (e.g. *Postponed to winter semester*). |

---

## 4. Operational Service Level Agreements (SLAs)

| Inquiry Channel | Business Hours SLA (7am – 7pm) | Evening & Holiday SLA |
| :--- | :--- | :--- |
| **Free Demo Class Booking** | Within **1 hour** | Before 9:00 AM next business day |
| **Course Syllabus & Fee Inquiry** | Within **2 hours** | Before 10:00 AM next business day |
| **WhatsApp Direct Chat** | Within **15 minutes** | Automated response + 9:00 AM follow-up |

---

## 5. Data Privacy & Retention Policy

In adherence to Nepal's **Individual Privacy Act, 2075 (2018)**:
1. **Purpose Limitation:** Student contact numbers and emails are used solely for academic counseling, syllabus distribution, and batch schedule coordination.
2. **Zero Commercial Selling:** Contact information is never sold, leased, or disclosed to third-party ad networks or financial brokers.
3. **12-Month Retention:** Unconverted prospective inquiries that do not proceed to enrollment are retained for counseling history for up to **12 months**, after which they are systematically deleted.
4. **Right to Erasure:** If a student requests deletion of their contact record via `info@navyaedtech.com`, counselors must purge the record from the database within 48 hours.
