import './common.css';

interface SectionProps {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}

/** Titled page section with an anchor id, used by every content page. */
export function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <header className="section__header">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 id={`${id}-title`}>{title}</h2>
      </header>
      {children}
    </section>
  );
}
