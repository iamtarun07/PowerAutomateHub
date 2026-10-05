import type { NoteSection } from '../../types/note';
import { DataTable } from '../common/DataTable';
import { ExpressionBlock } from './ExpressionBlock';
import './documentation.css';

export function NoteSectionBlock({ section }: { section: NoteSection }) {
  return (
    <div className="note-section">
      <h3>{section.heading}</h3>
      {section.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {section.table && <DataTable caption={section.heading} columns={section.table.columns} rows={section.table.rows} />}
      {section.samples?.map((s) => <ExpressionBlock key={s.code} {...s} />)}
    </div>
  );
}
