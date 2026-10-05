import type { NoteContent } from '../../types/note';

export const controlExtraNotes: NoteContent[] = [
  {
    slug: 'switch',
    title: 'Switch',
    group: 'Control flow',
    summary: 'Branch on one value with several exact cases and a default.',
    what: 'Switch compares one value with a list of cases. The first case that equals the value runs; if none matches, Default runs.',
    why: 'It replaces chains of nested Conditions when one field decides between many paths.',
    when: 'One value, three or more outcomes, exact matches. Use a Condition for ranges or combined checks.',
    example: {
      title: 'Switch on a priority value',
      language: 'text',
      code: "On: triggerBody()?['priority']\n  Case \"High\"    -> post to Teams\n  Case \"Normal\"  -> send email\n  Default        -> do nothing",
    },
    commonMistake: 'Expecting partial or case-insensitive matches. Case values must equal the input exactly, so normalize first, for example with toLower().',
    sections: [
      {
        heading: 'Limits',
        body: ['A Switch can have up to 25 cases. Each case counts as a container for nesting, like a Condition branch.'],
      },
    ],
    exercise: {
      task: 'Route a request by priority.',
      steps: [
        'Create an instant flow with a text input Priority.',
        'Add a Switch on that input with cases High and Low and a Default.',
        'Put a Compose in each branch with a different message.',
      ],
      expected: 'Testing with High, Low and Medium runs the High case, the Low case and Default respectively.',
    },
    related: ['conditions', 'expressions'],
    keywords: ['switch', 'case', 'default', 'branch'],
  },
  {
    slug: 'child-flows',
    title: 'Child Flows and Instant Inputs',
    group: 'Control flow',
    summary: 'Split work into reusable flows that take inputs and return outputs.',
    what: 'A child flow is an instant flow started by another flow with Run a Child Flow. It declares inputs on its manual trigger and returns values with Respond to a Power App or flow.',
    why: 'Reuse one piece of logic, such as "create a ticket", from many flows, and keep each flow short enough to read.',
    when: 'When the same sequence appears in two or more flows, or one flow approaches the nesting or size limits.',
    example: {
      title: 'Reading a child flow result',
      code: "outputs('Run_a_Child_Flow')?['body/ticketid']",
      explanation: 'ticketid is an output declared in the child flow response.',
    },
    commonMistake: 'Creating the child flow outside a solution. Run a Child Flow only lists flows in the same solution, and the child must use embedded connections instead of run-only user connections.',
    sections: [
      {
        heading: 'Instant trigger inputs',
        body: [
          'Manually trigger a flow supports Text, Yes/No, Number, Date, Email, File and User inputs.',
          "Read them with triggerBody()?['text'], triggerBody()?['number'] and so on. The designer shows them as dynamic content.",
        ],
      },
    ],
    exercise: {
      task: 'Return a value from a child flow.',
      steps: [
        'Inside a solution, create an instant flow with a Number input and a Respond to a Power App or flow action that returns the number multiplied by 2: mul(triggerBody()?[\'number\'], 2).',
        'Create a parent flow in the same solution that calls it with Run a Child Flow and the value 21.',
      ],
      expected: 'The parent run shows 42 in the Run a Child Flow outputs.',
    },
    related: ['connections-licensing', 'triggers', 'scopes'],
    keywords: ['child flow', 'run a child flow', 'respond', 'reuse', 'solution', 'instant inputs'],
  },
];
