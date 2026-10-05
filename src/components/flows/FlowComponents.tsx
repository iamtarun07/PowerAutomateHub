import { Link } from 'react-router-dom';
import type { FlowComponent } from '../../types/flow';
import { DataTable } from '../common/DataTable';
import { Section } from '../common/Section';
import { routes } from '../../utils/routes';

export function FlowComponents({ components }: { components: FlowComponent[] }) {
  return (
    <Section id="components" title="Power Automate components">
      <DataTable
        caption="Components used by this flow"
        columns={['Component', 'Why it is used']}
        rows={components.map((c) => [<Link to={routes.note(c.note)}>{c.name}</Link>, c.purpose])}
      />
    </Section>
  );
}
