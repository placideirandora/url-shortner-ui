import { useState, ReactNode } from 'react';

import { UrlContext } from './urlContext';

export function UrlProvider({ children }: { children: ReactNode }) {
  const [editedUrl, setEditedUrl] = useState('');

  return (
    <UrlContext.Provider value={{ editedUrl, setEditedUrl }}>
      {children}
    </UrlContext.Provider>
  );
}
