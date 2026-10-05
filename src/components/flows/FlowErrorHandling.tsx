import type { Flow } from '../../types/flow';
import { Section } from '../common/Section';
import './flows.css';

export function FlowErrorHandling({ items }: { items: Flow['errorHandling'] }) {
  return (
    <Section id="error-handling" title="Error handling">
      <dl className="overview">
        {items.map((i) => (
          <div key={i.title} className="overview__row">
            <dt>{i.title}</dt>
            <dd>{i.description}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
