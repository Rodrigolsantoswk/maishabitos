import { useContext, createContext } from 'react';
import { TUserDispatch } from './types';
import { initialState } from './rdcer';

export const UserContext = createContext<TUserDispatch | null>(null);

export function useContextUser() {
  const value = useContext(UserContext);

  const nullDispatch: TUserDispatch = {
    state: initialState,
    dispatch: () => {},
  };

  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useContextUser must be wrapped in a <UserProvider />');
    }
  }

  return value ? value : nullDispatch;
}
