---
name: Navya Ed Tech
description: Snap Lab, a site built like a program a child snaps together, from first blocks to real code.
colors:
  editor-blue: "#2B47E0"
  editor-blue-deep: "#1E34B8"
  event-yellow: "#FFC21A"
  control-orange: "#FF7A1A"
  looks-violet: "#6D3FF0"
  operator-green: "#14A862"
  sound-pink: "#F0518F"
  ink: "#0F1640"
  ink-soft: "#2E3563"
  ink-muted: "#4E5585"
  success-text: "#0A7A48"
  canvas: "#F4F1E9"
  paper: "#FBFAF6"
  white: "#FFFFFF"
  hairline: "#E2E6F6"
  input-outline: "#7D84AD"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.4rem + 5.2vw, 5.75rem)"
    fontWeight: 750
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.5rem)"
    fontWeight: 720
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage Grotesque Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, Body Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Bricolage Grotesque Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.2
  code:
    fontFamily: "Geist Mono Variable, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  chip: "8px"
  button: "12px"
  block: "0.7em"
  hat-crown: "1.5em"
  panel: "18px"
  card: "28px"
spacing:
  section: "clamp(4.5rem, 3rem + 6vw, 8rem)"
  gutter-mobile: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "32px"
  container: "1400px"
components:
  button-primary:
    backgroundColor: "{colors.control-orange}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    height: "48px"
    padding: "0 20px"
  button-blue:
    backgroundColor: "{colors.editor-blue}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    height: "48px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    height: "48px"
    padding: "0 20px"
  snap-block:
    backgroundColor: "{colors.editor-blue}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.block}"
    padding: "0.6em 1em"
  hat-block:
    backgroundColor: "{colors.event-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.hat-crown}"
    padding: "0.6em 1em"
  block-slot:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "0 0.65em"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    height: "48px"
---

# Design System: Navya Ed Tech

## Overview

**Creative North Star: "The Snap Lab"**

The site is built the way a child builds their first program: out of chunky, saturated blocks that snap together, with a socket on top and a tab underneath. Blocks are not decoration on a neutral template; they are the component language. Course paths, class steps, the primary action, status tags and the closing visit details are all blocks, and the same idea is shown turning into real Python, which is the product's promise.

Colour commits at page scale. Whole sections are owned by one block colour (editor-blue hero, event-yellow class section, looks-violet older-learners band, control-orange close, ink footer) on a white and canvas ground, so the page scrolls like a stack of differently coloured blocks. Type is loud and friendly at display sizes and plainly legible at reading sizes, because the primary reader is a parent deciding on a phone in the evening.

Imagery is drawn, never stocked. There are no photos of children, staff or classrooms until real ones exist; covers are code-drawn scenes of the subject at work (a block script with its game stage, a Python editor, a website being laid out, a chart drawn from data).

**Key Characteristics:**
- Interlocking blocks as the single component language.
- Page-scale colour fields, one block colour per section.
- Bricolage Grotesque display, Atkinson Hyperlegible Next for reading.
- Code-drawn cover art in place of any stock or AI imagery.
- Motion as assembly: blocks land one after another, like a script being built.

## Colors

A full palette of block colours, each with a fixed text pairing, over warm ivory and parchment grounds and an indigo ink.

### Primary
- **Editor Blue** (#2B47E0): the hero field, links, focus rings, info states. White text only (6.8:1).
- **Editor Blue Deep** (#1E34B8): nested blocks inside blue fields and hover on blue actions. White text (9.4:1).

### Secondary
- **Control Orange** (#FF7A1A): the one primary action colour ("Book a free demo class") and the closing section field. Ink text only (6.7:1).
- **Event Yellow** (#FFC21A): hat blocks that start a script, the "how a class works" field, emphasis inside the hero headline. Ink text only (10.7:1).

### Tertiary
- **Looks Violet** (#6D3FF0): the older-learners band, selected age choice, web-development covers. White text (5.8:1).
- **Operator Green** (#14A862): nested command blocks, status blocks such as "Admissions Open", data covers. Ink text (5.6:1).
- **Sound Pink** (#F0518F): final steps in a script (show, finish, certificate). Ink text (5.2:1).

### Neutral
- **Ink** (#0F1640): body text, dark code panels, the footer field, the active tab indicator.
- **Ink Muted** (#4E5585): secondary text on white and canvas (7.1:1 on white).
- **Canvas** (#F4F1E9, warm parchment): editor panes, insight section ground, card bodies.
- **Paper** (#FBFAF6, ivory) and **White** (#FFFFFF): page ground and card surfaces.
- **Hairline** (#E2E6F6): borders and dividers.
- **Input Outline** (#7D84AD): form control borders (3.6:1, meets non-text contrast).
- **Success Text** (#0A7A48): green text on light grounds, where Operator Green would fail contrast.

### Named Rules
**The Fixed Pairing Rule.** Every block colour has exactly one text colour: white on blue, deep blue and violet; ink on yellow, orange, green and pink. Never put white text on yellow, orange, green or pink.

**The One Field Rule.** A section is owned by one block colour; blocks of other colours sit on it, but the ground never mixes two fields.

**The One Action Colour Rule.** Control Orange is reserved for the primary action. Secondary actions use white, blue or an outline.

## Typography

**Display Font:** Bricolage Grotesque (variable, with optical sizing)
**Body Font:** Atkinson Hyperlegible Next (with a metric-matched Arial fallback)
**Code Font:** Geist Mono

**Character:** Bricolage's lively, slightly irregular grotesque gives headlines and block labels a hand-built warmth; Atkinson Hyperlegible keeps every paragraph clear for parents and young readers.

### Hierarchy
- **Display** (750, clamp(2.75rem, 1.4rem + 5.2vw, 5.75rem), 0.95): hero and closing headlines only.
- **Headline** (720, clamp(2rem, 1.3rem + 2.6vw, 3.5rem), 1.02): section titles.
- **Title** (700, 22px, 1.15): card and project titles.
- **Body** (400, 18px to 20px, 1.6): paragraphs, max about 60ch.
- **Label** (700, 15px): block text, buttons, navigation.
- **Code** (400, 13px to 14px, 1.75): real code only.

### Named Rules
**The Heading Speaks Rule.** No eyebrow or kicker labels above headings; metadata (course name, level, date) sits below the title.

**The Real Code Rule.** Monospace appears only for actual code, never as a "technical" costume.

## Layout

Content sits in a 1400px container with 16px, 24px and 32px gutters at mobile, tablet and desktop. Sections breathe on a fluid vertical rhythm of clamp(4.5rem, 3rem + 6vw, 8rem). Layouts favour asymmetric two-column splits (copy beside a block stack) and varied grids (one wide lead tile with smaller tiles) over rows of identical cards. The hero editor is three panes on desktop (palette 15rem, script, stage 22rem) and stacks palette, script, stage on phones. No horizontal scrolling at 360px and up.

## Elevation & Depth

Depth comes from the block material and soft lift, never from hard offset shadows. Blocks carry a soft inner shade along the bottom edge and a light top highlight; stacks of blocks share one soft drop shadow (applied as a filter so it survives the socket mask). Cards rest nearly flat and lift on hover.

### Shadow Vocabulary
- **Block bevel** (`box-shadow: inset 0 -7px 9px -6px rgb(15 22 64 / 0.32), inset 0 1px 0 rgb(255 255 255 / 0.28)`): every block and block-style button.
- **Stack depth** (`filter: drop-shadow(0 10px 18px rgb(15 22 64 / 0.18))`): around a whole stack of blocks.
- **Card lift** (`0 4px 8px -2px rgb(15 22 64 / 0.06), 0 16px 36px -10px rgb(15 22 64 / 0.18)`): cards on hover.
- **Editor float** (`0 30px 80px -30px rgb(8 12 38 / 0.55)`): the hero editor over the blue field.

### Named Rules
**The Three Steps Rule.** Interactive blocks have three depth states: rest, hover (lift 2px) and pressed (scale 0.97). Nothing else moves on hover.

## Shapes

Chunky and rounded. Blocks are 0.7em radius with a socket notch cut into the top edge and a tab hanging below, so stacked blocks interlock. Hat blocks have a rounded crown (1.5em) and no socket: they start a script. White value slots inside blocks are fully rounded pills. Cards and editor panels use large 28px corners; buttons 12px; chips 8px.

## Components

### Snap Block (signature)
- **Shape:** 0.7em radius, socket on top, tab below, sized in em so it scales with its text.
- **Colour:** any block colour with its fixed text pairing.
- **Behaviour:** blocks in a script land one after another (spring, 0.45s, bounce 0.2, 70ms apart); on first paint the same sequence runs in CSS so pre-rendered pages never flash.

### Hat Block
- **Shape:** rounded crown, no socket. Used for the first block of a script and for the hero's primary action.

### Buttons
- **Shape:** 12px radius, 48px tall (56px large).
- **Primary:** Control Orange with ink text and the block bevel.
- **Hover / Focus:** lift 2px; 3px Editor Blue focus ring with offset; press scales to 0.97.
- **Secondary:** white with a 2px ink-tinted outline; **Blue** variant for actions on orange fields; **Outline White** on violet and blue fields.

### Cards / Containers
- **Corner Style:** 28px.
- **Background:** white body with a code-drawn cover on top.
- **Border:** 1px hairline; on hover the border darkens and the card lifts 4px.
- **Status:** drawn as a small green hat block, never a coloured dot.

### Inputs / Fields
- **Style:** white, 2px Input Outline border, 12px radius, 48px tall.
- **Focus:** border turns Editor Blue with a 4px blue ring at 15%.

### Navigation
- **Style:** solid white bar with a hairline; Bricolage 15px links; hover pill on canvas; the active page gets a 3px Editor Blue underline. The bar slides away when reading down and returns on scroll up. The primary action is the orange block "Book a free demo class" ("Book a demo" at narrow desktop widths). Mobile opens an overlay panel whose links stagger in.

### Cover Art
- Code-drawn scenes keyed by subject: Scratch script plus stage, game scene with score, Python editor with a real snippet, website wireframe, data chart, typographic article cover. Uploaded real photos (Supabase Storage) replace them automatically; bundled and stock URLs are ignored.

## Do's and Don'ts

### Do:
- **Do** build new UI from blocks, hat blocks and slots before reaching for generic cards.
- **Do** give each section one block-colour field and keep the fixed text pairings.
- **Do** put metadata below titles.
- **Do** draw illustrative scenes in code and label them as illustrations; show real photos only once they exist.
- **Do** honour reduced motion: blocks appear without travel, loops stop.

### Don't:
- **Don't** add stock photos, AI images or video of people, classrooms or staff.
- **Don't** add eyebrow labels above headings or rows of identical icon cards.
- **Don't** use hard offset shadows, gradient text, or monospace outside code.
- **Don't** put white text on yellow, orange, green or pink.
- **Don't** invent testimonials, ratings, enrolment numbers or placement claims.
