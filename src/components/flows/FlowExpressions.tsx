import type { CodeSample } from '../../types/content';
import { Section } from '../common/Section';
import { ExpressionBlock } from '../documentation/ExpressionBlock';
import './flows.css';

export function FlowExpressions({ expressions }: { expressions: CodeSample[] }) {
  return (
    <Section id="expressions" title="Important expressions">
      <div className="expr-list">
        {expressions.map((e) => (
          <ExpressionBlock key={e.title ?? e.code} {...e} />
        ))}
      </div>
    </Section>
  );
}
