import type { NoteContent } from '../../types/note';

export const dataNotes: NoteContent[] = [
  {
    slug: 'compose',
    title: 'Compose',
    group: 'Data',
    summary: 'Evaluates one input once and exposes it as an output that later actions can reuse.',
    what: 'Compose stores an evaluated value that can be reused by later actions. Its input can be text, dynamic content, an expression, an object or an array. Its output is that value after evaluation.',
    why: 'It keeps complex expressions out of multiple downstream actions and makes intermediate values visible in run history.',
    when: 'Use it for values read more than once, for values you want to inspect while debugging, and to name a calculation such as Parent_Id or Child_Count.',
    example: {
      title: 'Parent_Id (Compose input, expression)',
      code: "body('Get_Current_Item')?['fields']?['System.Parent']",
      explanation: "Later actions read outputs('Parent_Id') instead of repeating the path.",
    },
    commonMistake: 'Using a variable where Compose is enough. Variables cost an extra action to initialize, cannot be initialized inside loops, and are shared across parallel iterations.',
    sections: [
      {
        heading: 'Inputs and outputs',
        body: [
          "Read the result with outputs('Compose_Name'). The output keeps the input type: a number stays a number, an object stays an object.",
          'A Compose inside a loop produces a new value per iteration; outside the loop only the last value is visible.',
        ],
      },
      {
        heading: 'Debugging with Compose',
        body: ['Drop a temporary Compose with the expression you doubt, run the flow and read its output in run history. Delete it afterwards.'],
      },
    ],
    exercise: {
      task: "Use Compose to debug an expression.",
      steps: [
        "Add a Compose with the expression length('Power Automate').",
        "Add a second Compose with toUpper('hello').",
        "Run and read both outputs.",
      ],
      expected: "The first Compose outputs 14 and the second outputs HELLO.",
    },
    related: ['variables', 'expressions', 'dynamic-content'],
    keywords: ['compose', 'outputs', 'debug', 'intermediate value'],
  },
  {
    slug: 'variables',
    title: 'Variables',
    group: 'Data',
    summary: 'Mutable values for state that changes during a run: counters, flags, accumulated results.',
    what: 'Initialize variable declares a Boolean, Integer, Float, String, Object or Array. Set variable replaces the value, Increment and Decrement change numbers, Append to array and Append to string add to collections.',
    why: 'Loops and branches need shared state, for example the current work item in a hierarchy climb or a retry counter.',
    when: 'Use a variable only when the value changes. For a value computed once, use Compose.',
    example: {
      title: 'Climb one level (Set variable)',
      code: "int(outputs('Parent_Id'))",
      explanation: 'Sets varCurrentId to the parent so the next Do until iteration starts one level higher.',
    },
    commonMistake: 'Setting a variable from an expression that reads the same variable. Set variable cannot reference itself; use Increment variable or a Compose in between.',
    sections: [
      {
        heading: 'Rules',
        body: [
          'Initialize variable must be at the top level of the flow, never inside a loop, condition or scope.',
          'Inside Apply to each with concurrency above 1, variables are shared between parallel iterations and can race.',
        ],
        table: {
          columns: ['Action', 'Use'],
          rows: [
            ['Initialize variable', 'Declare name, type and first value'],
            ['Set variable', 'Replace the value'],
            ['Increment variable', 'Add a number, also an expression such as if(cond, 1, 0)'],
            ['Append to array variable', 'Add one item to an array'],
            ['Append to string variable', 'Add text to a string'],
          ],
        },
      },
    ],
    exercise: {
      task: "Count items with a variable.",
      steps: [
        "Initialize an Integer variable Count at 0 at the top level.",
        "Compose an array [1,2,3,4] and add Apply to each over it.",
        "Inside the loop, Increment variable Count by 1. After the loop, Compose the variable.",
      ],
      expected: "The final Compose outputs 4.",
    },
    related: ['compose', 'loops', 'expressions'],
    keywords: ['variable', 'initialize', 'set', 'increment', 'append', 'state'],
  },
  {
    slug: 'dynamic-content',
    title: 'Dynamic Content',
    group: 'Data',
    summary: 'Picker tokens that insert an output of the trigger or an earlier action into a field.',
    what: "Dynamic content is a token from the picker that stands for an output, for example the work item ID from the trigger. In the definition it becomes an expression such as @{triggerOutputs()?['body/id']}.",
    why: 'It wires actions together without typing expressions and avoids typos in action names and property paths.',
    when: 'Use it whenever the picker offers the exact value you need. Switch to an expression when you need to transform it.',
    example: {
      title: 'Token inside text',
      code: "{project}/_apis/wit/workitems/@{variables('varCurrentId')}",
      explanation: 'Text plus a token. The token is evaluated and inserted as text.',
    },
    commonMistake: 'Picking a token that lives inside an array. The designer wraps the action in an Apply to each automatically, which is often not intended.',
    sections: [
      {
        heading: 'Where tokens come from',
        body: [
          'The picker only lists outputs of actions that run before the current one. Outputs from inside a loop are only available inside that loop.',
          'Tokens for properties that the connector does not describe are missing; read them with an expression instead.',
        ],
      },
    ],
    exercise: {
      task: "Mix text and tokens in one field.",
      steps: [
        "In an email Subject, type New request from (plain text).",
        "Insert the From token from the email trigger right after it.",
        "Open Code view on the action.",
      ],
      expected: "Code view shows the subject as text followed by @{triggerOutputs()...}, and the sent email shows the sender name.",
    },
    related: ['expressions', 'compose', 'triggers'],
    keywords: ['dynamic content', 'token', 'picker', 'lightning'],
  },
  {
    slug: 'expressions',
    title: 'Expressions',
    group: 'Data',
    summary: 'Workflow Definition Language formulas entered through the fx tab, and how they differ from plain text and dynamic content.',
    what: 'An expression is a formula evaluated at run time, such as length(body(\'Select_Child_Ids\')). Every field in the designer holds one of three kinds of value: plain text, dynamic content, or an expression.',
    why: 'Expressions transform, compare and combine data. Knowing which of the three a field holds explains most "it looks right but fails" bugs.',
    when: 'Use an expression for any calculation, comparison with a typed value, null handling or text manipulation.',
    example: {
      title: 'Expression in a condition',
      code: "length(body('Filter_Not_Closed_Children'))",
      explanation: 'Compared with 0 entered as an expression so both sides are integers.',
    },
    commonMistake: 'Typing an expression as plain text. It is stored as a literal string and never evaluated. In Code view a real expression starts with @ or sits inside @{ }.',
    sections: [
      {
        heading: 'Plain text vs dynamic content vs expression',
        body: ['The same characters behave differently depending on how they were entered.'],
        table: {
          columns: ['Entered as', 'Stored and evaluated as'],
          rows: [
            ['Plain text: Closed', 'The string "Closed"'],
            ['Plain text: false', 'The string "false", not a boolean'],
            ['Plain text: 0', 'Often the string "0"; comparisons with integers fail'],
            ['Dynamic content: Work Item ID', "@{triggerOutputs()?['body/id']}"],
            ['Expression: false', 'The boolean false'],
            ['Expression: length(...)', 'An integer computed at run time'],
          ],
        },
      },
      {
        heading: 'Syntax essentials',
        body: [
          "Strings use single quotes. ?[ ] is safe navigation: it returns null instead of failing when a property is missing.",
          'Inside a text field, @{expression} interpolates the result into the text. A field that is only an expression is stored as @expression.',
        ],
        samples: [{ title: 'Safe navigation', code: "body('Get_Parent')?['fields']?['System.WorkItemType']" }],
      },
    ],
    exercise: {
      task: "Prove the difference between text and expression.",
      steps: [
        "Add a Compose and type false as plain text.",
        "Add a second Compose and enter false through the fx editor.",
        "Open Code view on both.",
      ],
      expected: "The first stores the string \"false\"; the second stores the boolean false without quotes.",
    },
    related: ['expressions-reference', 'dynamic-content', 'conditions'],
    keywords: ['expression', 'fx', 'plain text', 'dynamic content', 'wdl', 'code view'],
  },
];
