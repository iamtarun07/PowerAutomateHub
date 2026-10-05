import { useId, useMemo } from 'react';
import type { FlowDiagramData } from '../../../types/diagram';
import { boxFor, canvasSize, routeEdge } from './layout';
import { DiagramNodeShape } from './DiagramNodeShape';
import { DiagramEdgePath } from './DiagramEdgePath';
import { EDGE_TONES, edgeColor } from './edgeStyle';
import { DiagramLegend } from './DiagramLegend';
import './diagram.css';

/** Data-driven architecture diagram. Scrolls horizontally on narrow screens instead of shrinking text. */
export function FlowDiagram({ diagram, title }: { diagram: FlowDiagramData; title: string }) {
  const markerPrefix = useId().replace(/:/g, '');
  const { width, height } = canvasSize(diagram);

  const { boxes, routed } = useMemo(() => {
    const boxes = new Map(diagram.nodes.map((n) => [n.id, boxFor(n)]));
    const routed = diagram.edges.flatMap((e) => {
      const a = boxes.get(e.from);
      const b = boxes.get(e.to);
      return a && b ? [routeEdge(e, a, b)] : [];
    });
    return { boxes, routed };
  }, [diagram]);

  return (
    <figure className="diagram">
      <div className="diagram__scroll" tabIndex={0} aria-label={`${title} diagram, scrollable`}>
        <svg
          className="diagram__svg"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${title}: ${diagram.nodes.map((n) => n.label).join(', ')}`}
        >
          <defs>
            {EDGE_TONES.map((tone) => (
              <marker
                key={tone}
                id={`${markerPrefix}-${tone}`}
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" style={{ fill: edgeColor(tone) }} />
              </marker>
            ))}
          </defs>
          {routed.map((r, i) => (
            <DiagramEdgePath key={i} routed={r} markerPrefix={markerPrefix} />
          ))}
          {diagram.nodes.map((n) => (
            <DiagramNodeShape key={n.id} node={n} box={boxes.get(n.id)!} />
          ))}
        </svg>
      </div>
      <DiagramLegend kinds={[...new Set(diagram.nodes.map((n) => n.kind))]} />
    </figure>
  );
}
