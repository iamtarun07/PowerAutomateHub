import { recipes } from '../../data/reference/recipes';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { PageHeader } from '../../components/documentation/PageHeader';
import { ExpressionBlock } from '../../components/documentation/ExpressionBlock';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { routes } from '../../utils/routes';
import '../pages.css';

export function RecipesPage() {
  useDocumentTitle('Expressions');
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Hub', to: routes.home }]} current="Expressions" />
      <PageHeader
        eyebrow="Reference"
        title="Expression recipes"
        lede="Small, reusable expressions for problems that come up in almost every flow."
      />
      <div className="recipes">
        {recipes.map((r) => (
          <section key={r.slug} id={r.slug} className="recipe" aria-labelledby={`${r.slug}-t`}>
            <h2 id={`${r.slug}-t`} className="recipe__title">
              {r.title}
            </h2>
            <p className="muted">{r.problem}</p>
            <ExpressionBlock code={r.code} explanation={r.explanation} />
          </section>
        ))}
      </div>
    </>
  );
}
