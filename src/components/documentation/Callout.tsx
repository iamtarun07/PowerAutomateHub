import './documentation.css';

interface CalloutProps {
  title: string;
  tone?: 'info' | 'warning';
  children: React.ReactNode;
}

export function Callout({ title, tone = 'info', children }: CalloutProps) {
  return (
    <aside className={`callout callout--${tone}`} aria-label={title}>
      <strong>{title}</strong>
      {children}
    </aside>
  );
}
