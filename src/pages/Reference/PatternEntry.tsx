import { Link } from 'react-router-dom';
import type { Pattern } from '../../types/reference';
import { findFlow } from '../../data/flows';
import { findNote } from '../../data/notes';
import { Section } from '../../components/common/Section';
import { routes } from '../../utils/routes';
import '../pages.css';

export function PatternEntry({ pattern }: { pattern: Pattern }) {
  return (
    <Section id={pattern.slug} title={pattern.title}>
      <p>{pattern.summary}</p>
      <ol className="pattern__structure">
        {pattern.structure.map((s) => (
          <li key={s}>
            <code>{s}</code>
          </li>
        ))}
      </ol>
      <dl className="pattern__facts">
        <dt>When to use</dt>
        <dd>{pattern.whenToUse}</dd>
        <dt>Pitfall</dt>
        <dd>{pattern.pitfalls}</dd>
        <dt>Used in</dt>
        <dd>
          {pattern.usedIn.map((slug) => {
            const flow = findFlow(slug);
            return flow ? (
              <Link key={slug} to={routes.flow(slug)} className="pattern__link">
                {flow.name}
              </Link>
            ) : null;
          })}
        </dd>
        <dt>Notes</dt>
        <dd>
          {pattern.relatedNotes.map((slug) => {
            const note = findNote(slug);
            return note ? (
              <Link key={slug} to={routes.note(slug)} className="pattern__link">
                {note.title}
              </Link>
            ) : null;
          })}
        </dd>
      </dl>
    </Section>
  );
}
