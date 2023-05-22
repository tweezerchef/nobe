import { createContext } from 'react';

export interface NearMeBookIdType {
  ids: string[];
  setIds: (ids: string[]) => void;
  nearMeBooks: any[];
  setNearMeBooks: (books: any[]) => void;
}

export const NearMeBookContext = createContext<NearMeBookIdType | null>(null);
