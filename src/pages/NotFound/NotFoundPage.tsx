import { LinkButton } from '../../components/common/LinkButton';
import { PageHeader } from '../../components/documentation/PageHeader';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { routes } from '../../utils/routes';

export function NotFoundPage() {
  useDocumentTitle('Not found');
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="Page not found"
        lede="This address does not match a note, flow or reference page. Use the sidebar or search, or start from the hub."
      />
      <LinkButton to={routes.home} variant="primary">
        Go to the hub
      </LinkButton>
    </>
  );
}
