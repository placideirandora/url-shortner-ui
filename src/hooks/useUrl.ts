import { useContext } from 'react';

import { UrlContextType } from '../contexts/types';
import { UrlContext } from '../contexts/urlContext';

export const useUrl = (): UrlContextType => {
  const context = useContext(UrlContext);
  if (context === undefined) {
    throw new Error('useUrl must be used within a UrlProvider');
  }
  return context;
};
