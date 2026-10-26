import React from 'react';
import { Block, BlockSlot, BlockColor } from './Block';

/**
 * Code-drawn cover art that replaces stock / AI imagery. Each kind shows the
 * subject doing its job: a block script and its stage, real Python, a website
 * being laid out, a chart drawn from data, or a typographic article cover.
 * Scenes size themselves from their frame (container query units) and vary
 * by label, so two cards never share an identical cover.
 */
export type CoverKind = 'scratch' | 'game' | 'python' | 'web' | 'data' | 'article';

export const coverKindFor = (text = ''): CoverKind => {
  const t = text.toLowerCase();
  if (/scratch|kids|young|stem|game|arcade|storybook|pet|platformer/.test(t)) return /advanced|defender|platformer|pet|boss|space/.test(t) ? 'game' : 'scratch';
  if (/data|analytic|machine|\bml\b|\bai\b|forecast|price|housing/.test(t)) return 'data';
  if (/web|frontend|html|css|javascript|react|store|commerce|ui|design|kanban|taskflow|portal/.test(t)) return 'web';
  if (/python|backend|fastapi|automation|programming|engineer|scrape|tracker|rpg|organizer/.test(t)) return 'python';
  return 'article';
};

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

const Sprite: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M32 4c9 7 14 18 14 30l-6 8H24l-6-8C18 22 23 11 32 4Z" fill="#fff" />
    <circle cx="32" cy="26" r="6" fill="#2B47E0" />
    <path d="M18 34l-8 10 12-2M46 34l8 10-12-2" fill="#FF7A1A" />
    <path d="M27 44h10l-5 14z" fill="#FFC21A" />
  </svg>
);

const Basket: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
    <path d="M4 10h56l-7 26H11z" fill="#FF7A1A" />
    <path d="M4 10h56" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <circle cx="20" cy="5" r="5" fill="#F0518F" />
    <circle cx="40" cy="4" r="4" fill="#FFC21A" />
  </svg>
);

const Star: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" fill="currentColor" />
  </svg>
);

const SCRATCH_SCRIPTS: { field: string; lines: { c: BlockColor; t: string; s?: string }[]; sprite: 'rocket' | 'basket' }[] = [
  { field: 'bg-block-blue', sprite: 'rocket', lines: [{ c: 'blueDeep', t: 'move', s: '10' }, { c: 'pink', t: 'say', s: 'Hello!' }] },
  { field: 'bg-block-blue', sprite: 'basket', lines: [{ c: 'blueDeep', t: 'glide to', s: 'mouse' }, { c: 'green', t: 'if touching', s: 'fruit' }] },
  { field: 'bg-block-blue-deep', sprite: 'rocket', lines: [{ c: 'violet', t: 'switch scene', s: 'forest' }, { c: 'pink', t: 'play sound', s: 'pop' }] },
];

const GAME_SCRIPTS: { field: string; lines: { c: BlockColor; t: string; s?: string }[] }[] = [
  { field: 'bg-block-violet', lines: [{ c: 'orange', t: 'repeat until', s: 'score = 10' }, { c: 'pink', t: 'change score by', s: '1' }] },
  { field: 'bg-block-violet', lines: [{ c: 'orange', t: 'forever', s: 'gravity' }, { c: 'blueDeep', t: 'change y by', s: '-2' }] },
  { field: 'bg-block-blue-deep', lines: [{ c: 'orange', t: 'when boss', s: 'appears' }, { c: 'green', t: 'fire laser', s: 'x3' }] },
];

const ScratchScene: React.FC<{ game?: boolean; seed: number }> = ({ game, seed }) => {
  const v = game ? GAME_SCRIPTS[seed % GAME_SCRIPTS.length] : SCRATCH_SCRIPTS[seed % SCRATCH_SCRIPTS.length];
  const sprite = 'sprite' in v ? v.sprite : 'rocket';
  return (
    <div className={`absolute inset-0 flex items-center gap-[5%] px-[7%] ${v.field}`}>
      <div className="absolute inset-0 bg-dots-light" />
      <div className="relative flex flex-col items-start gap-[0.2em] stack-depth text-[clamp(10px,4.2cqw,24px)]">
        <Block color="yellow" hat>when flag clicked</Block>
        {v.lines.map((l, i) => (
          <Block key={l.t} color={l.c} tab={i < v.lines.length - 1}>
            {l.t} {l.s && <BlockSlot>{l.s}</BlockSlot>}
          </Block>
        ))}
      </div>
      <div className="relative ml-auto w-[40%] aspect-[4/3] rounded-[6%] bg-ink overflow-hidden shadow-lg">
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-block-green" />
        <Star className="absolute top-[12%] left-[14%] w-[9%] text-block-yellow" />
        <Star className="absolute top-[30%] right-[16%] w-[6%] text-white/70" />
        {sprite === 'basket' ? (
          <Basket className="absolute left-1/2 -translate-x-1/2 bottom-[16%] w-[38%]" />
        ) : (
          <Sprite className="absolute left-1/2 -translate-x-1/2 bottom-[18%] w-[30%]" />
        )}
        {game && (
          <span className="absolute top-[8%] right-[8%] rounded-md bg-white/90 px-[0.4em] text-[clamp(8px,2.2cqw,15px)] font-bold text-ink tabular-nums">
            score 7
          </span>
        )}
      </div>
    </div>
  );
};

const PY = {
  k: 'text-block-pink',
  f: 'text-blue-light',
  s: 'text-block-green',
};

const PYTHON_SNIPPETS: React.ReactNode[] = [
  <>
    <span className={PY.k}>def</span> <span className={PY.f}>greet</span>(name):{'\n'}
    {'    '}<span className={PY.k}>return</span> <span className={PY.s}>f"Namaste, {'{'}name{'}'}!"</span>{'\n\n'}
    <span className={PY.f}>print</span>(greet(<span className={PY.s}>"Aarav"</span>))
  </>,
  <>
    spent = {'{'}<span className={PY.s}>"momo"</span>: 240, <span className={PY.s}>"bus"</span>: 60{'}'}{'\n'}
    total = <span className={PY.f}>sum</span>(spent.values()){'\n\n'}
    <span className={PY.f}>print</span>(<span className={PY.s}>f"Today: Rs {'{'}total{'}'}"</span>)
  </>,
  <>
    door = <span className={PY.f}>input</span>(<span className={PY.s}>"Left or right? "</span>){'\n'}
    <span className={PY.k}>if</span> door == <span className={PY.s}>"left"</span>:{'\n'}
    {'    '}<span className={PY.f}>print</span>(<span className={PY.s}>"You found the key!"</span>)
  </>,
];

const PYTHON_FIELDS = ['bg-block-yellow', 'bg-block-green', 'bg-block-orange'];

const PythonScene: React.FC<{ seed: number }> = ({ seed }) => (
  <div className={`absolute inset-0 ${PYTHON_FIELDS[seed % PYTHON_FIELDS.length]} flex items-center justify-center p-[7%]`}>
    <div className="w-full rounded-[4%] bg-ink shadow-lg overflow-hidden">
      <div className="flex gap-[0.35em] px-[0.9em] py-[0.6em] border-b border-white/10 text-[clamp(8px,2.2cqw,14px)]">
        <span className="w-[0.7em] h-[0.7em] rounded-full bg-block-pink" />
        <span className="w-[0.7em] h-[0.7em] rounded-full bg-block-yellow" />
        <span className="w-[0.7em] h-[0.7em] rounded-full bg-block-green" />
      </div>
      <pre className="px-[1.1em] py-[0.9em] font-mono text-[clamp(8px,2.7cqw,17px)] leading-relaxed text-[#E6E9FF] whitespace-pre overflow-hidden">
        {PYTHON_SNIPPETS[seed % PYTHON_SNIPPETS.length]}
      </pre>
    </div>
  </div>
);

const WEB_TILES = [
  ['bg-block-yellow', 'bg-block-orange', 'bg-block-green'],
  ['bg-block-pink', 'bg-block-blue', 'bg-block-yellow'],
  ['bg-block-green', 'bg-block-yellow', 'bg-block-pink'],
];

const WebScene: React.FC<{ seed: number }> = ({ seed }) => {
  const tiles = WEB_TILES[seed % WEB_TILES.length];
  const store = seed % 2 === 0;
  return (
    <div className={`absolute inset-0 ${seed % 3 === 2 ? 'bg-block-blue' : 'bg-block-violet'} flex items-center justify-center p-[7%]`}>
      <div className="absolute inset-0 bg-dots-light" />
      <div className="relative w-full rounded-[4%] bg-white shadow-lg overflow-hidden">
        <div className="flex items-center gap-[1.5%] px-[3%] py-[2%] bg-canvas border-b border-border">
          <span className="w-[2%] aspect-square rounded-full bg-block-pink" />
          <span className="w-[2%] aspect-square rounded-full bg-block-yellow" />
          <span className="w-[2%] aspect-square rounded-full bg-block-green" />
          <span className="ml-[2%] h-[0.5em] flex-1 rounded-full bg-border text-[clamp(8px,2cqw,14px)]" />
        </div>
        <div className="p-[5%] space-y-[4%]">
          <div className="flex items-center justify-between">
            <div className="h-[0.6em] w-1/3 rounded-full bg-ink text-[clamp(8px,2.4cqw,16px)]" />
            {store && <div className="h-[1.4em] w-[1.4em] rounded-md bg-block-orange text-[clamp(8px,2.4cqw,16px)]" />}
          </div>
          <div className={`rounded-[3%] ${store ? 'bg-block-blue aspect-[5/1]' : 'bg-sky aspect-[4/1]'}`} />
          <div className="grid grid-cols-3 gap-[4%]">
            {tiles.map((t) => (
              <div key={t} className={`aspect-[4/3] rounded-[8%] ${t}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DATA_SETS = [
  [38, 52, 46, 64, 58, 76, 70, 88],
  [70, 62, 66, 54, 58, 44, 48, 36],
  [30, 44, 62, 50, 72, 66, 84, 80],
];

const DataScene: React.FC<{ seed: number }> = ({ seed }) => {
  const bars = DATA_SETS[seed % DATA_SETS.length];
  const points = bars.map((h, i) => `${4 + i * 13},${100 - h}`).join(' ');
  return (
    <div className="absolute inset-0 bg-block-green flex items-end p-[7%]">
      <div className="relative w-full h-[80%] rounded-[4%] bg-white shadow-lg p-[5%] flex items-end gap-[3%]">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-[30%] bg-block-blue" style={{ height: `${h}%`, opacity: 0.5 + i * 0.06 }} />
        ))}
        <svg className="absolute inset-[5%] w-[90%] h-[90%] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={points} fill="none" stroke="#FF7A1A" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

const ARTICLE_FIELDS = ['bg-block-blue text-white', 'bg-block-yellow text-ink', 'bg-block-violet text-white', 'bg-block-green text-ink', 'bg-block-orange text-ink', 'bg-block-pink text-ink'];

const ArticleScene: React.FC<{ label: string; seed: number }> = ({ label, seed }) => (
  <div className={`absolute inset-0 ${ARTICLE_FIELDS[seed % ARTICLE_FIELDS.length]} p-[7%] flex flex-col justify-between overflow-hidden`}>
    <div className="absolute -right-[8%] -bottom-[18%] w-[55%] aspect-square rounded-[28%] bg-current opacity-10" />
    <span className="font-display font-bold text-[clamp(10px,2.6cqw,16px)] opacity-80">Navya Insights</span>
    <span className="relative font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(16px,6.4cqw,44px)] max-w-[85%] line-clamp-3">
      {label}
    </span>
  </div>
);

interface CoverArtProps {
  kind: CoverKind;
  /** Picks the variant, and is the set text of article covers */
  label?: string;
}

// Known projects get the scene that matches their subject rather than a hashed variant
const SUBJECT_SEEDS: [RegExp, number][] = [
  [/fruit|catch/i, 1],
  [/story|scene|animat/i, 2],
  [/platform|gravity|jump/i, 1],
  [/space|boss|defender|shoot/i, 2],
  [/pet/i, 0],
  [/finance|expense|tracker/i, 1],
  [/rpg|quest|text adventure/i, 2],
  [/advance/i, 1],
];

export const CoverArt: React.FC<CoverArtProps> = ({ kind, label = '' }) => {
  const seed = SUBJECT_SEEDS.find(([re]) => re.test(label))?.[1] ?? hash(label);
  const scene = (() => {
    switch (kind) {
      case 'scratch':
        return <ScratchScene seed={seed} />;
      case 'game':
        return <ScratchScene game seed={seed} />;
      case 'python':
        return <PythonScene seed={seed} />;
      case 'web':
        return <WebScene seed={seed} />;
      case 'data':
        return <DataScene seed={seed} />;
      default:
        return <ArticleScene label={label} seed={seed} />;
    }
  })();
  // The frame is a size container so every scene scales with its slot
  return <div className="absolute inset-0 [container-type:size]">{scene}</div>;
};
