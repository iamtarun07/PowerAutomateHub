import { useCallback, useState } from 'react';

/** Copies text and exposes a short-lived "copied" flag for feedback. */
export function useCopyToClipboard(resetMs = 1600) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), resetMs);
      } catch {
        setCopied(false);
      }
    },
    [resetMs],
  );

  return { copied, copy };
}
