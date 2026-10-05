import type { NodeKind } from '../types/diagram';

export interface BuildingBlock {
  name: string;
  kind: NodeKind;
  note: string;
  oneLine: string;
}

/** Core building blocks shown on the home page; each links to its note. */
export const buildingBlocks: BuildingBlock[] = [
  { name: 'Trigger', kind: 'trigger', note: 'triggers', oneLine: 'Starts a run and provides the first outputs.' },
  { name: 'Action', kind: 'action', note: 'actions', oneLine: 'Does work; finishes Succeeded, Failed, Skipped or TimedOut.' },
  { name: 'Compose', kind: 'data', note: 'compose', oneLine: 'Evaluates a value once for reuse and debugging.' },
  { name: 'Variable', kind: 'variable', note: 'variables', oneLine: 'State that changes during the run.' },
  { name: 'Condition', kind: 'condition', note: 'conditions', oneLine: 'Two branches from AND / OR rows.' },
  { name: 'Switch', kind: 'condition', note: 'switch', oneLine: 'Many exact cases on one value.' },
  { name: 'Parse JSON', kind: 'data', note: 'parse-json', oneLine: 'Typed tokens from untyped JSON.' },
  { name: 'Expression', kind: 'data', note: 'expressions', oneLine: 'Formula evaluated at run time, entered via fx.' },
  { name: 'Apply to each', kind: 'loop', note: 'loops', oneLine: 'Runs actions per array item.' },
  { name: 'Do until', kind: 'loop', note: 'loops', oneLine: 'Repeats until an exit expression is true.' },
  { name: 'Scope', kind: 'scope', note: 'scopes', oneLine: 'Groups actions for Try / Catch handling.' },
  { name: 'HTTP', kind: 'http', note: 'http', oneLine: 'Direct REST calls with method, URI, headers, body.' },
  { name: 'Connector', kind: 'ado', note: 'connectors', oneLine: 'Typed triggers and actions over a stored connection.' },
];
