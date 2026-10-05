import type { Flow } from '../../types/flow';
import { Section } from '../common/Section';
import { Callout } from '../documentation/Callout';
import './flows.css';

/** Expected behavior, implementation warnings and any sections still to be documented. */
export function FlowBehavior({ flow }: { flow: Flow }) {
  return (
    <>
      <Section id="expected-behavior" title="Expected behavior">
        <ul className="bullets">
          {flow.expectedBehavior.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>
      <Section id="notes" title="Important notes">
        <div className="stack">
          {flow.notes.map((n) => (
            <Callout key={n} title="Implementation note" tone="warning">
              <p>{n}</p>
            </Callout>
          ))}
          {flow.placeholders && (
            <Callout title="Placeholder: not yet documented">
              <p>
                These parts are not in the current implementation or were not recorded: {flow.placeholders.join(', ')}.
              </p>
            </Callout>
          )}
        </div>
      </Section>
    </>
  );
}
