import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { PageHeader } from '../../components/documentation/PageHeader';
import { FlowList } from '../../components/flows/FlowList';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { routes } from '../../utils/routes';

export function FlowsIndexPage() {
  useDocumentTitle('Flows');
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Hub', to: routes.home }]} current="Flows" />
      <PageHeader
        eyebrow="Automation"
        title="My automation flows"
        lede="Each flow page documents the trigger, steps, architecture diagram, expressions, error handling and test results."
      />
      <FlowList />
    </>
  );
}
