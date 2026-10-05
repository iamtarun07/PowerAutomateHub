import { flows } from '../../data/flows';
import { FlowCard } from './FlowCard';
import './flows.css';

export function FlowList() {
  return (
    <ul className="flow-list">
      {flows.map((f) => (
        <li key={f.slug}>
          <FlowCard flow={f} />
        </li>
      ))}
    </ul>
  );
}
