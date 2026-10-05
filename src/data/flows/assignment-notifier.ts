import type { Flow } from '../../types/flow';

export const assignmentNotifier: Flow = {
  slug: 'ado-assignment-notifier',
  name: 'Work Item Assignment Notifier',
  description: 'Posts a Microsoft Teams message with an @mention when a newly created work item is assigned to a teammate.',
  category: 'Azure DevOps',
  integrations: ['Azure DevOps', 'Microsoft Teams'],
  status: 'Testing',
  trigger: 'Azure DevOps: When a work item is created',
  overview: {
    what: 'For every new work item created by the flow owner and assigned to someone else, the flow posts a message in Teams that @mentions the assignee and links to the item.',
    why: 'Assignees miss new work when they rely on email notifications alone.',
    problem: 'Azure DevOps identities and Teams identities use different email domains, so the assignee cannot be passed to Teams as is.',
    automates: 'Assignment notifications from Azure DevOps to a Teams group chat or a 1:1 chat.',
  },
  steps: [
    { title: 'Trigger', description: 'Any work item is created in the project.' },
    { title: 'Read the item', description: 'GET the work item with relations to read Assigned To and Created By.' },
    { title: 'Choose the target', description: 'A Boolean variable switches between a 1:1 chat and the configured group chat.' },
    { title: 'Check who and what', description: 'Continue only if the item is assigned, was created by the flow owner, and is not assigned to the owner.' },
    { title: 'Resolve the Teams identity', description: 'Swap the identity domain for the Teams domain, create the chat and get an @mention token.' },
    { title: 'Post the message', description: 'Post as the user with type, ID, title and an Open Work Item link.' },
    { title: 'Otherwise end', description: 'Terminate with status Succeeded when the checks fail.' },
  ],
  diagram: {
    columns: 2,
    rows: 7,
    nodes: [
      { id: 'trigger', label: 'Work item created', detail: 'ADO trigger', kind: 'trigger', col: 0, row: 0 },
      { id: 'get', label: 'GET work item', detail: '$expand=relations', kind: 'ado', col: 0, row: 1 },
      { id: 'switch', label: 'Target switch', detail: 'Boolean variable', kind: 'variable', col: 0, row: 2 },
      { id: 'check', label: 'Assigned to a teammate?', detail: 'AND of 3 rows', kind: 'condition', col: 0, row: 3 },
      { id: 'skip', label: 'Terminate', detail: 'Succeeded', kind: 'end', col: 1, row: 3 },
      { id: 'resolve', label: 'Create chat + @mention', detail: 'domain swap', kind: 'action', col: 0, row: 4 },
      { id: 'post', label: 'Post message', detail: 'as user, group or 1:1', kind: 'action', col: 0, row: 5 },
      { id: 'done', label: 'Assignee notified', kind: 'success', col: 0, row: 6 },
    ],
    edges: [
      { from: 'trigger', to: 'get' },
      { from: 'get', to: 'switch' },
      { from: 'switch', to: 'check' },
      { from: 'check', to: 'skip', label: 'no', tone: 'no' },
      { from: 'check', to: 'resolve', label: 'yes', tone: 'yes' },
      { from: 'resolve', to: 'post' },
      { from: 'post', to: 'done', tone: 'yes' },
    ],
  },
  components: [
    { name: 'Azure DevOps trigger', note: 'triggers', purpose: 'Fires for every new work item of any type.' },
    { name: 'Send an HTTP request to Azure DevOps', note: 'http', purpose: 'Reads identity fields that the trigger output does not expose in a usable shape.' },
    { name: 'Initialize variable (Boolean)', note: 'variables', purpose: 'Switch between group chat and 1:1 chat without changing the actions.' },
    { name: 'Condition', note: 'conditions', purpose: 'Three AND rows decide whether a message is sent.' },
    { name: 'Microsoft Teams actions', note: 'connectors', purpose: 'Create a chat, Get an @mention token for a user, Post message in a chat or channel.' },
    { name: 'Terminate', note: 'error-handling', purpose: 'Ends cleanly with Succeeded when no message is needed.' },
  ],
  expressions: [
    {
      title: 'Is assigned (Condition row 1)',
      code: "empty(body('Send_an_HTTP_request_to_Azure_DevOps')?['fields']?['System.AssignedTo'])",
      explanation: 'Compared with the expression false.',
    },
    {
      title: 'Created by the owner (Condition row 2)',
      code: "toLower(coalesce(body('Send_an_HTTP_request_to_Azure_DevOps')?['fields']?['System.CreatedBy']?['uniqueName'], ''))",
      explanation: 'Compared with the owner identity, for example owner@example.com. coalesce() avoids a null comparison.',
    },
    {
      title: 'Teams identity from the ADO identity',
      code: "concat(\n  first(split(<AssignedTo uniqueName>, '@')),\n  '@teams.example.com'\n)",
      explanation: 'Keeps the local part and swaps the domain. Works only when every user has the same local part in both systems.',
    },
    {
      title: 'Target chat',
      code: "if(\n  variables('SendToPersonalChat'),\n  body('Create_a_chat')?['id'],\n  '<group chat id>'\n)",
      explanation: 'Uses the new 1:1 chat or the fixed group chat. The group chat ID is environment-specific and shown as a placeholder.',
    },
  ],
  logic: [
    { name: 'Notify condition', rule: 'Assigned AND created by owner AND not assigned to owner', onTrue: 'Create chat, mention, post', onFalse: 'Terminate Succeeded' },
  ],
  errorHandling: [
    { title: 'Identity mismatch', description: 'Create a chat fails with a missing user binding when the Teams identity does not exist. The domain swap fixes the common case.' },
    { title: 'Not implemented yet', description: 'No retry policy or failure branch is configured. Placeholder: document once added.' },
  ],
  testing: [
    { id: 'T1', scenario: 'Story assigned to a teammate', input: 'User Story #1001 assigned to user@example.com', expected: 'Teams message with @mention', actual: 'Message posted', status: 'Pass' },
    { id: 'T2', scenario: 'Unassigned Task', input: 'Task #1002 with no assignee', expected: 'No message, run succeeds', actual: 'Condition false, Terminate Succeeded', status: 'Pass' },
    { id: 'T3', scenario: 'Assigned after creation', input: 'Item assigned in a later update', expected: 'Not covered by this trigger', actual: 'Needs an update-trigger flow', status: 'Not run' },
  ],
  configuration: [
    { setting: 'Post as', value: 'User', notes: 'Required for @mentions from the owner. Switching to Flow bot clears the message field.' },
    { setting: 'Post in', value: 'Group chat' },
    { setting: 'SendToPersonalChat', value: 'false', notes: 'true sends a 1:1 chat instead.' },
    { setting: 'Teams domain', value: 'teams.example.com', notes: 'Placeholder for your Teams sign-in domain.' },
  ],
  expectedBehavior: [
    'Only items created by the flow owner and assigned to someone else produce a message.',
    'The message contains project, type, ID, title and an Open Work Item link.',
    'Assignments made after creation are not notified by this flow.',
  ],
  notes: [
    'An Adaptive Card button needs Post as Flow bot, which cannot @mention as the user. A hyperlink is used instead.',
    'Selecting the group chat by name in the dropdown is not possible while the field holds an if() expression.',
  ],
  placeholders: ['Error handling', 'Update-trigger companion flow'],
  related: ['triggers', 'http', 'conditions', 'variables', 'connectors', 'expressions'],
  keywords: ['teams', 'notification', 'mention', 'assigned', 'chat', 'domain'],
};
