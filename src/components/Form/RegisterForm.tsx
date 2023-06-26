import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormControl, TextField, Button } from '@mui/material';
import { createUser } from '~/api/users';
import { useContext } from 'react';
import { AuthContext } from '~/providers/AuthContext';
import { StyledForm, StyledAuthInputErrorMessage } from './AuthForm';
import { setUserInLocalStorage } from '~/helpers/localStorage';

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

  const onSubmit = async ({ email, name }: { email: string; name: string }) => {
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
      <FormControl fullWidth>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoComplete='email'
              label='Email'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.email)}
              placeholder='example@com'
            />
          )}
        />
        {errors.email && <StyledAuthInputErrorMessage>{errors.email.message}</StyledAuthInputErrorMessage>}
      </FormControl>

      <FormControl fullWidth>
        <Controller
          name='name'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label='Name'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.name)}
              placeholder='your name'
            />
          )}
        />
        {errors.name && <StyledAuthInputErrorMessage>{errors.name.message}</StyledAuthInputErrorMessage>}
      </FormControl>

      <Button variant={'contained'} type={'submit'} disabled={Boolean(Object.keys(errors).length)}>
        {'Sign up'}
      </Button>
    </StyledForm>
  );
};
