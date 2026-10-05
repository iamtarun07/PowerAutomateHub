import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to an in-page anchor after navigation, or to the top for a new page. */
export function useHashScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
}
