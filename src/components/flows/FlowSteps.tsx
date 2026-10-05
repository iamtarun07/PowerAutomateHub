import type { FlowStep } from '../../types/flow';
import { Section } from '../common/Section';
import './flows.css';

/** Numbered because the order is the actual execution sequence. */
export function FlowSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <Section id="how-it-works" title="How it works">
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.title} className="steps__item">
            <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
