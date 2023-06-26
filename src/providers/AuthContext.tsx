import { createContext, ReactNode, useState } from 'react';
import { User } from '~/types/User';

type AuthValuesType = {
  user: User | null;
  setUser: (value: User | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const defaultProvider: AuthValuesType = { user: null, setUser: () => null, isLoading: true, setIsLoading: () => null };

export const AuthContext = createContext(defaultProvider);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [isLoading, setIsLoading] = useState<boolean>(defaultProvider.isLoading);

  return <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>{children}</AuthContext.Provider>;
};
