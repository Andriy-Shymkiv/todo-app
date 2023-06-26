import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { getUserByEmail } from '~/api/users';
import { useContext } from 'react';
import { AuthContext } from '~/providers/AuthContext';
import { AUTH_FORM_SCREEN, StyledForm } from './AuthForm';
import { setUserInLocalStorage } from '~/helpers/localStorage';
import { EmailInput } from '../Inputs/EmailInput';

const yupLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
});

interface LoginFormProps {
  onScreenChange: (screen: AUTH_FORM_SCREEN) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onScreenChange }): JSX.Element => {
  const { setUser, setIsLoading } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '' },
    mode: 'onChange',
    resolver: yupResolver(yupLoginSchema),
  });

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        onScreenChange(AUTH_FORM_SCREEN.REGISTER);
        return;
      }
      setIsLoading(true);
      setUser(user);
      setUserInLocalStorage(user);
    } catch (error) {
      onScreenChange(AUTH_FORM_SCREEN.REGISTER);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <EmailInput control={control} errors={errors} />

      <Button variant={'contained'} type={'submit'} disabled={Boolean(Object.keys(errors).length)}>
        {'Log in'}
      </Button>
    </StyledForm>
  );
};
