import { useContext } from 'react';
import { AuthContext } from './providers/AuthContext';
import { Typography, Button } from '@mui/material';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = (): JSX.Element => {
  const { logout, user } = useContext(AuthContext);
  const { data: todos } = useTodos(String(user?.id));

  return (
    <>
      <Typography variant='h5'>{'todo'}</Typography>
      {todos?.map((todo) => (
        <Typography key={todo.id}>{todo.title}</Typography>
      ))}
      <Button variant={'contained'} onClick={() => logout()}>
        {'Logout'}
      </Button>
    </>
  );
};
