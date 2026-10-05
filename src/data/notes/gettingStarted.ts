import type { NoteContent } from '../../types/note';

export const gettingStartedNotes: NoteContent[] = [
  {
    slug: 'first-flow',
    title: 'Your First Flow',
    group: 'Getting started',
    summary: 'Build, save and run a small instant flow that takes a name and emails you a greeting.',
    what: 'A guided build of an instant cloud flow: a manual trigger with one text input, a Compose that builds a message, and an Outlook action that sends it to you.',
    why: 'It touches every basic skill once: choosing a trigger, adding actions, using dynamic content, writing one expression, saving, testing and reading run history.',
    when: 'Start here if you have never built a flow. It takes about ten minutes and needs only a work or school account with Outlook.',
    example: {
      title: 'Compose input (expression)',
      code: "concat('Hello ', triggerBody()?['text'], ', your flow works.')",
      explanation: 'triggerBody() reads the inputs typed when the flow was started. The first text input is named text.',
    },
    commonMistake: 'Typing the expression straight into the Compose box as text. It is then sent as literal text. Open the fx (expression) editor, type it there and select Add.',
    sections: [
      {
        heading: 'Step by step',
        body: [
          'Sign in at make.powerautomate.com. Select Create, then Instant cloud flow.',
          'Name the flow "Hello flow", choose the trigger Manually trigger a flow and select Create.',
          'On the trigger, select Add an input, choose Text and name it Name.',
          'Select the + under the trigger, search for Compose and add it. Click the Inputs box, choose the fx icon, paste the expression from the example above and select Add.',
          'Add the action Send an email (V2) from Office 365 Outlook. Set To to your own address, Subject to "Hello from my first flow", and Body to the Outputs of Compose from the dynamic content list.',
          'Select Save. Then select Test, choose Manually, select Test again, type a name and select Run flow.',
          'Open the run from the confirmation link. Every action shows a green tick; click Compose to see the text it produced.',
        ],
      },
      {
        heading: 'How each field was filled',
        body: ['Every field holds one of three kinds of value. Learning to tell them apart is the most useful habit in Power Automate.'],
        table: {
          columns: ['Field', 'Entered as'],
          rows: [
            ['Trigger input name: Name', 'Plain text'],
            ['Compose: Inputs', 'Expression (fx)'],
            ['Send an email: To', 'Plain text (your address)'],
            ['Send an email: Subject', 'Plain text'],
            ['Send an email: Body', 'Dynamic content (Outputs of Compose)'],
          ],
        },
      },
    ],
    exercise: {
      task: 'Extend Hello flow so it also tells you what day it is.',
      steps: [
        'Add a second Compose after the first one.',
        "Set its input to the expression formatDateTime(utcNow(), 'dddd').",
        'Add its Outputs to the email Body after the greeting.',
        'Save and test again.',
      ],
      expected: 'The email body contains your greeting followed by the weekday, for example Monday.',
    },
    related: ['designer-tour', 'run-history-testing', 'expressions', 'dynamic-content'],
    keywords: ['first flow', 'tutorial', 'beginner', 'fresher', 'instant', 'manual trigger', 'hello'],
  },
  {
    slug: 'designer-tour',
    title: 'The Flow Designer',
    group: 'Getting started',
    summary: 'Where things are in the designer: canvas, action panel, dynamic content, expression editor, Flow checker, Save and Test.',
    what: 'The designer is the editor for cloud flows. The canvas shows the trigger and actions as cards; selecting a card opens a side panel where you configure it.',
    why: 'Most beginner problems are finding the right control: where to add an action, where retry settings live, how to see the real stored value.',
    when: 'Keep this note open while building your first few flows.',
    example: {
      title: 'Where to find things',
      language: 'text',
      code: 'Add an action        + between two cards\nConfigure an action  click the card, side panel opens\nRetry and timeout    side panel, Settings tab\nReal stored value    side panel, Code view tab\nDynamic content      lightning icon in a field\nExpression editor    fx icon in a field\nCheck for errors     Flow checker in the toolbar\nSave / Test          toolbar, top right',
    },
    commonMistake: 'Trusting what a field looks like. A field can look like an expression but be stored as text. Code view shows the truth: real expressions start with @ or sit inside @{ }.',
    sections: [
      {
        heading: 'Side panel tabs',
        body: [],
        table: {
          columns: ['Tab', 'Use it for'],
          rows: [
            ['Parameters', 'The inputs of the action'],
            ['Settings', 'Retry policy, timeout, concurrency, secure inputs and outputs, run after'],
            ['Code view', 'The JSON definition of this one action (read-only)'],
            ['About', 'Connector documentation and limits'],
          ],
        },
      },
      {
        heading: 'Card menu',
        body: [
          'The three-dot menu on a card offers Rename, Delete, Copy and Configure run after.',
          'Rename actions early. Expressions refer to action names with spaces turned into underscores, for example Get_Parent.',
        ],
      },
    ],
    exercise: {
      task: 'Find three settings in your Hello flow.',
      steps: [
        'Open the Send an email card and read its Settings tab.',
        'Open Code view on the Compose card and find the @ in front of the expression.',
        'Run Flow checker and confirm it reports no errors.',
      ],
      expected: 'You can point to the retry policy, the stored expression starting with @, and a clean Flow checker result.',
    },
    related: ['first-flow', 'actions', 'expressions'],
    keywords: ['designer', 'canvas', 'code view', 'settings', 'flow checker', 'side panel'],
  },
  {
    slug: 'run-history-testing',
    title: 'Testing and Run History',
    group: 'Getting started',
    summary: 'Run a flow on purpose, read what every action received and returned, and rerun it after a fix.',
    what: 'Every run is recorded with the inputs, outputs, status and duration of each action. The Test pane starts a run on demand; run history keeps runs for 28 days.',
    why: 'You debug a flow by reading its runs, not by guessing. The failed action and the value that caused it are always visible there.',
    when: 'After every change: save, test, open the run, check the important actions.',
    example: {
      title: 'Reading a failed run',
      language: 'text',
      code: '1. Open the run from the flow details page (28-day run history)\n2. Find the card with the red mark\n3. Read its error message and its inputs\n4. Open the card before it and check its outputs\n5. Fix, save, then Resubmit the same run',
    },
    commonMistake: 'Fixing the action that shows red when the real cause is an earlier action that produced the wrong value. Read the inputs of the failed card first.',
    sections: [
      {
        heading: 'Ways to test',
        body: [],
        table: {
          columns: ['Option', 'What it does'],
          rows: [
            ['Test, Manually', 'Waits for you to perform the trigger event, or prompts for inputs on an instant flow'],
            ['Test, Automatically', 'Reuses the trigger data of a recent run, so you do not repeat the event'],
            ['Resubmit', 'Runs again with the same trigger data from an old run'],
            ['Turn off', 'Stops the trigger from starting new runs while you fix something'],
          ],
        },
      },
      {
        heading: 'Run statuses',
        body: ['Succeeded, Failed, Cancelled and Running apply to the whole run. Each action shows Succeeded, Failed, Skipped or TimedOut. Skipped is normal for the branch of a Condition that did not run.'],
      },
    ],
    exercise: {
      task: 'Break Hello flow on purpose and fix it from run history.',
      steps: [
        'Change the email To field to the text not-an-address and save.',
        'Test the flow and open the failed run.',
        'Read the error on Send an email, fix the address, save and resubmit.',
      ],
      expected: 'The first run fails on Send an email with an invalid recipient message; the resubmitted run succeeds.',
    },
    related: ['first-flow', 'error-handling', 'actions'],
    keywords: ['test', 'run history', 'resubmit', 'debug', 'failed run', 'status'],
  },
  {
    slug: 'connections-licensing',
    title: 'Connections, Licensing and Environments',
    group: 'Getting started',
    summary: 'Who a flow runs as, which connectors your license allows, and where flows live.',
    what: 'A connection stores the sign-in a connector uses. A license decides whether you may use premium connectors. An environment is the container that holds flows, connections and data.',
    why: 'Flows fail or cannot be saved when a connection is broken or a connector needs a license you do not have.',
    when: 'Before building a flow for other people, and whenever a flow will be owned by more than one person.',
    example: {
      title: 'Checklist before sharing a flow',
      language: 'text',
      code: 'Connections   which account does each action run as?\nConnectors    any Premium label in the action picker?\nOwners        add a co-owner so the flow survives absence\nEnvironment   is this the right environment for the team?',
    },
    commonMistake: 'Building a team process on one person\'s connection. When that account leaves or its password changes, every run fails. Use a shared service account or add co-owners.',
    sections: [
      {
        heading: 'Licensing basics',
        body: [
          'Standard connectors, such as Outlook, Teams and SharePoint, are included with most Microsoft 365 licenses.',
          'Premium connectors and the generic HTTP action need a Power Automate Premium license. Premium actions are marked in the action picker.',
        ],
      },
      {
        heading: 'Environments and solutions',
        body: [
          'Every tenant has a default environment. Organizations often add separate environments for development, test and production.',
          'A solution packages flows and their connection references so they can be moved between environments. Child flows must be inside a solution.',
        ],
      },
      {
        heading: 'Sharing',
        body: ['Co-owners can edit the flow and see its runs. Instant flows can also have run-only users, who can start the flow but not change it.'],
      },
    ],
    exercise: {
      task: 'Inspect the connections your Hello flow uses.',
      steps: ['Open the flow details page.', 'Find the Connections section and note the account shown for Office 365 Outlook.', 'Add a colleague as co-owner, or note who you would add.'],
      expected: 'You can name the account the email action runs as and who else can maintain the flow.',
    },
    related: ['connectors', 'child-flows', 'overview'],
    keywords: ['connection', 'license', 'premium', 'standard', 'environment', 'solution', 'co-owner', 'share'],
  },
];
