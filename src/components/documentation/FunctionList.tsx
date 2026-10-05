import { functions } from '../../data/reference/functions';
import { ExpressionBlock } from './ExpressionBlock';
import './documentation.css';

/** Function reference entries, each with an anchor for search and deep links. */
export function FunctionList() {
  return (
    <div className="fn-list">
      {functions.map((f) => (
        <article className="fn" id={`fn-${f.name}`} key={f.name}>
          <header className="fn__head">
            <h3>
              <code>{f.signature}</code>
            </h3>
            <span className="fn__returns">returns {f.returns}</span>
          </header>
          <p>{f.description}</p>
          <ExpressionBlock title="Example" code={f.example} explanation={`Result: ${f.result}`} />
          <p className="fn__mistake">
            <strong>Common mistake.</strong> {f.commonMistake}
          </p>
        </article>
      ))}
    </div>
  );
}
