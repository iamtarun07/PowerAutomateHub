import type { Flow } from '../../types/flow';
import { Badge } from '../common/Badge';
import { StatusBadge } from '../common/StatusBadge';
import { PageHeader } from '../documentation/PageHeader';

export function FlowHeader({ flow }: { flow: Flow }) {
  return (
    <PageHeader eyebrow={`Flow · ${flow.category}`} title={flow.name} lede={flow.description}>
      <StatusBadge status={flow.status} />
      <Badge tone="accent">Power Automate</Badge>
      {flow.integrations.map((i) => (
        <Badge key={i}>{i}</Badge>
      ))}
      <Badge>Trigger: {flow.trigger}</Badge>
    </PageHeader>
  );
}
