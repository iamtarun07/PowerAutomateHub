import { Link } from 'react-router-dom';
import { findNote } from '../../data/notes';
import { routes } from '../../utils/routes';
import './documentation.css';

/** Links to notes by slug; unknown slugs are skipped so a typo never renders a dead link. */
export function RelatedLinks({ slugs }: { slugs: string[] }) {
  const items = slugs.map(findNote).filter((n) => n !== undefined);
  return (
    <ul className="related">
      {items.map((n) => (
        <li key={n.slug}>
          <Link to={routes.note(n.slug)} className="related__link">
            <span className="related__num">{String(n.number).padStart(2, '0')}</span>
            <span className="related__title">{n.title}</span>
            <span className="related__summary">{n.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
