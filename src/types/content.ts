/** Shared building blocks for documentation content. */

export type InputMode = 'plain' | 'dynamic' | 'expression';

export interface CodeSample {
  /** Short label shown above the block, e.g. "Condition, left side". */
  title?: string;
  code: string;
  /** Plain-language explanation shown under the block. */
  explanation?: string;
  language?: 'expression' | 'json' | 'http' | 'text';
}

export interface InternalLink {
  label: string;
  to: string;
}
