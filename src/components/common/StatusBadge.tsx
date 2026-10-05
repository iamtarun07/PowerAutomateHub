import type { FlowStatus, TestStatus } from '../../types/flow';
import { Badge } from './Badge';

const tones = {
  Production: 'success',
  Testing: 'warning',
  Draft: 'neutral',
  Pass: 'success',
  Fail: 'danger',
  'Not run': 'neutral',
} as const;

export function StatusBadge({ status }: { status: FlowStatus | TestStatus }) {
  return <Badge tone={tones[status]}>{status}</Badge>;
}
