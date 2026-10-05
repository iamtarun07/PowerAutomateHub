import type { Flow } from '../../types/flow';

const phases = ['Requirements', 'Design', 'Estimation', 'Development', 'SIT', 'UAT', 'VAPT', 'CAB'];

export const epicAutoCreateFeatures: Flow = {
  slug: 'ado-epic-auto-create-features',
  name: 'Epic Auto-Create Features',
  description: 'Creates a standard set of eight delivery-phase Features under every new Epic.',
  category: 'Azure DevOps',
  integrations: ['Azure DevOps'],
  status: 'Testing',
  trigger: 'Azure DevOps: When a work item is created (type Epic)',
  overview: {
    what: `When an Epic is created, the flow loops over a fixed list of phase names and creates one Feature per phase, linked as a child of the Epic: ${phases.join(', ')}.`,
    why: 'Every Epic follows the same delivery lifecycle. Creating the phase Features by hand is repetitive and easy to get wrong.',
    problem: 'Missing or misnamed phase Features make Epics hard to track and compare.',
    automates: 'Feature creation for new Epics in one Azure DevOps project.',
  },
  steps: [
    { title: 'Trigger', description: 'A new work item of type Epic is created. The trigger polls every minute and is scoped to one team.' },
    { title: 'Define the phases', description: 'An array variable holds the eight Feature titles.' },
    { title: 'Loop over phases', description: 'Apply to each runs once per phase name.' },
    { title: 'Create the Feature', description: 'Create a work item of type Feature titled with the current phase, tagged EpicAutoFeature, linked to the Epic with a Hierarchy-reverse link.' },
  ],
  diagram: {
    columns: 2,
    rows: 5,
    nodes: [
      { id: 'trigger', label: 'Epic created', detail: 'ADO trigger, 1 min polling', kind: 'trigger', col: 0, row: 0 },
      { id: 'array', label: 'Phase list', detail: 'array variable, 8 items', kind: 'variable', col: 0, row: 1 },
      { id: 'each', label: 'Apply to each', detail: 'one pass per phase', kind: 'loop', col: 0, row: 2 },
      { id: 'create', label: 'Create Feature', detail: 'Hierarchy-reverse link', kind: 'ado', col: 0, row: 3 },
      { id: 'done', label: '8 Features linked', kind: 'success', col: 0, row: 4 },
      { id: 'fail', label: 'Create fails', detail: 'no handler yet', kind: 'failure', col: 1, row: 3 },
    ],
    edges: [
      { from: 'trigger', to: 'array' },
      { from: 'array', to: 'each' },
      { from: 'each', to: 'create' },
      { from: 'create', to: 'fail', label: 'fails', tone: 'fail' },
      { from: 'create', to: 'each', label: 'next phase', tone: 'loop', lane: 1 },
      { from: 'each', to: 'done', label: 'all done', tone: 'loop', lane: 2 },
    ],
  },
  components: [
    { name: 'Azure DevOps trigger', note: 'triggers', purpose: '"When a work item is created" filtered to type Epic and the project default team.' },
    { name: 'Initialize variable (Array)', note: 'variables', purpose: 'Keeps the phase names in one place so the list can be changed without touching the loop.' },
    { name: 'Apply to each', note: 'loops', purpose: 'Creates one Feature per array item.' },
    { name: 'Create a work item', note: 'azure-devops-connector', purpose: 'Connector action that creates the Feature and the parent link in one call.' },
  ],
  expressions: [
    { title: 'Feature title', code: "items('Apply_to_each')", explanation: 'The current phase name inside the loop.' },
    {
      title: 'Parent link URL',
      code: "concat(\n  'https://dev.azure.com/{organization}/{project}/_apis/wit/workItems/',\n  triggerOutputs()?['body/id']\n)",
      explanation: 'Link URL of the new Epic. With link type Hierarchy-reverse the new Feature becomes its child. Organization and project are placeholders.',
    },
    { title: 'Phase list (array)', language: 'json', code: JSON.stringify(phases, null, 2), explanation: 'Value of the array variable.' },
  ],
  logic: [
    { name: 'Trigger filter', rule: 'Work item type equals Epic', onTrue: 'Run the flow', onFalse: 'No run' },
  ],
  errorHandling: [
    { title: 'Not implemented yet', description: 'No retry policy, scope or failure branch is configured. A failed create leaves the Epic with fewer than eight Features. Placeholder: document the chosen handling once added.' },
  ],
  testing: [
    { id: 'T1', scenario: 'New Epic', input: 'Create Epic #1001', expected: 'Eight Features linked as children', actual: 'Not documented', status: 'Not run' },
    { id: 'T2', scenario: 'Created in another team', input: 'Epic outside the trigger team', expected: 'No Features created', actual: 'Not documented', status: 'Not run' },
  ],
  configuration: [
    { setting: 'Trigger type filter', value: 'Epic' },
    { setting: 'Team', value: 'Project default team' },
    { setting: 'Polling', value: 'Every 1 minute' },
    { setting: 'Feature tag', value: 'EpicAutoFeature' },
    { setting: 'Link type', value: 'Hierarchy-reverse' },
  ],
  expectedBehavior: [
    'Each new Epic receives eight child Features named after the phases, in list order.',
    'Existing Epics are not changed.',
    'Re-saving an Epic does not create duplicates because the trigger fires on creation only.',
  ],
  notes: [
    'Features are created in sequence. Apply to each concurrency is left at the default.',
    'Closing these Features interacts with the Parent Auto-Close flow: an Epic closes only when all eight are Closed.',
  ],
  placeholders: ['Error handling', 'Test results'],
  related: ['triggers', 'variables', 'loops', 'azure-devops-connector', 'expressions'],
  keywords: ['epic', 'feature', 'create', 'apply to each', 'array', 'phases'],
};
