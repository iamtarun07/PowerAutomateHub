import type { RoutedEdge } from './layout';
import { edgeColor } from './edgeStyle';

export function DiagramEdgePath({ routed, markerPrefix }: { routed: RoutedEdge; markerPrefix: string }) {
  const tone = routed.edge.tone ?? 'default';
  const { label } = routed.edge;
  return (
    <g className={`dedge dedge--${tone}`}>
      <path
        d={routed.path}
        fill="none"
        style={{ stroke: edgeColor(tone) }}
        strokeWidth={1.5}
        strokeDasharray={tone === 'no' || tone === 'fail' ? '4 3' : undefined}
        markerEnd={`url(#${markerPrefix}-${tone})`}
      />
      {label && (
        <text
          x={routed.labelX}
          y={routed.labelY}
          className="dedge__label"
          style={{ fill: edgeColor(tone) }}
          textAnchor={routed.anchor}
          transform={routed.rotated ? `rotate(-90 ${routed.labelX} ${routed.labelY})` : undefined}
        >
          {label}
        </text>
      )}
    </g>
  );
}
