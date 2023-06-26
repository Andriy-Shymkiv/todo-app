import { useState } from 'react';
import { Typography, FormHelperText, styled } from '@mui/material';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const StyledForm = styled('form', {
  name: 'StyledForm',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(4),
  width: '100%',
  maxWidth: 422,
}));

export const StyledAuthInputErrorMessage = styled(FormHelperText, {
  name: 'StyledAuthInputErrorMessage',
})(({ theme }) => ({
  color: theme.palette.error.main,
}));

export enum AUTH_FORM_SCREEN {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export const AuthForm: React.FC = (): JSX.Element => {
  const [screen, setScreen] = useState<AUTH_FORM_SCREEN>(AUTH_FORM_SCREEN.LOGIN);

  return (
    <>
      <Typography variant='h4' mb={8}>
        {screen === AUTH_FORM_SCREEN.LOGIN && 'Log in to open todos'}
        {screen === AUTH_FORM_SCREEN.REGISTER && 'You need to register'}
      </Typography>
      {screen === AUTH_FORM_SCREEN.LOGIN && <LoginForm onScreenChange={setScreen} />}
      {screen === AUTH_FORM_SCREEN.REGISTER && <RegisterForm />}
    </>
  );
};
