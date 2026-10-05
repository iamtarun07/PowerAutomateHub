import type { SearchEntry } from '../../utils/searchIndex';

interface SearchResultsProps {
  id: string;
  results: SearchEntry[];
  active: number;
  onPick: (to: string) => void;
}

export function SearchResults({ id, results, active, onPick }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="search__panel search__empty" id={id} role="status">
        No matches. Try a function name such as coalesce, or a concept such as scope.
      </div>
    );
  }
  return (
    <ul className="search__panel" id={id} role="listbox" aria-label="Search results">
      {results.map((r, i) => (
        <li
          key={r.to}
          id={`${id}-${i}`}
          role="option"
          aria-selected={i === active}
          className="search__item"
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(r.to);
          }}
        >
          <span className="search__kind">{r.kind}</span>
          <span className="search__title">{r.title}</span>
          <span className="search__summary">{r.summary}</span>
        </li>
      ))}
    </ul>
  );
}
