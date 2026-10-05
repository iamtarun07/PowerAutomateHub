import type { Note, NoteGroup } from '../../types/note';
import { gettingStartedNotes } from './gettingStarted';
import { fundamentalsNotes } from './fundamentals';
import { dataNotes } from './data';
import { dataOperationNotes } from './dataOperations';
import { controlNotes } from './control';
import { controlExtraNotes } from './controlExtras';
import { integrationNotes } from './integration';
import { commonConnectorNotes } from './commonConnectors';

/** Learning order: groups in this order, notes in authoring order within a group. */
export const noteGroups: NoteGroup[] = ['Getting started', 'Fundamentals', 'Data', 'Control flow', 'Integration', 'Reliability'];

const authored = [
  ...gettingStartedNotes,
  ...fundamentalsNotes,
  ...dataNotes,
  ...dataOperationNotes,
  ...controlNotes,
  ...controlExtraNotes,
  ...integrationNotes,
  ...commonConnectorNotes,
];

export const notes: Note[] = noteGroups
  .flatMap((g) => authored.filter((n) => n.group === g))
  .map((n, i) => ({ ...n, number: i + 1 }));

export const findNote = (slug: string | undefined) => notes.find((n) => n.slug === slug);
