import type { LogicRule } from '../../types/flow';
import { DataTable } from '../common/DataTable';
import { Section } from '../common/Section';

export function FlowLogic({ logic }: { logic: LogicRule[] }) {
  return (
    <Section id="logic" title="Flow logic">
      <DataTable
        caption="Conditions and branches"
        columns={['Condition', 'Rule', 'True', 'False']}
        rows={logic.map((l) => [<code>{l.name}</code>, l.rule, l.onTrue, l.onFalse])}
      />
    </Section>
  );
}
