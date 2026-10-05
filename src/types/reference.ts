export interface FunctionReference {
  name: string;
  signature: string;
  returns: string;
  description: string;
  example: string;
  result: string;
  commonMistake: string;
}

export interface ExpressionRecipe {
  slug: string;
  title: string;
  problem: string;
  code: string;
  explanation: string;
}

export interface Pattern {
  slug: string;
  title: string;
  summary: string;
  structure: string[];
  whenToUse: string;
  pitfalls: string;
  usedIn: string[];
  relatedNotes: string[];
}
