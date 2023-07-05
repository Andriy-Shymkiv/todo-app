import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button, FormControl, TextField, styled } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { constructTodosCacheKey } from '~/helpers/getQueriesCache';
import { useUpdateTodo } from '~/hooks/useUpdateTodo';
import { AuthContext } from '~/providers/AuthContext';
import { useAppSelector } from '~/store/reduxHooks';
import { Todo } from '~/types/Todo';

const yupUpdateTodoSchema = yup.object().shape({
  title: yup.string().required(),
});

const StyledUpdateTodoForm = styled('form', {
  name: 'StyledUpdateTodoForm',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const UpdateTodoModal: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { selectedTodoId } = useAppSelector(({ app }) => app);
  const { mutate: updateTodoMutate } = useUpdateTodo();
  const queryClient = useQueryClient();
  const todos = queryClient.getQueryData<Todo[]>(constructTodosCacheKey(user?.id));
  const selectedTodo = useMemo(() => todos?.find((todo) => todo.id === selectedTodoId), [selectedTodoId, todos]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: selectedTodo?.title ?? '' },
    mode: 'onChange',
    resolver: yupResolver(yupUpdateTodoSchema),
  });

  const onSubmit = ({ title }: { title: string }): void => {
    updateTodoMutate({ title, completed: false }); // change title and set to not completed
  };

  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} textAlign={'center'} gap={6}>
      <>
        <Typography variant='h5'>{'Update TODO'}</Typography>
        <Typography variant='body2'>{'Please, update TODO title'}</Typography>

        <StyledUpdateTodoForm onSubmit={handleSubmit(onSubmit)}>
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
            {'Update TODO'}
          </Button>
        </StyledUpdateTodoForm>
      </>
    </Box>
  );
};
