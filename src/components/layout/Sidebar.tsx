import { NavLink } from 'react-router-dom';
import { navigation } from '../../data/navigation';
import './layout.css';

interface SidebarProps {
  open: boolean;
  onNavigate: () => void;
}

export function Sidebar({ open, onNavigate }: SidebarProps) {
  return (
    <nav id="site-nav" className={`sidebar${open ? ' sidebar--open' : ''}`} aria-label="Documentation">
      {navigation.map((group, i) => (
        <div className="sidebar__group" key={group.title ?? i}>
          {group.title && <h2 className="sidebar__title">{group.title}</h2>}
          <ul className="sidebar__list">
            {group.items.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end className="sidebar__link" onClick={onNavigate}>
                  {item.marker && <span className="sidebar__marker">{item.marker}</span>}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
