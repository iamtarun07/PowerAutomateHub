import type { ConfigItem } from '../../types/flow';
import { DataTable } from '../common/DataTable';
import { Section } from '../common/Section';

export function FlowConfiguration({ items }: { items: ConfigItem[] }) {
  return (
    <Section id="configuration" title="Configuration">
      <DataTable
        caption="Configuration settings"
        columns={['Setting', 'Value', 'Notes']}
        rows={items.map((c) => [c.setting, <code>{c.value}</code>, c.notes ?? ''])}
      />
    </Section>
  );
}
