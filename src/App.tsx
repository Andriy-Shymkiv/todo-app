import { useCallback, useContext } from 'react';
import { AuthContext } from './providers/AuthContext';
import { Typography, Button } from '@mui/material';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = (): JSX.Element => {
  const { logout, user } = useContext(AuthContext);
  const { data: todos } = useTodos(String(user?.id));

  const handleLogout = useCallback((): void => {
    logout();
  }, [logout]);

  return (
    <>
      <Typography variant='h5'>{'todo'}</Typography>
      {todos?.map((todo) => (
        <Typography key={todo.id}>{todo.title}</Typography>
      ))}
      <Button variant={'contained'} onClick={handleLogout}>
        {'Logout'}
      </Button>
    </>
  );
};
