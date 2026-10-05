export type TokenType = 'string' | 'number' | 'function' | 'keyword' | 'punctuation' | 'text';

export interface Token {
  type: TokenType;
  value: string;
}

const TOKEN_PATTERN =
  /('(?:[^']|'')*'|"(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][\w]*)(?=\s*\()|\b(true|false|null)\b|([()[\]{},?@])/g;

/** Lightweight tokenizer for Power Automate expressions and JSON. */
export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ type: 'text', value: code.slice(last, index) });
    const [value, str, num, fn, kw] = match;
    const type: TokenType = str ? 'string' : num ? 'number' : fn ? 'function' : kw ? 'keyword' : 'punctuation';
    tokens.push({ type, value });
    last = index + value.length;
  }
  if (last < code.length) tokens.push({ type: 'text', value: code.slice(last) });
  return tokens;
}
