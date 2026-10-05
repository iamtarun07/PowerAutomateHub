import { Link } from 'react-router-dom';
import { notes } from '../../data/notes';
import { routes } from '../../utils/routes';
import '../pages.css';

/** Previous / next note, following the numbered order. */
export function NotePager({ current }: { current: number }) {
  const i = notes.findIndex((n) => n.number === current);
  const prev = notes[i - 1];
  const next = notes[i + 1];
  return (
    <nav className="pager" aria-label="Note navigation">
      {prev ? (
        <Link to={routes.note(prev.slug)} className="pager__link">
          <span className="eyebrow">Previous</span>
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={routes.note(next.slug)} className="pager__link pager__link--next">
          <span className="eyebrow">Next</span>
          {next.title}
        </Link>
      )}
    </nav>
  );
}
