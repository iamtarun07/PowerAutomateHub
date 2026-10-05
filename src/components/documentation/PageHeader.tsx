import './documentation.css';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lede: string;
  children?: React.ReactNode;
}

/** Title block at the top of every page; children render as a metadata row. */
export function PageHeader({ eyebrow, title, lede, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      <p className="page-header__lede">{lede}</p>
      {children && <div className="page-header__meta">{children}</div>}
    </header>
  );
}
