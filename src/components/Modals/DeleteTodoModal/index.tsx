import { Box, Typography, Button } from '@mui/material';
import { useDeleteTodo } from '~/hooks/useDeleteTodo';

export const DeleteTodoModal: React.FC = () => {
  const { mutate: deleteTodoMutation } = useDeleteTodo();

  const handleDeleteTodo = (): void => {
    deleteTodoMutation({});
  };

  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} textAlign={'center'} gap={6}>
      <>
        <Typography variant='h5'>{'Are you sure you want to delete this TODO?'}</Typography>
        <Typography variant='body2'>{'Please, pay attention, your TODO will be removed from TODO list'}</Typography>

        <Button variant='contained' onClick={handleDeleteTodo}>
          {'Remove TODO'}
        </Button>
      </>
    </Box>
  );
};
