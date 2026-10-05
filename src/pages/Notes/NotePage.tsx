import { useParams } from 'react-router-dom';
import { findNote } from '../../data/notes';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { Section } from '../../components/common/Section';
import { PageHeader } from '../../components/documentation/PageHeader';
import { NoteFacts } from '../../components/documentation/NoteFacts';
import { NoteSectionBlock } from '../../components/documentation/NoteSectionBlock';
import { FunctionList } from '../../components/documentation/FunctionList';
import { RelatedLinks } from '../../components/documentation/RelatedLinks';
import { ExerciseBlock } from '../../components/documentation/ExerciseBlock';
import { Badge } from '../../components/common/Badge';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { routes } from '../../utils/routes';
import { NotFoundPage } from '../NotFound/NotFoundPage';
import { NotePager } from './NotePager';

export function NotePage() {
  const note = findNote(useParams().slug);
  useDocumentTitle(note?.title);
  if (!note) return <NotFoundPage />;

  return (
    <article>
      <Breadcrumbs
        trail={[
          { label: 'Hub', to: routes.home },
          { label: 'Notes', to: routes.notes },
        ]}
        current={note.title}
      />
      <PageHeader eyebrow={`Note ${String(note.number).padStart(2, '0')}`} title={note.title} lede={note.summary}>
        <Badge>{note.group}</Badge>
      </PageHeader>
      <NoteFacts note={note} />
      {note.sections.length > 0 && (
        <Section id="details" title="Details">
          {note.sections.map((s) => (
            <NoteSectionBlock key={s.heading} section={s} />
          ))}
        </Section>
      )}
      {note.embedsFunctionReference && (
        <Section id="functions" title="Functions">
          <FunctionList />
        </Section>
      )}
      {note.exercise && (
        <Section id="exercise" title="Try it yourself" eyebrow="Exercise">
          <ExerciseBlock exercise={note.exercise} />
        </Section>
      )}
      <Section id="related" title="Related concepts">
        <RelatedLinks slugs={note.related} />
      </Section>
      <NotePager current={note.number} />
    </article>
  );
}
