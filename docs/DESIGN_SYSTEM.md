# Navya Ed Tech Design System

Reference for anyone building or changing UI on the public site or the admin dashboard.

## Where things live

| Concern | File |
| --- | --- |
| Colour, type, radius, shadow and motion tokens | `src/index.css` (`@theme`) |
| Motion tokens for Framer Motion | `src/lib/motion.ts` |
| Scroll reveal primitives (`Reveal`, `Stagger`, `StaggerItem`) | `src/components/motion/Reveal.tsx` |
| Buttons, section headers, images, counters | `src/components/common/` |

## Tokens

- **Type:** Geist (UI and headings) and Geist Mono (eyebrows, code, data), self-hosted via Fontsource. Nothing below 12px. Fluid classes: `text-display` (hero), `text-title` (section titles).
- **Colour:** navy is the brand, blue is links and interaction, sage means success or "kids track", amber is for "featured" only. Every text token passes WCAG AA on `paper`, `paper-alt` and white. `input-border` meets the 3:1 non-text contrast rule.
- **Radius:** 8px (`rounded-md`, `rounded-lg`) for controls and chips, 12px (`rounded-xl`) for buttons, 16px (`rounded-2xl`) for cards, 20px (`rounded-3xl`) for media and bands.
- **Elevation:** `shadow-xs` to `shadow-2xl`, all navy-tinted. Cards rest at `shadow-xs` and lift to `shadow-lg` on hover.
- **Spacing:** sections use `section-y` (fluid 64px to 112px). Containers use `Container`.
- **Backgrounds:** `bg-blueprint` (light) and `bg-blueprint-dark` (navy) are the signature grid. Use at most one dark band per page.

## Motion

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` / `EASING` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, UI responses |
| `--ease-in-out` / `EASE_IN_OUT` | `cubic-bezier(0.65, 0, 0.35, 1)` | Indicators and layout moving on screen |
| `duration-120` to `duration-240` | 120 to 240ms | Hover, press, focus, tabs, menus |
| `DURATION.reveal` | 560ms | Scroll reveals (16px rise, once) |

Rules:

1. Animate `transform` (`translate`, `scale`) and `opacity` only. In Tailwind v4, `scale-*` and `translate-*` set the individual `scale` / `translate` properties, so list those (not `transform`) in arbitrary `transition-[...]` utilities.
2. Buttons and pressables: `active:scale-[0.97]`. No hover scale.
3. Hover effects are automatically limited to pointer devices by Tailwind v4.
4. Scroll reveals: wrap content in `<Reveal>` or `<Stagger>` / `<StaggerItem>`. Do not hand-write `whileInView`.
5. Above-the-fold entrances use the CSS `rise` class with `--rise-delay`, so they play from the pre-rendered HTML before hydration.
6. Reduced motion: `<MotionConfig reducedMotion="user">` in `App.tsx` removes Framer transforms globally, and the CSS media query collapses CSS animations. Nothing else is needed per component.
7. Admin dashboard: hover, focus, modal, drawer and toast transitions only. No scroll effects.

## Images

Every `public/images/**/*.jpg` has `-640`, `-1024` and `-1376` AVIF and WebP siblings. `ImagePlaceholder` serves them automatically through `<picture>` for any local `/images/...jpg` source, so new images need the same variants. They were generated with `sharp` (WebP quality 74, AVIF quality 52).

## Fonts and layout shift

`Geist Fallback` in `index.css` is Arial with metric overrides (`size-adjust: 102.9%`, `ascent-override: 98%`, `descent-override: 29%`). These were measured in Chromium with canvas `measureText` against the loaded Geist Variable font. Re-measure if the font changes.
