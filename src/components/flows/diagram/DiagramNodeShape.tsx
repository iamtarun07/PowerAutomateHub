import type { DiagramNode } from '../../../types/diagram';
import { NODE_H, NODE_W, type Box } from './layout';

/** Kinds whose outline carries meaning, not just their side bar. */
const OUTLINED = new Set(['condition', 'success', 'failure']);

export function DiagramNodeShape({ node, box }: { node: DiagramNode; box: Box }) {
  const color = `var(--k-${node.kind})`;
  return (
    <g className={`dnode dnode--${node.kind}`} transform={`translate(${box.x} ${box.y})`}>
      <title>{node.detail ? `${node.label}: ${node.detail}` : node.label}</title>
      <rect
        className="dnode__box"
        width={NODE_W}
        height={NODE_H}
        rx={4}
        style={{ fill: 'var(--surface)', stroke: OUTLINED.has(node.kind) ? color : 'var(--border-strong)' }}
      />
      <rect width={4} height={NODE_H} rx={1} style={{ fill: color }} />
      <text x={16} y={node.detail ? 21 : 30} className="dnode__label">
        {node.label}
      </text>
      {node.detail && (
        <text x={16} y={38} className="dnode__detail">
          {node.detail}
        </text>
      )}
    </g>
  );
}
