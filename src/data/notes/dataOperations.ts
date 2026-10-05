import type { NoteContent } from '../../types/note';

export const dataOperationNotes: NoteContent[] = [
  {
    slug: 'parse-json',
    title: 'Parse JSON',
    group: 'Data',
    summary: 'Turn a JSON string or untyped body into typed properties that appear in dynamic content.',
    what: 'Parse JSON takes content and a JSON schema. Its output is the same data, but every property described in the schema becomes a dynamic content token.',
    why: 'HTTP responses and some connector outputs are untyped, so the picker cannot offer their properties. After Parse JSON you can pick them instead of writing long expressions.',
    when: 'After an HTTP call or any action whose body you want to use field by field.',
    example: {
      title: 'Minimal schema',
      language: 'json',
      code: '{\n  "type": "object",\n  "properties": {\n    "id": { "type": "integer" },\n    "title": { "type": ["string", "null"] }\n  }\n}',
      explanation: 'Allowing null on title stops the action failing when the value is missing.',
    },
    commonMistake: 'Generating the schema from one sample and leaving every property required and non-null. The first record with an empty field fails with "Invalid type. Expected String but got Null".',
    sections: [
      {
        heading: 'Building the schema',
        body: [
          'Select Use sample payload to generate schema, paste a real response and select Done.',
          'Then edit the schema: remove properties you do not need from required, and allow null where a value can be empty.',
        ],
      },
      {
        heading: 'When you can skip it',
        body: ["If you only need one or two values, an expression such as body('HTTP')?['title'] is simpler than a full schema."],
      },
    ],
    exercise: {
      task: 'Parse a sample order.',
      steps: [
        'In a test flow, add a Compose with the text {"id": 1001, "customer": "Demo Ltd", "total": 250}.',
        'Add Parse JSON with Content set to the Compose Outputs and generate the schema from the same text.',
        'Add a second Compose and pick customer from the Parse JSON dynamic content.',
      ],
      expected: 'The second Compose outputs Demo Ltd, and customer, id and total appear as tokens in the picker.',
    },
    related: ['http', 'dynamic-content', 'data-operations'],
    keywords: ['parse json', 'schema', 'json', 'typed', 'null', 'sample payload'],
  },
  {
    slug: 'data-operations',
    title: 'Data Operations',
    group: 'Data',
    summary: 'Select, Filter array, Join and Create HTML table reshape arrays without loops.',
    what: 'Data operations are built-in actions that transform arrays in one step: Select maps each item, Filter array keeps matching items, Join turns an array into text, Create HTML table and Create CSV table format rows.',
    why: 'They replace Apply to each loops with variables, which are slower, longer and harder to read.',
    when: 'Whenever you would otherwise loop only to build, filter or format a list.',
    example: {
      title: 'Select in text mode',
      code: "item()?['email']",
      explanation: 'Turns a list of person objects into a plain list of email addresses.',
    },
    commonMistake: 'Leaving Select in key/value mode when you need a plain list. Key/value mode returns [{"email": "user@example.com"}], not ["user@example.com"]. Use Switch Map to text mode.',
    sections: [
      {
        heading: 'Which action for which job',
        body: [],
        table: {
          columns: ['Action', 'Result'],
          rows: [
            ['Select', 'New array, one output item per input item'],
            ['Filter array', 'Same items, only those matching a condition'],
            ['Join', 'One string, items separated by a character such as ; or ,'],
            ['Create HTML table', 'An HTML table for an email body'],
            ['Create CSV table', 'CSV text for a file attachment'],
          ],
        },
      },
      {
        heading: 'Inside these actions',
        body: ["item() is the current element, so item()?['status'] reads its status. Filter array in advanced mode takes a full expression such as @not(equals(item(), null))."],
      },
    ],
    exercise: {
      task: 'Build an email list from people records.',
      steps: [
        'Compose an array: [{"name":"Ana","email":"ana@example.com"},{"name":"Ben","email":"ben@example.com"}].',
        "Add Select from the Compose, switch to text mode and enter item()?['email'].",
        'Add Join on the Select output with ; as the separator.',
      ],
      expected: 'Join outputs ana@example.com;ben@example.com, ready for the To field of an email.',
    },
    related: ['parse-json', 'loops', 'expressions'],
    keywords: ['select', 'filter array', 'join', 'html table', 'csv', 'data operation', 'item()'],
  },
];
