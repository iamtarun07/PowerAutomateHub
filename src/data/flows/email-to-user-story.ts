import type { Flow } from '../../types/flow';

export const emailToUserStory: Flow = {
  slug: 'email-to-user-story',
  name: 'Email to User Story',
  description: 'Turns a tagged email into an Azure DevOps User Story with requirement and acceptance criteria parsed from the body.',
  category: 'Email',
  integrations: ['Office 365 Outlook', 'Azure DevOps'],
  status: 'Testing',
  trigger: 'Office 365 Outlook: When a new email arrives (V3)',
  overview: {
    what: 'An email with [ADO] in the subject becomes a User Story. The subject is the title, the text after "Requirement:" is the description, and the text after "Acceptance Criteria:" fills the acceptance criteria.',
    why: 'Requests often arrive by email. Copying them into Azure DevOps by hand loses detail and delays triage.',
    problem: 'Unstructured email text has to be split into the fields a User Story needs.',
    automates: 'Intake of requirement emails into the backlog.',
  },
  steps: [
    { title: 'Trigger', description: 'A new email arrives in the Inbox with [ADO] in the subject.' },
    { title: 'Capture the body', description: 'Compose stores the email body once so the parsing steps read the same value.' },
    { title: 'Extract the requirement', description: 'Split on "Requirement:" and "Acceptance Criteria:" and trim the text between them.' },
    { title: 'Extract acceptance criteria', description: 'Take everything after "Acceptance Criteria:".' },
    { title: 'Create the User Story', description: 'Create a work item with title, description, acceptance criteria, priority 2 and tags PowerAutomate;EmailToADO.' },
  ],
  diagram: {
    columns: 2,
    rows: 6,
    nodes: [
      { id: 'trigger', label: 'Email arrives', detail: 'subject contains [ADO]', kind: 'trigger', col: 0, row: 0 },
      { id: 'body', label: 'Compose body', kind: 'data', col: 0, row: 1 },
      { id: 'req', label: 'Extract requirement', detail: 'split + trim', kind: 'data', col: 0, row: 2 },
      { id: 'ac', label: 'Extract acceptance criteria', detail: 'split + trim', kind: 'data', col: 0, row: 3 },
      { id: 'create', label: 'Create User Story', detail: 'priority 2, tagged', kind: 'ado', col: 0, row: 4 },
      { id: 'done', label: 'Story in backlog', kind: 'success', col: 0, row: 5 },
      { id: 'fail', label: 'Create fails', detail: 'no handler yet', kind: 'failure', col: 1, row: 4 },
    ],
    edges: [
      { from: 'trigger', to: 'body' },
      { from: 'body', to: 'req' },
      { from: 'req', to: 'ac' },
      { from: 'ac', to: 'create' },
      { from: 'create', to: 'done', tone: 'yes' },
      { from: 'create', to: 'fail', label: 'fails', tone: 'fail' },
    ],
  },
  components: [
    { name: 'Outlook trigger', note: 'triggers', purpose: 'Polls the Inbox; the subject filter keeps unrelated mail out.' },
    { name: 'Compose', note: 'compose', purpose: 'Three Compose actions: raw body, requirement and acceptance criteria. Each one is visible in run history for debugging.' },
    { name: 'Expressions', note: 'expressions', purpose: 'split(), first(), last() and trim() cut the body into sections.' },
    { name: 'Create a work item', note: 'azure-devops-connector', purpose: 'Creates the User Story with all fields in one call.' },
  ],
  expressions: [
    {
      title: 'Extract requirement',
      code: "trim(\n  first(\n    split(\n      last(split(outputs('Compose'), 'Requirement:')),\n      'Acceptance Criteria:'\n    )\n  )\n)",
      explanation: 'Takes the text after "Requirement:" and stops at "Acceptance Criteria:".',
    },
    {
      title: 'Extract acceptance criteria',
      code: "trim(last(split(outputs('Compose'), 'Acceptance Criteria:')))",
      explanation: 'Everything after the last "Acceptance Criteria:" marker.',
    },
    {
      title: 'Example email body',
      language: 'text',
      code: 'Requirement:\nUsers can export the order list as CSV.\n\nAcceptance Criteria:\nExport includes all visible columns.\nFile name contains the export date.',
      explanation: 'Fictional sample showing the two markers the parser expects.',
    },
  ],
  logic: [
    { name: 'Subject filter', rule: 'Subject contains [ADO]', onTrue: 'Run the flow', onFalse: 'No run' },
  ],
  errorHandling: [
    { title: 'Missing markers', description: 'If "Requirement:" is missing, split() returns the whole body and it lands in the description unchanged. No validation step exists yet.' },
    { title: 'Not implemented yet', description: 'No scope, retry policy or notification on failure is configured. Placeholder: document once added.' },
  ],
  testing: [
    { id: 'T1', scenario: 'Well-formed email', input: 'Subject "[ADO] CSV export" with both markers', expected: 'User Story with parsed fields', actual: 'Not documented', status: 'Not run' },
    { id: 'T2', scenario: 'Markers missing', input: 'Subject "[ADO] Question", plain body', expected: 'Story created with full body as description', actual: 'Not documented', status: 'Not run' },
  ],
  configuration: [
    { setting: 'Folder', value: 'Inbox' },
    { setting: 'Subject filter', value: '[ADO]' },
    { setting: 'Work item type', value: 'User Story' },
    { setting: 'Priority', value: '2' },
    { setting: 'Tags', value: 'PowerAutomate;EmailToADO' },
  ],
  expectedBehavior: [
    'Only emails whose subject contains [ADO] create work items.',
    'One email creates exactly one User Story.',
    'Formatting such as HTML in the body is passed through as received.',
  ],
  notes: [
    'The parser depends on the exact marker text, including the colon.',
    'If the process requires Description or Acceptance Criteria, an email without markers still satisfies it because the whole body is used.',
  ],
  placeholders: ['Error handling', 'Test results'],
  related: ['triggers', 'compose', 'expressions', 'azure-devops-connector', 'dynamic-content'],
  keywords: ['email', 'outlook', 'user story', 'split', 'parse', 'requirement', 'acceptance criteria'],
};
