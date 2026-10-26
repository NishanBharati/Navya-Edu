# Design system: engineering notes

The design system itself (tokens, rules, components) is recorded in [`DESIGN.md`](../DESIGN.md) at the project root, with a machine-readable sidecar in `.impeccable/design.json`. Product truth lives in [`PRODUCT.md`](../PRODUCT.md). This file covers where things live in code.

## Where things live

| Concern | File |
| --- | --- |
| Tokens (colour, type, radius, shadow, motion) | `src/index.css` (`@theme`) |
| Block material (`.snap-block`, `.snap-tab`, `.snap-hat`) | `src/index.css` (`@layer components`) |
| Block components (`Block`, `BlockSlot`) | `src/components/blocks/Block.tsx` |
| Code-drawn covers (`CoverArt`) | `src/components/blocks/CoverArt.tsx` |
| Real-photo rule (`isRealPhoto`) | `src/lib/media.ts` |
| Motion tokens for Framer Motion | `src/lib/motion.ts` |
| Scroll reveals (`Reveal`, `Stagger`, `StaggerItem`) | `src/components/motion/Reveal.tsx` |
| Home learning path data | `src/data/learningPath.ts` |
| Social share card source | `scripts/og-card.html` (rendered to `public/og-image.jpg`) |

## Rules for code

1. **Tailwind v4 transitions:** `scale-*` and `translate-*` write the individual `scale` / `translate` properties, so list those (not `transform`) in arbitrary `transition-[...]` utilities.
2. **Reveals:** wrap content in `<Reveal>` or `<Stagger>` / `<StaggerItem>`; do not hand-write `whileInView`. Above-the-fold entrances use the CSS `rise` / `snap-in` classes so they play from the pre-rendered HTML.
3. **Reduced motion:** `<MotionConfig reducedMotion="user">` in `App.tsx` and `entry-server.tsx` removes Framer transforms globally; the CSS media query collapses CSS animations.
4. **Images:** the site ships no stock or AI imagery. `ImagePlaceholder`, `HeroImageWithParallax` and avatars render a photo only when `isRealPhoto(src)` is true (an uploaded file, for example Supabase Storage). Bundled `/images/` paths and stock hosts fall back to `CoverArt`.
5. **Fonts:** Bricolage Grotesque (display), Atkinson Hyperlegible Next (body), Geist Mono (code), all self-hosted through Fontsource. `Body Fallback` in `index.css` is Arial with measured overrides (`size-adjust: 99.8%`, `ascent-override: 98%`, `descent-override: 32%`); re-measure if the body face changes.
6. **Design checks:** after UI edits, run the Impeccable detector:
   `~/.claude/plugins/cache/impeccable/impeccable/<version>/skills/impeccable/scripts/impeccable detect --json <changed files>`
   (or `/impeccable audit` in a new Claude Code session, where the plugin's hook also runs it automatically).
