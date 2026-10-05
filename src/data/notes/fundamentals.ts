import type { NoteContent } from '../../types/note';

export const fundamentalsNotes: NoteContent[] = [
  {
    slug: 'overview',
    title: 'Power Automate Overview',
    group: 'Fundamentals',
    summary: 'A cloud flow is a trigger followed by actions that run on Microsoft infrastructure, with every run recorded in run history.',
    what: 'Power Automate runs workflows called flows. A cloud flow starts from one trigger and executes a graph of actions. Each action has inputs, produces outputs, and can depend on the outcome of earlier actions.',
    why: 'It connects services through prebuilt connectors without hosting code, and every run is inspectable: inputs, outputs, duration and status per action.',
    when: 'Use it for event-driven integration between Microsoft 365, Azure DevOps and other connected services, approvals, notifications and scheduled housekeeping.',
    example: {
      title: 'Shape of every cloud flow',
      language: 'text',
      code: 'Trigger\n  -> Action (inputs, outputs)\n  -> Action (runs after previous: Succeeded)\n  -> Condition\n       true:  actions\n       false: actions',
    },
    commonMistake: 'Treating the designer canvas as the source of truth. The flow is a JSON definition; when a value looks right but behaves wrong, open Code view on the action.',
    sections: [
      {
        heading: 'Runtime model',
        body: [
          'Under the hood a cloud flow is an Azure Logic Apps workflow definition. Actions run in order of their run after dependencies, not their position on screen.',
          'Each run gets an ID. Run history keeps the evaluated inputs and outputs of every action for 28 days, which makes it the primary debugging tool.',
        ],
      },
      {
        heading: 'Limits that shape designs',
        body: ['Containers (Condition, Scope, loops, Switch) can be nested at most 8 levels deep. Deep guard-clause chains hit this limit quickly.'],
        table: {
          columns: ['Limit', 'Value'],
          rows: [
            ['Nesting depth of containers', '8'],
            ['Do until default count', '60 iterations'],
            ['Apply to each default concurrency', 'Sequential'],
            ['Run history retention', '28 days'],
          ],
        },
      },
    ],
    exercise: {
      task: "Map an everyday process as a flow.",
      steps: [
        "Pick a task you do by hand, such as forwarding a weekly report.",
        "Write down its trigger, the actions in order, and any decision points.",
        "Mark which steps need a connector and which are data steps.",
      ],
      expected: "A short list such as: trigger Recurrence, action Get file, Condition file exists, action Send email.",
    },
    related: ['flow-types', 'triggers', 'actions'],
    keywords: ['cloud flow', 'logic apps', 'run history', 'definition', 'nesting limit'],
  },
  {
    slug: 'flow-types',
    title: 'Flow Types',
    group: 'Fundamentals',
    summary: 'Automated, instant and scheduled cloud flows differ only in how they start.',
    what: 'The flow type is decided by the trigger. Automated flows start on an event, instant flows start from a button or another app, scheduled flows start on a recurrence.',
    why: 'Choosing the right type decides latency, who can start the flow, and how many runs are created.',
    when: 'Event in a connected system: automated. A person decides when: instant. Periodic batch work: scheduled.',
    example: { title: 'Picking a type', language: 'text', code: 'Work item closed      -> Automated\nRun on demand          -> Instant (manual trigger)\nEvery weekday 07:00    -> Scheduled (Recurrence)' },
    commonMistake: 'Using a scheduled flow to poll for changes when a connector already offers an event trigger. The event trigger is simpler and creates one run per event.',
    sections: [
      {
        heading: 'Comparison',
        body: ['Desktop flows (RPA) are a separate product area and are not covered here.'],
        table: {
          columns: ['Type', 'Starts when'],
          rows: [
            ['Automated', 'A connector event fires, for example a new email or a closed work item'],
            ['Instant', 'Someone presses a button or another flow or app calls it'],
            ['Scheduled', 'A Recurrence trigger reaches its next time slot'],
          ],
        },
      },
    ],
    exercise: {
      task: "Create one flow of each type.",
      steps: [
        "Create an instant flow with Manually trigger a flow.",
        "Create a scheduled flow with Recurrence every day at 08:00.",
        "Create an automated flow on When a new email arrives (V3).",
      ],
      expected: "Three flows in My flows, each showing a different type in the Type column.",
    },
    related: ['triggers', 'overview'],
    keywords: ['automated', 'instant', 'scheduled', 'recurrence', 'type'],
  },
  {
    slug: 'triggers',
    title: 'Triggers',
    group: 'Fundamentals',
    summary: 'The single event that starts a run. Trigger outputs are the first dynamic content in the flow.',
    what: 'A trigger is the first step of a flow. It is either polling (the platform checks the service on an interval) or push-based (the service calls a webhook).',
    why: 'The trigger defines which data enters the run. Everything later is computed from trigger outputs.',
    when: 'Always exactly one per flow. Pick the narrowest trigger available so the flow does not run for irrelevant events.',
    example: {
      title: 'Reading the trigger payload',
      code: "triggerOutputs()?['body/id']",
      explanation: 'ID of the work item that fired an Azure DevOps trigger.',
    },
    commonMistake: 'Leaving filters empty. A work item trigger with no type filter fires for every type, so the flow must then filter or terminate early.',
    sections: [
      {
        heading: 'Polling and splitOn',
        body: [
          'Polling triggers check on a recurrence, for example every minute. When several items match in one poll, splitOn creates one run per item.',
          'Expect a delay of up to one interval between the event and the run.',
        ],
      },
      {
        heading: 'Trigger settings',
        body: [
          'Concurrency control limits parallel runs. Once enabled it cannot be turned off without recreating the trigger, so decide deliberately.',
          'Trigger conditions are expressions that must be true for a run to start. They save runs but are invisible on the canvas.',
        ],
      },
    ],
    exercise: {
      task: "Read what a trigger delivers.",
      steps: [
        "Build an automated flow on When a new email arrives (V3).",
        "Add a Compose with the dynamic content Subject.",
        "Send yourself an email and open the run.",
      ],
      expected: "The trigger card outputs show the full email body, and Compose shows only the subject.",
    },
    related: ['flow-types', 'dynamic-content', 'azure-devops-connector'],
    keywords: ['trigger', 'polling', 'webhook', 'splitOn', 'concurrency', 'triggerOutputs'],
  },
  {
    slug: 'actions',
    title: 'Actions',
    group: 'Fundamentals',
    summary: 'A unit of work with inputs, outputs, a status and run after rules.',
    what: 'An action calls a connector operation or performs a built-in operation such as Compose, Condition or Set variable. It finishes as Succeeded, Failed, Skipped or TimedOut.',
    why: 'Actions are where work happens, and their status drives error handling through run after.',
    when: 'Every step after the trigger is an action. Prefer built-in data actions over extra connector calls when the data is already in the run.',
    example: { title: 'Reading another action', code: "body('Get_Parent')?['fields']?['System.State']", explanation: 'Action names use underscores instead of spaces inside expressions.' },
    commonMistake: 'Renaming an action after other actions reference it. The designer updates most references, but references typed inside expressions in text fields can break.',
    sections: [
      {
        heading: 'Run after',
        body: [
          'By default an action runs after the previous one Succeeded. Configure run after to also run on Failed, Skipped or TimedOut to build failure paths.',
          'Two actions that both run after the same action form parallel branches.',
        ],
      },
      {
        heading: 'Settings per action',
        body: ['Retry policy, timeout, secure inputs and outputs, and concurrency (loops) are set on the action Settings tab.'],
      },
    ],
    exercise: {
      task: "Use run after to build a failure path.",
      steps: [
        "Add an action that will fail, such as Send an email to the text not-an-address.",
        "Add a Compose after it and set Configure run after to has failed only.",
        "Test the flow.",
      ],
      expected: "The email action fails, the Compose runs, and the run shows where the failure was handled.",
    },
    related: ['error-handling', 'compose', 'connectors'],
    keywords: ['action', 'run after', 'status', 'outputs', 'body'],
  },
];
