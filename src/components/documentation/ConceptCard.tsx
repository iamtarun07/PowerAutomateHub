import { Link } from 'react-router-dom';
import type { BuildingBlock } from '../../data/concepts';
import { KindMarker } from '../common/KindMarker';
import { routes } from '../../utils/routes';
import './documentation.css';

export function ConceptCard({ block }: { block: BuildingBlock }) {
  return (
    <Link to={routes.note(block.note)} className="concept">
      <span className="concept__name">
        <KindMarker kind={block.kind} />
        {block.name}
      </span>
      <span className="concept__line">{block.oneLine}</span>
    </Link>
  );
}
