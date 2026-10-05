import type { NoteContent } from '../../types/note';

export const controlNotes: NoteContent[] = [
  {
    slug: 'conditions',
    title: 'Conditions',
    group: 'Control flow',
    summary: 'Branch on one or more comparisons combined with AND or OR.',
    what: 'A Condition evaluates rows of left value, operator and right value. Rows are grouped with AND (all true) or OR (any true). The result runs the True or the False branch.',
    why: 'Conditions implement business rules and guard clauses, such as "only close the parent when every child is Closed".',
    when: 'Use a Condition for two outcomes. Use Switch for one value with many cases.',
    example: {
      title: 'Two checks, one condition',
      language: 'text',
      code: "AND\n  length(body('Filter_Readable_Children'))   is equal to   outputs('Child_Count')\n  length(body('Filter_Not_Closed_Children')) is equal to   0",
      explanation: 'Combining rows replaces nested conditions and saves one nesting level.',
    },
    commonMistake: 'Entering true, false or numbers on the right side as plain text. The comparison then compares a boolean or integer with a string and is always false.',
    sections: [
      {
        heading: 'Operators',
        body: ['String comparison with is equal to is not case-sensitive in practice; normalize with toLower() when it matters.'],
        table: {
          columns: ['Operator', 'Expression'],
          rows: [
            ['is equal to', 'equals(a, b)'],
            ['is not equal to', 'not(equals(a, b))'],
            ['is greater than', 'greater(a, b)'],
            ['is less than or equal to', 'lessOrEquals(a, b)'],
            ['contains', 'contains(text, value)'],
          ],
        },
      },
      {
        heading: 'Nested conditions',
        body: [
          'Each nested Condition adds a nesting level. Prefer combined rows, guard clauses that stop early, or values computed with if() in a Set variable.',
          'The False branch can stay empty; the flow simply continues after the Condition.',
        ],
      },
    ],
    exercise: {
      task: "Combine two checks in one Condition.",
      steps: [
        "Create an instant flow with a Number input.",
        "Add a Condition with AND: number is greater than 10, and number is less than 20 (both values as expressions).",
        "Put a Compose in each branch.",
      ],
      expected: "Testing with 15 runs True; testing with 5 or 25 runs False.",
    },
    related: ['expressions', 'scopes', 'expressions-reference'],
    keywords: ['condition', 'and', 'or', 'branch', 'nested', 'switch', 'comparison'],
  },
  {
    slug: 'loops',
    title: 'Loops',
    group: 'Control flow',
    summary: 'Apply to each iterates over an array; Do until repeats until an expression becomes true.',
    what: 'Apply to each runs its actions once per array item, optionally in parallel. Do until runs its actions, then checks the exit expression, and repeats until it is true or the count or timeout limit is reached.',
    why: 'Collections need per-item work; open-ended processes such as climbing a hierarchy need a loop with an exit condition.',
    when: 'Known collection: Apply to each. Unknown number of steps: Do until, always with a deliberate Count and Timeout.',
    example: {
      title: 'Do until exit expression',
      code: "or(\n  equals(variables('varContinue'), false),\n  greaterOrEquals(variables('varLevel'), 3)\n)",
      explanation: 'A flag set by any stop branch plus a hard level cap.',
    },
    commonMistake: 'Relying on Count alone to stop Do until. When Count runs out the loop ends silently as Succeeded; check afterwards whether the exit condition was actually met.',
    sections: [
      {
        heading: 'Apply to each',
        body: [
          "Current item: items('Apply_to_each'). Concurrency is set in Settings; with concurrency above 1, avoid Set variable inside the loop.",
          'Filter array before looping is cheaper than a Condition inside the loop.',
        ],
      },
      {
        heading: 'Do until',
        body: [
          'The body always runs at least once because the check happens after each iteration.',
          'Size Count for the normal path plus retries. Timeout uses ISO 8601 durations, for example PT1H.',
        ],
      },
    ],
    exercise: {
      task: "Stop a Do until at a target.",
      steps: [
        "Initialize an Integer variable Counter at 0.",
        "Add Do until with the condition Counter is greater than or equal to 5, Count 10.",
        "Inside, Increment variable Counter by 1.",
      ],
      expected: "The run shows 5 iterations and Counter ends at 5.",
    },
    related: ['variables', 'scopes', 'expressions'],
    keywords: ['apply to each', 'do until', 'loop', 'iteration', 'concurrency', 'count', 'timeout'],
  },
  {
    slug: 'scopes',
    title: 'Scopes',
    group: 'Control flow',
    summary: 'Group actions so they succeed or fail together and build Try, Catch and Finally blocks.',
    what: 'A Scope is a container. Its status is derived from the actions inside it, so a following action configured to run after the scope Failed acts as a catch block.',
    why: 'Error handling per action does not scale. A scope catches any failure inside a block in one place.',
    when: 'Wrap a unit of work that should be handled as a whole, such as one hierarchy level or one record.',
    example: {
      title: 'Failed actions inside Try',
      language: 'text',
      code: "Filter array\n  From:  result('Try_Level')\n  Where: equals(item()?['status'], 'Failed')",
      explanation: 'result() returns the top-level actions of the scope with status, inputs, outputs and error.',
    },
    commonMistake: "Expecting result('Scope') to list nested actions. It returns only the top-level actions inside the scope, so a failure deep inside a Condition shows as the Condition failing.",
    sections: [
      {
        heading: 'Try, Catch, Finally',
        body: ['Try: a scope with the work. Catch: a scope that runs after Try has failed or timed out. Finally: a scope that runs after Catch on every status, including Skipped.'],
        table: {
          columns: ['Scope', 'Run after'],
          rows: [
            ['Try', 'Previous action Succeeded'],
            ['Catch', 'Try: Failed, TimedOut'],
            ['Finally', 'Catch: Succeeded, Failed, Skipped, TimedOut'],
          ],
        },
      },
      {
        heading: 'Handled failures',
        body: ['When a failed action has a follower configured to run after Failed and that follower succeeds, the failure counts as handled and the enclosing scope can still succeed.'],
      },
    ],
    exercise: {
      task: "Build a Try and Catch.",
      steps: [
        "Add a Scope named Try containing a Compose with the expression div(1, 0).",
        "Add a Scope named Catch after it, run after Try has failed.",
        "Inside Catch, Compose result('Try').",
      ],
      expected: "Try fails on division by zero, Catch runs, and its Compose shows the failed action and error message.",
    },
    related: ['error-handling', 'actions', 'conditions'],
    keywords: ['scope', 'try', 'catch', 'finally', 'result', 'run after'],
  },
];
