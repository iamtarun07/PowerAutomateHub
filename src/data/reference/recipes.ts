import type { ExpressionRecipe } from '../../types/reference';

export const recipes: ExpressionRecipe[] = [
  { slug: 'id-from-url', title: 'ID from a resource URL', problem: 'Relations return URLs, not IDs.', code: "int(last(split(item()?['url'], '/')))", explanation: 'Split on "/", take the last segment, convert to integer.' },
  { slug: 'null-safe-array', title: 'Null-safe array', problem: 'A missing property breaks length() and Filter array.', code: "coalesce(body('Get_Parent')?['relations'], json('[]'))", explanation: 'Falls back to an empty array.' },
  { slug: 'has-value', title: 'Has a value', problem: 'empty() does not accept integers.', code: "not(empty(string(outputs('Parent_Id'))))", explanation: 'string() turns null into an empty string and numbers into text.' },
  { slug: 'map-type', title: 'Map one value to another', problem: 'Switch adds a nesting level.', code: "if(equals(variables('type'), 'Feature'), 'Epic', '')", explanation: 'Nested if() inside a Compose keeps mapping logic flat.' },
  { slug: 'conditional-increment', title: 'Increment only when', problem: 'A Condition around Increment variable costs a nesting level.', code: "if(equals(variables('varDecision'), 'Conflict'), 1, 0)", explanation: 'Use as the Increment variable value; adding 0 is a no-op.' },
  { slug: 'domain-swap', title: 'Swap an email domain', problem: 'Two systems use different domains for the same person.', code: "concat(first(split(variables('upn'), '@')), '@example.com')", explanation: 'Keep the local part, replace the domain.' },
  { slug: 'run-id', title: 'Current run ID', problem: 'Audit comments should identify the run.', code: "workflow()?['run']?['name']", explanation: 'Matches the run ID shown in run history.' },
  { slug: 'text-between', title: 'Text between two markers', problem: 'Parse a section out of free text.', code: "trim(first(split(last(split(variables('body'), 'Start:')), 'End:')))", explanation: 'After the first marker, before the second.' },
];
