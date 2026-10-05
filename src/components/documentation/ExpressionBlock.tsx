import { useMemo } from 'react';
import type { CodeSample } from '../../types/content';
import { tokenize } from '../../utils/highlight';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import './documentation.css';

const LANGUAGE_LABEL = { expression: 'Expression', json: 'JSON', http: 'HTTP', text: 'Text' } as const;

/** Monospace code block with light syntax highlighting and a copy button. */
export function ExpressionBlock({ title, code, explanation, language = 'expression' }: CodeSample) {
  const { copied, copy } = useCopyToClipboard();
  const tokens = useMemo(() => (language === 'text' ? [] : tokenize(code)), [code, language]);

  return (
    <figure className="code">
      <div className="code__bar">
        <span className="code__title">{title ?? LANGUAGE_LABEL[language]}</span>
        <button type="button" className="code__copy" onClick={() => copy(code)}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code__pre" tabIndex={0}>
        <code>
          {language === 'text'
            ? code
            : tokens.map((t, i) => (
                <span key={i} className={`tok tok--${t.type}`}>
                  {t.value}
                </span>
              ))}
        </code>
      </pre>
      {explanation && <figcaption className="code__caption">{explanation}</figcaption>}
      <span className="visually-hidden" role="status">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </figure>
  );
}
