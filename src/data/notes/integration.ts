import type { NoteContent } from '../../types/note';

export const integrationNotes: NoteContent[] = [
  {
    slug: 'http',
    title: 'HTTP',
    group: 'Integration',
    summary: 'Call REST endpoints directly with GET, POST, PATCH and DELETE when a connector action does not cover the operation.',
    what: 'HTTP actions send a request with method, URI, headers and body and return status code, headers and body. Connector-specific variants such as "Send an HTTP request to Azure DevOps" reuse the connection for authentication.',
    why: 'Prebuilt actions cover common operations only. REST gives access to everything the service exposes, such as batch reads and conditional updates.',
    when: 'Prefer the connector-scoped HTTP action so no credentials are stored in the flow. Use the generic HTTP action only with a managed identity or a secured parameter.',
    example: {
      title: 'Batch read of work items',
      language: 'http',
      code: 'POST {project}/_apis/wit/workitemsbatch?api-version=7.1\n\n{\n  "ids": [1001, 1002, 1003],\n  "fields": ["System.Id", "System.State"],\n  "errorPolicy": "Omit"\n}',
    },
    commonMistake: 'Building a URI without the separator before an inserted value, for example workitems@{id} instead of workitems/@{id}. The request then hits the wrong resource.',
    sections: [
      {
        heading: 'Methods',
        body: ['Non-2xx responses make the action fail, which triggers run after Failed paths.'],
        table: {
          columns: ['Method', 'Typical use'],
          rows: [
            ['GET', 'Read a resource; safe to repeat'],
            ['POST', 'Create a resource or run a query or batch'],
            ['PATCH', 'Partial update; Azure DevOps uses JSON Patch documents'],
            ['DELETE', 'Remove a resource; avoid in automated flows unless reversible'],
          ],
        },
      },
      {
        heading: 'Headers',
        body: ['Azure DevOps work item updates need Content-Type: application/json-patch+json. Set Body is Base64 to No for JSON text.'],
      },
    ],
    exercise: {
      task: "Call a public test API.",
      steps: [
        "Add the HTTP action (premium) with GET https://httpbin.org/get, or Send an HTTP request to SharePoint with GET _api/web if you have no premium license.",
        "Add a Compose with the status code from the HTTP outputs.",
      ],
      expected: "The Compose outputs 200 and the HTTP outputs show the response body.",
    },
    related: ['azure-devops-connector', 'error-handling', 'connectors'],
    keywords: ['http', 'rest', 'get', 'post', 'patch', 'delete', 'header', 'uri'],
  },
  {
    slug: 'connectors',
    title: 'Connectors',
    group: 'Integration',
    summary: 'Wrappers around a service API that provide triggers, actions and a stored connection.',
    what: 'A connector exposes typed triggers and actions for a service. A connection stores the identity used to call it. Actions run with that identity, so permissions follow the connection owner.',
    why: 'Connectors handle authentication, paging and schemas, and give the designer dynamic content for outputs.',
    when: 'Use the prebuilt action when it exists; fall back to the connector HTTP action for unsupported operations.',
    example: { title: 'Teams connector chain', language: 'text', code: 'Create a chat\n  -> Get an @mention token for a user\n  -> Post message in a chat or channel' },
    commonMistake: 'Forgetting that changes made by the flow are made as the connection identity. Other automations and triggers see those changes as that user.',
    sections: [
      {
        heading: 'Standard and premium',
        body: ['Some connectors and the generic HTTP action are premium and need a matching license. Check the label in the action picker.'],
      },
    ],
    exercise: {
      task: "Compare a connector action with its HTTP equivalent.",
      steps: [
        "Add Get my profile (V2) from Office 365 Users.",
        "Open its outputs after a run.",
        "Note which properties appear as dynamic content.",
      ],
      expected: "You can list the typed properties the connector provides, such as displayName and mail.",
    },
    related: ['azure-devops-connector', 'http', 'actions'],
    keywords: ['connector', 'connection', 'premium', 'teams', 'outlook'],
  },
  {
    slug: 'azure-devops-connector',
    title: 'Azure DevOps Connector',
    group: 'Integration',
    summary: 'Work item triggers, create and update actions, and an authenticated HTTP action for the full REST API.',
    what: 'The connector offers triggers such as "When a work item is created" and "When a work item is closed", actions such as "Create a work item", and "Send an HTTP request to Azure DevOps" with a relative URI.',
    why: 'Work item automation needs both events and precise REST operations such as batch reads and revision-checked updates.',
    when: 'Triggers for events, Create a work item for simple creation, the HTTP action for relations, batch reads and conditional PATCH.',
    example: {
      title: 'Optimistic concurrency on update',
      language: 'json',
      code: '[\n  { "op": "test", "path": "/rev", "value": 7 },\n  { "op": "add", "path": "/fields/System.State", "value": "Closed" }\n]',
      explanation: 'The update is rejected if the revision is no longer 7.',
    },
    commonMistake: 'Treating Resolved as finished. Only the state you define as complete should count; processes often add custom states such as In QA.',
    sections: [
      {
        heading: 'Useful operations',
        body: ['URIs are relative to the organization: {project}/_apis/...'],
        table: {
          columns: ['Operation', 'Purpose'],
          rows: [
            ['GET workitems/{id}?$expand=relations', 'Fields plus links such as parent and children'],
            ['GET workitems/{id}?fields=...', 'Only the listed fields; cannot be combined with $expand'],
            ['POST workitemsbatch', 'Up to 200 work items in one call'],
            ['PATCH workitems/{id}', 'JSON Patch update with optional /rev test'],
          ],
        },
      },
      {
        heading: 'Hierarchy links',
        body: [
          'System.LinkTypes.Hierarchy-Forward points from a parent to a child. System.LinkTypes.Hierarchy-Reverse points from a child to its parent.',
          'System.Parent holds the parent ID directly on the child.',
        ],
      },
    ],
    exercise: {
      task: "Read a work item with relations.",
      steps: [
        "In a test project, create a User Story with one child Task.",
        "Add Send an HTTP request to Azure DevOps: GET {project}/_apis/wit/workitems/{id}?$expand=relations&api-version=7.1.",
        "Add Filter array keeping items where rel equals System.LinkTypes.Hierarchy-Forward.",
      ],
      expected: "Filter array returns one item whose url ends with the Task ID.",
    },
    related: ['http', 'connectors', 'triggers'],
    keywords: ['azure devops', 'ado', 'work item', 'rest', 'workitemsbatch', 'hierarchy', 'json patch', 'rev'],
  },
  {
    slug: 'error-handling',
    title: 'Error Handling',
    group: 'Reliability',
    summary: 'Retry policies, timeouts, run after paths, scopes and termination that make failures visible and safe.',
    what: 'Error handling combines per-action settings (retry policy, timeout) with flow structure (run after Failed, Catch scopes, Terminate).',
    why: 'A flow that hides failures as Succeeded runs is worse than one that fails loudly. Retries without idempotency can duplicate updates.',
    when: 'Every action that writes to another system needs a decision: retry, catch, or fail the run.',
    example: {
      title: 'Fail the run on purpose',
      language: 'text',
      code: "Condition: variables('varRunFailed') is equal to true\n  True: Terminate\n          Status: Failed\n          Code:   @{outputs('Final_Decision')}",
    },
    commonMistake: 'Retrying a non-idempotent write. Pair retries with a precondition such as a /rev test or an already-done check.',
    sections: [
      {
        heading: 'Retry policy and timeout',
        body: [
          'Retry policy types: Default, None, Fixed interval, Exponential interval. Retries apply to 408, 429 and 5xx responses, not to 4xx validation errors.',
          'The action timeout (Settings) caps one attempt, for example PT2M.',
        ],
      },
      {
        heading: 'Logging',
        body: ['Record a decision variable, the HTTP status and the error message. A final Compose makes the outcome readable at a glance in run history.'],
      },
    ],
    exercise: {
      task: "Make a failure visible.",
      steps: [
        "Add a Scope Try with an action that fails.",
        "Add Catch run after Try has failed, then Terminate with Status Failed and a message.",
        "Test the flow.",
      ],
      expected: "The run shows as Failed in run history with your message, instead of Succeeded.",
    },
    related: ['scopes', 'actions', 'http'],
    keywords: ['error', 'retry', 'timeout', 'terminate', 'run after', 'logging', 'idempotent'],
  },
  {
    slug: 'expressions-reference',
    title: 'Expressions Reference',
    group: 'Reliability',
    summary: 'The functions used most in these flows, with signature, example and common mistake.',
    what: 'A compact reference for comparison, logic, null-handling, text and conversion functions.',
    why: 'Most flow bugs are small expression mistakes: wrong types, null values or missing quotes.',
    when: 'Look up a function before using it in a condition or a Set variable.',
    example: { title: 'Null-safe count', code: "length(coalesce(body('Get_Children')?['value'], json('[]')))" },
    commonMistake: 'Mixing types: equals(1, \'1\') is false. Convert with int() or string() first.',
    sections: [],
    exercise: {
      task: "Practise five functions.",
      steps: [
        "Compose coalesce(null, 'fallback').",
        "Compose split('a,b,c', ',') and then last() of it.",
        "Compose int('42') and string(42).",
      ],
      expected: "Outputs: fallback, [\"a\",\"b\",\"c\"], c, 42 as a number and \"42\" as text.",
    },
    related: ['expressions', 'conditions'],
    keywords: ['functions', 'reference', 'equals', 'coalesce', 'split'],
    embedsFunctionReference: true,
  },
];
