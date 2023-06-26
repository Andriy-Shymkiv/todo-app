import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Typography, Button } from '@mui/material';

export const App = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <>
      <Typography variant='h5'>{'todo'}</Typography>
      <Button
        variant={'contained'}
        onClick={() => {
          localStorage.removeItem('user');
          setUser(null);
        }}
      >
        logout
      </Button>
    </>
  );
};
