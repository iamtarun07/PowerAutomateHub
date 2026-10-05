import type { NodeKind } from '../../types/diagram';
import './common.css';

/** Small square in the semantic color of a node kind. */
export function KindMarker({ kind }: { kind: NodeKind }) {
  return <span className="kind-marker" style={{ background: `var(--k-${kind})` }} aria-hidden="true" />;
}
