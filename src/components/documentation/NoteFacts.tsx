import type { Note } from '../../types/note';
import { ExpressionBlock } from './ExpressionBlock';
import './documentation.css';

/** The fixed five-part explanation every note has: what, why, when, example, common mistake. */
export function NoteFacts({ note }: { note: Note }) {
  const facts = [
    ['What it is', note.what],
    ['Why it is used', note.why],
    ['When to use it', note.when],
  ];
  return (
    <div className="facts">
      <dl className="facts__list">
        {facts.map(([term, text]) => (
          <div className="facts__row" key={term}>
            <dt>{term}</dt>
            <dd>{text}</dd>
          </div>
        ))}
      </dl>
      <ExpressionBlock {...note.example} />
      <aside className="callout callout--warning" aria-label="Common mistake">
        <strong>Common mistake</strong>
        <p>{note.commonMistake}</p>
      </aside>
    </div>
  );
}
