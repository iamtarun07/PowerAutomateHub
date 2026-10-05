import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { search } from '../../utils/searchIndex';
import { SearchResults } from './SearchResults';
import './search.css';

/** Header search: type, arrow through results, Enter to open. Press / to focus. */
export function Search() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const listId = useId();
  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (to: string) => {
    navigate(to);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      go(results[active].to);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const showResults = open && query.trim().length > 0;

  return (
    <div className="search" role="search">
      <label htmlFor="site-search" className="visually-hidden">
        Search documentation
      </label>
      <input
        ref={inputRef}
        id="site-search"
        className="search__input"
        type="search"
        placeholder="Search notes, functions, flows"
        autoComplete="off"
        role="combobox"
        aria-expanded={showResults}
        aria-controls={listId}
        aria-activedescendant={showResults && results[active] ? `${listId}-${active}` : undefined}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
      />
      <kbd className="search__hint" aria-hidden="true">
        /
      </kbd>
      {showResults && <SearchResults id={listId} results={results} active={active} onPick={go} />}
    </div>
  );
}
