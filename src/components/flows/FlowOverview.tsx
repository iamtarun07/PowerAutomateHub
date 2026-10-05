import type { Flow } from '../../types/flow';
import { Section } from '../common/Section';
import './flows.css';

export function FlowOverview({ flow }: { flow: Flow }) {
  const rows = [
    ['What it does', flow.overview.what],
    ['Why it exists', flow.overview.why],
    ['Problem solved', flow.overview.problem],
    ['Automates', flow.overview.automates],
  ];
  return (
    <Section id="overview" title="Overview">
      <dl className="overview">
        {rows.map(([term, text]) => (
          <div key={term} className="overview__row">
            <dt>{term}</dt>
            <dd>{text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
