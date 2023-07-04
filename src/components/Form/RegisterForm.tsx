import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { createUser } from '~/api/users';
import { useContext } from 'react';
import { AuthContext } from '~/providers/AuthContext';
import { StyledForm } from './AuthForm';
import { setUserInLocalStorage } from '~/helpers/localStorage';
import { EmailInput } from '../Inputs/EmailInput';
import { NameInput } from '../Inputs/NameInput';

const yupRegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().min(4).required(),
});

export const RegisterForm: React.FC = (): JSX.Element => {
  const { setUser, setIsLoading } = useContext(AuthContext);

  const {
    control,
    // setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', name: '' },
    mode: 'onChange',
    resolver: yupResolver(yupRegisterSchema),
  });

  const onSubmit = async ({ email, name }: { email: string; name: string }): Promise<void> => {
    try {
      setIsLoading(true);
      const user = await createUser({ email, name });
      setUser(user);
      setUserInLocalStorage(user);
    } catch (error) {
      // TODO: handle error
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <EmailInput control={control} errors={errors} />
      <NameInput control={control} errors={errors} />

      <Button variant={'contained'} type={'submit'} disabled={Boolean(Object.keys(errors).length)}>
        {'Sign up'}
      </Button>
    </StyledForm>
  );
};
