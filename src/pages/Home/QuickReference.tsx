import { Link } from 'react-router-dom';
import { functions } from '../../data/reference/functions';
import { DataTable } from '../../components/common/DataTable';
import { Section } from '../../components/common/Section';
import { routes } from '../../utils/routes';

const PICK = ['equals', 'coalesce', 'empty', 'length', 'split', 'int'];

export function QuickReference() {
  const rows = functions
    .filter((f) => PICK.includes(f.name))
    .map((f) => [<Link to={`${routes.functions}#fn-${f.name}`}>{f.signature}</Link>, f.returns, <code>{f.example}</code>]);
  return (
    <Section id="quick-reference" title="Quick reference" eyebrow="Expressions">
      <DataTable caption="Frequently used functions" columns={['Function', 'Returns', 'Example']} rows={rows} />
      <p className="muted">
        <Link to={routes.functions}>All functions</Link> · <Link to={routes.recipes}>Expression recipes</Link> ·{' '}
        <Link to={routes.patterns}>Design patterns</Link>
      </p>
    </Section>
  );
}
