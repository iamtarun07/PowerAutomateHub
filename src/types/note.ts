import type { CodeSample } from './content';

export type NoteGroup = 'Getting started' | 'Fundamentals' | 'Data' | 'Control flow' | 'Integration' | 'Reliability';

/** Hands-on task at the end of a note; expected result lets the learner check themselves. */
export interface Exercise {
  task: string;
  steps: string[];
  expected: string;
}

export interface NoteSection {
  heading: string;
  body: string[];
  samples?: CodeSample[];
  /** Optional two-column table, e.g. operation vs purpose. */
  table?: { columns: [string, string]; rows: [string, string][] };
}

export interface Note {
  slug: string;
  /** Position in the learning order; assigned in data/notes/index.ts. */
  number: number;
  title: string;
  group: NoteGroup;
  summary: string;
  what: string;
  why: string;
  when: string;
  example: CodeSample;
  commonMistake: string;
  sections: NoteSection[];
  exercise?: Exercise;
  related: string[];
  keywords: string[];
  /** Renders the function reference table inside the note. */
  embedsFunctionReference?: boolean;
}

/** Notes are authored without a number; order in the index decides it. */
export type NoteContent = Omit<Note, 'number'>;
