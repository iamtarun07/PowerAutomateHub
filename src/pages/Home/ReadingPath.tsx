import { Section } from '../../components/common/Section';
import { RelatedLinks } from '../../components/documentation/RelatedLinks';

/** Suggested order for someone new to flows; the order is the point. */
const PATH = ['first-flow', 'designer-tour', 'run-history-testing', 'dynamic-content', 'expressions', 'conditions', 'loops', 'scopes', 'error-handling'];

export function ReadingPath() {
  return (
    <Section id="reading-path" title="Reading path" eyebrow="Start here">
      <RelatedLinks slugs={PATH} />
    </Section>
  );
}
