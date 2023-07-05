import { useTodos } from '~/hooks/useTodos';
import { Button, Skeleton, Box, styled, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useModalState } from '~/store/modal/hooks/useModalState';
import { ModalType } from '~/store/modal/types';
import { useAppDispatch } from '~/store/reduxHooks';
import { setSelectedTodoId } from '~/store/app/slice';
import { useChangeTodoStatus } from '~/hooks/useChangeTodoStatus';

const StyledTodoButton = styled(Button, {
  name: 'StyledTodoButton',
})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 4),
  minHeight: 48,
  width: '100%',
  border: 'none',
  borderRadius: 24,
  boxShadow: theme.shadows[3],
  color: theme.palette.text.primary,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: 16,
  '&:hover': {
    boxShadow: theme.shadows[4],
    border: 'none',
  },
}));

const StyledTodoTitle = styled(Typography, {
  name: 'StyledTodoTitle',
})({
  wordBreak: 'break-all',
});

const ToggleButton = styled(Button, {
  name: 'ToggleButton',
})({
  padding: 0,
  minWidth: 0,
});

const StyledTodosContainer = styled(Box, {
  name: 'StyledTodosContainer',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1, 2),
  gap: theme.spacing(4),
  maxHeight: 480,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: theme.spacing(2),
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const TodoList = (): JSX.Element => {
  const { openModal } = useModalState();
  const dispatch = useAppDispatch();
  const { data: todos, isLoading: todosIsLoading } = useTodos();

  const { mutate: changeTodoStatusMutate } = useChangeTodoStatus();

  const onUpdateTodoClick = (todoId: number): void => {
    dispatch(setSelectedTodoId(todoId));
    openModal({ modalType: ModalType.UPDATE_TODO });
  };

  const onUpdateStatusClick = (todoId: number): void => {
    changeTodoStatusMutate(todoId);
  };

  const onDeleteTodoClick = (todoId: number): void => {
    dispatch(setSelectedTodoId(todoId));
    openModal({ modalType: ModalType.DELETE_TODO });
  };

  return (
    <StyledTodosContainer>
      {!todosIsLoading
        ? todos?.map((todo) => (
            <Box display={'flex'} key={todo.id} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <StyledTodoButton onClick={(): void => onUpdateTodoClick(todo.id)}>
                <StyledTodoTitle variant={'inherit'}>{todo.title}</StyledTodoTitle>
              </StyledTodoButton>
              <Box display={'flex'} gap={2}>
                <ToggleButton onClick={(): void => onUpdateStatusClick(todo.id)}>
                  {todo.completed ? <CheckCircleIcon color={'success'} /> : <PanoramaFishEyeIcon color={'info'} />}
                </ToggleButton>
                <ToggleButton onClick={(): void => onDeleteTodoClick(todo.id)}>
                  <HighlightOffIcon color={'error'} />
                </ToggleButton>
              </Box>
            </Box>
          ))
        : Array.from(Array(3).keys()).map((i) => <Skeleton key={i} width={'100%'} height={48} variant='rounded' />)}
    </StyledTodosContainer>
  );
};
