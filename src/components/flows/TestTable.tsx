import type { TestCase } from '../../types/flow';
import { DataTable } from '../common/DataTable';
import { Section } from '../common/Section';
import { StatusBadge } from '../common/StatusBadge';
import './flows.css';

export function TestTable({ tests }: { tests: TestCase[] }) {
  const passed = tests.filter((t) => t.status === 'Pass').length;
  return (
    <Section id="testing" title="Testing">
      <p className="muted">
        {passed} of {tests.length} cases passed. Work item numbers are fictional examples.
      </p>
      <DataTable
        caption="Test cases"
        columns={['ID', 'Test case', 'Input', 'Expected', 'Actual', 'Status']}
        rows={tests.map((t) => [
          <code>{t.id}</code>,
          t.scenario,
          t.input,
          t.expected,
          t.actual,
          <StatusBadge status={t.status} />,
        ])}
      />
    </Section>
  );
}
