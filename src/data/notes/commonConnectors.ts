import type { NoteContent } from '../../types/note';

export const commonConnectorNotes: NoteContent[] = [
  {
    slug: 'sharepoint',
    title: 'SharePoint',
    group: 'Integration',
    summary: 'Triggers and actions for list items and files, and how to query lists efficiently.',
    what: 'The SharePoint connector reacts to new or changed items and files and can get, create, update and delete them.',
    why: 'SharePoint lists are the most common data store for team processes such as requests, registers and trackers.',
    when: 'Any process where the data lives in a SharePoint list or document library.',
    example: {
      title: 'Get items, Filter Query (OData)',
      language: 'text',
      code: "Status eq 'Open' and Priority eq 'High'",
      explanation: 'Use the internal column names. Text values take single quotes.',
    },
    commonMistake: 'Calling Get items and filtering afterwards. By default it returns only 100 items, so the rest are silently missing. Filter in the Filter Query, and turn on Pagination in Settings for large lists.',
    sections: [
      {
        heading: 'Common operations',
        body: [],
        table: {
          columns: ['Operation', 'Use'],
          rows: [
            ['When an item is created', 'Start a flow for each new list item'],
            ['When an item is created or modified', 'React to edits too; guard against your own updates'],
            ['Get items', 'Query a list with Filter Query, Order By and Top Count'],
            ['Create item / Update item', 'Write list items'],
            ['Get file content / Create file', 'Read and write documents'],
          ],
        },
      },
      {
        heading: 'Avoiding trigger loops',
        body: ['A flow that updates the same item it was triggered by can start itself again. Add a trigger condition or check a column such as ProcessedByFlow before updating.'],
      },
    ],
    exercise: {
      task: 'Notify yourself about high priority requests.',
      steps: [
        'Create a list Requests with columns Title and Priority (choice: High, Normal).',
        'Build an automated flow on When an item is created.',
        "Add a Condition: Priority Value is equal to High (plain text), and in True send yourself an email with the item Title.",
      ],
      expected: 'Adding a High item sends an email; adding a Normal item runs the flow but sends nothing.',
    },
    related: ['connectors', 'triggers', 'conditions'],
    keywords: ['sharepoint', 'list', 'get items', 'odata', 'filter query', 'pagination', 'library'],
  },
  {
    slug: 'excel',
    title: 'Excel Online',
    group: 'Integration',
    summary: 'Read and write rows in Excel tables stored in OneDrive or SharePoint.',
    what: 'The Excel Online (Business) connector works with tables inside a workbook: list rows, add a row, update or delete a row by a key column.',
    why: 'Many teams keep small datasets in Excel; flows can read them as input or log results into them.',
    when: 'Small, shared datasets. For larger or multi-user data, prefer a SharePoint list or Dataverse.',
    example: {
      title: 'Excel date serial to a date',
      code: "addDays('1899-12-30', int(item()?['Date']), 'yyyy-MM-dd')",
      explanation: 'Excel stores dates as day numbers. Alternatively set DateTime Format to ISO 8601 on List rows.',
    },
    commonMistake: 'Pointing the action at a sheet range instead of a formatted table. The connector only sees data inside an Excel table (Insert > Table).',
    sections: [
      {
        heading: 'Good to know',
        body: [
          'List rows present in a table returns 256 rows by default; enable Pagination in Settings for more.',
          'Update a row and Delete a row need a key column with unique values, such as an ID.',
          'A workbook open for editing by someone else can briefly lock writes.',
        ],
      },
    ],
    exercise: {
      task: 'Log flow runs to Excel.',
      steps: [
        'Create a workbook in OneDrive with a table RunLog and columns Time and Message.',
        "Add Add a row into a table to your Hello flow with Time = utcNow() (expression) and Message = the Compose output.",
      ],
      expected: 'Each test run adds one row with the run time and the greeting text.',
    },
    related: ['connectors', 'data-operations', 'expressions'],
    keywords: ['excel', 'table', 'list rows', 'add a row', 'onedrive', 'date serial'],
  },
  {
    slug: 'outlook-and-teams',
    title: 'Outlook and Teams',
    group: 'Integration',
    summary: 'Email and chat actions used in most notification flows.',
    what: 'Office 365 Outlook triggers on incoming mail and sends, replies and manages events. Microsoft Teams posts messages and adaptive cards to chats and channels.',
    why: 'Notifications and simple request intake are the most common first automations.',
    when: 'Tell people something happened, ask a quick question, or start a flow from an email.',
    example: {
      title: 'Email trigger filter',
      language: 'text',
      code: 'When a new email arrives (V3)\n  Folder: Inbox\n  Subject Filter: [Request]\n  Include Attachments: Yes',
      explanation: 'Filters on the trigger keep the flow from running for every email.',
    },
    commonMistake: 'Choosing Post as Flow bot and then trying to @mention someone as yourself, or the other way around. The Post as choice decides what the message can contain, and changing it clears the message.',
    sections: [
      {
        heading: 'Teams posting options',
        body: [],
        table: {
          columns: ['Post as', 'Good for'],
          rows: [
            ['Flow bot', 'System notifications, adaptive cards with buttons'],
            ['User', 'Messages that should come from a person, @mentions from that person'],
          ],
        },
      },
      {
        heading: 'Adaptive cards',
        body: ['Post adaptive card and wait for a response pauses the flow until someone submits the card, which makes simple approvals and forms possible inside Teams.'],
      },
    ],
    exercise: {
      task: 'Forward tagged emails to a Teams chat.',
      steps: [
        'Create an automated flow on When a new email arrives (V3) with Subject Filter [Request].',
        'Add Post message in a chat or channel, Post as Flow bot, Post in Chat with Flow bot, recipient yourself.',
        'Put the email Subject and From in the message from dynamic content.',
      ],
      expected: 'Sending yourself an email with [Request] in the subject produces a Teams message from Flow bot within a few minutes.',
    },
    related: ['connectors', 'triggers', 'approvals'],
    keywords: ['outlook', 'email', 'teams', 'message', 'adaptive card', 'flow bot', 'mention'],
  },
  {
    slug: 'approvals',
    title: 'Approvals',
    group: 'Integration',
    summary: 'Ask one or more people to approve or reject, then branch on the outcome.',
    what: 'The Approvals connector sends a request that appears in email, Teams and the Approvals center. Start and wait for an approval pauses the flow until a response arrives.',
    why: 'Sign-off steps such as expenses, access requests and publishing need a recorded decision.',
    when: 'Any step where a person must decide before the flow continues.',
    example: {
      title: 'Branch on the result (Condition, left side)',
      code: "outputs('Start_and_wait_for_an_approval')?['body/outcome']",
      explanation: 'Compare with the plain text Approve. Rejections return Reject.',
    },
    commonMistake: 'Forgetting that a waiting approval keeps the run open. Runs time out after 30 days, so long approvals need reminders or an escalation path.',
    sections: [
      {
        heading: 'Approval types',
        body: [],
        table: {
          columns: ['Type', 'Completes when'],
          rows: [
            ['Approve/Reject: Everyone must approve', 'All assignees approve, or anyone rejects'],
            ['Approve/Reject: First to respond', 'The first response arrives'],
            ['Custom responses', 'Someone picks one of your own options'],
          ],
        },
      },
    ],
    exercise: {
      task: 'Approve your own request.',
      steps: [
        'Create an instant flow with a text input Request.',
        'Add Start and wait for an approval, type First to respond, assigned to yourself.',
        'Add a Condition on the outcome equal to Approve, and send yourself different emails in each branch.',
      ],
      expected: 'You receive the approval in Teams or email; approving sends the approved email, rejecting sends the other one.',
    },
    related: ['outlook-and-teams', 'conditions', 'connectors'],
    keywords: ['approval', 'approve', 'reject', 'outcome', 'sign-off'],
  },
];
