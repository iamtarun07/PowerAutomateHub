import { notes, noteGroups } from '../../data/notes';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { Section } from '../../components/common/Section';
import { PageHeader } from '../../components/documentation/PageHeader';
import { RelatedLinks } from '../../components/documentation/RelatedLinks';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { routes } from '../../utils/routes';

export function NotesIndexPage() {
  useDocumentTitle('Notes');
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Hub', to: routes.home }]} current="Notes" />
      <PageHeader
        eyebrow="Learn"
        title="Power Automate notes"
        lede={`${notes.length} topics in learning order. New to Power Automate? Start with Getting started and do the exercise at the end of each note.`}
      />
      {noteGroups.map((g) => (
        <Section key={g} id={g.toLowerCase().replace(/\s+/g, '-')} title={g}>
          <RelatedLinks slugs={notes.filter((n) => n.group === g).map((n) => n.slug)} />
        </Section>
      ))}
    </>
  );
}
