import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { PageHeader } from '../../components/documentation/PageHeader';
import { FunctionList } from '../../components/documentation/FunctionList';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { routes } from '../../utils/routes';

export function FunctionsPage() {
  useDocumentTitle('Functions');
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Hub', to: routes.home }]} current="Functions" />
      <PageHeader
        eyebrow="Reference"
        title="Expression functions"
        lede="Signature, return type, a working example and the mistake that most often breaks it."
      />
      <FunctionList />
    </>
  );
}
