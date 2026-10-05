import { createHashRouter } from 'react-router-dom';
import { DocumentationLayout } from '../components/layout/DocumentationLayout';
import { HomePage } from '../pages/Home/HomePage';
import { NotesIndexPage } from '../pages/Notes/NotesIndexPage';
import { NotePage } from '../pages/Notes/NotePage';
import { FlowsIndexPage } from '../pages/Flows/FlowsIndexPage';
import { FlowDetailPage } from '../pages/Flows/FlowDetailPage';
import { FunctionsPage } from '../pages/Reference/FunctionsPage';
import { RecipesPage } from '../pages/Reference/RecipesPage';
import { PatternsPage } from '../pages/Reference/PatternsPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

/**
 * Hash routing keeps deep links working on any static host without server rewrites.
 * Switch to createBrowserRouter when the host can rewrite unknown paths to index.html.
 */
export const router = createHashRouter([
  {
    element: <DocumentationLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'notes', element: <NotesIndexPage /> },
      { path: 'notes/:slug', element: <NotePage /> },
      { path: 'flows', element: <FlowsIndexPage /> },
      { path: 'flows/:slug', element: <FlowDetailPage /> },
      { path: 'reference/functions', element: <FunctionsPage /> },
      { path: 'reference/expressions', element: <RecipesPage /> },
      { path: 'reference/patterns', element: <PatternsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
