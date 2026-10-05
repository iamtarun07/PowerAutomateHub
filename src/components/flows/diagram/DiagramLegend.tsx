import type { NodeKind } from '../../../types/diagram';
import { KindMarker } from '../../common/KindMarker';

const LABELS: Record<NodeKind, string> = {
  trigger: 'Trigger',
  action: 'Action',
  condition: 'Condition',
  loop: 'Loop',
  scope: 'Scope',
  http: 'HTTP',
  ado: 'Azure DevOps call',
  data: 'Data operation',
  variable: 'Variable',
  success: 'Success path',
  failure: 'Failure path',
  end: 'Stop / end',
};

export function DiagramLegend({ kinds }: { kinds: NodeKind[] }) {
  return (
    <figcaption className="diagram__legend">
      {kinds.map((k) => (
        <span key={k} className="diagram__legend-item">
          <KindMarker kind={k} />
          {LABELS[k]}
        </span>
      ))}
      <span className="diagram__legend-item diagram__legend-item--edge">Dashed: no / failure branch</span>
    </figcaption>
  );
}
