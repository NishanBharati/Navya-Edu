import type { BlockColor } from '../components/blocks/Block';

/**
 * Home page learning path. Every course, age band and project title here
 * comes from src/data/courses.ts; the block wording paraphrases what each
 * project does, and the Python lines are the same idea written as code.
 */

export interface PathStep {
  slug: string;
  course: string;
  duration: string;
  color: BlockColor;
  /** One real project from the course, shown on the stage */
  project: string;
  /** The block script, top to bottom; `slot` renders as a white input */
  blocks: { text: string; slot?: string }[];
  /** The same idea written in Python */
  python: string[];
}

export const PATH_STEPS: Record<string, PathStep> = {
  'scratch-beginner': {
    slug: 'scratch-beginner',
    course: 'Scratch Beginner',
    duration: '30 days',
    color: 'yellow',
    project: 'Fruit Catcher Arcade Game',
    blocks: [{ text: 'move basket', slot: '10 steps' }, { text: 'if touching fruit, add', slot: '1 point' }],
    python: ['basket.x += 10', 'if basket.touches(fruit):', '    score += 1'],
  },
  'scratch-advanced': {
    slug: 'scratch-advanced',
    course: 'Scratch Advanced',
    duration: '30 days',
    color: 'orange',
    project: '2D Platformer with Gravity & Jump',
    blocks: [{ text: 'change y by', slot: 'gravity' }, { text: 'next level when score =', slot: '10' }],
    python: ['player.y += gravity', 'if score == 10:', '    level += 1'],
  },
  'python-beginner': {
    slug: 'python-beginner',
    course: 'Python Beginner',
    duration: '40 days',
    color: 'blue',
    project: 'Interactive Text RPG & Quest Engine',
    blocks: [{ text: 'ask player', slot: 'which door?' }, { text: 'open quest for', slot: 'answer' }],
    python: ['door = input("Which door? ")', 'start_quest(door)'],
  },
  'web-development': {
    slug: 'web-development',
    course: 'Web Development',
    duration: '45 days',
    color: 'violet',
    project: 'Weather & City Portal with Live APIs',
    blocks: [{ text: 'fetch weather for', slot: 'Kathmandu' }, { text: 'show it on', slot: 'my website' }],
    python: ['data = fetch_weather("Kathmandu")', 'page.show(data)'],
  },
};

export interface AgeBand {
  id: string;
  label: string;
  /** Course slugs in suggested order; the first is where most children start */
  path: string[];
  note: string;
}

export const AGE_BANDS: AgeBand[] = [
  {
    id: '8-10',
    label: '8 to 10',
    path: ['scratch-beginner', 'scratch-advanced'],
    note: 'Starts with Scratch Beginner: stories, animation and a first arcade game.',
  },
  {
    id: '11-13',
    label: '11 to 13',
    path: ['scratch-beginner', 'scratch-advanced', 'python-beginner'],
    note: 'Scratch Advanced (ages 11 to 14) builds real game physics, then the move to Python.',
  },
  {
    id: '14-16',
    label: '14 to 16',
    path: ['scratch-advanced', 'python-beginner', 'web-development'],
    note: 'Confident coders go from block logic to typed Python, then build websites.',
  },
];
