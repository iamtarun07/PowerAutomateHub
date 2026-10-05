import { Link } from 'react-router-dom';
import './common.css';

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function LinkButton({ to, children, variant = 'secondary' }: LinkButtonProps) {
  return (
    <Link to={to} className={`button button--${variant}`}>
      {children}
    </Link>
  );
}
