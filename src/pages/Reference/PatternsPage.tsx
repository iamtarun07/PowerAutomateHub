import { patterns } from '../../data/reference/patterns';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { PageHeader } from '../../components/documentation/PageHeader';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { routes } from '../../utils/routes';
import { PatternEntry } from './PatternEntry';

export function PatternsPage() {
  useDocumentTitle('Patterns');
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Hub', to: routes.home }]} current="Patterns" />
      <PageHeader
        eyebrow="Reference"
        title="Design patterns"
        lede="Structures that recur across the documented flows, with when to use them and what goes wrong."
      />
      {patterns.map((p) => (
        <PatternEntry key={p.slug} pattern={p} />
      ))}
    </>
  );
}
