import { useEffect } from 'react';

const SITE = 'Power Automate Hub';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : SITE;
  }, [title]);
}
