import { createContext, ReactNode, useState } from 'react';
import { AuthForm } from '~/components/AuthForm';
import { User } from '~/types/User';

type AuthValuesType = {
  user: User | null;
  setUser: (value: User | null) => void;
};

const defaultProvider: AuthValuesType = { user: null, setUser: () => null };

export const AuthContext = createContext(defaultProvider);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  if (!user) return <AuthForm setUser={setUser} />;

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
