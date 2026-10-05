import { useParams } from 'react-router-dom';
import { findFlow } from '../../data/flows';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { Section } from '../../components/common/Section';
import { RelatedLinks } from '../../components/documentation/RelatedLinks';
import { FlowHeader } from '../../components/flows/FlowHeader';
import { FlowOverview } from '../../components/flows/FlowOverview';
import { FlowDiagram } from '../../components/flows/diagram/FlowDiagram';
import { FlowSteps } from '../../components/flows/FlowSteps';
import { FlowComponents } from '../../components/flows/FlowComponents';
import { FlowExpressions } from '../../components/flows/FlowExpressions';
import { FlowLogic } from '../../components/flows/FlowLogic';
import { FlowErrorHandling } from '../../components/flows/FlowErrorHandling';
import { TestTable } from '../../components/flows/TestTable';
import { FlowConfiguration } from '../../components/flows/FlowConfiguration';
import { FlowBehavior } from '../../components/flows/FlowBehavior';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { routes } from '../../utils/routes';
import { NotFoundPage } from '../NotFound/NotFoundPage';

export function FlowDetailPage() {
  const flow = findFlow(useParams().slug);
  useDocumentTitle(flow?.name);
  if (!flow) return <NotFoundPage />;

  return (
    <article>
      <Breadcrumbs
        trail={[
          { label: 'Automation', to: routes.flows },
          { label: flow.category, to: routes.flows },
        ]}
        current={flow.name}
      />
      <FlowHeader flow={flow} />
      <FlowOverview flow={flow} />
      <Section id="architecture" title="Architecture">
        <FlowDiagram diagram={flow.diagram} title={flow.name} />
      </Section>
      <FlowSteps steps={flow.steps} />
      <FlowComponents components={flow.components} />
      <FlowExpressions expressions={flow.expressions} />
      <FlowLogic logic={flow.logic} />
      <FlowErrorHandling items={flow.errorHandling} />
      <TestTable tests={flow.testing} />
      <FlowConfiguration items={flow.configuration} />
      <FlowBehavior flow={flow} />
      <Section id="related" title="Related concepts">
        <RelatedLinks slugs={flow.related} />
      </Section>
    </article>
  );
}
