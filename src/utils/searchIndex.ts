import { flows } from '../data/flows';
import { notes } from '../data/notes';
import { functions } from '../data/reference/functions';
import { patterns } from '../data/reference/patterns';
import { recipes } from '../data/reference/recipes';
import { routes } from './routes';

export type SearchKind = 'Note' | 'Flow' | 'Function' | 'Expression' | 'Pattern';

export interface SearchEntry {
  kind: SearchKind;
  title: string;
  summary: string;
  to: string;
  haystack: string;
}

const entry = (kind: SearchKind, title: string, summary: string, to: string, extra: string[] = []): SearchEntry => ({
  kind,
  title,
  summary,
  to,
  haystack: [title, summary, ...extra].join(' ').toLowerCase(),
});

export const searchIndex: SearchEntry[] = [
  ...flows.map((f) => entry('Flow', f.name, f.description, routes.flow(f.slug), [f.category, ...f.keywords, ...f.integrations])),
  ...notes.map((n) => entry('Note', n.title, n.summary, routes.note(n.slug), [n.what, ...n.keywords])),
  ...functions.map((f) => entry('Function', `${f.name}()`, f.description, `${routes.functions}#fn-${f.name}`, [f.signature, f.example])),
  ...recipes.map((r) => entry('Expression', r.title, r.problem, `${routes.recipes}#${r.slug}`, [r.code])),
  ...patterns.map((p) => entry('Pattern', p.title, p.summary, routes.pattern(p.slug), p.structure)),
];

/** Every query term must match; title matches rank first. */
export function search(query: string, limit = 8): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return searchIndex
    .filter((e) => terms.every((t) => e.haystack.includes(t)))
    .map((e) => ({ e, score: terms.filter((t) => e.title.toLowerCase().includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ e }) => e);
}
