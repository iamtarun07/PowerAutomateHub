import { Section } from '../../components/common/Section';
import { FlowList } from '../../components/flows/FlowList';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { HomeIntro } from './HomeIntro';
import { BuildingBlocks } from './BuildingBlocks';
import { ReadingPath } from './ReadingPath';
import { QuickReference } from './QuickReference';

export function HomePage() {
  useDocumentTitle();
  return (
    <>
      <HomeIntro />
      <BuildingBlocks />
      <Section id="automations" title="My automations" eyebrow="Flows">
        <FlowList />
      </Section>
      <ReadingPath />
      <QuickReference />
    </>
  );
}
