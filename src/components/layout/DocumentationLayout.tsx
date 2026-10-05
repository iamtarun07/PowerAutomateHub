import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useHashScroll } from '../../hooks/useHashScroll';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import './layout.css';

/** App shell: header, sidebar (drawer below 960px) and the routed page. */
export function DocumentationLayout() {
  const [navOpen, setNavOpen] = useState(false);
  useHashScroll();

  return (
    <div className="shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header navOpen={navOpen} onToggleNav={() => setNavOpen((o) => !o)} />
      <div className="shell__body">
        <Sidebar open={navOpen} onNavigate={() => setNavOpen(false)} />
        {navOpen && <div className="shell__scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />}
        <main id="main" className="main" tabIndex={-1}>
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
