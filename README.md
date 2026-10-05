# Power Automate Hub

Documentation portal for Power Automate concepts and documented automation flows.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # type check + production build to dist/
npm run lint
npm run typecheck
```

`dist/` is static and uses hash routing (`#/flows/...`), so it works on any static host without rewrite rules. To use clean URLs, switch `createHashRouter` to `createBrowserRouter` in `src/app/router.tsx` and configure the host to serve `index.html` for unknown paths.

## Structure

```
src/
  app/            router and root component
  components/
    layout/       shell, header, sidebar, breadcrumbs, footer
    common/       badge, section, table, search, buttons
    documentation/ code blocks, note blocks, related links, function list
    flows/        flow page sections; diagram/ holds the SVG diagram engine
  pages/          route components that compose the above
  data/
    flows/        one file per flow
    notes/        notes grouped by topic
    reference/    functions, expression recipes, patterns
  types/          content types shared by data and components
  utils/          routes, search index, syntax tokenizer
  styles/         design tokens (light and dark) and base styles
```

## Add a flow

1. Create `src/data/flows/<slug>.ts` exporting a `Flow` (see `src/types/flow.ts`).
2. Add it to the array in `src/data/flows/index.ts`.

The sidebar, home page, flows index, search and the `/flows/<slug>` route pick it up automatically.

Diagram nodes are placed on a grid (`col`, `row`). Edges route automatically; set `lane: 1` or `lane: 2` for loop-back and loop-exit edges so they run left of the main column.

## Add a note

Add a `Note` object to the matching file in `src/data/notes/`. Numbering controls order in the sidebar and the previous / next links.

## Public content rules

Document flows at the pattern level. Use fictional IDs (#1001), `example.com` addresses and placeholders such as `{organization}` and `{project}`. Never put secrets in `VITE_*` variables: everything in the frontend bundle is public.
