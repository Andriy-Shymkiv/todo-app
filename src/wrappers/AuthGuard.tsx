import { CircularProgress } from '@mui/material';
import { ReactNode, useCallback, useContext, useEffect } from 'react';
import { AuthForm } from '~/components/Form/AuthForm';
import { getUserFromLocalStorage } from '~/helpers/localStorage';
import { User } from '~/types/User';
import { AuthContext } from '../providers/AuthContext';

export const AuthGuard = ({ children }: { children: ReactNode }): JSX.Element => {
  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);

  const initAuth = useCallback(() => {
    const userData = getUserFromLocalStorage();
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

  if (isLoading) return <CircularProgress />;
  if (!user) return <AuthForm />;

  return <>{children}</>;
};
