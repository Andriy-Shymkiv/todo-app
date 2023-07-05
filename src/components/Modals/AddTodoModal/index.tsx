import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button, FormControl, TextField, styled } from '@mui/material';
import { assert } from 'ts-essentials';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAddTodo } from '~/hooks/useAddTodo';
import { AuthContext } from '~/providers/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '~/types/Todo';

const yupAddTodoSchema = yup.object().shape({
  title: yup.string().required(),
});

const StyledAddTodoForm = styled('form', {
  name: 'StyledAddTodoForm',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const AddTodoModal: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { mutate: addTodoMutate } = useAddTodo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: '' },
    mode: 'onChange',
    resolver: yupResolver(yupAddTodoSchema),
  });

  const onSubmit = ({ title }: { title: string }): void => {
    assert(user, 'user is not defined');

    const newTodo: Todo = {
      id: Number(uuidv4()), // generate unique id for each todo
      userId: user.id,
      title,
      completed: false,
    };

    addTodoMutate(newTodo);
  };

  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} textAlign={'center'} gap={6}>
      <>
        <Typography variant='h5'>{'Add TODO for your TODO list'}</Typography>
        <Typography variant='body2'>{'Please, add TODO title'}</Typography>

        <StyledAddTodoForm onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }): JSX.Element => (
                <TextField
                  autoComplete='off'
                  label='Title'
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.title)}
                  placeholder='fuck turtles'
                />
              )}
            />
            {errors.title && <Typography>{errors.title.message}</Typography>}
          </FormControl>

          <Button variant='contained' type='submit'>
            {'Add TODO'}
          </Button>
        </StyledAddTodoForm>
      </>
    </Box>
  );
};
