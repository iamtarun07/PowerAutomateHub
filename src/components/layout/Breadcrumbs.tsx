import { Link } from 'react-router-dom';
import type { InternalLink } from '../../types/content';
import './layout.css';

/** Trail of parent pages; the last crumb is the current page and is not a link. */
export function Breadcrumbs({ trail, current }: { trail: InternalLink[]; current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {trail.map((c) => (
          <li key={c.to}>
            <Link to={c.to}>{c.label}</Link>
          </li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
