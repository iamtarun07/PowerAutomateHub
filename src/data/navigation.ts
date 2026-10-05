import { flows } from './flows';
import { notes, noteGroups } from './notes';
import { routes } from '../utils/routes';

export interface NavItem {
  label: string;
  to: string;
  marker?: string;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

/** Sidebar structure is derived from content, so new notes and flows appear automatically. */
export const navigation: NavGroup[] = [
  { items: [{ label: 'Overview', to: routes.home }] },
  ...noteGroups.map((g) => ({
    title: `Learn: ${g}`,
    items: notes
      .filter((n) => n.group === g)
      .map((n) => ({ label: n.title, to: routes.note(n.slug), marker: String(n.number).padStart(2, '0') })),
  })),
  { title: 'My flows', items: flows.map((f) => ({ label: f.name, to: routes.flow(f.slug) })) },
  {
    title: 'Reference',
    items: [
      { label: 'Expressions', to: routes.recipes },
      { label: 'Functions', to: routes.functions },
      { label: 'Patterns', to: routes.patterns },
    ],
  },
];
