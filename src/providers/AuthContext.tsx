import { createContext, ReactNode, useState } from 'react';
import { removeUserFromLocalStorage } from '~/helpers/localStorage';
import { User } from '~/types/User';

type AuthValuesType = {
  user: User | null;
  setUser: (value: User | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  logout: () => void;
};

const defaultProvider: AuthValuesType = {
  user: null,
  setUser: () => null,
  isLoading: true,
  setIsLoading: () => null,
  logout: () => null,
};

export const AuthContext = createContext(defaultProvider);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [isLoading, setIsLoading] = useState<boolean>(defaultProvider.isLoading);

  const logout = () => {
    removeUserFromLocalStorage();
    setUser(null);
    setIsLoading(true);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading, logout }}>{children}</AuthContext.Provider>
  );
};
