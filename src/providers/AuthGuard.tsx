import { ReactNode, useCallback, useContext, useEffect } from 'react';
import { AuthForm } from '~/components/Form/AuthForm';
import { Spinner } from '~/components/Spinner';
import { User } from '~/types/User';
import { AuthContext } from './AuthContext';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);

  const initAuth = useCallback(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      setTimeout(() => setIsLoading(false), 800);
      return;
    }

    const user = JSON.parse(userData) as User;
    setUser(user);

    setTimeout(() => setIsLoading(false), 800);
  }, [setUser, setIsLoading]);

  useEffect(() => {
    initAuth();
  }, [setUser, isLoading, initAuth]);

  if (isLoading) return <Spinner />;
  if (!user) return <AuthForm />;

  return <>{children}</>;
};
