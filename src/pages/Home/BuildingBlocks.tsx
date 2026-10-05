import { buildingBlocks } from '../../data/concepts';
import { ConceptCard } from '../../components/documentation/ConceptCard';
import { Section } from '../../components/common/Section';
import '../pages.css';

export function BuildingBlocks() {
  return (
    <Section id="building-blocks" title="Core building blocks" eyebrow="Concepts">
      <ul className="blocks">
        {buildingBlocks.map((b) => (
          <li key={b.name}>
            <ConceptCard block={b} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
