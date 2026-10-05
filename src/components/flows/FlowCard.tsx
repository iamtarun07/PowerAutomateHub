import { Link } from 'react-router-dom';
import type { Flow } from '../../types/flow';
import { StatusBadge } from '../common/StatusBadge';
import { findNote } from '../../data/notes';
import { routes } from '../../utils/routes';
import './flows.css';

/** Whole card is one link to the flow route; concepts are listed as text, not nested links. */
export function FlowCard({ flow }: { flow: Flow }) {
  const concepts = flow.related.slice(0, 5).map((s) => findNote(s)?.title).filter(Boolean);
  return (
    <Link to={routes.flow(flow.slug)} className="flow-card">
      <span className="flow-card__top">
        <span className="eyebrow">{flow.category}</span>
        <StatusBadge status={flow.status} />
      </span>
      <span className="flow-card__name">{flow.name}</span>
      <span className="flow-card__desc">{flow.description}</span>
      <span className="flow-card__concepts">{concepts.join(' · ')}</span>
      <span className="flow-card__cta">Explore flow</span>
    </Link>
  );
}
