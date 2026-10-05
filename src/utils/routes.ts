/** Single source for internal URLs so links never drift from the router. */
export const routes = {
  home: '/',
  notes: '/notes',
  note: (slug: string) => `/notes/${slug}`,
  flows: '/flows',
  flow: (slug: string) => `/flows/${slug}`,
  functions: '/reference/functions',
  recipes: '/reference/expressions',
  patterns: '/reference/patterns',
  pattern: (slug: string) => `/reference/patterns#${slug}`,
};
