import { useContext } from 'react';
import { AuthContext } from './providers/AuthContext';
import { Typography, Button } from '@mui/material';

export const App = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Typography variant='h5'>{'todo'}</Typography>
      <Button variant={'contained'} onClick={() => logout()}>
        {'Logout'}
      </Button>
    </>
  );
};
