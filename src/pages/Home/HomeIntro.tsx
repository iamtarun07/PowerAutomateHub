import { Link } from 'react-router-dom';
import { LinkButton } from '../../components/common/LinkButton';
import { routes } from '../../utils/routes';
import '../pages.css';

export function HomeIntro() {
  return (
    <header className="home-intro">
      <span className="eyebrow">Power Automate</span>
      <h1>Automation Knowledge Hub</h1>
      <p className="home-intro__lede">
        A practical documentation space for understanding Power Automate and the automation workflows built with it.
      </p>
      <div className="home-intro__actions">
        <LinkButton to={routes.note('first-flow')} variant="primary">
          Build your first flow
        </LinkButton>
        <LinkButton to={routes.notes}>Explore notes</LinkButton>
        <LinkButton to={routes.flows}>View flows</LinkButton>
      </div>
      <div className="home-intro__what">
        <h2 className="eyebrow">What Power Automate is</h2>
        <p>
          A cloud flow is one trigger followed by actions. The trigger reacts to an event, a schedule or a button; each
          action calls a connector or transforms data and records its inputs and outputs in run history. Logic lives in
          conditions, loops and scopes, and values are wired together with dynamic content and expressions.{' '}
          <Link to={routes.note('overview')}>Read the overview</Link>.
        </p>
      </div>
    </header>
  );
}
