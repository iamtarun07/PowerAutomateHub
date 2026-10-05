import { Link } from 'react-router-dom';
import { Search } from '../common/Search';
import { routes } from '../../utils/routes';
import './layout.css';

interface HeaderProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

export function Header({ navOpen, onToggleNav }: HeaderProps) {
  return (
    <header className="header">
      <button
        type="button"
        className="header__menu"
        aria-expanded={navOpen}
        aria-controls="site-nav"
        onClick={onToggleNav}
      >
        <span className="header__menu-bars" aria-hidden="true" />
        <span className="visually-hidden">{navOpen ? 'Close navigation' : 'Open navigation'}</span>
      </button>
      <Link to={routes.home} className="header__brand" aria-label="Power Automate Hub home">
        <span className="header__mark" aria-hidden="true" />
        <span className="header__name">Power Automate Hub</span>
      </Link>
      <Search />
    </header>
  );
}
